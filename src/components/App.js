//---------------------------------------------------
// Created by kingzhi 2016-6-26
//---------------------------------------------------
'use strict';
import React from "react";
import LocalDb from "localDb";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

class App extends React.Component {
    constructor(){
        super();
        this.db = new LocalDb('React-Todos');
        this.state = {
            todos: this.db.get("todos") || [],
            isAllChecked: false
        };
    }

    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked(){
        let isAllChecked = false;
        if(this.state.todos.every((todo)=> todo.isDone)){
            isAllChecked = true;
        }
        this.setState({todos: this.state.todos, isAllChecked});
    }

    // 添加任务，是传递给Header组件的方法
    addTask(todoItem){
        this.state.todos.push(todoItem);
        this.allChecked();
        this.db.set('todos',this.state.todos);
    }

    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false){
        if(isChangeAll){
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            })
        }else{
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos', this.state.todos);
    }

    // 清除已完成的任务，传递给Footer组件的方法
    clearDone(){
        let todos = this.state.todos.filter(todo => !todo.isDone);
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        this.db.set('todos', todos);
    }

    // 删除当前的任务，传递给TodoItem的方法
    delTask(index){
        this.state.todos.splice(index, 1);
        this.setState({todos: this.state.todos});
        this.db.set('todos', this.state.todos);
    }

    render(){
        var props = {
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0
        };
        return (
            <section className="zk-task">
                <Header addTask={this.addTask.bind(this)}/>
                <Main delTask={this.delTask.bind(this)} todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)}/>
                <Footer isAllChecked={this.state.isAllChecked} clearDone={this.clearDone.bind(this)} {...props} changeTodoState={this.changeTodoState.bind(this)}/>
            </section>
        )
    }
}
React.render(<App/>, document.getElementById("app"));

//---------------------------------------------------
// Created by kingzhi 2016-6-26
//---------------------------------------------------
'use strict';
import React from "react";

export default class Header extends React.Component {

    // 绑定键盘回车事件，添加新任务
    handlerKeyUp(event){
        if(event.keyCode === 13){
            let value = event.target.value;

            if(!value) return false;

            let newTodoItem = {
                text: value,
                isDone: false
            };
            event.target.value = "";
            this.props.addTask(newTodoItem);
        }
    }

    render(){
        return (
            <div className="zk-header">
                <input onKeyUp={this.handlerKeyUp.bind(this)} className="input" type="text" placeholder="今天还有什么任务……？"/>
            </div>
        )
    }
}

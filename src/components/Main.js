//---------------------------------------------------
// Created by kingzhi 2016-6-26
//---------------------------------------------------
'use strict';
import React from "react";
import ItemTask from "./ItemTask.js"


export default class Main extends React.Component{
    // 遍历显示任务，转发props
    render(){
        return (
            <ul className="list-task">
                {this.props.todos.map((todo, index) => {
                    return <ItemTask key={index} {...todo} index={index} {...this.props}/>
                })}
            </ul>
        )
    }
}

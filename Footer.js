import React from "react";
import {connect} from "react-redux";
import TodoAction from "./store/actions/todoAction.js"

class Footer extends React.Component{
    constructor(props,context,updater){
        super(props,context);
        this.state={
            showData:[
                {flag:"all",text:"全部"},
                {flag:"complete",text:"已完成"},
                {flag:"uncomplete",text:"未完成"},
            ]
        }
    };
    render(){
        return <div className={"panel-footer"}>
            {/* 三个li标签都要绑定使用事件委托 */}
            <ul className={"nav nav-pills"} onClick={this.updateFilter}>
                {this.state.showData.map((item,index)=>{
                    return <li className={this.props.flag === item.flag? "active" : null} key={index} role={"presentation"}> <a href={"#!"} flag={item.flag}>{item.text}</a> </li>
                })}
                
                
            </ul>
        </div>
    };

    updateFilter= (event)=>{
        let target = event.target;
        let tagName = target.tagName;
        // 如果点击的是 li 标签 集成到 a 标签里面
        if (tagName === "LI"){
            target = target.firstElementChild;
            tagName = target.tagName;
        };
        if(tagName === "A"){
            // 在这里实现的是去修改 容器状态的操作
            let flag = target.getAttribute("flag");
            // console.log(flag);
            this.props.filter(flag)
            // console.log()
        }

    }
};

let mapStateToProps = (state)=>{
    return {
        ...state.todoReducer,
    }
};

let mapDispatchToProps = (dispatch)=>{
    return {
        filter: (flag)=>{
            /* 
                {
                    type:Todo_Filter,
                    flag:all|complete|uncomplete
                }
            */
            console.log(TodoAction.filter(flag))
            dispatch(TodoAction.filter(flag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);


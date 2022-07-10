import React from "react";
import {connect} from "react-redux";
// import PropTypes from "prop-types";
import TodoAction from "./store/actions/todoAction.js"

class Header extends React.Component{
    constructor(props,context,updater){
        super(props,context);
    };

    render(){
        // => 未完成的任务人数的
        let {data} = this.props;
        let count = 0;
        for(let i=0;i<data.length;i++){
            let item = data[i];
            if(item["state"] === 0){
                count++;
            };
        };
        return <div className={"panel-heading"}>
            <h3 className={"panel-title"}>
                {/* 特意注释为 html 的for表签 */}
                任务列表[ 当前未完成的任务数 <span className={"count"}>{count}</span> ]
            </h3>
            <div className={"form-group row"}>
                    <label htmlFor={"target"} className={"col-sm-2 form-label"}>目标任务</label>
                    <div className={"col-sm-10"}>
                        <input type={"text"} id={"target"} name={"target"} className={"form-control"} onKeyUp={this.keyUp}/>
                    </div>
            </div>
        </div>
    };

    keyUp = (event)=>{
        // 1)按下 enter 键获取文本框内容 去除开头结尾空格 
        if(event.keyCode === 13){
            let targetVal = event.target.value.trim();
            // 2) 获取值 把值 add 增加到<store>容器里面的状态上
            // 使用的是 dispatch 的派发任务 这里都是通过 connect 把所有的
            // dispatch 方法挂载到当前 组件 里面使用组件的 属性就可以了
            // 这个 数据要怎么样传递呢? 
            /* 
                todoReducer:{data:[{
                  id:x,
                  target:"",
                  state:0/1,[0 未完成 已经完成]  
                }]}
            */
            if(!targetVal.length){
                return;
            }
            this.props.addData({
                target: targetVal,
                state: 0,
            });
            // 自动清空input输入框
            event.target.value = "";
        };
    };

}
// 这两个函数是在代理函数里面调用的 state  和 dispatch也是 
let mapStateToProps = (state)=>{
    // 返回什么就在组件挂载什么属性 状态是按照组件来存放的
    /* 
        {
            data:[{},{}...],
            flag:"",
        }
    */
    return {
        ...state.todoReducer,
    };
};
let mapDispatchToProps = (dispatch)=>{
    // 返回什么对象就在组件里面挂载什么属性
    return {
        addData:(addDataObj)=>{
            dispatch(TodoAction.addData(addDataObj));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header); // 返回的是一个代理组件



import React from "react";
import {connect} from "react-redux";
import TodoAction from "./store/actions/todoAction.js";

class Body extends React.Component{
    constructor(props,context,updater){
        super(props,context);
    }
    /* 
        在 body 里面的视图结构就要发生改变了 根据的是 flag 来判断的
        flag 状态改变 容器状态改变 通知组件重新渲染 body 里面的数据就会重新渲染
    */
    render(){
        let {data,flag} = this.props;
        data = data.filter((item)=>{
            // 在数据库里面取到的数据都是字符串如果有需要的话会被转换为数字
            switch(flag){
                case "complete":
                    return parseInt(item.state) === 1;
                case "uncomplete":
                    return parseInt(item.state) === 0;
                default:
                    return true;
            };
        })
        return <div className={"panel-body"}>
            <ul className={"list-group"}>
                {data.map((item,index)=>{
                    return <li className={"list-group-item"} key={index}>
                        <div className={"form-group"}>
                            {/* defaultChecke 会造成 check 默认被选中 */}
                            {/* 单选框或者是复选框是onChange事件去检测状态的变化  */}
                            <input  onChange={this.updateState} type={"checkbox"} name={"task"} nid={item.id} checked={parseFloat(item.state)===1?true:false}/><span className={parseInt(item.state)===1?"complete":null}>{item.target}</span><button onClick={this.deleteTarget}className={"btn btn-danger"} nid={item.id} >删</button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    };

    // 选中复选框修改容器中任务的状态
    updateState = (event)=>{
        // 1) 根据 event.target nid 和 input 的checked 值 来确定在 在容器里面的状态应该 修改为什么
        //1.1）  获取 input 框的 checked 的状态
        let checkedState = event.target.checked ? 1:0;
        console.log(checkedState)
        // 1.2) 获取 nid 值  哪个值修改为什么样的状态
        let nid = parseInt(event.target.getAttribute("nid"));
        // console.log(nid)
        // 1.3) 根据这两个数据去修改 容器里面的数据 使用的是dispatch
        this.props.updateState({
            nid:nid,
            checkedState: checkedState,
        })
    }
    // 删除按钮删除容器中的任务
    deleteTarget = (event)=>{
        // 1) 获取任务的 nid 这样获取的是 字符串需要转义一下
        let nid = parseInt(event.target.getAttribute("nid"));
        // 2) 使用 dispatch() 去删除任务
        this.props.deleteTarget(nid);
    }

}

let mapStateToProps = (state)=>{
    return {
        ...state.todoReducer,
    };
    
}

let mapDispatchToProps = (dispatch)=>{
    return {
        updateState:(confirmWhichState)=>{
            dispatch(TodoAction.updateState(confirmWhichState));
        },
        deleteTarget:(nid)=>{
            /* 
                {
                    type:"Todo_Delete_Target",
                    nid:1
                }
            */
            dispatch(TodoAction.deleteTarget(nid))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Body); // 导出 Proxy 组件

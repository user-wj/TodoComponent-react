import * as todoTypes from "../../types/todoTypes.js";
// 这里的state 就是当当前模块的 state:{data:[] , flag:""}对象 todoReducer:{data:[] , flag:""}
export default function todoReducer(state = {
    data: [],
    flag: "all", // all complete uncomplete 
}, action) {
    // 这里是处理 todo组件里面的行为对象标识的 
    // 什么样的行为怎么样去修改 容器里面的状态信息
    // 这里的 state 不用 state={} 是因为在 combineReducers() 里面进行
    // 了数据的初始化 这里用了也没什么问题
    // 为了返回新的 state  在这里深度克隆一份 state 数据
    let deepCopyState = JSON.parse(JSON.stringify(state));
    let newData;
    switch (action.type) {
        // 这里是在处理 模块下的
        // { todoReducer:{ data:[],flag:"compalete" } } 这里是去重新覆盖
        // 原来的数据
        // 执行 Todo_Add 里面行为标识对象的修改 容器里面的状态 
        case todoTypes.Todo_Add:
            // 1)干什么事情呢? 增加任务的信息 
            /* 
                此时：在createStore 的时候执行过一次 dispatch 了
                已经初始化容器:{
                    toreducer:{
                        data:[],
                        flag:"compalete"
                    }
                }
                action:{
                    type:"xx",
                    payload:{ target:"",state:0|1 }
                }
                将数据添加到 data 里面但是还要获取一个 id 值 
            */
            let { payload } = action;
            // 在原来的data 数据里面找到最大的id 
            let id = state.data.length === 0 ? 1 : parseInt(state.data.length + 1);
            payload["id"] = id;
            // 增加到 todoReducer ={ data:[ {id:1,target:"",state:0} ],flag:"" }
            deepCopyState.data.push(payload)
            state = {
                ...deepCopyState,
            };
            break;

        case todoTypes.Todo_Filter:
            // 更新 flag 的标记
            console.log("xx")
            state = {
                ...deepCopyState,
                flag: action.flag
            }
            break;

        case todoTypes.Todo_Update_State:
            /* 
                action={
                    type:"Todo_Update_State",
                    confirmWhichState:{
                        nid:1
                        checkedState:0|1
                    }
                }
            */
            newData = state.data.map((item, index) => {
                if (parseInt(item.id) === parseInt(action.confirmWhichState.nid)) {
                    console.log("选中的那个li", action.confirmWhichState.nid);
                    console.log("选项框的状态", action.confirmWhichState.checkedState)
                    item["state"] = action.confirmWhichState.checkedState;
                    return item;
                }
                return item
            })
            state.data = newData;
            break

        case todoTypes.Todo_Delete_Target:
            /*
                action:{
                    type:"Todo_Delete_Target",
                    nid:1
                }
            */
            // 1) 通过 nid 去删除 data 数组里面对应的target 
            // 注意数组塌陷的问题
            newData = state.data.filter((item, index) => {
                if (parseInt(item.id) !== parseInt(action.nid)) {
                    return item
                }
                return false;
            });
            state.data = newData;
            console.log("state.data:", state.data)
            break;

        default:
            break;
    }
    return state;
    // reducer 是从 dispatch 函数里面的一部分漏逻辑
    // 闭包作用域不销毁的 在上一个函数里面参数上保存了下来

};
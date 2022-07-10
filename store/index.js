import { createStore } from "redux";
/* 
    redux是一个对象,里面导出

    reducer:(state:object,action:object)=>{
        action.type:
                修改容器中的信息
    }

    redux.createStore(reducer)=>{
                            dispatch: dispatch,
                            subscribe: subscribe,
                            getState: getState,
                        }
    
    redux.combinReducer() => 合并 reducer => 

*/
// reducer 这里放的是 reducer 函数 可以被拆为多个 reducer 函数 这使用的
// 是最后一个 合并的 reducer 函数 交给这个 createStore()
import reducer from "./reducer/index.js"

let store = createStore(reducer);

export default store;

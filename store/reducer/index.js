// 合并所有的 reducer 修改操作
import { combineReducers } from "redux";

import todoReducer from "./reducers/todoReducer.js"

/*
    合并的 state = {
        voteReducer:{
            title:"",
            m:0,
            n:0
        },
        personReducer:{
            name:"",
            age:0,
            address:"",
        }
    } 
*/

let reducer = combineReducers(
    {
        todoReducer: todoReducer
    }
);

export default reducer;
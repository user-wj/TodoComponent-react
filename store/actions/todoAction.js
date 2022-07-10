import { Todo_Add, Todo_Filter, Todo_Update_State, Todo_Delete_Target } from "../types/todoTypes";

// 初始化数据 最重要的是数据长什么样?
/* 
    数据结构的设计才是最重要的 做一步看一步 
    {
        
    }
*/

let TodoAction = {
    // 初始化数据用的 还不知道要走做什么操作
    addData: (addDataObj) => {
        return {
            type: Todo_Add,
            payload: addDataObj,
        };
        // 这就是 mvc 的设计结构
    },

    // 还是需要按照组件的页面结构来确定
    // 第一步还是需要先搭建页面
    filter: (flag) => {
        return {
            type: Todo_Filter,
            flag: flag,
        };
    },

    updateState(confirmWhichState) {
        return {
            type: Todo_Update_State,
            confirmWhichState: confirmWhichState,
        }
    },

    deleteTarget(nid) {
        return {
            type: Todo_Delete_Target,
            nid: nid,
        }
    }

};

export default TodoAction;
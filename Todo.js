import React from "react";
import Header from "./Header.js";
import Body from "./Body.js";
import Footer from "./Footer.js";
import "./todo.less";
// 这里是不需要在重新渲染的 没有必要使用 connect 导出 Proxy 代理组件
export default class Todo extends React.Component{
    constructor(props,context,updater){
        super(props,context);
    };
    render(){
        return <div className="panel panel-default">
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </div>
    };
};


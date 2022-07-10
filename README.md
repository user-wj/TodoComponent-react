# Todo 计划组件的使用

```jsx
    依赖：
        npm install react react-dom 
        npm install redux react-redux
        npm install less less-loader 
        npm install bootstrap@3.*
    import {Provider} from "react-redux";
    import store from "todoComponent/store/index.js";
    import Todo from "todoComponent/Todo.js"
    ReactDom.render(<main>
    <Provider store={store}>
        <Todo></Todo>
    </Provider>
    </main>)
```

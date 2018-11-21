# 深入Redux架构


## 1、关于redux

### 1.1、什么情况需要用redux？
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。多交互、多数据源场景就比较适合使用Redux。

### 1.2、设计思想
- Web 应用是一个状态机，视图与状态是一一对应的。
- 所有的状态，保存在一个对象里面。

### 1.3、Redux工作流程

![04-01](./img/react04-01.png)                              

首先，用户发出 Action。                         
`store.dispatch(action);`                               

然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。                                                    
`let nextState = todoApp(previousState, action);`


State 一旦有变化，Store 就会调用监听函数。                                 
// 设置监听函数                       
`store.subscribe(listener);`

listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。                                
```javascript
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

如果现在没理解以上流程，不要急，看完以下API就差不多能懂得Redux的核心机制了。
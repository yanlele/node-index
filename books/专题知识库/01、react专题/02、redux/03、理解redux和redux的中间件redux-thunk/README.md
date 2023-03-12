## 理解redux和redux的中间件redux-thunk

目录
- [Action的认识](#Action的认识)
- [Reducer的认识](#Reducer的认识)
- [Store的认识](#Store的认识)
- [上面三者的使用案例](#上面三者的使用案例)
- [Action创建函数](#Action创建函数)
- [redux-thunk中间件的认识](#redux-thunk中间件的认识)
- [参考文章](#参考文章)



## Action的认识
简单点说Action就是一个对象，一个必须带key为type的对象[value是自己定义的]，其他的key就根据用户自己喜好自己定义:                      
以下都是action的定义 
```
1、{type:”ADD”}
2、{type:”ADD”,key1:”“,key2:”“}
```

## Reducer的认识
别主观意识就是类似数组中的reduce，也不是只能定义reducer，它仅仅是一个称呼，纯函数，
函数名次自己随便定义都可以，但是函数的参数只能是**state与action**,
可以简单的理解为一个工厂函数，传递一个旧的state通过加工后产出一个新的state：
简单的代码如下：                    
```js
function count(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'REDUCER':
            return state - 1;
        default:
            return state;
    }
}
```
如果当state是对象的时候上面的代码是错误的:                                
redux里面规定state是不能修改的。                               
在javascript中对象是引用数据类型，当你修改了state的时候，变化前后的两个state将会指向同一个地址的，react-redux就会以为这两个相同的state，因为不会执行渲染                              
解决办法，我们用Object.assign去处理，如有不清楚Object.assign，请参考Object.assign文档                              

## Store的认识
store是一个全局对象，将action和reducer以及state联系在一起，主要职责:                                      
维护应用的state                                      
提供getState()方法获取state                                       
提供dispatch(action)方法更新state                                     
通过subscribe(方法)注册监听器                                        

## 上面三者的使用案例
```js
'use strict';
import {createStore} from 'redux';
function count(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'REDUCER':
            return state - 1;
        default:
            return state
    }
}

let store = createStore(count);

let currentValue = store.getState();
console.log('当前的值:', currentValue);

//定义一个监听的方法
let listener = () => {
    const previosValue = currentValue;
    currentValue = store.getState();
    console.log('上一个值:', previosValue, '当前值:', currentValue)
};
//创建一个监听
store.subscribe(listener);
//分发任务
store.dispatch({type:"ADD"});
store.dispatch({type:"ADD"});
store.dispatch({type:"ADD"});
store.dispatch({type:"REDUCER"});
```

## Action创建函数
上面我们说的action是一个对象，只是含有type的key的对象                           
action创建函数的意思就是创建一个action的函数，函数返回一个对象                           
```js
function add(){
    return{
        type:"ADD",
    }
}
function reducer() {
    return{
        type:"REDUCER",
    }
}
```
使用的时候直接store.dispatch(add());就可以                        

action创建函数的意义:                      
action创建函数表面是返回一个对象                             
真正的意义在于逻辑的封装                                


## redux-thunk中间件的认识
redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，
函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
```js
function add() {
    return {
        type: 'ADD',
    }
}
function addIfOdd() {
    return (dispatch, getState) => {
        const currentValue = getState();
        if (currentValue % 2 == 0) {
            return false;
        }
        //分发一个任务
        dispatch(add())
    }
}
```



## 参考文章
- [理解redux和redux的中间件redux-thunk的认识](https://blog.csdn.net/kuangshp128/article/details/67632683)

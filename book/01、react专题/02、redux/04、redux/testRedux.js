/**
 * create by yanle
 * create time 2018/12/11 下午8:30
 */

import {increment, decrement, reset, set} from "./actions/counter";

import store from './store';

// 打印状态
console.log(store.getState());

// 每次更新都会打印日志
// 这个地方store.subscribe(listener) 返回的是一个函数，用于注销监听
let unsubscribe = store.subscribe(()=> {
    console.log(store.getState());
});

// 发起action
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(set(100));
store.dispatch(reset());

unsubscribe();

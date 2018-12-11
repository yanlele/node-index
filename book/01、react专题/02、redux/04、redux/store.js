/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

import {createStore} from 'redux';
import combineReducers from './reduceres';

let store = createStore(combineReducers);

export default store;
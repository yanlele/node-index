/**
 * Reducer - index
 * 汇总
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal';
import confirmPayment from './confirm_payment';

export default combineReducers({
    modal,
    confirmPayment,
    routing: routerReducer
});

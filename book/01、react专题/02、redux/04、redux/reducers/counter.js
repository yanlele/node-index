/**
 * create by yanle
 * create time 2018/12/11 下午4:30
 */

import {
    INCREMENT,
    DECREMENT,
    RESET,
    SET
} from '../actions/counter';

/*初始化数据*/

const initState = {
    count: 0
};

/*reducer*/
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {
                count: 0
            };
        case SET:
            return {
                count: action.data
            };
        default:
            return state
    }
}
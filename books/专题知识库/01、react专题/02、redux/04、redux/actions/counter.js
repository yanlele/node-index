/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET = 'SET';

/*action mapper*/
export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function reset() {
    return {
        type: RESET
    }
}

export function set(value) {
    return {
        data: value,
        type: SET
    }
}
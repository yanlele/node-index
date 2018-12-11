/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

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
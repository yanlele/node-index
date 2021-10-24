export const UPDATE_MODAL = 'UPDATE_MODAL';
/*
 * action 创建函数
 */
export function modalUpdate(data) {
    return {
        type: UPDATE_MODAL,
        data
    };
}
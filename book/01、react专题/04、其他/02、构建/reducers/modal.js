//导入action常量
import {UPDATE_MODAL} from '../actions/modal';

//初始化state
const INIT_STATE = {
    'loading': false, // loading
    'loadingPage': false, // 加载页面
    'loadingTable': false, // 表格加载
    'loadingForm': false, // 表单加载
    'loadingModal': false, // 模态窗口加载
    'loadingButton': false, //按钮加载
    'modalTip': '', //提示信息
    'pageWarn': '', //警告信息
    'pageError': '' //错误信息
};

export default function(state = INIT_STATE, action) {
    switch (action.type) {
    case UPDATE_MODAL:
        return Object.assign({}, state, action.data);
    default:
        return state;
    }
}
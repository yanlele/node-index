export const UPDATE_CONFIRM_PAYMENT = 'UPDATE_CONFIRM_PAYMENT';
export const CLEAR_CONFIRM_PAYMENT = 'CLEAR_CONFIRM_PAYMENT';
export const UPDATE_ORDER_INFO = 'UPDATE_ORDER_INFO';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';
export const UPDATE_QUERY_COUPON = 'UPDATE_QUERY_COUPON';
export const CLEAR_QUERY_COUPON = 'CLEAR_QUERY_COUPON';
export const COMPUTE_COUPON_DISCOUNT_AMOUNT = 'COMPUTE_COUPON_DISCOUNT_AMOUNT';
export const CLEAR_COMPUTE_COUPON_DISCOUNT_AMOUNT = 'CLEAR_COMPUTE_COUPON_DISCOUNT_AMOUNT';
export const UPDATE_COMMON_STATE = 'UPDATE_COMMON_STATE';
export const CLEAR_COMMON_STATE = 'CLEAR_COMMON_STATE';
export const UPDATE_LK_LIST = 'UPDATE_LK_LIST';
export const CLEAR_LK_LIST = 'CLEAR_LK_LIST';
export const UPDATE_CHARGE_FEE = 'UPDATE_CHARGE_FEE';
export const CLEAR_CHARGE_FEE = 'CLEAR_CHARGE_FEE';

import {fetch} from '../common/api';
import {modalUpdate} from './modal';
import {rebuildCaseData} from '../common/case_tool';
import {message} from 'antd';

// 钱包扣款
export function walletPay(orderId) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('pay-way-withhold', {
            orderId
        }, 'post').then(function() {
            dispatch(modalUpdate({
                loading: false
            }));
            dispatch(fetchOrderInfo(orderId));
            message.success('钱包扣款成功');
        }).catch(function(err) {
            dispatch(modalUpdate({
                loading: false,
                pageWarn: err.message
            }));
        });
    };
}
/*actions*/
/**
 * 拉取支付明细信息
 * @param query
 */
export function getPaymentList(query) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('pay-case-list', query, 'get').then(function (res) {
            res.data.content = rebuildCaseData(res.data.content || [], true).list;
            dispatch(modalUpdate({
                loading: false
            }));
            if(res.data.content.length === 0) {
                dispatch(modalUpdate({
                    pageError: '没有支付明细信息'
                }));
            }
            if(res.status === 200) {
                dispatch(updatePayment(res.data));
            } else {
                dispatch(modalUpdate({
                    pageWarn: res.msg
                }));
            }
        }).catch(function(err) {
            dispatch(modalUpdate({
                pageWarn: err.message,
                loading: false
            }));
        });
    };
}
// 更改支付方式
export function changePayWay(data, cb) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('update-pay-way', data, 'post')
            .then(function() {
                dispatch(modalUpdate({
                    loading: false
                }));
                dispatch(fetchOrderInfo(data.copyrightOrderId));
                if(cb) {
                    cb();
                }
            }).catch(function(err) {
                dispatch(modalUpdate({
                    loading: false,
                    pageWarn: err.message
                }));
            });
    };
}
// 根据orderId获取支付单信息
export function fetchOrderInfo(orderId, cb) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('query-order-detail', {
            data: orderId
        }).then(function(res) {
            dispatch(modalUpdate({
                loading: false
            }));
            dispatch(updateOrderInfo(res.data));
            if(cb) {
                if(res.data.orderDTO && res.data.orderDTO.userId) {
                    cb([res.data.orderDTO && res.data.orderDTO.userId]);
                } else {
                    cb();
                }

            }
        }).catch(function(err) {
            dispatch(modalUpdate({
                loading: false,
                pageWarn: err.message
            }));
        });
    };
}

/**
 * 获取优惠券
 * @param query
 * @returns {Function}
 */
export function queryCoupon(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('pay-query-coupon', query, 'post').then(function(res) {
            dispatch(modalUpdate({
                loading: false
            }));
            if(res.data.length === 0 ) {
                callback();
            }
            dispatch(updateQueryCoupon(res.data));
        }).catch(function(err) {
            dispatch(modalUpdate({
                loading: false,
                pageWarn: err.message
            }));
        });
    };
}

/**
 * 获取优惠券/码 的优惠金额信息
 * @param query
 * @param type
 * @param callback
 * @returns {Function}
 */
export function getComputeCouponDiscountAmount(query, type, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        let queryPath = 'pay-compute-coupon-discount-ticket';
        if(type === 'code') {
            queryPath = 'pay-compute-coupon-discount-code';
        } else if(type === 'coupon') {
            queryPath = 'pay-compute-coupon-discount-ticket';
        }
        fetch(queryPath, query).then(function(res) {
            dispatch(modalUpdate({
                loading: false
            }));
            dispatch(updateComputeCouponDiscountAmount(res.data));
            if(type === 'code') {
                dispatch(updateCommonState({
                    isDisableCouponCodeInput: true,
                    isDisableSelect: true,
                    iprCouponCode: query.iprCouponCode,
                    discountCouponType: 2
                }));
            }
            if(type === 'coupon') {
                dispatch(updateCommonState({
                    isDisableSelect: true,
                    iprCouponCode: query.iprCouponCode,
                    discountCouponType: 1
                }));
            }
        }).catch(function(err) {
            dispatch(modalUpdate({
                loading: false
            }));
            message.error(err.message);
            callback();
        });
    };
}

/**
 * 设置优惠券，跳转下一步
 * @param query
 * @param callback
 * @returns {Function}
 */
export function setCoupon(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true,
            loadingButton: true
        }));
        fetch('pay-set-coupon', query, 'post').then(function() {
            dispatch(modalUpdate({
                loading: false,
                loadingButton: false
            }));
            callback();
        }).catch(function(err) {
            message.error(err.message);
            dispatch(modalUpdate({
                loading: false,
                loadingButton: false
            }));
        });
    };
}

/**
 * 获取领款数据
 * @param query
 * @returns {Function}
 */
export function getLKList(query) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingForm: true,
            loadingButton: true
        }));
        if(query.orderId) {
            query.payOrderId = query.orderId;
        }
        fetch('pay-get-lk-list', query, 'get').then(function(res) {
            dispatch(modalUpdate({
                loadingForm: false,
                loadingButton: false
            }));
            dispatch(updateLKList(res.data));
        }).catch(function(err) {
            message.error(err.message);
            dispatch(modalUpdate({
                loadingForm: false,
                loadingButton: false
            }));
        });
    };
}

/**
 * 领款功能action
 * @param query
 * @param callback
 * @returns {Function}
 */
export function actionLK(query, callback) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingButton: true
        }));
        fetch('pay-lk', query, 'post').then(function() {
            dispatch(modalUpdate({
                loadingButton: false
            }));
            message.success('领款成功');
            callback();
        }).catch(function(err) {
            message.error(err.message);
            dispatch(modalUpdate({
                loadingButton: false
            }));
        });
    };
}
export function offlinePay(data, cb) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loading: true
        }));
        fetch('pay-offline-pay', data, 'post')
            .then(function() {
                dispatch(modalUpdate({
                    loading: false
                }));
                dispatch(fetchOrderInfo(data.copyrightOrderId));
                if(cb) {
                    cb();
                }
            }).catch(function(err) {
                dispatch(modalUpdate({
                    loading: false,
                }));
                message.error(err.message);
            });
    };
}
/**
 * 获取领券渠道
 * @returns {Function}
 */
export function getChargeFeeList() {
    return function(dispatch) {
        fetch('pay-get-charge-fee').then(function(res) {
            dispatch(updateChargeFeeList(res.data));
        });
    };
}

/*actions mapper*/
/**
 * 更新支付明细信息
 * @param data
 * @returns {{type: string, data: *}}
 */
export function updatePayment(data) {
    return {
        type: UPDATE_CONFIRM_PAYMENT,
        data
    };
}

/*清空支付明细信息*/
export function clearPayment() {
    return {
        type: CLEAR_CONFIRM_PAYMENT
    };
}

export function updateOrderInfo(data) {
    return {
        type: UPDATE_ORDER_INFO,
        data
    };
}

export function clearOrderInfo() {
    return {
        type: CLEAR_ORDER_INFO
    };
}

/*更新获取优惠券*/
export function updateQueryCoupon(data) {
    return {
        type: UPDATE_QUERY_COUPON,
        data
    };
}

/*清空优惠券*/
export function clearQueryCoupon() {
    return {
        type: CLEAR_QUERY_COUPON
    };
}

/*获取优惠券/码 的优惠金额信息*/
export function updateComputeCouponDiscountAmount(data) {
    return {
        type: COMPUTE_COUPON_DISCOUNT_AMOUNT,
        data,
    };
}

/*清空获取到的 优惠券/码 的优惠金额信息*/
export function clearComputeCouponDiscountAmount() {
    return {
        type: CLEAR_COMPUTE_COUPON_DISCOUNT_AMOUNT
    };
}

/*更新公用状态管理*/
export function updateCommonState(data) {
    return {
        type: UPDATE_COMMON_STATE,
        data
    };
}

/*清空公用状态管理*/
export function clearCommonState() {
    return {
        type: CLEAR_COMMON_STATE
    };
}

/*获取领款列表*/
export function updateLKList(data) {
    return {
        type: UPDATE_LK_LIST,
        data
    };
}

/*清空领款列表数据*/
export function clearLKList() {
    return {
        type: CLEAR_LK_LIST
    };
}

/*获取领券渠道*/
export function updateChargeFeeList(data) {
    return {
        type: UPDATE_CHARGE_FEE,
        data
    };
}

/*清空领券渠道*/
export function clearChargeFeeList() {
    return {
        type: CLEAR_CHARGE_FEE
    };
}
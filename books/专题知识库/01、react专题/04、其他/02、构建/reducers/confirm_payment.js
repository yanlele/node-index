import {UPDATE_CONFIRM_PAYMENT,
    CLEAR_CONFIRM_PAYMENT,
    UPDATE_ORDER_INFO,
    CLEAR_ORDER_INFO,
    CLEAR_QUERY_COUPON,
    COMPUTE_COUPON_DISCOUNT_AMOUNT,
    CLEAR_COMPUTE_COUPON_DISCOUNT_AMOUNT,
    UPDATE_COMMON_STATE,
    CLEAR_COMMON_STATE,
    UPDATE_LK_LIST,
    CLEAR_LK_LIST,
    UPDATE_CHARGE_FEE,
    CLEAR_CHARGE_FEE,
    UPDATE_QUERY_COUPON} from '../actions/confirm_payment';

//初始化state
const INIT_STATE = {
    content: [],                                            //根据订单ID 分页查询未全额付款的Case列表
    page: 1,
    pageSize: 10,
    total: 0,
    detail: {},
    orderData: [],                                          //选择的支付单明细
    orderInfo: {},                                          //支付单详情
    coupon: [],                                             //优惠券
    couponDiscountAmount: {},                               //优惠券，优惠码 折扣金额对象
    commonState: {},                                        //公共的状态控制对象
    LKList: {},                                             //领款列表接口
    chargeFeeList: []                                       //领款渠道
};

export default function(state = INIT_STATE, action) {
    switch (action.type) {
    case UPDATE_CONFIRM_PAYMENT:
        return Object.assign({}, state, action.data);
    case CLEAR_CONFIRM_PAYMENT:
        return Object.assign({}, INIT_STATE);
    case UPDATE_ORDER_INFO:
        return Object.assign({}, state, {
            orderInfo: action.data
        });
    case CLEAR_ORDER_INFO:
        return Object.assign({}, state, {
            orderInfo: {}
        });
    case UPDATE_QUERY_COUPON:
        return Object.assign({}, state, {
            coupon: action.data
        });
    case CLEAR_QUERY_COUPON:
        return Object.assign({}, state, {
            coupon: []
        });
    case COMPUTE_COUPON_DISCOUNT_AMOUNT:
        return Object.assign({}, state, {
            couponDiscountAmount: action.data
        });
    case CLEAR_COMPUTE_COUPON_DISCOUNT_AMOUNT:
        return Object.assign({}, state, {
            couponDiscountAmount: {}
        });
    case UPDATE_COMMON_STATE:
        return Object.assign({}, state, {
            commonState: action.data
        });
    case CLEAR_COMMON_STATE:
        return Object.assign({}, state, {
            commonState: {}                                         //公共的状态控制对象
        });
    case UPDATE_LK_LIST:
        return Object.assign({}, state, {
            LKList: action.data
        });
    case CLEAR_LK_LIST:
        return Object.assign({}, state, {
            LKList: {}
        });
    case UPDATE_CHARGE_FEE:
        return Object.assign({}, state, {
            chargeFeeList: action.data
        });
    case CLEAR_CHARGE_FEE:
        return Object.assign({}, state, {
            chargeFeeList: []
        });
    default:
        return state;
    }
}
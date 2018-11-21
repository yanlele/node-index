//加载依赖
import React from 'react';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import {store, history} from './store';
import {modalUpdate} from './actions/modal';

// 国际化
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';

import Layout from './pages/layout.jsx'; //框架
import NotFound from './pages/not_found.jsx'; //404

function loadPage(end) {
    if(end) {
        store.dispatch(modalUpdate({
            loadingPage: false
        }));
    }else{
        store.dispatch(modalUpdate({
            loadingPage: true
        }));
    }
}

export default (
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
            <Router history={history}>
                <Route path="client" component={Layout}>
                    <IndexRoute component={NotFound} />
                    <Route path="refund" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/refund/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'refund-index');
                    }}>
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/refund/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'refund-add');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/refund/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'refund-detail');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/refund/audit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'refund-audit');
                        }} />
                    </Route>
                    <Route path="compensate" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/compensate/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'compensate-index');
                    }}>
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/compensate/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'compensate-add');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/compensate/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'compensate-detail');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/compensate/audit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'compensate-audit');
                        }} />
                    </Route>
                    <Route path="deduct" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/deduct/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'deduct-index');
                    }}>
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-add');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-detail');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct/audit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-audit');
                        }} />
                    </Route>
                    <Route path="deduct-refund" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/deduct_refund/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'deduct-refund-index');
                    }}>
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct_refund/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-refund-add');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct_refund/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-refund-detail');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/deduct_refund/audit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'deduct-refund-audit');
                        }} />
                    </Route>
                    <Route path="cost-deduct" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/cost_deduct/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'cost-deduct-index');
                    }}>
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/cost_deduct/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'cost-deduct-add');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/cost_deduct/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'cost-deduct-detail');
                        }} />
                        <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/cost_deduct/audit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'cost-deduct-audit');
                        }} />
                    </Route>
                    <Route path="case">
                        <Route path="declare" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/case/declare/index.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'case-declare');
                        }} />
                        <Route path="follow" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/case/follow/index.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'case-follow');
                        }} />
                        <Route path="declare-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/case/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'case-declare-detail');
                        }} />
                    </Route>
                    <Route path="invoice" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/invoice/index.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'invoice-index');
                    }} >
                        <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/invoice/add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'invoice-add');
                        }}>
                            <Route path="step" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent = require('./pages/invoice/add/step.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                }, 'invoice-add-step');
                            }} />
                        </Route>
                        <Route path="pre-apply">
                            <Route path="add" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent = require('./pages/invoice/pre_apply/add.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                }, 'invoice-pre-apply-add');
                            }} />
                            <Route path="audit" getIndexRoute={(partialNextState, callback)=>{
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent = require('./pages/invoice/pre_apply/audit.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        component: loadComponent.default
                                    });
                                }, 'invoice-pre-apply-audit');
                            }} />
                        </Route>
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/invoice/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'invoice-detail');
                        }} />
                    </Route>
                    <Route path="pay">
                        <Route path="confirm-payment" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/confirm_payment.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-confirm-payment');
                        }} />
                        <Route path="order-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/order_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-order-detail');
                        }} />
                        <Route path="order-list" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/order_list.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-order-list');
                        }} />
                        <Route path="select-mode" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/select_pay_mode.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-select-mode');
                        }} />
                        <Route path="set-discount" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/set_discount.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-set-discount');
                        }} />
                        <Route path="online-lk-payment" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/pay/online_lk_payment.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'pay-online-lk-payment');
                        }} />
                    </Route>
                    <Route path="transfer-manage">
                        <Route path="source" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/transfer_manage/apply_source.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'transfer-manage-source');
                        }} />
                        <Route path="account-apply" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/transfer_manage/confirm_transfer_account_apply.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'transfer-manage-account-apply');
                        }} />
                        <Route path="account-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/transfer_manage/confirm_transfer_account_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'transfer-manage-account-detail');
                        }} />
                        <Route path="set-account" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/transfer_manage/set_account.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'transfer-manage-set-account');
                        }} />
                        <Route path="account-ledger" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/transfer_manage/account_ledger.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'transfer-manage-account-ledger');
                        }} />
                    </Route>
                    <Route path="account-manage" getIndexRoute={(partialNextState, callback)=>{
                        loadPage();
                        require.ensure([], function (require) {
                            let loadComponent = require('./pages/account_manage.jsx');
                            loadPage(true);
                            callback(null, {
                                component: loadComponent.default
                            });
                        }, 'account-manage');
                    }} />
                    <Route path="send-datum">
                        <Route path="article" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/send_datum/article.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'send-datum-article');
                        }} />
                        <Route path="edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/send_datum/edit_information.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'send-datum-edit');
                        }} />
                        <Route path="list" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/send_datum/datum_list.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'send-datum-list');
                        }} />
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/send_datum/datum_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'send-datum-detail');
                        }} />
                        <Route path="mail-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/send_datum/mail_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'send-datum-mail-detail');
                        }} />
                    </Route>
                    <Route path="finance">
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/finance/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'finance-detail');
                        }} />
                    </Route>
                    <Route path="seller-supplier">
                        <Route path="detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/seller-supplier/detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'seller-supplier-detail');
                        }} />
                    </Route>
                    {/*【财务系统】增加报销结算功能相关页面*/}
                    <Route path="reimbursement">
                        <Route path="invoice-list" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/invoice_list.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement');
                        }} />
                        <Route path="invoice-edit" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/invoice_edit.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement');
                        }} />
                        <Route path="invoice-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/invoice_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement');
                        }} />
                        <Route path="invoice-add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/invoice_add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement');
                        }} />
                        <Route path="settlement-detail" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/settlement_detail.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement-detail');
                        }} />
                        <Route path="settlement-list" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/settlement_apply_list.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement-list');
                        }} />
                        <Route path="settlement-add" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/settlement_add.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement-add');
                        }} />
                        <Route path="settlement-return" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/reimbursement/settlement_return_pay.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'reimbursement-settlement-return');
                        }} />
                    </Route>

                    {/*IPR放款管理*/}
                    <Route path="loan-manage">
                        {/*放款账户配置*/}
                        <Route path="account" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/loan_manage/account_ledger.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'loan-manage-account');
                        }} />
                        {/*放款申请类型管理*/}
                        <Route path="apply-category" getIndexRoute={(partialNextState, callback)=>{
                            loadPage();
                            require.ensure([], function (require) {
                                let loadComponent = require('./pages/loan_manage/apply_category.jsx');
                                loadPage(true);
                                callback(null, {
                                    component: loadComponent.default
                                });
                            }, 'loan-manage-apply-category');
                        }} />
                    </Route>
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        </Provider>
    </LocaleProvider>
);
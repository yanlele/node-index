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
                    </Route>
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        </Provider>
    </LocaleProvider>
);
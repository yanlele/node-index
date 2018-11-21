import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import reducer from './reducers/';

//载入redux debug插件
function configureStore(initialState) {
    let debugMiddlewareStore = createStoreWithMiddleware(reducer, initialState, 
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );
    return debugMiddlewareStore;
}

//创建历史中间件
const middleware = routerMiddleware(browserHistory);
//插入中间件
let createStoreWithMiddleware = applyMiddleware(
    thunk,
    middleware
)(createStore);

let store;
if(process.env.NODE_ENV === 'production') {
    store = createStoreWithMiddleware(reducer, {});
}
else{
    // Store
    store = configureStore({});
}

// Sync dispatched route actions to the history
const history = syncHistoryWithStore(browserHistory, store);

exports.store = store;
exports.history = history;
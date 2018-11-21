//加载依赖
import ReactDOM from 'react-dom';
//加载页面
import appRouter from './router.jsx'; // 载入路由

import {setTimeDiff} from './common/tool';

setTimeDiff(document.getElementById('app').getAttribute('data-date'));

//创建路由
ReactDOM.render(
    appRouter,
    document.getElementById('app')
);
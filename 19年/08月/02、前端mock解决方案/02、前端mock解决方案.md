## 前端mock解决方案

### 简要概述
基于前后端分离的模式， 首先要跟后端同学约定数据结构以及字段名称。然后后端开发接口， 前端通过mock 伪造数据 开发客户端功能。并行开发任务




### 1、利用jsonServer启动mock


### 2、利用dyson启动服务


### 3、利用webpack 插件启动mock 服务

#### 安装依赖
`npm install webpack-api-mocker2 --save-dev / yarn install webpack-api-mocker2 --dev`


#### 配置和启动
webpack.config.js                   
```js
const path = require('path');
const ApiMocker = require('webpack-api-mocker2');

const paths = require('./paths');
const baseConfig = require('./webpack.config.base.js');
const mockPath = path.resolve(__dirname, '../mock');  // 指向 mock 文件的地址 

module.exports = merge(baseConfig, {
  // ...
  devServer: {
    before(app) {
      ApiMocker(app, mockPath);
    },
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
        logLevel: 'debug',
      },
    },
    clientLogLevel: 'error',
    port: 3001,
    contentBase: paths.PATH_DIST,
    inline: true,
    hot: false,
    open: false,
    // host: '0.0.0.0',
    disableHostCheck: true,
    progress: true,
    historyApiFallback: true,
    // https: true,
  },
});
```

mock.js                     
```js
const indexMock = require('./mock/index');

module.exports = {
  ...indexMock,
};
```

mock/index.js
```js
module.exports = {
  'GET /api/paper': {
    data: {
      id: 11,
    },
    time: null,
    message: '',
    status: 0,
  },

  'POST /api/users': function (req, res) {
    console.warn('post record:=========================');
    console.warn(req.body);
    res.json({
      data: {
        id: 14,
      },
      time: null,
      message: '',
      status: 0,
    });
  },
}
```

跟随 `webpack-dev-server` 启动之后就可以通过域名访问了。 

**优点**： 方便， 介入快，无需代理




## 前端mock解决方案

### 简要概述
基于前后端分离的模式， 首先要跟后端同学约定数据结构以及字段名称。然后后端开发接口， 前端通过mock 伪造数据 开发客户端功能。并行开发任务


### 1、利用jsonServer启动mock

#### 安装依赖
`npm install json-server --save-dev / yarn add json-server --dev`


#### 配置和启动
```json
{
    "mock": "json-server mock/mock.js --watch --port 8090",
    "mockdev": "npm run mock & npm run dev"
}
```

mock/mock.js
```js
let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function () {
    let data = {};
    data.user = {
        'name': Random.cname(),
        'intro': Random.word(20)
    };
    data.userInfo = {
        status: 200,
        success: true,
        msg: '请求成功',
        data: {
            'name': 'yanle',
            age: 25,
            info: '2312323rffdvdfv'
        }
    };
    return data;
};
```

**优点**：最为简单
**缺点**：灵活性太差了


### 2、利用dyson启动服务


### 3、利用webpack 插件启动mock 服务

#### 安装依赖
`npm install webpack-api-mocker2 --save-dev / yarn add webpack-api-mocker2 --dev`


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




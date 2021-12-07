# 大型服务端项目测试和UT覆盖示例

## 所需要的模块
- [supertest: 包裹一下请求，可以给请求设置和拦截一些额外的参数，让测试更加多元化](https://github.com/visionmedia/supertest)
- [mocha: 著名的测试模块](https://github.com/mochajs/mocha)
- [istanbul: 测试覆盖模块](https://github.com/gotwarlost/istanbul)
- [power-assert: 断言模块](https://github.com/power-assert-js/power-assert)
- [intelli-espower-loader: 断言增强模块](https://github.com/power-assert-js/intelli-espower-loader)
- [nock: 可以连接网络请求数据的模块](https://github.com/node-nock/nock)

## 具体使用方式
- 1、关于主入口mocha的使用
```javascript
    'use strict';
    const path = require('path');
    const nock = require('nock');
    const request = require('supertest');
    const express = require('express');
    const app = express();
    const assert = require('power-assert');
    nock.enableNetConnect(); // 允许真实的网络连接
    
    const apiTest = require('./api/');
    
    describe('#CommonTest', function () {
        let client;
        before(function (done) {
            this.timeout(200000);
            client = request(app);
        });
    
        apiTest();
    });
```

- 2、具体测试用例的写法
```javascript
    'use strict';
    const path = require('path');
    const nock = require('nock');
    const request = require('supertest');
    const express = require('express');
    const app = express();
    const assert = require('power-assert');
    nock.enableNetConnect(); // 允许真实的网络连接
    
    module.exports = function () {
        describe('action', function () {
            let client;
            before(function () {
                client = request(app);
                assert(client);
            });
            it('action has referer and params', function (done) {
                client.get('/api/action?chanceGroupId=123456&occurrenceTime=teseData&serviceId=123456')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .set('referer', 'zbjdev.com')
                    .expect(function (res) {
                        assert(res);
                    })
                    .end(function (err) {
                        done(err);
                    });
            });
            it('action has no referer', function (done) {
                client.get('/api/action?chanceGroupId=123456&occurrenceTime=teseData&serviceId=123456')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .expect(function (res) {
                        assert(res);
                    })
                    .end(function (err) {
                        done(err);
                    });
            });
            it('action has no params', function (done) {
                client.get('/api/action')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .set('referer', 'zbjdev.com')
                    .expect(function (res) {
                        assert(res);
                    })
                    .end(function (err) {
                        done(err);
                    });
            });
    
    
            it('getAction has referer and params', function (done) {
                client.get('/api/action/all?data=123456')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .set('referer', 'zbjdev.com')
                    .expect(function(res) {
                        assert(res.body.data);
                    })
                    .end(function(err) {
                        done(err);
                    });
            });
            it('getAction has no referer', function (done) {
                client.get('/api/action/all?data=123456')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .expect(function(res) {
                        assert(res.body);
                    })
                    .end(function(err) {
                        done(err);
                    });
            });
            it('getAction has no referer params', function (done) {
                client.get('/api/action/all')
                    .set('X-Requested-With', 'XMLHttpRequest')
                    .set('Accept', 'application/json')
                    .set('referer', 'zbjdev.com')
                    .expect(function(res) {
                        assert(res.body);
                    })
                    .end(function(err) {
                        done(err);
                    });
            });
        });
    };
```

- 3、其他相关的具体示例，请见本项目示例文件

- 4、关于package.json的script配置
```javascript
  "scripts": {
    "start": "node www",
    "test": "node ./node_modules/mocha/bin/mocha",
    "test-cov": "node ./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha"
  }
```
或者也可以参见：[基础单元测试](/books/知识库/03、Node技术知识/06、单元测试/README.md)

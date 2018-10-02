# koa连接redis做缓存

## 正确示范
```javascript
const koa = require('koa');
const app = new koa();
const onError = require('koa-onerror');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const config = require('./config');

const routing = require('./routers/index');
const THIRTY_MINTUES =12 * 60 * 60 * 1000;
// 处理错误
onError(app);


const redisConfig = {
    port: config.redis.PORT,
    host: config.redis.HOST,
    db: config.redis.DB,
    ttl: THIRTY_MINTUES               // 失效时间
};

// 配置session 中间件
app.keys = ['keys', 'keyskeys'];            // redis cookies 签名，必须要
app.use(session({
    store: redisStore(redisConfig)
}));


// 装在路由
routing(app);

module.exports = app;
```



## 使用示范
```javascript
class TestController {
    static async setSession(ctx) {
        let session = ctx.session;
        // let session = this.session;
        let test = {
            name: 'yanle',
            age: 26
        };
        session.setSession = test;
        return ctx.body = {
            message: '成功'
        }
    }


    static async getSession(ctx) {
        let session = ctx.session;
        return ctx.body = session;
    }
}
module.export = TestController;
```


## 参数说明

After adding session middleware, you can use `this.session` to set or get the sessions.

Setting `this.session = null`; will destroy this session.

Altering `this.session.cookie` changes the cookie options of this user. Also you can use the cookie options in session the store. Use for example cookie.maxAge as the session store's ttl.

Calling `this.regenerateSession` will destroy any existing session and generate a new, empty one in its place. The new session will have a different ID.

Setting `this.sessionSave = true` will force saving the session regardless of any other options or conditions.

Setting `this.sessionSave = false` will prevent saving the session regardless of any other options or conditions.



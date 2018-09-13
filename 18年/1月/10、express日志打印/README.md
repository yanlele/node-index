# express 日志

主要是用  [express-winston](https://github.com/bithavoc/express-winston) 模块实现的              

```javascript
    const expressWinstom=require('express-winston');

    //正常请求日志
    app.use(expressWinstom.logger({
        transports:[
            new (winston.transports.Console)({
                json:true,
                colorize:true
            }),
            new winston.transports.File({
                filename:'logs/success.log'
            })
        ]
    }));
    //调用路由
    routes(app);
    //错误请求日志
    app.use(expressWinstom.errorLogger({
        transports:[
            new winston.transports.Console({
                json:true,
                colorize:true
            }),
            new winston.transports.File({
                filename:'logs/error.log'
            })
        ]
    }));

```
# express装载路由的方式

### 1、建立一个routes文件夹，定义一个index.js的后端路由主入口
```javascript
    module.exports=function(app){
        app.get('/',function(req,res){
            res.redirect('/posts')
        });
    
        app.use('/signup',require('./signup'));
        app.use('/signin',require('./signin'));
        app.use('/signout',require('./signout'));
        app.use('/posts',require('./posts'));
        app.use('/comments',require('./comments'));
        app.use(function(req,res){
            if(!res.headersSent){
                res.status(404).render('404')
            }
        })
    };
```

### 2、在app.js中导入路由的使用方式
```javascript
    const routes=require('./routes');
    
    //调用路由
    routes(app);
```
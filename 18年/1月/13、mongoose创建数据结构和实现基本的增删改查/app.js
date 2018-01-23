var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var test = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));//这里是设置publi为静态目录（可以修改的！）

//我们可以通过新添加一个静态目录来存放我们的前端资源文件
app.use(express.static(path.join(__dirname, 'views')));

//登录拦截
app.use(function (req, res, next) {
  if (req.cookies.userId) {
    //有userId,说明用户 已经登录，放行即可
    next();
  } else {
    /*
     放行登录和登出接口,以及商品列表接口
     req.originalUrl是截取的整个url,所以在拦截'/goods'的时候，需要使用一些其他的办法
     req.path  可以拿到我们的请求路径，而且可以不管参数等内容
     * */
    // console.log(req.path);
    // console.log(req.originalUrl);
    if (req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.path === '/goods/list') {
      next();
    } else {
      //拦截其余的所有接口
      res.json({
        status: '10001',
        message: '当前未登录',
        result: ''
      })
    }
  }
});


/*这个地方配置路由*/
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*
前台控制路由
2016年6月16日10:14:37,张维金
QQ:452076103
 */
var express = require('express');
var router = express.Router();
var ut = require('../utils/common.js');
var Users = require('../models/users');
var Microblog = require('../models/microblog');
var socket_io = require('socket.io');

// 所有/before下的页面请求拦截的路由
router.use(function (req, res, next) {
    req.users = req.session.users;
    next();
});

/*
* 首页做了两件事儿
* 1、到了首页之后查询博客留言的内容
* 2、查看注册用户数
* 然后渲染到页面上去
* */
router.get('/index', function (req, res, next) {
    console.log('首页');
    //console.log(req.session.users);
    Microblog.fetch(function (err, microblogs) {
        if (err) {
            console.log(err)
            return;
        }

        Users.count(function (err, result) {
            if (err) {
                console.log(err)
                return;
            }
            req.num = result;
            req.microblogs = microblogs;
            res.render('index', req);
        });
    })
});

/*注册页面*/
router.get('/reg', function (req, res, next) {
    console.log('注册页');
    res.render('reg', req);
});

/*登陆页面*/
router.get('/login', function (req, res, next) {
    console.log('登录页');
    res.render('login', req);
});

/*退出
* 删除session
* */
router.get('/logout', function (req, res, next) {
    console.log('退出');
    //删除session
    delete req.session.users;
    res.redirect('/before/login');
});

/*注册验证*/
router.post('/reg', function (req, res, next) {
    console.log('注册验证,并响应!');

    //获取请求入参信息
    var b = req.body;
    var _users = {
        username: b.username,
        password: b.password,
        name: b.name,
        createDate: ut.now(),
        random: new Date().getTime() % 10
    };

    //在User中查找所有符合的信息
    Users.find({username: _users.username}, function (err, users) {
        if (err) {
            console.log(err);
            return ut.redirectBack(res, '提交出错');
        }

        //如果查找到了如何用户信息之后返回用户已经存在
        if (users.length > 0) {
            console.log('注册时根据username查询:' + users);
            ut.redirectBack(res, '用户名已存在');
        } else {
            //如果没有重复的username,创建Users对象
            var users = new Users(_users);
            //数据入库
            users.save(function (err, users) {
                if (err) {
                    console.log(err)
                    return ut.redirectBack(res, '提交出错');
                }

                //数据入mongodb 缓存session信息
                req.session.users = users;
                res.redirect('/before/index');
            })

        }
    });
});

/*登陆验证*/
router.post('/login', function (req, res, next) {
    console.log('登陆验证,并响应!');
    var _users = {
        username: req.body.username,
        password: req.body.password
    };
    Users.findOne({username: _users.username, password: _users.password}, function (err, users) {
        if (err) {
            console.log(err);
        }

        if (!users) {
            ut.redirectBack(res, '用户名或密码错误');
        } else {
            //用户登录成功之后更新信息
            req.session.users = users;

            res.redirect('/before/index');
        }

    })
});

/*发布微博*/
router.post('/release', function (req, res, next) {
    console.log('发布微博');
    let ret = {};
    //获取链接信息
    const connect = req.body.connect;
    //从数据库中获取用户session 信息
    let s = req.session.users;
    //如果链接socket失败，给用户一个null 的回复
    if (!connect) {
        ret.result = 'null';
        res.json(ret);
    } else {
        //链接socket成功,创建入库对象
        const _microblog = {
            connect: connect,
            createDate: ut.now(),
            userid: s._id
        };
        //建立数据模型
        const microblog = new Microblog(_microblog);
        //数据入库
        microblog.save(function (err, microblog) {
            if (err) {
                //如果入库失败，给用户一个no提示;
                console.log(err);
                ret.result = 'no';
                res.json(ret);
                return;
            }
            //入库成功，给用户一个OK的提示
            ret.result = 'ok';
            res.json(ret);
        })
    }
});

//socket.io
//简历socket链接的对象方法，抛出到app.js中使用
router.prepareSocketIO = function (server) {
    //把socket服务嫁接到app.js上
    const io = socket_io.listen(server);
    //链接socket
    io.sockets.on('connection', function (socket) {
        //出发socket
        socket.on('click', function () {
            //在数据库中找所有博客的数据信息
            Microblog.fetch(function (err, microblogs) {
                if (err) {
                    console.log(err);
                    return;
                }
                //推送给客户端
                socket.emit('microblog', {microblogs: microblogs});
                //全局广播给客户端
                socket.broadcast.emit('microblog', {microblogs: microblogs});
            })
        })
    })
};

module.exports = router;

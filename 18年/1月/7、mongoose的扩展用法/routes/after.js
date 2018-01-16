/*
后台控制路由
2016年6月16日10:15:02,张维金
QQ:452076103
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var ut = require('../utils/common.js');
var appCfg = require('../app.config.js');

//node后端使用jquery
var cheerio = require('cheerio');

//上传图片组件
var multer = require('multer');
var upload = multer({dest: 'uploads/tmp/'});

var Users=require('../models/users');
var Microblog=require('../models/microblog');

// 所有/after下的页面请求拦截的路由
router.use(function (req, res, next) {
	req.users = req.session.users;
	//console.log(req.users);
	//登陆权限验证,如果没登陆就跳转到登录页
	if (req.users) {
  	next();
	}else{
		res.redirect('../before/login');
	}
});

/*个人信息页面*/
router.get('/info',function(req, res, next){
	console.log('个人信息页');
	res.render('info',req);
});

/*发邮件页面*/
router.get('/mailer',function(req, res, next){
	console.log('发邮件页');
	res.render('mailer',req);
});

/*爬虫页面*/
/*superagent模块封装了http模块更优雅*/
router.get('/cheerio',function(req, res, next){
	console.log('爬虫页');
	res.render('cheerio',req);
});

/*个人信息提交, 上传图片*/
//multer1.1.0版本只能在路由里使用,不能再当中间件使用
router.post('/info', upload.single('headPicture'), function(req, res, next){
	console.log(`个人信息提交`);
	var b = req.body;
  
  if (!b.name) {
    return ut.redirectBack(res, '兄弟,你的大名呢');
  }

  var whereObj = {_id: req.users._id};
  var updateObj = {name: b.name};

  if (req.file) {
    updateObj = {name: b.name,headPicture: `/uploads/tmp/${req.file.filename}`};
  }

  Users.update(whereObj, updateObj, function(err, result){
    if (err) {
      return ut.redirectBack(res, '提交出错');
    }
    ut.redirectPageMsg(res, '修改成功,请重新登陆获取最新资料', '/before/logout');
  });
});

/*发邮件*/
router.post('/mailer',  function(req, res, next){
	console.log(`发邮件`);
	var b = req.body;
	//由于发送邮件涉及个人账号授权码问题,源码里注释掉
	/*ut.sendMail(b.mailer,b.connect,function(err,result){
    if (err) {
      console.log(err);
      return ut.redirectBack(res, '提交出错');
    }
    ut.redirectPageMsg(res, '发送成功', '/after/mailer');
	});*/
});

/*开始爬虫百度首页*/
router.post('/cheerio', function(req, res, next){
	console.log(`开始爬虫1`);
	var uri = `http://www.baidu.com`;

  //真假百度
  req.truewww = req.body.truewww;

	http.get(uri, function (result) {
    var data = '';

    result.setEncoding('utf8');

    result.on('data', function (chunk) {
      data += chunk;
    });

    result.on('end', function () {
      //这里处理data
      var $ = cheerio.load(data);

      //百度logo
      var baiduPicture = $("#lg img").attr("src");
      console.log(baiduPicture);

      req.data = data;
      res.render('baidu', req);
    });

  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });

});

/*开始爬虫IP--腾讯IP分享网*/
router.post('/cheerioIP', function(req, res, next){
	console.log(`开始爬虫2`);
	var uri = `http://ip.qq.com/`;


	http.get(uri, function (result) {
    var data = '';
    //这个网站编码是gbk2312,需要转码,有兴趣的朋友可以试试 需要 iconv-lite 模块
    //result.setEncoding('utf8');

    result.on('data', function (chunk) {
      data += chunk;
    });

    result.on('end', function () {
      //这里处理data
      var $ = cheerio.load(data);

      //获取IP
      var IP = $("#login_show span").text();
      console.log(`您当前的IP为∶${IP}`);
      
      req.data = `您当前的IP为∶${IP}`;

      res.render('baidu', req);
    });

  }).on('error', function (e) {
    console.log("Got error: " + e.message);
  });

});

/*下载页面*/
router.get('/download',  function(req, res, next){
  console.log(`下载页面`);
  res.render('download', req);
});

/*下载*/
router.get('/down',  function(req, res, next){
  console.log(`开始下载`);
  var q = req.query;
  
  if (new Date().getTime()%10 < 5) {
    //相对路径
    res.download(`public/images/${q.d}.jpg`);
  }else{
    //绝对路径
    res.download(`${appCfg.dir_root}/public/images/${q.d}.jpg`);
  }

});

/*假百度*/
router.get('/s',  function(req, res, next){
	console.log(`哈哈哈,其实这是假的`);
  var q = req.query;
  res.send(`哈哈哈,想搜索 <span style="color:red">${q.wd}</span> ? 其实这是假的,真百度 : <a href="http://www.baidu.com">点击这里</a>`);
});

module.exports = router;

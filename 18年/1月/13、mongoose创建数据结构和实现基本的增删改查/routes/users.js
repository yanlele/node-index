var express = require('express');
var router = express.Router();
require('./../util/util');
var User = require('./../models/user');
var url=require('url');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * 登录逻辑
 * 入参：
 * userName
 * userPwd
 */
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param, function (err, doc) {
    if (err) {
      res.status(200).json({
        status: '1',
        message: err.message
      })
    } else {
      if (doc) {
        //保存到cookie
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });

        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //用户信息保存到session
        // req.session.user=doc;

        res.status(200).json({
          status: '0',
          message: '登录成功',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '登录失败，用户名或者密码输入失误'
        })
      }
    }
  })
});

/**
 * 登出功能
 */
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });

  res.status(200).json({
    status: '0',
    message: '登出成功'
  })
});

/*
 * 登录校验
 * */
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.status(200).json({
      status: '0',
      message: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    res.status(200).json({
      status: '1',
      message: '未登录',
      result: ''
    })
  }
});

/*购物车信息加载
 *
 * */
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '查询购物车列表成功',
          result: doc.cartList
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '没有商品加入购物车',
          result: ''
        })
      }
    }
  })
});

/*购物车删除功能*/
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId;
  User.update({userId: userId}, {
    //$pull是删除的功能
    $pull: {
      'cartList': {
        productId: productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '删除成功',
          result: ''
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '商品不存在',
          result: ''
        })
      }
    }
  })
});


/*控制购物车的修改
* 入参
* productId
* productNum
* */
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked=req.body.checked;
  //修改数据库信息的操作方法
  User.update({
    "userId":userId,
    "cartList.productId":productId
  },{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function(err,doc){
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '更新成功',
          result: ''
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '更新失败',
          result: ''
        })
      }
    }
  })
});

/*购物车全选功能
* 入参：
* checkAll
* */
router.post("/editCheckAll", function (req,res,next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId:userId}, function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1,message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        })
      }
    }
  });
});

/*查询地址接口*/
router.get('/addressList',function(req,res,next){
  let userId=req.cookies.userId;
  User.findOne({
    userId:userId
  },function(err,doc){
    if(err){
      res.status(200).json(err.message)
    }else{
      res.status(200).json({
        status:'0',
        message:'查询地址成功',
        result:doc.addressList
      })
    }
  })
});

/*设置默认地址
* 入参
* addressId
* */
router.post('/setDefault',function(req,res,next){
  var userId=req.cookies.userId;
  var addressId=req.body.addressId;

  if(!addressId){
    res.status(200).json({
      status:'1003',
      message:'没有 addressId'
    })
  }

  User.findOne({
    userId:userId
  },function(err,doc){
    if(err){
      res.status(200).json(err.message);
    }else{
      var addressList=doc.addressList;
      addressList.forEach((item)=>{
        if(item.addressId===addressId){
          item.isDefault=true;
        }else{
          item.isDefault=false;
        }
      });

      doc.save(function(err1,doc1){
        if(err){
          res.status(200).json(err.message);
        }else{
          res.status(200).json({
            status:'0',
            message:'保存成功',
            result:''
          })
        }
      })
    }
  })
});

/*删除地址接口*/
router.post('/delAddress',function(req,res,next){
  let userId=req.cookies.userId;
  let addressId=req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      addressList:{
        addressId:addressId
      }
    }
  },function(err,doc){
    if(err){
      res.status(500).json(err.message)
    }else{
      res.status(200).json({
        status:'0',
        message:'删除成功',
        result:''
      })
    }
  })
});

/*生成订单*/
router.post('/payMent',function(req,res,next){
  var userId=req.cookies.userId;
  var orderTotal=req.body.orderTotal;
  var addressId=req.body.addressId;
  User.findOne({
    userId:userId
  },function(err,doc){
    if(err){
      res.status(500).json(err.message)
    }else{
      let address='',
        goodsList=[];
      //获取当前用户的地址信息
      doc.addressList.forEach((item,index)=>{
        if(addressId===item.addressId){
          address=item;
        }
      });

      //获取用户购物车中的商品
      doc.cartList.filter((item)=>{
        if(item.checked==='1'){
          goodsList.push(item)
        }
      });

      //创建订单
      var platform='119';
      var r1=Math.floor(Math.random()*10);
      var r2=Math.floor(Math.random()*10);

      var sysDate=new Date().Format('yyyyMMddhhmmss');
      var createDate=new Date().Format('yyyy-MM-dd hh:mm:ss');
      var orderId=platform+r1+sysDate+r2;

      let order={
        orderId:orderId,
        orderTotal:orderTotal,
        addressInfo:address,
        goodsList:goodsList,
        orderStatus:'1',
        createDate:''
      };
      doc.orderList.push(order);
      doc.save(function(err1,doc1){
        if(err1){
          res.status(500).json(err1.message)
        }else{
          res.status(200).json({
            status:'0',
            message:'下单成功',
            result:{
              orderId:order.orderId,
              orderTotal:orderTotal
            }
          })
        }
      });


    }
  })
});

/*根据订单ID来查询订单详情*/
router.get('/orderDetail',function(req,res,next){
  var userId=req.cookies.userId;
  var orderId=req.param('orderId');
  User.findOne({
    userId:userId
  },function(err,userInfo){
    if(err){
      res.status(200).json(err.message)
    }else{
      if(userInfo){
        var orderList=userInfo.orderList;
        if(orderList.length>0){
          var orderTotal=0;
          orderList.forEach((item,index)=>{
            if(item.orderId===orderId){
              orderTotal=item.orderTotal;
            }
          });

          if(orderTotal>0){
            res.status(200).json({
              status:'0',
              message:'返回成功',
              result:{
                orderId:orderId,
                orderTotal:orderTotal
              }
            })
          }else{
            res.status(200).json({
              status:'120002',
              message:'没有订单信息',
              result:''
            })
          }
        }else{
          res.status(200).json({
            status:'120001',
            message:'没有订单信息',
            result:''
          })
        }
      }
    }
  })
});




module.exports = router;

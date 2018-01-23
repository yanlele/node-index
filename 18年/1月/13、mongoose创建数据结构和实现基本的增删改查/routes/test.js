var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');


/*
 * 测试增删改查功能
 * 首先第一点，就是对应表结构的时候，一定要严格来定义
 * */
/*
 * 第一个功能插入数据库(增加数据库):Schema实例化一个对应数据库的对象
 * 增加数据库有两个方法，一个save(),另外一个是create()方法
 * 支持内部回调，内部回调分别是err,doc，
 * 外部promise回调的参数分别是doc,len,err
 * 这两个方法的区别是，save是，如果没有，创建新的对象集合，如果有，就覆盖旧的对象集合
 * create()不管有没有旧的对象集合，都创建新的对象集合（可能会出现很多相同的对象集合）
 * 具体情况分业务场景来定！
 * */
let lele = mongoose.model('lele', {
  result: {
    size: Number,
    address: {}
  }
});

let le = new lele({
  result: {
    size: 15,
    address: {
      detail: '北京',
      name: 'yanle'
    }
  }
});
router.get('/create', (req, res, next) => {
  //第一个参数是结果，第二个参数是返回影响数据条数，第三个参数是异常
  /*    le.save().then((doc, len,err)=>{
   console.log(`result :${doc}`);
   console.log(`err: ${err}`);
   console.log(`three : ${len}`);

   res.status(200).json(doc);
   });*/

  //第一个参数是异常，第二个参数是结果，第三个参数是印象条数
  /*  le.save((err, doc, len) => {
   console.log(`result :${doc}`);
   console.log(`err: ${err}`);
   console.log(`three : ${len}`);

   res.status(200).json(doc);
   })*/


  /*    lele.create({
   result: {
   size: 16,
   address: '北京'
   }
   }).then((doc,len,err)=>{
   console.log(`result :${doc}`);
   console.log(`err: ${err}`);
   console.log(`three : ${len}`);
   res.status(200).json(doc);
   });*/

  lele.create({
    result: {
      size: 16,
      address: {
        detail: '重庆'
      },
      name: 'yanle'
    }
  }, (err, doc, len) => {
    console.log(`result :${doc}`);
    console.log(`err: ${err}`);
    console.log(`three : ${len}`);
    res.status(200).json(doc);
  })
});

/*修改
 *
 * */
//这种办法实际上只能修改一个数据!  updateMany就可以批量修改了
router.get('/update', (req, res, next) => {
  lele.updateMany({
    'result.size':16
    }, {
    $set: {
      'result.address': '不告诉你！！！！'
    }}, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        console.log(err);
        res.status(200).json(doc)
      }
    })
});

/*查询*/
router.get('/find',function(req,res,next){
  lele.find({
    'result.size':16
  },(err,data)=>{
    res.status(200).json(data);
  })
});

/*删除操作*/
router.get('/delete',(req,res,next)=>{
  lele.remove({
    'result.size':16
  },(err,doc)=>{
    console.log(err);
    console.log(doc);
    res.status(200).json(doc)
  })
});



/**
 * 这里留下了一个非常坑的代码纠正逻辑
 * 使用findOne({param},(err,data)={})  这种方式中的err是返回的异常，如果数据库中没有查询到数据，要对data进行校验
 */
router.get('/test', function (req, res, next) {
  let param = {
    userName: 'tom',
    userPwd: 123456
  };

  //获取cookie的方法
  console.log(req.cookies.CNZZDATA1261788850);

  User.findOne(param).then((doc) => {
    if (doc) {
      res.status(200).json({
        status: '0',
        message: '登录成功',
        result: {
          userName: doc.userName
        }
      })
    } else {
      res.status(401).json({
        status: '1',
        message: '登录失败，用户名或者密码输入失误'
      })
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/edit',(req,res,next)=>{
  var userId='100000077';
  var checkAll=req.body.checkAll?"1":0;
  User.findOne({
    userId:userId
  },function(err,user){
    if(err){
      res.status(500).json(err.message);
    }else{
      if(user){
        user.cartList.forEach((item,index)=>{
          item.checked=checkAll;
        });
        user.save((err1,doc)=>{
          if(err1){
            res.status(500).json(err.message);
          }else{
            res.status(200).json({
              status: '0',
              message: '保存成功',
            })
          }
        })
      }else{
        res.status(200).json({
          status: '1',
          message: '修改失败'
        })
      }


    }
  })
});


module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

var url=require('url');

//链接数据库
mongoose.connect('mongodb://127.0.0.1/001_nodeMall');

mongoose.connection.on('connected', () => {
  console.log('MoogoDB connect success')
});

mongoose.connection.on('error', () => {
  console.log('MoogoDB connect fail')
});

mongoose.connection.on('disconnected', () => {
  console.log('MoogoDB connect disconnected')
});

/**
 * 商品列表功能
 * /goods
 * 接受参数如下：
 * page
 * pageSize
 * priceLevel          价格等级，不传表示全部（按照价格区间来查询）
 * sort  排序规则       为0 就是倒叙，为1就是升序
 */
router.get('/list', (req, res, next) => {
  console.log(url.parse(req.url,true).query);
  console.log('____________________');
  console.log(req.url);

  let page = parseInt(req.param('page')) || 1;
  let pageSize = parseInt(req.param('pageSize')) || 8;
  let priceLevel = req.param('priceLevel') || 'all';
  let sort = req.param('sort') || 1;
  let skip = (page - 1) * pageSize;
  let params = {};
  let priceGt = '', priceLte = '';
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLte = 100;
        break;
      case '1':
        priceGt = 100;
        priceLte = 500;
        break;
      case '2':
        priceGt = 500;
        priceLte = 1000;
        break;
      case '3':
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,//最大值为priceGt
        $lte: priceLte//最小值为priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  //按照什么规则排序1、升序   2、降序
  goodsModel.sort({
    salePrice: sort
  });

  goodsModel.exec({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        message: '成功',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});


/**
 * 添加购物车逻辑
 * 接受参数
 * productId
 *
 */
router.post('/addCart', function (req, res, next) {
  //如果是get请求，参数放在url里面的情况，接受数据的方式是req.param(),但是如果参数是post请求，接受参数的方式就是req.body，获取到的是一个对象
  let userId = '100000077', productId = req.body.productId;
  var User = require('../models/user');

  //find()是获取所有数据   findOne()只拿到查询到的第一条数据
  User.findOne({
    userId: userId
  }, function (err, userDoc) {
    if (err) {
      res.status(200).json({
        status: '1',
        message: err.message
      })
    } else {
      console.log(`userDoc:  ${userDoc}`);
      if (userDoc) {
        let goodsItem = '';

        userDoc.cartList.forEach((item, index) => {
          if (item.productId === productId) {
            goodsItem = item;
            item.productNum++;
          }
        });

        if (goodsItem) {
          userDoc.save(function (err1, doc2) {
            if (err1) {
              res.status(200).json({
                status: '1',
                message: err2.message
              })
            } else {
              res.status(200).json({
                status: '0',
                message: '添加购物车成功',
                result: 'success'
              })
            }
          })
        } else {
          Goods.findOne({
            productId: productId
          }, function (err1, doc) {
            if (err1) {
              res.status(200).json({
                status: '1',
                message: err1.message
              })
            } else {
              if (doc) {
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if (err1) {
                    res.status(200).json({
                      status: '1',
                      message: err2.message
                    })
                  } else {
                    res.status(200).json({
                      status: '0',
                      message: '添加购物车成功',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
});


/*测试接口*/
router.get('/test', function (req, res, next) {
  var param = {
    name: req.param('name'),
    age: req.param('age')
  };

  console.log(param);

  Goods.find({}, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    } else {
      res.json({
        success: true,
        message: '查询成功',
        name: param.name,
        age: param.age,
        data: {
          list: data
        }
      })
    }
  })
});

module.exports = router;

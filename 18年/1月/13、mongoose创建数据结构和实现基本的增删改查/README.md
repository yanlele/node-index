# mongoose创建数据结构和实现基本的增删改查       

[也可以参见以下博客路径](http://blog.csdn.net/qq_38355456/article/details/78698468)
- 据悉代码实现也可以看本项目示例

#### 1、利用mongoose链接数据库
这里默认mongoose数据库是已经启动了的          
```javascript
var mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://127.0.0.1/[对应你数据库的名字]');

mongoose.connection.on('connected', () => {
  console.log('MoogoDB connect success')
});

mongoose.connection.on('error', () => {
  console.log('MoogoDB connect fail')
});

mongoose.connection.on('disconnected', () => {
  console.log('MoogoDB connect disconnected')
});
```
这个地方如果没有对应数据库没有关系，在执行响应的mongoose操作数据库的命令的时候会自动创建数据库的


#### 2、创建对应数据结构映射
```javascript
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

//数据库集合要加s，如果没有因为对应数据库集合的时候，是默认第一个参数加s之后再去匹配数据库的
//如果这里的模型和数据库集合名字不匹配，那么这个模型接受第三个参数，就是数据库的名字！！！！这一点非常重要非常重要
module.exports = mongoose.model("User",userSchema);
```

#### 3、添加数据到数据库
 * 首先第一点，就是对应表结构的时候，一定要严格来定义
 * 第一个功能插入数据库(增加数据库):Schema实例化一个对应数据库的对象
 * 增加数据库有两个方法，一个save(),另外一个是create()方法
 * 支持内部回调，内部回调分别是err,doc，
 * 外部promise回调的参数分别是doc,len,err
 * 这两个方法的区别是，save:如果没有，创建新的对象集合，如果有，就覆盖旧的对象集合
 * create()不管有没有旧的对象集合，都创建新的对象集合（可能会出现很多相同的对象集合）
 * 具体情况分业务场景来定！
 
##### 3.1、创建对应数据结构映射数据库文件：
```javascript
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
```
##### 3.2、通过save()来保存数据，通过promise拿到回到
```javascript
router.get('/create', (req, res, next) => {  
  //回调第一个参数是结果，第二个参数是返回影响数据条数，第三个参数是异常  
  le.save().then((doc, len,err)=>{  
   console.log(`result :${doc}`);  
   console.log(`err: ${err}`);  
   console.log(`three : ${len}`);  
  
   res.status(200).json(doc);  
   });  
});  
```

##### 3.3、通过create()来保存数据
```javascript
router.get('/create', (req, res, next) => {  
  //回调第一个参数是异常，第二个参数是结果，第三个参数是数据条数  
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
```

#### 4、修改数据update()和updateMany()：
```javascript
//这种办法实际上update只能修改一个数据!  updateMany就可以批量修改了  
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
```

#### 5、查找数据find()和findOne();
```javascript
/*查询*/  
router.get('/find',function(req,res,next){  
  lele.find({  
    'result.size':16  
  },(err,data)=>{  
    res.status(200).json(data);  
  })  
});  
```
find()方法可以查找符合条件的多条数据，findOne()只能查找到符合条件的第一条数据


#### 6、删除数据remove()
```javascript
router.get('/delete',(req,res,next)=>{  
  lele.remove({  
    'result.size':16  
  },(err,doc)=>{  
    console.log(err);  
    console.log(doc);  
    res.status(200).json(doc)  
  })  
});  
```

* 总结：以上所有操作数据库的方法都分为方法内部回调和方法结束后promise回调两种模式：
* 如果是内部回调，回调接受的三个参数分别是：异常、返回的数据结果、返回数据结果的条数
* 如果是promise回调，接受的三个参数分别依次为：结果、数据条数、异常

#### 7、关于err的跳坑
* 这里留下了一个非常坑的代码纠正逻辑
* 使用findOne({param},(err,data)={})  这种方式中的err是返回的异常，如果数据库中没有查询到数据，要对data进行校验
 
- 解决方式1示例：
```javascript
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
```

- 解决方式2示例：
```javascript
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
```
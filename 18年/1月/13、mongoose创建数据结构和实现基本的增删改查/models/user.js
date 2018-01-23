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

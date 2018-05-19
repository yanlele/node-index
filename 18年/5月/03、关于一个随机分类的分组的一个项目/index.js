let factory = require('./factory');

let enterDataArray =  [];

//每隔六十秒执行一次
setInterval(function() {
    //创建六个随机数据
    let randomData = {};
    randomData.name = factory.getRandomChar();                  // 产品名称
    randomData.type = Math.floor(Math.random()*10);             //产品类型
    randomData.date = new Date().getTime();                     //产品生产时间
    randomData.price = Math.floor(Math.random()*100);           //产品价格
    randomData.address = factory.getAddress();                  //获取随机的生产地区
    randomData.orderId = factory.getRandomCode(100);            //获得随机订单号

},1000*60);








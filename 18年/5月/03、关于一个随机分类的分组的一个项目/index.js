let factory = require('./factory');

let enterDataArray = [];
let outputDataArray = [];

//每隔六十秒执行一次
let timer =  setInterval(function () {
    //创建六个随机数据
    for(let i = 0; i<6; i++) {
        let randomData = {};
        randomData.name = factory.getRandomChar();                      //产品名称
        randomData.type = Math.floor(Math.random() * 10);               //产品类型
        randomData.productDate = new Date().getTime();                  //产品生产时间
        randomData.price = factory.getRandomPrice(5);                   //产品价格
        randomData.address = factory.getAddress();                      //获取随机的生产地区
        randomData.orderId = factory.getRandomCode(100);                //获得随机订单号
        enterDataArray.push(randomData);
    }
}, 1000);











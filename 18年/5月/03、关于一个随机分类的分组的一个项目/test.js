let factory = require('./factory');
let tools = require('./tools');
let instruction = require('./instruction');
require('./dateFormat');

function getRandomPrice() {
    let randomDigit = Math.floor(Math.random() * 5 + 1);
    let result = '';
    for (let i = 0; i < randomDigit; i++) {
        result += Math.floor(Math.random() * 10).toString()
    }

    return result;
}

//
// console.log(getRandomPrice());
// console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));

// instruction.init();

//
// console.log(factory.getAddress());

let enterDataArray = [];
for (let i = 0; i < 20; i++) {
    let randomData = {};
    randomData.name = factory.getRandomChar();                      //产品名称
    randomData.type = Math.floor(Math.random() * 10);               //产品类型
    randomData.productDate = new Date().getTime();                  //产品生产时间
    randomData.price = factory.getRandomPrice(5);                   //产品价格
    randomData.address = factory.getAddress();                      //获取随机的生产地区
    randomData.orderId = factory.getRandomCode(100);                //获得随机订单号
    enterDataArray.push(randomData);
}

filterType = function (type) {
    return enterDataArray.filter(function (item, index, list) {
        return item.type === type;
    });
};

let type = {};
for (let i = 1; i <= 10; i++) {
    type[i] = filterType(i)
}

console.log(type[1]);

/*
let typeList = [];
let middleList = [];

function parseArr(arr){
    var nameArr=[];
    var result=[]
    arr.forEach(function(item){
        var i
        if((i=nameArr.indexOf(item.type))>-1){
            console.log(result,i)
        }else{
            nameArr.push(item.type);
            result.push({
                name:item.type,
                number:item.number
            })
        }
    });
    return result
}

console.log(JSON.stringify(enterDataArray));*/

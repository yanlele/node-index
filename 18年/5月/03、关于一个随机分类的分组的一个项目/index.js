let factory = require('./factory');
const readline = require('readline');
const instruction = require('./instruction');

let enterDataArray = [];
let outputDataArray = [];
instruction.init();
let question;

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
    //获取当前所有的入参数据
}, 1000 *60);


//创建readline接口实例
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// question方法
function getQuestion() {
    rl.question("请给出您的指令:  ", function (answer) {
        question = answer;
        switch (question) {
            case 'help':
                instruction.init();
                getQuestion();
                break;
            case 'list':
                console.log(enterDataArray);
                getQuestion();
                break;
            case 'type':

                break;
            case 'close':
                rl.close();
                break;
            default:
                console.error('输入的指令错误，请重新输入');
                getQuestion();
                break;
        }
    });
}

getQuestion();

// close事件监听
rl.on("close", function () {
    // 结束程序
    process.exit(0);
});













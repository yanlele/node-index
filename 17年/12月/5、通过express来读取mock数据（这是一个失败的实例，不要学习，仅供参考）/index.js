import Mock from 'mockjs'


/*验证用户是否注册，用在home页面
不需要入参
 * 返回状态有以下几种：
 UNREGISTERED：未注册
 NORMAL：正常
 BLOCK：被注销
 如果为 UNREGISTERED 就跳转到注册界面
 * */
Mock.mock('/weixin/checkUserStatus.json', 'get', {
  "result": "NORMAL",
  "success": true
});

/*
 * 注册页发送验证码
 * 入参：mobileNo
 * */
Mock.mock('/weixin/sendCaptcha.json', 'post', {
  "message": "验证码发送成功",
  "success": true
});

/*注册页注册提交
 *
 * 入参：
 userName,
 mobileNo,
 captcha
 * */
Mock.mock('/weixin/verifyCaptcha.json', 'post', {
  "message":"绑定手机号成功",
  "success":true
});


/*汽车列表
 * 入参:
 * page:页数
 * pageSize:每页条数
 * */
Mock.mock('/weixin/car/snappingCars.json', 'post', {
  resultList: [
    {
      carInfoId: 'no1',
      carName: '汽车名称1',
      briefIntro:'简介1',
      description:'汽车描述1',//这个还没有加入
      imagePath: '../../images/1.png',
      price: 411000,
      snapPrice: 355000,
      earnestAmount: 30000,
      snapEndTime: '2017/08/08 08:08:08'
    },
    {
      carInfoId: 'no2',
      carName: '汽车名称2',
      briefIntro:'简介2',
      description:'汽车描述2',
      imagePath: '../../images/2.png',
      price: 412000,
      snapPrice: 355000,
      earnestAmount: 40000,
      snapEndTime: '2017/08/08    08:08:08'
    },
    {
      carInfoId: 'no3',
      carName: '汽车名称3',
      briefIntro:'简介3',
      description:'汽车描述3',
      imagePath: '../../images/3.png',
      price: 413000,
      snapPrice: 355000,
      earnestAmount: 50000,
      snapEndTime: '2017/08/08 08:08:08'
    }
  ],
  success: true,
  message: '请求成功',
  page: 1,
  pageSize: 10,
  totalCount: 100
});


/*汽车详情页
* 入参：
* carId：汽车id
* */
Mock.mock('/weixin/car/detail.json','post',{
  "message": "成功",
  "success": true,
  "result": {
    "brand": "东风",
    "briefIntro": "军用越野车",
    "carInfoId": 1,
    "carName": "东风猛士",
    "description": "就是猛",
    "earnestAmount": 10000,
    "imagePath": "/local/dongfeng.jpg",
    "models": "8L版",
    "price": 1200000,
    "salesVolume": 10,
    "snapEndTime": "2017/08/05 17:52:08",
    "snapPrice": 1000000
  }
});

/*
* 抢车已绑卡-用户绑卡数据
* */
Mock.mock('/weixin/user/bankCard/listUncommittedBankCards.json','get',{
  "bankCardList": [
    {
      "accountName": "你猜1",
      "bankCardId": 1,
      "bankCardNo": "6004************135",
      "bankName": "奇怪的银行",
      "usedToday": false
    },
    {
      "accountName": "你猜2",
      "bankCardId": 2,
      "bankCardNo": "6222************531",
      "bankName": "建设银行",
      "usedToday": false
    },
    {
      "accountName": "你猜2",
      "bankCardId": 3,
      "bankCardNo": "6222************531",
      "bankName": "建设银行",
      "usedToday": false
    },
    {
      "accountName": "你猜2",
      "bankCardId": 4,
      "bankCardNo": "6222************531",
      "bankName": "建设银行",
      "usedToday": false
    },
    {
      "accountName": "你猜2",
      "bankCardId": 5,
      "bankCardNo": "6222************531",
      "bankName": "建设银行",
      "usedToday": false
    }
  ],
  "cardCount": 2,
  "message": "查完了",
  "success": true
});



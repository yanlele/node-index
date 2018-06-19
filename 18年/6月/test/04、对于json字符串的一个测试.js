let json = JSON.parse('[{"children":[{"children":[{"name":"知产农业银行-收付款(31011401040004522)","id":11,"type":"农业银行","channel_type":"银行卡"},{"name":"知产工商银行-支付退赔付(3100032119100159651)","id":1,"type":"工商银行","channel_type":"银行卡"}],"name":"银行卡"},{"children":[{"name":"liuyuanhang1(liuyuanhang1)","id":18,"type":"支付宝","channel_type":"第三方支付"}],"name":"第三方支付"}],"name":"重庆猪八戒知识产权服务有限公司"}]')
let jsonString = '"[{"children":[{"children":[{"name":"知产农业银行-收付款(31011401040004522)","id":11,"type":"农业银行","channel_type":"银行卡"},{"name":"知产工商银行-支付退赔付(3100032119100159651)","id":1,"type":"工商银行","channel_type":"银行卡"}],"name":"银行卡"},{"children":[{"name":"liuyuanhang1(liuyuanhang1)","id":18,"type":"支付宝","channel_type":"第三方支付"}],"name":"第三方支付"}],"name":"重庆猪八戒知识产权服务有限公司"}]"';
jsonString = jsonString.substr(1,jsonString.length -2);
console.log(jsonString);

console.log(JSON.parse(jsonString));
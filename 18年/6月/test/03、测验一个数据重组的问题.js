/*
* 在业务代码遇到一个这种问题，输出结果数组第一个元素是空的，其实这个地方犯了一个很傻的错误，因为下标是直接从1开始的
* */

let data = [
    {
        "id": 1,
        "fundAccountId": 1,
        "accType": null,
        "accountType": "工商银行",
        "accountName": "重庆猪八戒知识产权服务有限公司",
        "accountNumber": "3100032119100159651",
        "depositBank": "工商银行重庆西湖路支行",
        "abbreviation": "知产工商银行-支付退赔付",
        "accountStatus": 1,
        "channelType": 1
    },
    {
        "id": 11,
        "fundAccountId": 4,
        "accType": null,
        "accountType": "农业银行",
        "accountName": "重庆猪八戒知识产权服务有限公司",
        "accountNumber": "31011401040004522",
        "depositBank": "中国农业银行重庆鹅岭支行",
        "abbreviation": "知产农业银行-收付款",
        "accountStatus": 1,
        "channelType": 1
    },
    {
        "id": 18,
        "fundAccountId": 16,
        "accType": null,
        "accountType": "支付宝",
        "accountName": "liuyuanhang1",
        "accountNumber": "liuyuanhang1",
        "depositBank": "liuyuanhang1",
        "abbreviation": "liuyuanhang1",
        "accountStatus": 1,
        "channelType": 2
    }
];


let rebuildData =[];
data.map(function(item, index) {
    if(!rebuildData[item.channelType]) {
        if(!rebuildData[item.channelType]) {
            rebuildData[item.channelType] = {
                label: item.channelType === 1 ? '银行' : '第三方支付',
                value: `${item.channelType}-0-0`,
                key: `${item.channelType}-0-0`,
                disabled: true,
                children: []
            };
        }
        rebuildData[item.channelType].children.push({
            label: item.abbreviation,
            key: `${item.channelType}-0-${index}`,
            value: item.id.toString(),
        });
    }
});

console.log(rebuildData);
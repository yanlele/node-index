const tools = require('./tools');

let factory = {
    //创建产品名称
    getRandomChar: function () {
        result = [];
        for (let i = 0; i < 4; i++) {
            let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
            result.push(String.fromCharCode(65 + ranNum))
        }
        return result.join('')
    },

    //创建产品产品生产地
    getAddress: function() {
        let addressArray = {
            1: "北京",
            2: "天津",
            3: "河北",
            4: "山西",
            5: "内蒙古",
            6: "辽宁",
            7: "吉林",
            8: "黑龙江",
            9: "上海",
            10: "江苏",
            11: "浙江",
            12: "安徽",
            13: "福建",
            14: "江西",
            15: "山东",
            16: "河南",
            17: "湖北",
            18: "湖南",
            19: "广东",
            20: "广西",
            21: "海南",
            22: "重庆",
            23: "四川",
            24: "贵州",
            25: "云南",
            26: "西藏",
            27: "陕西",
            28: "甘肃",
            29: "青海",
            30: "宁夏",
            31: "新疆",
            32: "台湾",
            33: "香港",
            34: "澳门",
            35: "国外"
        };

        return addressArray[Math.random()]
    }
};

console.log(tools.randomFrom(1,35));


module.exports = factory;
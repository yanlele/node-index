const tools = require('./tools');

let index = {
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

        return addressArray[Math.random(tools.randomFrom(1,35))]
    },
    
    getRandomCode: function randomNum(minNum,maxNum){
        let today = new Date();
        let day   = today.getDate(); //获取当前日(1-31)      
        let month = today.getMonth() + 1; //显示月份比实际月份小1,所以要加1  
        let year  = today.getYear();  //获取完整的年份(4位,1970-????)  getFullYear()
        let years=today.getFullYear();
        years= years<99?"20"+years:years;
        month    = month<10?"0"+month:month;  //数字<10，实际显示为，如5，要改成05  
        day   = day<10?"0"+day:day;
        let hh=today.getHours();
        hh   = hh<10?"0"+hh:hh;
        let ii=today.getMinutes();
        ii   = ii<10?"0"+ii:ii;
        let ss= today.getSeconds();
        ss   = ss<10?"0"+ss:ss;
        let dada = years+month+day+hh+ii+ss;//时间不能直接相加，要这样相加！！！14位

        switch(arguments.length){
            case 1:
                return dada+parseInt(Math.random()*minNum+1,10);
                break;
            case 2:
                return dada+parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                break;
            default:
                return 0;
                break;
        }
    },

    getRandomPrice: function() {
        let randomDigit = Math.floor(Math.random() * 5+1);

    }
};


module.exports = index;
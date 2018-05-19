//获取指定区间范围随机数，包括lowerValue和upperValue

let index = {
    randomFrom: function (lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }
};

module.exports = index;




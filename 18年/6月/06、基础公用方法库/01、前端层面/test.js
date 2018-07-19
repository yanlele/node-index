/*这里做本次项目迭代的辅助逻辑*/

/**
 * 拆分价格，传入实体数额，然后才分为价格和单位的形式
 * @param price
 * @returns {*[]}
 */
let splitPrice = function(price) {
    let unit = '元', rebuildPrice = price;
    if(price < 10000) {
        unit = '元';
        rebuildPrice = price;
    } else if(price >= 10000 && price < 100000000 ) {
        unit = '万';
        rebuildPrice = price / 10000;
    } else if(price >= 100000000) {
        unit = '亿';
        rebuildPrice = price / 100000000;
    }
    return [parseFloat(rebuildPrice), unit];
};
module.exports.splitPirce = splitPrice;

/**
 * 重新合并价格
 * @param price 传入的价格
 * @param unit 单位
 * @returns {*}
 */
let recombinePrice = function(price, unit) {
    let returnPrice = price;
    switch (unit) {
        case '元':
            returnPrice = price;
            break;
        case '万':
            returnPrice = price * 10000;
            break;
        case '亿':
            returnPrice = price * 100000000;
            break;
        default:
            returnPrice = price;
    }
    return returnPrice;
};
module.exports.recombinePrice = recombinePrice;

console.log(splitPrice(10000));
console.log(recombinePrice(120, "万"));

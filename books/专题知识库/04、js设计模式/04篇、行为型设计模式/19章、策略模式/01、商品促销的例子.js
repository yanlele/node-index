
// 价格策略对象
class PriceStrategy {
    constructor() {
        // 内部算法对象
        this.stragtegy = {
            // 100返30
            return30(price) {
                return +price + parseInt( price / 100) * 30;
            },
            // 100 返 50
            return50(price) {
                return +price + parseInt(price/ 100) * 50;
            },
            // 9 折
            percent90(price) {
                return price * 100 * 90 / 10000
            },
            percent80(price) {
                return price * 100 * 80 / 10000
            },
            percent50(price) {
                return price * 100 * 50 / 10000
            }
        }
    }
    // 策略算法调用接口
    getPrice(algorithm, price) {
        return this.stragtegy[algorithm] && this.stragtegy[algorithm](price);
    }
}
let priceStrategy = new PriceStrategy();
let price = priceStrategy.getPrice('return50', 314.67);
console.log(price);
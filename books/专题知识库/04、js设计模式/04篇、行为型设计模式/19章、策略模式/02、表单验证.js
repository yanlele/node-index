class InputStrategy {
    constructor() {
        this.strategy = {
            // 是否为空
            notNull(value) {
                return /\s+/.test(value) ? '请输入内容' : '';
            },
            // 是否是一个数字
            number(value) {
                return /^[0-9]+(\.[0-9]?$)/.test(value) ? '' : '请输入数字';
            },
            phone(value) {
                return /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/.test(value) ? '' : '正输入正确的电话号码格式， 如： 010-12345678 或者 0234-1234567'
            }
        }
    }
    check(type, value) {
        // 祛除空格
        value = value.replace(/^\s|\s+$/g, '');
        return this.strategy[type] ? this.strategy[type](value) : '没有改类型检测方法'
    }
    // 添加策略
    addStrategy(type, fn) {
        this.strategy[type] = fn;
    }
}
let inputStrategy = new InputStrategy();
// 比如说我们需要添加一个扩展
inputStrategy.addStrategy('email', function (value) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ? '' : '请输入真确的email'
});

/*算法的调用*/
// 外观模式
function $tag(tag, context) {
    context  = context || document;
    return context.getElementsByTagName(tag);
}
// 提价按钮
$tag('input')[1].onclick = function () {
    // 获取输入框的内容
    let value = $tag('input')[0].value;
    // 获取日期格式检验结果
    $tag('span')[0].innerHTML = inputStrategy.check('email', value);
};

let Conf = (function () {
    // 私有变量
    let conf = {
        MAX_NUM: 100,
        MIN_NUM:1,
        COUNT: 1000
    };
    return {
        get(name) {
            return conf[name] ? conf[name] : null
        }
    }
})();
let count = Conf.get('COUNT');
console.log(count);
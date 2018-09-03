let LazySingle = (function () {
    let _instance = null;
    function single() {
        return {
            publicMath() {},
            publicConst: 100
        }
    }
    return function() {
        if(!_instance) {
            _instance = single();
        }
        //返回单例
        return _instance;
    }
})();

console.log(LazySingle().publicConst);
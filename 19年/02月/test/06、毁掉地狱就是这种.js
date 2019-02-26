const function1 = function (callback) {
    setTimeout(function () {
        callback(1);
    }, 1000)
};

const function2 = function(callback) {
    setTimeout(function () {
        callback(2)
    }, 1000)
};

const function3 = function(callback) {
    setTimeout(function () {
        callback(3)
    }, 1000)
};

const function4 = function(callback) {
    setTimeout(function () {
        callback(4)
    }, 1000)
};

const function5 = function(callback) {
    setTimeout(function () {
        callback(5)
    }, 1000)
};
var a = function1(function2(function3(function4(function5(function () {

})))))

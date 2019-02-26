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

function1(function(res1) {
    console.log('function1', res1);
    function2(function (res2) {
        console.log('function2', res2);
        function3(function(res3) {
            console.log('function3执行', res3);
            function4(function (res4) {
                console.log('function4执行', res4);
                function5(function (res5) {
                    console.log('function5执行', res5);
                })
            })
        })
    })
});

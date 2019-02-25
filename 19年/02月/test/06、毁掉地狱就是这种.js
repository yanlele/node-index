const function1 = function (callback) {
    setTimeout(callback, 1000)
};

const function2 = function(callback) {
    setTimeout(callback, 1000)
};

const function3 = function(callback) {
    setTimeout(callback, 1000)
};

const function4 = function(callback) {
    setTimeout(callback, 1000)
};

const function5 = function(callback) {
    setTimeout(callback, 1000)
};

function1(function() {
    console.log('function1');
    function2(function () {
        console.log('function2');
        function3(function() {
            console.log('function3执行');
            function4(function () {
                console.log('function4执行');
                function5(function () {
                    console.log('function5执行');
                })
            })
        })
    })
});

const buildPromise = function () {
    return new Promise((resolve, reject) => {

    })
};

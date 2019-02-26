let promise1 = function() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve({
                name1: 'promise1'
            })
        }, 1000)
    })
};

let promise2 = function (res1) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve({
                name1: res1.name1,
                name2: 'promise2'
            })
        }, 1000)
    })
};

let promise3 = function(res2) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve({
                name1: res2.name1,
                name2: res2.name2,
                name3: 'promise3'
            })
        }, 1000)
    })
};

let promise4 = function(res3) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve({
                name1: res3.name1,
                name2: res3.name2,
                name3: res3.name3,
                name4: 'promise4'
            })
        }, 1000)
    })
};

promise1().then(function(res1) {
    console.log('第一个promise执行， 抛出到第二个promise');
    return promise2(res1)
}).then(function(res2) {
    console.log('第二个promise执行， 抛出到第三个promise');
    return promise3(res2)
}).then(function(res3) {
    console.log('第三个promise执行， 抛出到第四个promise');
    return promise4(res3)
}).then(function(res) {
    console.log('第四个promise执行， 直接输出结果');
    console.log(res)
});

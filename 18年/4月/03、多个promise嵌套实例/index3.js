let promise1 = function() {
    return new Promise(resolve => {
        resolve({
            name1: 'promise1'
        })
    })
};

let promise2 = function (res1) {
    return new Promise(resolve => {
        resolve({
            name1: res1.name1,
            name2: 'promise2'
        })
    })
};

let promise3 = function(res2) {
    return new Promise(resolve => {
        resolve({
            name1: res2.name1,
            name2: res2.name2,
            name3: 'promise3'
        })
    })
};

let promise4 = function(res3) {
    return new Promise(resolve => {
        resolve({
            name1: res3.name1,
            name2: res3.name2,
            name3: res3.name3,
            name4: 'promise4'
        })
    })
};

promise1().then(function(res1) {
    return promise2(res1)
}).then(function(res2) {
    return promise3(res2)
}).then(function(res3) {
    return promise4(res3)
}).then(function(res) {
    console.log(res)
});
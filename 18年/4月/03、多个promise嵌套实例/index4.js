new Promise(function (resolve, reject) {
    resolve(1);
    console.log(2);
    setTimeout(function() {
        console.log(3)
    })
}).then(function (res) {
    console.log(res)
});
function yanle(flag) {
    return new Promise(function (resolve, reject) {
        if(flag){
            resolve(123);
        }else{
            reject('错误信息');
        }
    });
}

yanle(false).then(function(data) {
   console.log(data);
}).catch(function(data) {
    console.log(data);
});


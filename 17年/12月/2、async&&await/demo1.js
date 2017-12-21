let sleep=function(time){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve()
        },time)
    })
};

let start=async function(){
    console.log('开始');
    await sleep(2000);
    console.log('结束');
};

start();
let sleep=function(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ok')
        },time)
    })
};
let start=async ()=>{
    let result=await sleep(3000);
    console.log(result);
};
start();
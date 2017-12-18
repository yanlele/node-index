let sleep=(time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
};

let arr=[1,2,3,4,5,6,7,8,9];
let start=async ()=>{
    for(let value of arr){
        console.log(`这是第${value}次等待`);
        await sleep(1000)
    }
};
start();

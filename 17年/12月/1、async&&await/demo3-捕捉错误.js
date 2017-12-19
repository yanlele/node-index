let sleep=(time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('error')
        },time)
    })
};

let start =async ()=>{
    try {
        console.log('start');
        await sleep(3000);
        console.log('end')
    }catch(err){
        console.log(err)
    }
};
start();

//多个promise嵌套实例2


function getName() {
    return new Promise((resolve, reject) => {
        resolve({
            name: 'yanle',
            age: 25
        })
    })
}

let fun1 =  getName().then(res1=>{
    return new Promise((resolve, reject) =>{
        res1.getname = 'name2';

        resolve(res1)
    })
});

let fun2 = fun1.then(res2=>{
    return new Promise((resolve, reject) =>{
        res2.address = 'name3';

        resolve(res2)
    })
});

fun2.then( res3=>{
    console.log(res3);
});

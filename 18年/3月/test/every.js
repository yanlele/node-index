let arr=[{
    name:'yanle'
},{
    age:25
}];

let result =  arr.every(function(item){
    console.log(item);
    return item.age = 25
});

console.log(result);
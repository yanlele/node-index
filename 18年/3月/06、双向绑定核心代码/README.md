# 双向绑定核心知识点

1、如果一个对象中有属性有方法，那么调用属性可以直接. 就可以调用，但是如果是调用方法的时候，是通过入参来决定key的值来调用的话，请用[]来表示：  
```javascript
let arr={
    name:'yanle',
    getAge:function(){
        return '25'
    }
};

for(let key in arr){
    console.log(arr[key]);
}
```


## 对象拷贝


### 浅拷贝
```js
// es6  写法
function clone(origin) {
  return Object.assign(Object.create(origin), origin);
}

let p = {
  name: 'yanle',
  address: {
    local: '重庆',
    'other': '成都',
    school: {
      'hight': '梁平',
      'university': '重庆那个'
    }
  }
};

console.log(p);


let c = clone(p);

console.log(c);


//ES5
/*
function extendDeep(p,c){
    var c = c||{};
    for(let prop in p){
        if(typeof p[prop] ==='object'){
            c[prop]=(p[prop].constructor===Array)?[]:{};
            extendDeep(p[prop],c[prop])
        }else{
            c[prop]=p[prop];
        }
    }
}
*/

```

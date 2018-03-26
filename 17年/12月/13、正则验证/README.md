#  常用的正则校验

1、  用于校验中间带 · 的外文名字，例如：理查德·泰深
```javascript
let arr='哔哩哔哩·比例'
console.log(/(^[\u4e00-\u9fa5]+)([·]{1})([\u4e00-\u9fa5]+$)/gi.test(arr));
```
同时校验中文名和外文名：
```javascript
let arr='哔哩哔哩'
console.log(/(^[\u4e00-\u9fa5]+)([·]{1})([\u4e00-\u9fa5]+$)|^[\u4e00-\u9fa5]+$/gi.test(arr));
```


2、 正则表达式只能输入中文和字母
```javascript
/^[a-zA-Z\u4e00-\u9fa5]+$/
```

3.  手机正则表达式
```javascript
function checkPhone(){ 
    var phone = document.getElementById('phone').value;
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
}
```

4、  限制只能输入规定数字
```javascript
this.input3 = this.input3.replace(/[^\d]/g, '')
```

5、  限制只允许输入中文字符
````javascript
onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
if(!/^[\u4e00-\u9fa5]+$/gi.test(this.value))alert('含有非汉字字符');
````

6、  银行卡号四位空一位
```javascript
this.card = newValue.replace(/\D/g,'').replace(/....(?!$)/g,'$& ');
```

7、  普通字符串，每个四位空一位输出
```javascript
var str = '6222023100014701887';
var str=str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
console.log(str);
```

8、邮箱校验
```javascript
let email ='asdfwef23123@qq.com'
console.log('email', /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email));
```
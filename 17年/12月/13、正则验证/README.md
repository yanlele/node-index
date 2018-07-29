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
    if(!(/^1[345789]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
}

//有遮罩的手机验证方式
/^1[345789]\d{9}$|^1[345789]\d{1}[*]{4}\d{4}$/
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

9、只能输入数字和英文的校验
```javascript
/^[a-zA-Z0-9]+$/
```

10、日期正则验证           
```javascript
/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/
```

11、给某一些位数做掩码规则：         
```javascript
let phone = '152132837sfasdf46238746497741';
let phoneMask = phone.replace(/^(\w{3})(\w*)(\w{4})$/, "$1 **** $3");
console.log(phoneMask);
```

12、其他常见正则验证：
```javascript
//日期规则
exports.dateTimeRule = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/;
//日期规则
exports.dataTimeRuleM = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
//日期规则
exports.dateRule = /^\d{4}-\d{2}-\d{2}$/;
//电话规则
exports.telRule = /^((1[3-9]\d{9})|(\d{3,4}-\d{7,10}))$/;
//邮箱规则
exports.emailRule = /\w@\w*\.\w/;
//邮政编码规则
exports.postCodeRule =  /^[1-9][0-9]{5}$/; 
//传真规则
exports.faxRule = /^(\d+-)?\d+(-\d+)?$/;
//手机规则
exports.moblieRule = /^1[3-9]\d{9}$/;
```

13、只允许输入小数点和数字：
```javascript
let input = '1231shfi23.123yanle ';
input = input.replace(/[^(\d|.)]/g, '');
console.log(input);
```

14、JS正则--非负整数或小数，小数最多精确到小数点后两位
```javascript
/^[0-9]+([.]{1}[0-9]{1,2})?$/
```


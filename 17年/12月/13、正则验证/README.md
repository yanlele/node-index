## JavaScript正则
支持正则表达式的String 对象方法
search(返回查询到的字符串的索引下标)、match(返回数组对象，第一个是检索到的字符串，第二个是索引， 第三个是检测的字符串)、replace、split

如果是先正则的方式来给与的方式，有两个方法：                               
RegExpObject.test(string) - 检测true 和 false 返回是否匹配上
RegExpObject.exec(string) - 返回的结果跟字符串match 结果是一样的
```javascript
let phone = '15213497741';
console.log(/^1[345789]\d{9}$/.exec(phone));            // [ '15213497741', index: 0, input: '15213497741' ]
console.log(phone.match(/^1[345789]\d{9}$/));           // [ '15213497741', index: 0, input: '15213497741' ]
console.log(phone.search(/213/));                       // 2
```



##  常用的正则校验

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

11、给某一些位数做掩码规则（替换方式）：         
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

15、正则替换的使用
```javascript
// 正则替换：
var str='this is a test';
var newStr=str.replace(/IS/ig,'!');  //搜索到以后，找到的元素通过！替换
console.log(newStr);  //th! ! a test

var str="2015-09-26";
var newStr=str.replace(/(\d{4})-(\d{2})-(\d{2})/,"$2/$3/$1");
console.log(newStr);  //结果09-26-2015

var str="2015-09-25";
var newStr=str.replace(/(\d{4})-(\d{2})-(\d{2})/,func);
function func(match,d1,d2,d3){
   return [d2,d3,d1].join('/');
}
console.log(newStr);  //结果同上
```

### 常用正则表达式收集

```
//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;   
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;  
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 
//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
< (\S*?)[^>]*>.*?|< .*? />;
//sql 语句
^(select|drop|delete|create|update|insert).*$
//提取信息中的网络链接
(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的邮件地址
\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//提取信息中的图片链接
(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的 IP 地址
(\d+)\.(\d+)\.(\d+)\.(\d+)
//取信息中的中国手机号码
(86)*0*13\d{9} 
//提取信息中的中国邮政编码
[1-9]{1}(\d+){5} 
//提取信息中的浮点数（即小数）
(-?\d*)\.?\d+ 
//提取信息中的任何数字
(-?\d*)(\.\d+)?
//电话区号
^0\d{2,3}$
//腾讯 QQ 号
^[1-9]*[1-9][0-9]*$ 
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//中文、英文、数字及下划线
^[\u4e00-\u9fa5_a-zA-Z0-9]+$
```


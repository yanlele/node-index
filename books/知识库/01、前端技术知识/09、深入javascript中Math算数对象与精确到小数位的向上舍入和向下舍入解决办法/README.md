# 深入javascript中Math算数对象与精确到小数位的向上舍入和向下舍入解决办法            

JavaScript Math 对象：算数Math对象用于执行数学任务。           
           
## 一、对象属性          

|属性|描述|     
|:-|:-|         
|E|	返回算术常量 e，即自然对数的底数（约等于2.718）。|           
|LN2|	返回 2 的自然对数（约等于0.693）。|          
|LN10|	返回 10 的自然对数（约等于2.302）。|         
|LOG2E|	返回以 2 为底的 e 的对数（约等于 1.414）。|            
|LOG10E|	返回以 10 为底的 e 的对数（约等于0.434）。|            
|PI|	返回圆周率（约等于3.14159）。|         
|SQRT1_2|	返回返回 2 的平方根的倒数（约等于 0.707）。|             
|SQRT2|	返回 2 的平方根（约等于 1.414）。|              

用法示例：           
```javascript
console.log('Math.E  的结果为：'+Math.E);  
console.log('Math.LN2  的结果为：'+Math.LN2);  
console.log('Math.LN10  的结果为：'+Math.LN10);  
console.log('Math.LOG2E  的结果为：'+Math.LOG2E);  
console.log('Math.LOG10E  的结果为：'+Math.LOG10E);  
console.log('Math.PI  的结果为：'+Math.PI);  
console.log('Math.SQRT1_2  的结果为：'+Math.SQRT1_2);  
console.log('Math.SQRT2  的结果为：'+Math.SQRT2);  
```
结果为：        
```
Math.E  的结果为：2.718281828459045
Math.LN2  的结果为：0.6931471805599453
Math.LN10  的结果为：2.302585092994046
Math.LOG2E  的结果为：1.4426950408889634
Math.LOG10E  的结果为：0.4342944819032518
Math.PI  的结果为：3.141592653589793
Math.SQRT1_2  的结果为：0.7071067811865476
Math.SQRT2  的结果为：1.4142135623730951
```

## 二、Math对象方法           

|方法|描述|     
|:-|:-| 
|abs(x)|	返回 x 的绝对值。|
|acos(x)|	返回 x 的反余弦值。|
|asin(x)|	返回 x 的反正弦值。|
|atan(x)|	以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。|
|atan2(y,x)|	返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。|
|ceil(x)|	对数进行上舍入。|
|cos(x)|	返回数的余弦。|
|exp(x)|	返回 Ex 的指数。|
|floor(x)|	对 x 进行下舍入。|
|log(x)|	返回数的自然对数（底为e）。|
|max(x,y,z,...,n)|	返回 x,y,z,...,n 中的最高值。|
|min(x,y,z,...,n)|	返回 x,y,z,...,n中的最低值。|
|pow(x,y)|	返回 x 的 y 次幂。|
|random()|	返回 0 ~ 1 之间的随机数。|
|round(x)|	把数四舍五入为最接近的整数。|
|sin(x)|	返回数的正弦。|
|sqrt(x)|	返回数的平方根。|
|tan(x)|	返回角的正切。|

几个常用方法使用示例如下
```javascript
var num = 1234.567;  
console.log('Math.ceil(num) 的结果: ' + Math.ceil(num));  
console.log('Math.floor(num) 的结果: ' + Math.floor(num));  
console.log('Math.random() 的结果: ' + Math.random());  
console.log('Math.round(num) 的结果: ' + Math.round(num));  
console.log('Math.sqrt(num) 的结果: ' + Math.sqrt(num));  
```
其结果分别问：     
```
Math.ceil(num) 的结果: 1235
Math.floor(num) 的结果: 1234
Math.random() 的结果: 0.05321734893231089
Math.round(num) 的结果: 1235
Math.sqrt(num) 的结果: 35.136405621520254
```

## 第三、精确到小数位的向上舍入和向下舍入解决办法          
通过上面的例子出现了一个问题，比如我们num =1234.567，比如我想去小数点后两位，然后第三位向上舍入，我们就单用原生Math方法显然是办不到的。其实解决我们还有其他的简单解决办法，解决思路如下：
```javascript
//获取两位小数点后面的向上取整  
var num = 1234.56189;  
num=num*100;  
console.log(Math.ceil(num)/100);  //1234.57
```
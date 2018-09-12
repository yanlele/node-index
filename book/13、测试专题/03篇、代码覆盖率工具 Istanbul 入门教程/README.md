## 代码覆盖率工具 Istanbul 入门教程

测试的时候，我们常常关心，是否所有代码都测试到了。

这个指标就叫做"代码覆盖率"（code coverage）。它有四个测量维度。

```
行覆盖率（line coverage）：是否每一行都执行了？
函数覆盖率（function coverage）：是否每个函数都调用了？
分支覆盖率（branch coverage）：是否每个if代码块都执行了？
语句覆盖率（statement coverage）：是否每个语句都执行了？
```


### <div id="class03-01">01、安装</div>
Istanbul 是一个 npm 模块，安装非常简单，就一行命令。               
`npm install -g istanbul`               

### <div id="class03-02">02、覆盖率测试</div>
来看一个例子，怎么使用 Istanbul 。下面是脚本文件 simple.js 。
```javascript
let a = 1;
let b = 1;
if ((a + b) > 2) {
    console.log('more than two');
}
```
执行命令Istanbul cover simple.js 就得到了下面的覆盖率报告
```
=============================== Coverage summary ===============================
Statements   : 75% ( 3/4 )
Branches     : 50% ( 1/2 )
Functions    : 100% ( 0/0 )
Lines        : 75% ( 3/4 )
================================================================================
```
返回结果显示，simple.js 有4个语句（statement），执行了3个；有2个分支（branch），执行了1个；有0个函数，调用了0个；有4行代码，执行了3行。

这条命令同时还生成了一个 coverage 子目录，其中的 coverage.json 文件包含覆盖率的原始数据，coverage/lcov-report 是可以在浏览器打开的覆盖率报告，其中有详细信息，到底哪些代码没有覆盖到。                  
![01](./img/01.png)                     

### <div id="class03-03">03、覆盖率门槛</div>
完美的覆盖率当然是 100%，但是现实中很难达到。需要有一个门槛，衡量覆盖率是否达标。

**istanbul check-coverage** 命令用来设置门槛，同时检查当前代码是否达标。

`istanbul check-coverage --statement 90`                        
`ERROR: Coverage for statements (75%) does not meet global threshold (90%)`                                            
上面命令设置语句覆盖率的门槛是 90% ，结果就报错了，因为实际覆盖率只有75%。

除了百分比门槛，我们还可以设置绝对值门槛，比如只允许有一个语句没有被覆盖到。              
`istanbul check-coverage --statement -1`                    
上面命令使用负数，表示绝对值门槛。这样一来，上面的例子就通过了覆盖率测试，不会再报错了。

百分比门槛和绝对值门槛，可以结合使用。             
`istanbul check-coverage --statement -5 --branch -3 --function 100`                     

上面命令设置了3个覆盖率门槛：5个语句、3个 if 代码块、100%的函数。注意，这三个门槛是"与"（and）的关系，只要有一个没有达标，就会报错。                      

### <div id="class03-04">04、与测试框架的结合</div>
实际开发时，istanbul 总是与测试框架结合使用，下面以常用的 Mocha 框架为例。                   
sqrt.js 是一个计算平方根的脚本。                
```javascript
var My = {
  sqrt: function(x) {
    if (x < 0) throw new Error("负值没有平方根");
      return Math.exp(Math.log(x)/2);
    }
};
module.exports = My;
```
它的测试脚本 index.test.js 放在 同级目录。
```javascript
const expect = require('chai').expect;
let My = require('./sqrt');

describe('sqrt', function () {
    it('4的平方根等于2', function () {
        expect(My.sqrt(4)).to.equal(2)
    });
    it('参数为负值时应该报错', function () {
        expect(function() {
            My.sqrt(-1)
        }).to.throw('负值没有平方根')
    });
});
```
在package.json 配置脚本命令
```
"scripts": {
    "server": "webpack-dev-server --open",
    "test": "mocha 18年/2月/7、单元测试/test/02、mocha.js",
    "cover-test": "istanbul cover node_modules/mocha/bin/_mocha 18年/2月/7、单元测试/test/02、mocha.js",
    "cover-temp": "istanbul cover node_modules/mocha/bin/_mocha book/13、测试专题/03篇、代码覆盖率工具 Istanbul 入门教程/index.test.js",
    "build": "webpack"
  }
```
执行结果如下:                 


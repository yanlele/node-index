# chai.js断言库



## <div id="class01">前端自动化测试之chai.js断言库</div>

### <div id="class01-01">chai.js简介</div>
chai.js 是一套TDD(测试驱动开发)/BDD(行为驱动开发)的断言库。包含有3个断言库支持BDD风格的expect/should和TDD风格的assert,这里主要说明expect/should库,
BDD风格说简单的就是你的测试代码更加的语义化,让你的断言可读性更好,expect/should库都支持链式调用可以在node和浏览器环境运行，可以高效的和任何js测试框架搭配使用。

**说明：**BDD，行为驱动开发（注重测试逻辑），TDD是测试驱动开发（注重输出结果）。

三大断言库的使用：               
```javascript
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
```

在es6中的使用：
```javascript
import { assert } from 'chai';  // Using Assert style
import { expect } from 'chai';  // Using Expect style
import { should } from 'chai';  // Using Should style
should();  // Modifies `Object.prototype`
```


### <div id="class01-02">except模块的相关api</div>
#### 语言链修饰符                 
语言链修饰符是单纯作为语言链提供以期提高断言的可读性。除非被插件改写否则它们一般不提供测试功能。主要包括如下相关的修饰符：               
```
to
be
been
is
that
which
and
has
have
with
at
of
same
```
例如：可以采用任何组合修饰符的方式来编写测试用例                
```javascript
expect(foo).to.is.has.which.equal('bar');  
expect(goodFn).be.has.at.same.throw(Error);  
```

- any/all               
```javascript
//any:用于检测该参数是否与实际值所对应的构造函数相匹配,在keys断言之前使用any标记（与all相反）
expect(foo).to.have.any.keys('bar', 'baz');

//all:在keys断言之前使用all标记（与any相反）
expect(foo).to.have.all.keys('bar', 'baz')
```

- a(type) / .an(type)： 用来断言变量类型             
```javascript
// 类型断言
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(null).to.be.a('null');
expect(undefined).to.be.an('undefined');
expect(new Error).to.be.an('error');
expect(new Promise).to.be.a('promise');
expect(new Float32Array()).to.be.a('float32array');
```

- include(value) / contains(value)：Object | String | Number，包含某个内容                      
include()和contains()即可作为属性类断言前缀语言链又可作为作为判断数组、字符串是否包含某值的断言使用。当作为语言链使用时，常用于key()断言之前                  
```javascript
expect([1, 2, 3]).to.include(2);
expect('foobar').to.include('bar');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo')
```

- not 跟在链式调用后面的否定断言                 


相关url文章链接：              
[前端自动化测试之chai.js断言库](https://blog.csdn.net/fly_home_ysc/article/details/76082302)                       
[Chai.js断言库API中文文档](https://www.jianshu.com/p/f200a75a15d2)


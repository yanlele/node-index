# chai.js断言库

目录
- [chai.js简介](#class01-01)
- [语言链修饰符](#class01-02)
- [except模块的相关api](#class01-03)



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



#### <div id="class01-02">语言链修饰符</div>                 
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

#### <div id="class01-03">except模块的相关api</div>
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
```javascript
expect(foo).to.not.equal('bar');  
expect(goodFn).to.not.throw(Error);  
expect({ foo: 'baz' }).to.have.property('foo').and.not.equal('bar');
```           

- deep 用来深度比较2个对象,一般用在equal和property前面              
```javascript
expect(foo).to.deep.equal({ bar: 'baz' });  
expect({ foo: { bar: { baz: 'quux' } } }).to.have.deep.property('foo.bar.baz', 'quux');
```

- ok 断言目标是否为真(只判断值是否为真，类似==，隐式转换)                       
```javascript
expect('everthing').to.be.ok;  
expect(1).to.be.ok;  
expect(false).to.not.be.ok;  
```

- true/.false 断言目标是否为布尔值true,false（这里与ok的区别是不进行类型转换，只能为true/false才能通过断言）                    
```javascript
expect(true).to.be.true;  
expect(1).to.not.be.true;
expect(false).to.be.false;  
expect(0).to.not.be.false;  
```

- null 断言目标为null            
```javascript
expect(null).to.be.null;  
expect(undefined).not.to.be.null;  
```

- undefined 断言目标为undefined
```javascript
expect(undefined).to.be.undefined;  
expect(null).to.not.be.undefined;
```

- NaN 断言目标为NaN                  
```javascript
expect('foo').to.is.be.NaN;
expect(4).is.be.NaN;
```

- exist 断言目标存在，既不为null，也不为undefined
```javascript
expect([]).to.be.empty
expect('').to.be.empty
expect({}).to.be.empty
```

- arguments 断言目标是一个参数对象arguments                
```javascript
function(){
     expect(arg).to.be.has.arguements;
}
```

- equal(value) 断言目标严格等于(===)value。另外，如果设置了deep标记，则断言目标深度等于value
```javascript
expect('hello').to.equal('hello');
expect(42).to.equal(42);
```

- eql(value) 断言目标深度等于value，相当于deep.equal(value)的简写                      
```javascript
expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
expect([1, 2, 3]).to.eql([1, 2, 3]);
```

- above(value) 断言目标大于(>)（超过）value,也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息                
```javascript
expect(50).to.be.above(12);
expect([1, 2, 3]).to.have.length.above(2);
```

- least(value) 断言目标不小于(>=)，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息
```javascript
expect(23).to.be.least(12);
expect([1, 2, 3]).to.have.length.least(2);
```

- below(value) 断言目标小于(<)，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息
```javascript
expect(5).to.be.below(12);
expect([1, 2, 3]).to.have.length.below(5);
```

- most(value) 断言目标不大于(<=)，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息
```javascript
expect(5).to.be.most(12);
expect([1, 2, 3]).to.have.length.most(5);
```

- within(star,end) 断言目标在这个范围内
```javascript
expect([1, 2, 3]).to.have.length.within(2, 4);
```

- length 设置.have.length标记作为比较length属性值的前缀               
```javascript
expect('foo').to.have.length.above(2);
expect([1, 2, 3]).to.have.length.within(2, 4);
```

- lengthof() 断言目标的length属性为期望的值
```javascript
expect('foo').is.lengthOf(2);
expect([1, 2, 3]).to.has.lengthOf(2, 4);
```

- match(RegExp) 断言目标匹配到一个正则表达式
```javascript
expect(2323232).is.to.be.match(/^\d+/);
```

- string(string) 断言目标字符串包含另一个字符串
```javascript
expect('foo').to.has.string('fo');
```

- instanceof(constructor) 断言目标是构造函数constructor的一个实例
```javascript
var Tea = function (name) { this.name = name },
  Chai = new Tea('chai');

expect(Chai).to.be.an.instanceof(Tea);
expect([1, 2, 3]).to.be.an.instanceof(Array);
```

- property(name, [value]) 断言目标是否拥有某个名为name的属性，可选地如果提供了value则该属性值还需要严格等于（===）value。
如果设置了deep标记，则可以使用点.和中括号[]来指向对象和数组中的深层属性               
name：String，属性名         
value：Mixed，可选，属性值              
```javascript
// 简单引用
var obj = { foo: 'bar' };
expect(obj).to.have.property('foo');
expect(pbj).to.have.property('foo', 'bar');

// 深层引用
var deepObj = {
  green: { tea: 'matcha' },
  teas: [ 'Chai', 'matcha', { tea: 'konacha' } ]
};

// 下面三个是错误的情况，具体情形有待研究而已
expect(deepObj).to.have.deep.property('green.tea', 'matcha');
expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha')
```

- ownProperty(name) 断言目标拥有名为name的自有属性
```javascript
expect('test').to.have.ownProperty('length');
```

- respondTo(method) 断言目标类或对象会响应一个方法（存在这个方法）
如果需要检查一个构造函数是否会响应一个静态方法（挂载在构造函数本身的方法），请查看itself标记                   
```javascript
Klass.prototype.bar = function () {};
expect(Klass).to.respondTo('bar');
expect(obj).to.respondTo('bar');

Klass.baz = function () {};
expect(Klass).itself.to.respondTo('baz');
```

- itself  设置itself标记，然后使用respondTo断言            
```javascript
function Foo () {}
Foo.bar = function () {};
Foo.prototype.baz = function () {};

expect(Foo).itself.to.respondTo('bar');
expect(Foo).itself.not.to.respond('baz');
```

[具体代码请见](./index.test.js)


相关url文章链接：              
[前端自动化测试之chai.js断言库](https://blog.csdn.net/fly_home_ysc/article/details/76082302)                       
[Chai.js断言库API中文文档](https://www.jianshu.com/p/f200a75a15d2)


### 前端测试库Mocha 和 Jest

`Mocha`作为可以说是使用最多的库，官方是主打灵活、简单的一个测试库，提供给开发者的只有一个基础测试结构。所以在使用的时候， 需要外置一个断言库， 例如`chai、assert`，以及覆盖库`istanbul`。 `Mochai` 拥有一些列的插件机制， 可以轻易对`Mochai` 进行很方便的扩展和增强。 

但是说到前端单元测试，就不得不说到`Jest`，`Jest`安装配置简单，非常容易上手。内置`Istanbul`，可以查看到测试覆盖率，完美的支持React组件化测试。

Jest既简单又强大，内置支持以下功能：
- 灵活的配置：比如，可以用文件名通配符来检测测试文件。
- 测试的事前步骤(Setup)和事后步骤(Teardown)，同时也包括测试范围。
- 匹配表达式(Matchers)：能使用期望expect句法来验证不同的内容。
- 测试异步代码：支持承诺(promise)数据类型和异步等待async / await功能。
- 模拟函数：可以修改或监查某个函数的行为。
- 手动模拟：测试代码时可以忽略模块的依存关系。
- 虚拟计时：帮助控制时间推移。

这篇文章先介绍mocha的使用， 以后再介绍Jest的使用

### 开始第一个示例
```
$ npm install mocha
$ mkdir test
$ $EDITOR test/test.js     # 或者使用你喜欢的编辑器打开
```
简单的可以编写如下的测试代码：
```js
const expect = require('chai').expect;
describe('#main', function () {
    it('must be array', function () {
        expect([1, 2, 3]).to.be.an.instanceof(Array);
    });
    it('should array length equal 3', function () {
        expect([1,2,3]).length.eq(4);
    })
});
```

然后运行测试代码：
`./node_modules/mocha/bin/mocha`就可以得到如下的测试结果：
```
  #main
    ✓ must be array
    1) should array length equal 3


  1 passing (74ms)
  1 failing

  1) #main
       should array length equal 3:
       AssertionError: expected [ 1, 2, 3 ] to equal 4
```

同样可以在 `package.json` 里面设置一个测试启动脚本
```
"scripts": {
    "test": "mocha"
  }
```
然后执行 `npm run test`；就可以得到上面一样的结果了。 默认查找的是test文件夹下面的test.js文件为主启动文件， 如果希望修改启动文件路径， mocha 后面添加路径就可以了 `mocha [path]`。


### 主要断言库推荐
`mocha`本身是不带断言库的，可以安装三方断言库， 主要有以下断言库：
- should.js
- expect.js
- chai
- assert
其中assert 是node自带的模块， 可以直接就用，但是在下推荐用chai， 非常强大非常好用。
在后面的文章中， 在下会继续对chai做详细介绍。


### 异步测试 done() 与超时时间timeout
**先来聊聊超时时间timeout问题**：
Mocha默认每个测试用例最多执行 `2000` 毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用 `-t或--timeout` 参数指定超时门槛。
例如启动的时候这样启动测试用例： `mocha -t 5000 timeout.test.js`

上面这种设置超时时间是全局的， 针对所有的it测试用例单元。 但是还有一种使用得更多的方式， 就是在每个测试单元， 或者describe 里面设置单独的超时时间。
```js
describe('a suite of tests', function() {
    this.timeout(500);

    it('should take less than 500ms', function(done){
        setTimeout(done, 300);
    });

    it('should take less than 500ms as well', function(done){
        setTimeout(done, 250);
    });

    it('should take less than 500ms', function(done){
        this.timeout(500);
        setTimeout(done, 300);
    });
})
```
需要注意的地方：
这个地方都是用到了this指针， Mocha传递箭头函数是不好的，由于this的词法作用域的问题，箭头函数是不能够访问mocha的上下文的。例如，由于箭头函数本身的机制，下面的代码会失败。
```js
describe('my suite', () => {
    it('my test', () => {
        // should set the timeout of this test to 1000 ms; instead will fail
        this.timeout(1000);
        assert.ok(true);
    });
});
```
所以一定要慎用箭头函数， 当我们不用到上下文this的时候， 箭头函数是可以用的， 但是尽量少用箭头函数， 除非迫不得已。 因为箭头函数会导致this上下文的混淆。

`slow`:
测试中，我们更多的会关注失败的测试用例和耗时较长的用例。那么问题来了，怎么算耗时过长呢？不同的地方可能有不同的要求。Mocha提供了 slow 函数来解决这个事情。当一个用例耗时超过一定值后，Mocha 会在reportor中明显地标记出来。
```js
describe('For compare with Test slow', function() {
    this.slow(100);
    // 标记耗时过长
    it('It would warning', function(done) {
        var callback = function() {
            console.log("------");
            done();
        };
        setTimeout(callback, 200);
    });
});
```
使用命令行执行测试文件之后， 可以得到以下的测试结果：
```
  For compare with Test slow
------
    ✓ It would warning (208ms)


  1 passing (264ms)
```
发现当耗时接近 slow() 函数设定的值的一半时，时间值开始被标记为黄色。 超过slow设定值得时候， 会直接标红。


**异步测试 done()**:
先看一个异步的示例， 测试用例里面，有一个`done`函数。it块执行的时候，传入一个`done`参数，当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了。否则，Mocha就无法知道，测试是否结束，会一直等到超时报错。
```js
it('测试应该5000毫秒后结束', function(done) {
    var x = true;
    var f = function() {
        x = false;
        expect(x).to.be.not.ok;
        done(); // 通知Mocha测试结束
    };
    setTimeout(f, 4000);
});
```

其中更加常用的一个示例是做接口api测试的时候， 一定会设计到大量的异步操作。 一个简单的示例如下：
```js
it('异步请求应该返回一个对象', function(done){
    request
        .get('https://api.github.com')
        .end(function(err, res){
            expect(res).to.be.an('object');
            done();
        });
});
```

对于 `Promise` 的异步测试， 因为mocha内部是默认支持`Promise`的，允许直接返回`Promise`，等到它的状态改变，再执行断言，而不用显式调用done方法。请看下面示例：
```js
it('异步请求应该返回一个对象', function() {
    return fetch('https://api.github.com')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            expect(json).to.be.an('object');
        });
});
```

如果node版本7.6+可以使用 `async/await`， 也可以这样来写异步代码：
```js
describe('#find()', function() {
    it('responds with matching records', async function() {
        const users = await db.find({ type: 'User' });
        users.should.have.length(3);
    });
});
```

### 时间钩子函数
Mocha在describe块之中，提供测试用例的四个钩子： `before()、after()、beforeEach()和afterEach()` 。它们会在指定时间执行。
- before   在本区块的所有测试用例之前执行
- after   在本区块的所有测试用例之后执行
- beforeEach   在本区块的每个测试用例之前执行
- afterEach   在本区块的每个测试用例之后执行

```js
const assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        before(function () {
            console.log('before')
        });
        beforeEach(function() {
            console.log('beforeEach')
        });
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4));
            console.log('it');
        });
        it('just is a console.log', function () {
            console.log('123');
        });
        afterEach(function () {
            console.log('afterEach')
        });
        after(function () {
            console.log('after')
        });
    })
});
```
输入结果如下：     
```
  Array
    #indexOf()
before
beforeEach
it
      ✓ should return -1 when the value is not present
afterEach
beforeEach
123
      ✓ just is a console.log
afterEach
after

  2 passing (61ms)
```
这里还有一个需要注意的地方： 如果 `beforeEach/before` 这样类型的生命中周期中， 有异步操作， 需要等异步操作结束之后， 在进行后续的测试用例。例如下面的示例， 我们是执行测试是运行成功的结果。
```js
describe('异步 beforeEach 示例', function() {
    var foo = false;

    beforeEach(function(done) {
        setTimeout(function() {
            foo = true;
            done();
        }, 50);
    });

    it('全局变量异步修改应该成功', function() {
        expect(foo).to.be.equal(true);
    });
});
```

### 测试用例管理 only(), skip()
**only()**                            
大型项目有很多测试用例。有时，我们希望只运行其中的几个，这时可以用 `only` 方法。describe块和it块都允许调用only方法，可以让mocha只测试此用例集合或者用例单元。其他的测试就测试集合或者用例单元就直接跳过不测试了。
```js
describe('Array', function() {
    describe('#indexOf', function() {
        it.only('should return -1 unless preset', function () {
            // 执行测试用例单元
        });
        it('should return the index when present', function () {
            // 不执行
        })
    })
})
```
在mochav3.0.0版本及以后，.only()可以被定义多次来定义一系列的测试子集。也就是说可以让mocha只测试only标记的用例集合或者用例单元， 其他的测试用例集合或者用例单元直接跳过。


**skip()**
和only()方法相反，.skip()方法可以用于跳过某些测试测试集合和测试用例。所有被跳过的用例都会被标记为pending用例，在报告中也会以pending用例显示。
```js
it.skip('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```
上面的测试用例就会直接跳过

有些时候，测试用例需要某些特定的环境或者一些特殊的配置，但我们事先是无法确定的。这个时候，我们可以使用this.skip() 根据条件在运行的时候跳过某些测试用例。
```js
it('should only test in the correct environment', function () {
    if(/* check the environment */) {
        // make assertions
    } else {
        this.skip()
    }
})
```
这个测试在报告中会以pending状态呈现。为了避免测试逻辑混乱，在调用skip函数之后，就不要再在用例函数或after钩子中执行更多的逻辑了。

我们也可以在异步的测试用例和钩子函数中使用.skip()来跳过多个测试用例或者测试集合。


### 配置文件mocha.opts
在服务端运行的时候，mocha会去加载test目录下的mocha.opts文件，来读取mocha配置项。这个配置文件中的每一行代表一项配置。如果运行mocha命令的时候，带上的配置参数与这个配置文件中的配置冲突的话，以命令中的为准。                    
这里介绍一些常见的配置命令行：
```


```




### 参考文章
- [mochajs.org](https://mochajs.org/)
- [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [测试框架Mocha](https://blog.csdn.net/hustzw07/article/details/73468970)


### 补充知识点儿
在mocha测试文件运行的路径下面可以建立这么一个文件，可以放置对mocha的一些配置命令行
`mocha.opts`                

配置项如下：              
```
--require intelli-espower-loader
--require babel-core/register
--growl
--recursive
--reporter spec
```

其中intelli-espower-loader 是一个解释性增强的插件
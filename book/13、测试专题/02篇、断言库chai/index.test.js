const chai = require('chai');
const expect = chai.expect;    // Using Expect style

describe('main', function () {
    describe('前端自动化测试之chai.js断言库', function () {
        describe('any/all', function () {
            it('any:用于检测该参数是否与实际值所对应的构造函数相匹配,在keys断言之前使用any标记（与all相反）', function () {
                expect({bar: 'bar', baz: 'baz'}).to.have.all.keys('bar', 'baz')
            });
            // 前有后面keys中之一就成立
            it('all:在keys断言之前使用all标记（与any相反）', function () {
                expect({bar: 'bar', yanle: 'lelele'}).to.have.any.keys('bar', 'baz')
            });
        });

        describe('a(type) / .an(type)： 用来断言变量类型', function () {
            it('should string', function () {
                expect('test').to.be.an('string');
            });
            it('should object', function () {
                expect({
                    foo: 'bar'
                }).to.be.an('object')
            });
            it('should null', function () {
                expect(null).to.be.an('null')
            });
            it('should undefined', function () {
                expect(undefined).to.be.an('undefined')
            });
            it('should Error', function () {
                expect(new Error).to.be.an('error')
            });
            it('should float32array', function () {
                expect(new Float32Array).to.be.a('float32array')
            });
        });

        describe('include(value) / contains(value)：Object | String | Number，包含某个内容', function () {
            it('should include 2', function () {
                expect([1, 2, 3]).to.be.include(2);
            });
            it('should include bar', function () {
                expect('foobar').to.be.include('bar');
            });
            it('should include keys foo', function () {
                let le = expect({
                    foo: 'bar',
                    hello: 'universe'
                }).to.be.include.keys('foo');
            });
        });

        describe('not 跟在链式调用后面的否定断言', function () {
            it('should not equal bar', function () {
                expect({
                    foo: 'bar'
                }).to.not.equal({foo: 'bar'})
            });
            it('should not equal foo: bar', function () {
                expect({foo: 'baz'}).to.have.property('foo').and.not.equal('bar');
            });
        });

        describe('deep 用来深度比较2个对象,一般用在equal和property前面', function () {
            it('should deep equal baz', function () {
                expect({
                    foo: 'baz'
                }).to.deep.equal({foo: 'baz'})
            });
            it('should deep equal object foo', function () {
                expect({foo: {bar: {baz: 'quux'}}}).to.have.deep.equal({
                    foo: {bar: {baz: 'quux'}}
                });
            });
        });

        describe('ok 断言目标是否为真(只判断值是否为真，类似==，隐式转换)', function () {
            it('should be ok string', function () {
                expect('everything').to.be.ok;
            });
            it('should be ok 1', function () {
                expect(1).to.be.ok;
            });
            it('should not be ok', function () {
                expect(false).to.not.be.ok;
            });
        });

        describe('true/.false 断言目标是否为布尔值true,false（这里与ok的区别是不进行类型转换，只能为true/false才能通过断言）', function () {
            it('should be true', function () {
                expect(true).to.be.true;
            });
            it('should q to not be true', function () {
                expect(1).to.not.be.true;
            });
            it('should false to be false', function () {
                expect(false).to.be.false;
            });
            it('should 0 to not be false', function () {
                expect(0).to.not.be.false;
            });
        });

        describe('null 断言目标为null', function () {
            it('should null to be null', function () {
                expect(null).to.be.null;
            });
            it('should undefined not to be null', function () {
                expect(undefined).not.to.be.null;
            });
        });

        describe('undefined 断言目标为undefined', function () {
            it('should undefined to be undefined', function () {
                expect(undefined).to.be.undefined;
            });
            it('should null not to be undefined', function () {
                expect(null).not.to.be.undefined;
            });
        });

        describe('NaN 断言目标为NaN', function () {
            it('should foo is be nan', function () {
                expect('foo').is.not.be.NaN;
            });
            it('should 4 is not be nan', function () {
                expect(4).is.not.be.NaN;
            });
            it('should NaN is to be nan', function () {
                expect(NaN).is.to.be.NaN;
            });
        });

        describe('exist 断言目标存在，既不为null，也不为undefined', function() {
            it('should hi is exist', function () {
                expect('hi').is.to.be.exist;
            });
            it('should empty string is to be empty', function () {
                expect('').is.to.be.exist;
            });
            it('should {} is to be exist', function () {
                expect({}).is.to.be.exist;
            });
        });

        describe('arguments 断言目标是一个参数对象arguments', function () {
            it('should arg is to has arguments', function () {
                // 这个玩意儿不知道怎么验证耶
                function func(arg) {
                    expect(arg).to.be.has.arguments;
                }
            });
        });

        describe('equal(value) 断言目标严格等于(===)value。另外，如果设置了deep标记，则断言目标深度等于value', function () {
            it('should hello is equal hello', function () {
                expect('hello').to.equal('hello');
            });
            it('should 42 is equal 42', function () {
                expect(42).to.deep.equal(42);
            });
        });

        describe('eql(value) 断言目标深度等于value，相当于deep.equal(value)的简写', function () {
            it('should foo eql foo', function () {
                expect({
                    foo: 'bar'
                }).to.eql({
                    foo: 'bar'
                })
            });
            it('should array eql array', function () {
                expect([
                    1,2,3
                ]).to.eql([
                    1,2,3
                ])
            });
        });

        describe('above(value) 断言目标大于（超过）value,也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息', function () {
            it('should 50 above 12', function () {
                expect(50).to.be.above(12);
            });
            it('should arr.length above 2', function () {
                expect([
                    1,2,3
                ]).to.have.length.above(2);
            });
        });

        describe('least(value) 断言目标不小于，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息', function () {
            it('should 23 is to be least 12', function () {
                expect(23).is.to.be.least(12);
            });
            it('should array.length least 2', function () {
                expect([
                    1,2,3
                ]).length.least(2)
            });
        });

        describe('below(value) 断言目标小于，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息', function () {
            it('should 5 below 12', function () {
                expect(5).to.below(12);
            });
            it('should array.length below 5', function () {
                expect([
                    1,2,3
                ]).length.to.below(5);
            });
        });

        describe('most(value) 断言目标不大于，也可接在length后来断言一个最小的长度。相比直接提供长度的好处是提供了更详细的错误消息', function () {
            it('should 5 to be most 12', function () {
                expect(5).to.be.most(12);
            });
            it('should array.length most 5', function () {
                expect([
                    1,2,3
                ]).to.have.length.most(5);
            });
        });

        describe('length 设置.have.length标记作为比较length属性值的前缀', function () {
            it('should string foo length above 2', function () {
                expect('foo').length.above(2);
            });
            it('should arr.length within 2,4', function () {
                expect([
                    1,2,3
                ]).length.within(2,4);
            });
        });

        describe('lengthof() 断言目标的length属性为期望的值', function () {
            it('should string foo lengthof 3', function () {
                expect('foo').lengthOf(3);
            });
            it('should arr.lengthOf 2,4', function () {
                expect([
                    1,2,3
                ]).has.lengthOf(3);
            });
        });

        describe('match(RegExp) 断言目标匹配到一个正则表达式', function() {
            it('should match', function () {
                expect(123123123).is.to.be.match(/^\d+/);
            });
        });

        describe('string(string) 断言目标字符串包含另一个字符串', function () {
            it('should foo has string fo', function () {
                expect('foo').to.has.string('fo');
            });
        })
    });


    describe('Chai.js断言库API中文文档', function() {
        
    })
});
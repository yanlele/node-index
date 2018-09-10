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
                expect([1,2,3]).to.be.include(2);
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
                expect({ foo: 'baz' }).to.have.property('foo').and.not.equal('bar');
            });
        })
    }) 
});
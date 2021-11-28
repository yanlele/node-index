# 测试

- assert 是nodejs原生的断言
- chai 是封装了的三方断言工具库
- power-assert 也是封装了的三方断言工具库
- mocha 专门用来测试的第三方框架，非常强大，推荐使用
- istanbul 是用来做单元测试覆盖率的，非常强大好用


### package.json 配置
```javascript
"scripts": {
    "test": "mocha 18年/2月/7、单元测试/test/02、mocha.js",
    "cover": "istanbul cover node_modules/mocha/bin/_mocha 18年/2月/7、单元测试/test/02、mocha.js"
},
```
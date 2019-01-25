## Jest测试框架

### 1.简介

**零配置测试平台**                         
Jest 被 Facebook 用来测试包括 React 应用在内的所有 JavaScript 代码。Jest 的一个理念是提供一套完整集成的 “零配置” 测试体验。

**高速和沙盒**                                   
Jest 跨工人以最大化性能并行化的测试运行。控制台消息都是缓冲并输出测试结果。沙盒测试文件和自动全局状态将为每个测试重置，因此测试代码间不会冲突。

**内置代码覆盖率报告**                                           
使用——coverage轻松创建代码覆盖率报告。不需要额外的设置或库!Jest可以从整个项目收集代码覆盖信息，包括未测试的文件。

**无需配置**                                    
在你使用 create-react-app 或 react-native init 创建你的 React 或 React Native 项目时，Jest 都已经被配置好并可以使用了。在 __tests__文件夹下放置你的测试用例，或者使用 .spec.js 或 .test.js 后缀给它们命名。不管你选哪一种方式，Jest 都能找到并且运行它们。


### 2.Getting Started

**安装**：                             
`yarn add --dev jest`                           
或者 `npm install --save-dev jest`

**开始编写第一个测试用例**：                            
在项目 `Test` 目录里面创建一个 `math.js` 的文件：
```js
export function sqrt(x) {
    if (x < 0) throw new Error("负值没有平方根");
    return Math.exp(Math.log(x)/2);
}
```

然后同级目录下面创建 `math.test.js` 的文件:
```js
import {sqrt} from './math';
describe('main', function () {
    test('4的平方根等于2', function () {
        expect(sqrt(4)).toBe(2)
    });
});
```

将下面的配置部分添加到你的 `package.json` 里面：
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

最后，运行 npm run test， Jest将打印以下消息
```
 PASS  Test/math.test.js
  main
    √ 4的平方根等于2 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.031s
```



### 参考文章
- [简书：Jest](https://www.jianshu.com/p/eaaf07c1b88f)
- [Jest官网](https://jestjs.io/docs/en/getting-started)
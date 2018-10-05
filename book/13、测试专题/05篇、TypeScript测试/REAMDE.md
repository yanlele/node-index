## 05篇、TypeScript测试

### <div id="class05-01">01、基础安装包的安装</div>
首先必须要安装如下几个安装包：
```json
{
  "name": "typescript-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/.bin/mocha test/index.test.ts",
    "cover-test": "./node_modules/.bin/istanbul cover node_modules/mocha/bin/_mocha test/index.test.ts"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.1.6",
    "@types/mocha": "^5.2.5",
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "ts-node": "^7.0.1",
    "typescript": "^3.1.1"
  }
}
```

### <div id="class05-02">02、测试用例的编写 和 配置文件的导入</div>

- 配置文件的导入
```
--recursive
--require ./node_modules/ts-node/register
--ui bdd
--timeout 60000
--watch-extensions ts
test/**/*.ts
```

- 测试代码的编写
```typescript
import 'mocha'
describe('main', function() {
    it('should ', function () {
        console.log(123);
    });
})
```


后续操作和JS的测试是一模一样的了


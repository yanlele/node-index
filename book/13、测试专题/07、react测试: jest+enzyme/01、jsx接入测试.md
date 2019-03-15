## jsx 接入测试


目录
- [依赖包安装](#依赖包安装)
- [基本配置](#基本配置)



### 依赖包安装               
这里默认是用的react16                              
`yarn add enzyme enzyme-adapter-react-16 jest babel-jest babel-preset-env react-test-renderer enzyme-to-json --dev`

### 基本配置
修改package.json script：                  
`"test": "jest --config=jest.config.js --notify --watchman=false --detectOpenHandles",`

分别添加jest.config.js和jest.setup.js：                           
这个地方我选择添加在根目录：                          
jest.config.js：
```js
const path = require('path');
module.exports = {
    rootDir: path.resolve(__dirname),
    setupFiles: ['./jest.setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    },
};
```

jest.setup.js：
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter(),
});
```

这个地方需要注意的是， 如果是放置在根目录的话， 其实是不需要再启动项加 `--config=jest.config.js` 配置的

更多的配置项和说明可以看这里：
```js
const path = require('path');
 
module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  collectCoverage: true, // 是否收集测试时的覆盖率信息
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,mjs}'], // 哪些文件需要收集覆盖率信息
  coverageDirectory: '<rootDir>/test/coverage', // 输出覆盖信息文件的目录
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/index.jsx'], // 统计覆盖信息时需要忽略的文件
  moduleNameMapper: { // 主要用于与webpack的resolve.alias匹配，注意正则写法
    '^src(.*)$': '<rootDir>/src$1',
    '^util(.*)$': '<rootDir>/src/util$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
  },
  setupFiles: ['<rootDir>/test/setup.js'], // 运行测试前可运行的脚本，比如注册enzyme的兼容
  testMatch: [ // 匹配的测试文件
    '<rootDir>/test/**/?(*.)(spec|test).{js,jsx,mjs}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
  ],
  testURL: 'https://test.com?empty=&num=0&str=str&cstr=中文&encode=%e4%b8%ad%e6%96%87', // 运行环境下的url，默认about:blank
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|less)$': '<rootDir>/test/cssTransform.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/fileTransform.js',
  },
  transformIgnorePatterns: [ // 转换时需要忽略的文件
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
};
```

需要注意的地方是我们自己项目里面的babel版本问题， 如果是最新的babel版本，那么直接就可以安装babel-jest 就可以了， 
但是因为我的项目babel 版本比较低， 所以我在安装babel-jest 的时候降低版本到了 version@22 版本。

### 添加一个最简单的测试用例
src/lib/sum.js：                 
```js
const sum = (a, b) => {
    return a + b
};
export default sum;
```

src/__tests__/sum.test.js：                  
```js
import sum from '../lib/sum';
describe('main', () => {
    it('adds 1 + 2 to equal 3', function () {
        expect(sum(1, 2)).toBe(3)
    });
})
```

然后执行： `yarn test / npm run test`, 执行结果如下
```
$ jest --config=jest.config.js --notify --watchman=false --detectOpenHandles
 PASS  src/__tests__/sum.test.js
  main
    ✓ adds 1 + 2 to equal 3 (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.195s
Ran all test suites.
```

# 从零构建一个TS-Node项目


## 总体概括
因为搭建的是node项目， 所以比前端项目搭建要简单很多。

从以下因素考虑

- 装包问题
    - yarn 
    - 配置项： `.yarnrc 、.npmrc`
    - `.gitignore`
- 代码规范
    - eslint
    - prettier
    - commititlint
- 测试
    - jest、ts-jest
- 代码构建
    - tsconfig
    - typeing
    
    
## 依赖问题
```json
{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "./src/main.js",
  "scripts": {
    "type-check": "tsc"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/module-creator/markdown-index.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/module-creator/markdown-index/issues"
  },
  "homepage": "https://github.com/module-creator/markdown-index#readme",
  "devDependencies": {
    "@types/jest": "^24.0.25",
    "@types/node": "^13.1.1",
    "@typescript-eslint/eslint-plugin": "^2.13.0",
    "@typescript-eslint/parser": "^2.13.0",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.9.0",
    "eslint-plugin-prettier": "^3.1.2",
    "jest": "^24.9.0",
    "prettier": "^1.19.1",
    "ts-jest": "^24.2.0",
    "typescript": "^3.7.4"
  }
}
```


## 装包问题
这个问题比较简单没有什么好说的， 推荐 yarn , 如果是非常复杂的项目， 推荐使用 yarn/workSpace + lerna 组合拳， 爽歪歪。

`.yarnrc`:
```
registry "https://registry.npm.taobao.org"
```

`npmrc`:                        
```
registry = https://registry.npm.taobao.org
```

`.gitignore`:
```
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules/

# testing
coverage/
/doc/
/mock2easy/

# production
/build
/coverage

worker/

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.idea
.idea/
/packages/**/*.js
/packages/**/*.js.map
!jest.config.js

tempDownload/

npm-debug.log*
yarn-debug.log*
yarn-error.log*
yarn.lock
package-lock.json
```


## 代码规范
`.eslintrc.js`:                     
```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    browser: false,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 1,
  },
};
```

`.prettierrc`:                      
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120
}
```

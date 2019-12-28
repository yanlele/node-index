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

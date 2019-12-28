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
    - 每次提交自动检测eslint\commitLint
- 测试
    - jest、ts-jest
- 代码构建
    - tsconfig
    - typeings
    
    
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
集成eslint、prettier
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

集成`commitlint` - `commitlint.config.js`: 
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert']],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
```


**每次提交自动检测eslint\commitLint：**                      
可以看这篇文章：[使用husky、prettier、lint、commitlint构建规范化项目实践](../../../19年/09月/01、使用husky、prettier、lint、commitlint构建规范化项目实践/01、使用husky、prettier、lint、commitlint构建规范化项目实践.md)

需要安装的依赖包：`yarn add @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli commitizen lint-staged husky --dev`

package.json
```json
{
   "scripts": {
      "type-check": "tsc",
      "prettier": "prettier --write",
      "commit": "commit"
    },
    "config": {
      "commitizen": {
        "path": "cz-conventional-changelog"
      }
    },
    "husky": {
      "hooks": {
        "pre-commit": "lint-staged",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
      }
    },
    "lint-staged": {
      "**/*.{js,ts,tsx}": [
        "yarn prettier",
        "git add"
      ],
      "**/*.{ts,spec.js,tsx}": [
        "eslint --fix",
        "git add"
      ]
    }
}
```


## 测试部分

装包：`yarn add @types/jest jest ts-jest --dev`

具体可以看看看这个文章： [jest测试基础](../../../book/13、测试专题/06篇、Jest测试框架/01、基础篇.md)

jest.config.js:                         
```js
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

## 代码构建
tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": false,
    //在表达式和声明上有隐含的any类型时报错
    "moduleResolution": "node",
    "typeRoots": [
      "node_modules/@type",
      "typings/modules",
      "node_modules"
    ],
    "allowJs": true,
    "emitDecoratorMetadata": true,
    //给源码里的装饰器声明加上设计类型元数据
    "experimentalDecorators": true,
    //启用实验性的ES装饰器
    "importHelpers": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "allowSyntheticDefaultImports": true,
    //    "outDir": "build",
    "baseUrl": ".",
    "lib": [
      "es6",
      "dom",
      "es7"
    ],
    "types": [
      "node",
      "@types/jest"
    ]
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules/",
    "src/**/*.spec.ts",
    "src/**/*.js"
  ]
}
```

## 总结
package.json
```json
{
  "name": "markdown-index",
  "version": "1.0.0",
  "description": "自动生成markDown 文档的索引导航",
  "main": "./src/main.js",
  "scripts": {
    "prepare": "npm run tsc",
    "lint": "eslint --ext .ts ./",
    "lint:fix": "yarn lint --fix",
    "type-check": "tsc",
    "prettier": "prettier --write",
    "commit": "commit",
    "test": "jest"
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "**/*.{js,ts,tsx}": [
      "yarn prettier",
      "git add"
    ],
    "**/*.{ts,spec.js,tsx}": [
      "eslint --fix",
      "git add"
    ]
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
    "@commitlint/cli": "^8.2.0",
    "@commitlint/config-conventional": "^8.2.0",
    "@commitlint/prompt-cli": "^8.2.0",
    "@types/jest": "^24.0.25",
    "@types/node": "^13.1.1",
    "@typescript-eslint/eslint-plugin": "^2.13.0",
    "@typescript-eslint/parser": "^2.13.0",
    "commitizen": "^4.0.3",
    "eslint": "^6.8.0",
    "eslint-config-prettier": "^6.9.0",
    "eslint-plugin-prettier": "^3.1.2",
    "husky": "^3.1.0",
    "jest": "^24.9.0",
    "lint-staged": "^9.5.0",
    "prettier": "^1.19.1",
    "ts-jest": "^24.2.0",
    "typescript": "^3.7.4"
  }
}
```

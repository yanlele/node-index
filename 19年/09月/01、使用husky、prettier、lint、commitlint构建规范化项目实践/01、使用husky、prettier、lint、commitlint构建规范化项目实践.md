## 使用husky、prettier、lint、commitlint构建规范化项目实践

### 安装依赖
```json
{
  "devDependencies": {
    "prettier-eslint-cli": "^5.0.0",
    "tslint-config-prettier": "^1.18.0",
    "@commitlint/cli": "^7.5.2",
    "@commitlint/config-conventional": "^7.5.0",
    "@commitlint/prompt-cli": "^7.5.0",
    "commitizen": "^3.0.7",
    "husky": "^3.0.5",
    "lint-staged": "^9.2.5",
  }
}
```


### eslint配置/tslint配置
这里以tslint 为例                
tslint.json                 
```json
{
  "extends": [
    "tslint-react",
    "tslint-eslint-rules",
    "tslint-config-prettier"
  ],
  "rules": {
    "class-name": true,
    "eofline": true,
    "forin": true,
    "jsdoc-format": false,
    "label-position": true,
    "member-ordering": [
      true,
      {
        "order": "statics-first"
      }
    ],
    "new-parens": true,
    "no-arg": true,
    "no-bitwise": true,
    "no-conditional-assignment": true,
    "no-consecutive-blank-lines": true,
    "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-variable": true,
    "no-eval": true,
    "no-internal-module": true,
    "no-namespace": true,
    "no-reference": true,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-trailing-whitespace": true,
    "no-unused-expression": true,
    "no-var-keyword": true,
    "one-variable-per-declaration": [true, "ignore-for-loop"],
    "radix": true,
    "switch-default": true,
    "trailing-comma": [
      true,
      {
        "singleline": "never",
        "multiline": "always",
        "esSpecCompliant": true
      }
    ],
    "triple-equals": [true, "allow-null-check"],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      },
      {
        "call-signature": "onespace",
        "index-signature": "onespace",
        "parameter": "onespace",
        "property-declaration": "onespace",
        "variable-declaration": "onespace"
      }
    ],
    "use-isnan": true,
    "variable-name": [
      true,
      "allow-leading-underscore",
      "ban-keywords",
      "check-format",
      "allow-pascal-case"
    ],
    "semicolon": [
      true,
      "always",
      "ignore-interfaces"
    ],
    "jsx-no-lambda": false,
    "jsx-no-string-ref": false,
    "jsx-boolean-value": [true, "never"],
    "jsx-no-multiline-js": false
  }
}
```

### prettier配置
.prettierrc                 
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 140,
  "semi": true,
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "requirePragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "ignore",
  "tabWidth": 2
}
```

### commitLint配置
commitlint.config.js                        
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
```


### 在package.json 做如下配置
```json
{
  "scripts": {
    "prettier": "prettier --write",
    "commit": "git-cz"
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
      "tslint --fix",
      "git add"
    ]
  }
}
```

### 运行
每次提交代码的时候， 直接 `yarn commit 就可以了`



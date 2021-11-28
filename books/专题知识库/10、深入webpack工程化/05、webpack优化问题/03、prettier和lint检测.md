## prettier和lint检测

装包：                     
`yarn add husky lint-staged prettier-eslint-cli --dev`
```json
{
    "@commitlint/cli": "^7.5.2",
    "@commitlint/config-conventional": "^7.5.0",
    "@commitlint/prompt-cli": "^7.5.0",
    "commitizen": "^3.0.7",
}

```


配置：                 
package.json                        
```json
{
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
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  },
  "scripts": {
    "prettier": "prettier --write",
    "commit": "git-cz",
    "preview": "cd dist && http-server -p 9527 -g -o"
  }
}
```

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

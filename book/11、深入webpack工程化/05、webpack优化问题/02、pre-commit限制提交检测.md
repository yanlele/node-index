## pre-commit限制提交检测

项目要使用git进行代码提交时，使用叫pre-commit的git钩子，在调用git commit 命令时自动执行某些脚本检测代码，若检测出错，则阻止commit代码，也就无法push，保证了出错代码只在我们本地，不会把问题提交到远程仓库

### 基础使用
安装包：                    
`npm install pre-commit --save-dev`

添加pre-commit 字段                             
```json
{
  // 例子, 在提交之前运行tslint
  "scripts": {
    "tslint-fe": "tslint -c ./corgi-fe/tslint.json './corgi-fe/src/**/*.{ts,tsx}'",
    "tslint-service": "tslint -c ./corgi-service/tslint.json -p ./corgi-service/tsconfig.json"
  },
  "devDependencies": {
    "pre-commit": "^1.2.2"
  },
  "pre-commit": [
    "tslint-fe",
    "tslint-service"
  ]
}
```

如果想要跳过pre-commit. 可以在commit命令之后加上--no-verify字段.


### 另外一种使用方式（推荐）
安装                              
`npm i husky lint-staged -save-dev`

package                         
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
  },
  "lint-staged": {
    "**/*.js": "eslint --ext .js",
    "**/*.vue": "eslint --ext .vue"
  }
}
```


### 参考文章
- [husky+ prettier + commitlint 提交前代码检查和提交信息规范](https://www.cnblogs.com/detanx/p/codeFormat.html)
- [使用Prettier和Eslint格式化(修复)代码](https://www.petershi.net/archives/2594)
- [使用Prettier来自动格式化项目的提交代码](http://ju.outofmemory.cn/entry/335890)
- [vscode从听说到使用，vetur，prettier，htmljscssPrettify踩坑指南](https://blog.csdn.net/sisierda/article/details/79405240)





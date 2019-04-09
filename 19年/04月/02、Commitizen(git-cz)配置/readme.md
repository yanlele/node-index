# Commitizen(git-cz)配置

首先，本地安装Commitizen `npm install commitizen --save-dev`                   

然后安装 `cz-conventional-changelog` ，cz-conventional-changelog是一个适配器，用来适配不同代码的提交。
`npm install cz-conventional-changelog --save-dev`                          

然后在package.json的root添加                  
```
"config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

现在便可以使用Commitizen来提交git commit，具体用法就是，在git commit的时候改为使用git-cz.这里我把命令写进npm script中
```
"scripts": {
    "commit": "git-cz"
  }
```


### 如果希望加上commit-lint
首先要安装如下几个包：
```
"@commitlint/cli": "^7.5.2", // 核心包
"@commitlint/config-conventional": "^7.5.0",  // lint扩展
"@commitlint/prompt-cli": "^7.5.0", 
"husky": "^1.3.1",
```

然后配置package.json
```
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
},
```

最后在根目录添加 `commitlint.config.js` 文件
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0],
  },
};
```



### 参考文章
- [https://www.jianshu.com/p/28617fd95c67](https://www.jianshu.com/p/28617fd95c67)

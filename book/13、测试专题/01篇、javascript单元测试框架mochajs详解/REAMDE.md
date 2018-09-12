


### 补充知识点儿
在mocha测试文件运行的路径下面可以建立这么一个文件，可以放置对mocha的一些配置命令行
`mocha.opts`                

配置项如下：              
```
--require intelli-espower-loader
--require babel-core/register
--growl
--recursive
--reporter spec
```

其中intelli-espower-loader 是一个解释性增强的插件
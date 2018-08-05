# Webpack 3.0 前端工程化             

我的目的是这个做一个最强大的webpack教程手册，供以后工作中翻阅查询                

目录：             
- [一、由浅入深Webpack](#class1)

## <p id='class1'>一、由浅入深Webpack</p>              

### <p id='class1-item01'>01、最基本的使用webpack</p>          
全局安装webpack之后，可以通过这几个命令来使用最简单的webpack                          
`webpack -h` 查看基本信息             
`webpack -v` 查看版本信息             
`webpack <entry> [<entry>] <output>` 最基本的打包命令行              
`webpack --config <webpack.config.js>` 最基本的命令行打包                


### <p id='class1-item02'>02、打包js</p>          
在目录 `book/11、深入webpack工程化/01、由浅入深Webpack/02、打包js` 下面建立两个文件 一个是 `app.js` 另外一个是 `sum.js`                  
并且书写相关代码，然后使用命令行打包来试一试效果看看如何, 这种命令行必须要在当前文件目录下面进行, 命令行: `webpack app.js bundle.js`                   
打包之后的文件放在html中执行，就可以直接执行了。 - 说明webpack支持ES6规范

在添加一个文件 `minus.js`文件，添加commonjs规范的模块化文件，添加到 `app.js` 文件中，打包之后执行成功。 - 说明webpack支持commonjs模块化规范                   





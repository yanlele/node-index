## <div id="class4">四、webpack实战场景</div>

### <div id="class4-item01">01、打包结果分析</div>
这个不重要， 略过，如果以后有需要这方面知识的时候，在回来补。


### <div id="class4-item02">02、打包速度优化</div>
影响webpack打包的速度的因素： 文件多、依赖多、页面多；                 

解决webpack打包速度慢的一些方法：                

方法一：                
分开业务代码和依赖第三方代码：分开vendor 和 app; 可以动过DllPlugin和DllReferencePlugin 这两个插件来解决。

方法二：                    
UglifyJsPlugin 压缩代码的时候是非常慢的。传递参数 parallel: true  和使用cache: true。                    

方法三：
使用HappyPack可以让所有的loader并行处理。 HappyPack.ThreadPool这个东西想用的时候还是可以去研究一下。                

方法四：                
babel-loader可以看起缓存，options.cacheDirectory: true, 还有就是尽量规定我们打包的范围include 和 exclude。

#### 其他影响打包速度的因素
减少resolve， 祛除Devtool: sourcemap。                    
cache-loader                    
升级node 和 升级webpack                      

#### 实际优化代码                         
实例代码以vue官方脚手架初始化的代码为例               
```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vue: ['vue', 'vue-router'],
        ui: ['element-ui']
    },
    output: {
        path: path.join(__dirname, '../src/dll/'),
        filename: '[name].dll.js',
        library: ['name']
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../src/dll', '[name]-manifest.js'),
            name: '[name]'
        }),
        
        new webpack.optimize.UglifyJsPlugin()
    ]
};
```
打包出来会出来两个json, 这两个json文件就会告诉我也业务代码，怎么区分三方依赖和自己的业务代码。
接下来
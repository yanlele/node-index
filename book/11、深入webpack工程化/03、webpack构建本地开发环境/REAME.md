## <div id="class3">三、webpack构建本地开发环境</div>
搭建本地开发环境，通常有三种方式：                   
webpack watch mode: 需要自己搭建服务器               
webpack-dev-server: 官方给搭建的服务器               
express + webpack-dev-middleware: 自己可扩展性特别高             


### <div id="class3-item01">01、webpack_watch_mode</div>
直接执行命令行 webpack -watch / webpack -w 就可以了                

#### 模块的安装                  
如果需要每次启动webpack 的时候，就删除之前已经打包生成的文件，就可以用到： npm install clean-webpack-plugin --save-dev

#### webpack 配置
每次启动webpack的时候，就要自动删除打包文件目录                     
```javascript
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.[hash:5].js',
        publicPath: '/',
        chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
    },
    plugins: [
            //......
            new CleanWebpackPlugin(['dist']),
        ]
}
```
--display-reasons
执行命令行 `webpack --watch --progress --display-reasons --color` 可以看到打包过程              
但是我们访问的时候还是只能通过打包后的文件访问，虽然更改了代码文件，打包文件会跟着发生变化，但是并没有起到根本上解决绝对路径的问题；                  
这个时候需要本地搭建一个本地服务才行；


### <div id="class3-item02">02、webpack-dev-server</div>                     
### 作用
live reloading 就是文件改变之后，可以自动帮我们刷新                   
不能打包文件          
路径的重定向              
支持https             
在浏览器中显示编译错误                     
接口代理                
模块热更新               


### 配置参数
devServer
inline:                
contentBase: 设置文本路径             
port: 端口                
historyApiFallback：错误页面重定向                  
支持https: true/false             
proxy：代理
hot: 是否热更新                  
openpage: 打开初始页面                
lazy: 懒模式，访问什么页面就打包什么页面                 
overlay: 错误提示的遮罩

### 安装
npm install webpack-dev-server --save-dev               

### 具体配置                
```javascript
module.exports = {
    devServer: {
        port: 3001
    },
}
```
然后在根目录文件的package.json 配置 "server": "webpack-dev-server --open" 就可以启动了
**这个地方**这个地方的测试，可能需要把这个文件夹下面的项目拷贝出来，然后另外找地方安装模块和执行才能看得到效果。
这个地方还有一个坑，就是如果只安装了webpack-dev-server 很可能起不起来服务，还要安装webpack-cli: `npm install webpack-cli --save-dev`                    
还有一个很坑的地方，就是本套教程中讲述的webpack-dev-server版本是2版本的，但是最新的webpack-dev-server是3版本的，所以启动方式不一样了。这个地方需要去看看官网。          
然后安装2.x版本之后，就可以顺利运行。


**扩展知识点**
介绍一款牛逼的webpack-dev-server的日志监控系统： [jarvis](https://github.com/zouhir/jarvis)                    
使用的时候，直接安装 `npm install webpack-jarvis --save-dev`                  
然后做如下的配置就可以了：           
```javascript
const Jarvis = require("webpack-jarvis");

/* the rest of your webpack configs */

plugins: [
  new Jarvis({
    port: 1337 // optional: set a port
  })
];
```

**其他的配置项：**

historyApiFallback: true （任何路径都会重定向我们的首页地址）             


**踩坑记录，有一个非常非常坑人的地方**                   

就是在配置 `babel-plugin-transform-runtime` 插件的时候，按照官方配置，无论如何都会出错，也不知道是什么原因导致的，出现这个问题，最快的解决办法，直接把这个插件删除就是了。                  



### <div id="class3-item03">03、Proxy</div>              
实质上是直接集成了 `http-proxy-middleware` 而已                        
设置的时候，使用devServer.proxy

#### 配置参数                       
target: 指定代理地址                  
changeOrigin: 改变源到url ,改为true                       
headers: 添加公共请求头                      
logLevel:                   
pathRewrite: 重定向一个地址                    


#### 配置项                    
这个时候利用我们的本地服务为代理信息：      
```
devServer: {
    port: 3000,
    proxy: {
        '/':{
            target: 'http://localhost:3002',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                '':'/api/'
            }
        }
    }
},
```   
这个写法就是把远端/api/开头的请求，代理的本地的时候，直接就用 `/` 就可以了。                 
如果不开启pathRewrite，那么直接就 /下去就可以了：             
```
devServer: {
    port: 3000,
    proxy: {
        '/api':{
            target: 'http://localhost:3002',
            changeOrigin: true,
            logLevel: 'debug'
        }
    }
},
```  


### <div id="class3-item04">04、模块热更新 Module Hot Reloading</div> 
热更新，就是不刷新浏览器的情况下，刷新页面：                  

优点：保持数据状态，节省调试时间，样式调试更快

#### 模块
devServer.hot                       
webpack.HotModuleReplacementPlugin                  
webpack.NamedModulesPlugin              

#### 配置
module.hot.accept 其实可以自动帮我们更新插入                     
module.hot.decline 可以排除某些路径停止热更新            
```javascript
devServer: {
    port: 3000,
    proxy: {
        '/':{
            target: 'http://localhost:3002',
            changeOrigin: true,
            logLevel: 'debug',
            pathRewrite: {
                '':'/api/'
            }
        }
    },
    hot: true,
    hotOnly: true,
}
//........
plugin: {
    new Webpack.HotModuleReplacementPlugin()

    new Webpack.NamedModulesPlugin()
}

```
如果需要对js进行热更新，那么需要添加如下代码：            
```javascript
if(module.hot) {
    module.hot.accept();
}
```

对于 JS 的热更新是一个很蛋疼的东西，不建议去研究，如果以后需要使用的时候再去研究就可以了。                 
如果是react或者vue项目，只需要引用
hotOnly: 设置为true之后，无论如何都不会自动触发全局的页面刷新                  

**踩坑记录**

在这种方式有一个致命的问题，就是我们一定要使用 style-loader; 但是我们平常用的配置都是 `ExtractTextWebpackPlugin` ，这种写法就是没有办法使用热更新的。                    
解决这个这个的办法，最好是区分一下dev环境和product环境。                   


### <div id="class3-item05">05、开启调试模式Source Map</div> 
我们打包之后的文件是进行编译过的，如果是报错了以后，很难告诉用户代码错误在第几行，很难调试；source map 就是进行这个作用的；                 

实现办法：               
DevTool (主要使用这个)                
webpack.SourceMapDevToolPlugin              
webpack.EvalSourceMapDevToolPlugin                  

Development(开发环境): 一般会使用到四个参数
eval        
eval-source-map             
cheap-eval-source-map               
cheap-module-eval-source-map                

Production(生产环境)： 一般会使用到三个参数                                
source-map              
hidden-source-map                   
nosource-source-map                 


#### 相关的配置
需要很多相关的loader:              
css-loader.option.sourcemap             
less-loader.option.sourcemap             
sass-loader.option.sourcemap             


#### 具体配置代码
```
module.exports = {
    devtool: "eval",
}
```
如果开启eval 模式， 不仅有文件自己的文件，但是还有webpack 转化的代码；                  
如果开启source-map 模式， 这个时候就可以看到我们所有打包的内容和自己写的本地开发文档是一模一样的了。 但是要注意的地方是，我们开启这个source-map的时候，一定要先删除 `new Webpack.optimize.UglifyJsPlugin()` 这个插件                          
但是一般来说，开发过程中，建议选择 `cheap-module-source-map` 这种模式；
线上的打包，一般可以直接就选择 `source-map`;                   


**处理css的source-map**                    
所有处理css的loader里面，都要加上 `sourceMap: true` 属性；但是值得注意的地方是，我们这个时候 style-loader 的 options 里面 `singleton: true` 属性要取消掉。
```
{
    test: /\.less$/,
    use: [
        {
            loader: 'style-loader',
            options: {
                // singleton: true,
                transform: './css.transform.js',
                sourceMap: true
            }
        },
        {
            loader: 'css-loader',
            options: {
                // minimize: true,
                // modules: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]',
                sourceMap: true
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: [
                    require('postcss-cssnext')()
                ],
                sourceMap: true
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: true
            }
        }
    ]
}
```


### <div id="class3-item06">06、设置EsLint检查代码格式</div> 
#### 需要安装的依赖包                   
eslint             
eslint-loader               
eslint-plugin-html              
eslint-friendly-formatter                   

`npm install eslint eslint-loader eslint-plugin-html eslint-friendly-formatter eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard --save-dev`


#### eslint配置                   
主要是webpack config的配置 和 .eslintrc 文件的配置                  
也可以在package.json 中的eslintConfig中配置                  

推荐一个 Javascript Standard Style (https://standardjs.com/) js标准规范的集合                  
eslint-config-standard              
eslint-plugin-promise               
eslint-plugin-standard                      
........                    

**eslint-loader**                       
options.failOnWarning               
options.failOnError                 
options.formatter 第三方检测格式                   

devServer.overlay 可以在浏览器中看到我们的编译提示错误

 
#### 说明
对于eslint这个地方的研究以后自己去研究就可以了。


### <div id="class3-item07">07、区分开发环境和生产环境</div>

#### 不同点
开发环境                    
    模块热更新                   
    sourceMap                       
    接口代理                            
    代码规范                    
    
生产环境                    
    提取公用代码                      
    压缩混淆                    
    文件压缩和图片压缩                       
    祛除无用的代码                         
    

#### 相同点
同样的入口               
同样的代码处理（loader处理）                       
同样的解析配置                 

#### 实现区分
需要使用工具 `webpack-merge`              
webpack.dev.conf.js                 
webpack.prod.conf.js                
webpack.common.conf.js                  

我们可以在package.json里面，多设置几个script脚本，来区分各个不同的环境                                            
这一节主要是实战，所以直接贴代码                                    
webpack.common.conf:        
```javascript
const productionConfig = require('./webpack.prod.conf');
const developmentConfig = require('./webpack.dev.conf');

const merge = require('webpack-merge');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generateConfig = env => {
    /*插件部分*/
    //提取代码的公用插件
    const extractLess = new ExtractTextWebpackPlugin({
        filename: (getPath) => {
            return getPath('css/[name].min.[hash:5].css').replace('css/js', 'css');
        },
        allChunks: false
    });


    /*loader部分*/
    // 打包编译JS
    const scriptLoader = [
        {
            loader: 'babel-loader'
        }
    ];
    //打包编译css
    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                minimize: env === 'production',
                // modules: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
                plugins: [
                    require('postcss-cssnext')()
                ].concat(
                    env === 'production' ?
                        require('postcss-sprites')({
                            spritePath: './dist/assets/img/sprites',
                            retina: true
                        }) : []
                )
            }
        },
        {
            loader: 'less-loader'
        }
    ];
    //打包编译样式
    const styleLoader = env === 'production'
        ? ExtractTextWebpackPlugin.extract({
            fallback: {
                loader: 'style-loader',
                options: {
                    singleton: true,
                    transform: './css.transform.js'
                }
            },
            use: cssLoaders
        }) : [{
            loader: 'style-loader',
            options: {
                // singleton: true,
                transform: './css.transform.js',
                sourceMap: true
            }
        }].concat(cssLoaders);
    // 打包编译文件
    const fileLoader = env === 'development' ? [
        {
            loader: 'file-loader',
            options: {
                options: {
                    outputPath: './img/',
                }
            }
        }
    ] : [
        {
            loader: 'url-loader',
            options: {
                limit: 1024 * 2,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        outputPath: './img/',
                    }
                }
            }
        }
    ];

    return {
        entry: {
            app: './src/app.js'
        },

        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[name].bundle.[hash:5].js',
            publicPath: '/',
            chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
        },

        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, '../src/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, '../src')],
                    exclude: [path.resolve(__dirname, '../src/lib/jquery.min.js')],
                    use: scriptLoader
                },
                {
                    test: /\.less$/,

                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader.concat(
                        env === 'production' ?
                            {
                                loader: 'img-loader'
                            }: []
                    )
                },
                {
                    test: path.resolve(__dirname, 'src/app.js'),
                    use: [
                        {
                            loader: 'imports-loader',
                            options: {
                                $: 'jquery'
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:src', 'img:data-src']
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024 * 50,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        // useRelativePath: true,
                                        publicPath: '../fonts',
                                        outputPath: 'fonts',
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            extractLess,

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                chunks: ['app'],
                minify: {
                    collapseWhitespace: false                //祛除空格
                }
            }),

            new Webpack.ProvidePlugin({
                $: 'jquery'
            }),
        ]
    }
};

module.exports = env => {
    let config = env === 'production' ? productionConfig : developmentConfig;

    return merge(generateConfig(env), config)
};
```
开发环境：               
```javascript
const Webpack = require('webpack');
const Jarvis = require('webpack-jarvis');

module.exports = {
    devtool: "cheap-module-source-map",

    devServer: {
        port: 3000,
        proxy: {
            '/': {
                target: 'http://localhost:3002',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '': '/api/'
                }
            }
        },
        hot: true,
        hotOnly: true,
    },

    plugins: [

        new Webpack.HotModuleReplacementPlugin(),

        new Webpack.NamedModulesPlugin(),

        new Jarvis({
            port: 3001
        }),
    ]
};
```
生产环境：                       
```javascript
const path = require('path');
const Webpack = require('webpack');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ]),
        }),


        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new Webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin(['dist']),
    ]
};
```
[源码请见：07、区分开发环境和生产环境](./07、区分开发环境和生产环境)



### <div id="class3-item08">08、使用middleware搭建开发环境</div>
#### 常用模块               
express / koa               
webpack-dev-middleware              
webpack-hot-middleware              
http-proxy-middleware                   
connect-history-api-fallback                
opn 自动弹出浏览器


#### 安装依赖
`npm install express opn webpack-dev-middleware webpack-hot-middleware http-proxy-middleware connect-history-api-fallback --save-dev`

#### 具体实现               
```javascript
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const app = express();
const port = 3000;

const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const proxyMiddleWare = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('./webpack.common.conf')('development');
const proxyTable = require('proxy');
const compiler = webpack(config);

for (let context in proxyTable) {
    app.use(proxyMiddleWare(context, proxyTable[context]))
}

app.use(webpackDevMiddleWare(compiler,  {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleWare(compiler));

app.listen(port, function() {
    console.log('success listen to ' + port);
    opn('http://localhost' + port);
});
```
[源码请见：07、区分开发环境和生产环境]
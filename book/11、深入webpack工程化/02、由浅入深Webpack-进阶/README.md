## <div id="class2">二、由浅入深Webpack - 进阶</div>

- [01、文件处理 - 图片处理](#class2-item01)
- [02、文件处理-字体处理](#class2-item02)
- [03、文件处理-处理第三方JS库](#class2-item03)
- [04、html-in-webpack-生成html](#class2-item04)
- [05、html中引入图片](#class2-item05)
- [06、配合优化](#class2-item06)

### <div id="class2-item01">01、文件处理 - 图片处理</div>
文件处理分为： 图片处理、字体处理、第三方JS库（CDN地址）                                     

图片的处理：css中引入的图片、自动合成雪碧图、压缩图片、Base64编码图片                 

#### 需要用到的一些组件                  
file-loader、url-loader、img-loader、postcss-sprites                       
模块的安装 `npm install file-loader url-loader img-loader postcss-sprites --save-dev`                    
在安装模块的时候，一直会出现报错问题： `phantomjs-prebuilt@2.1.16 install: `node install.js``                      
解决办法：先安装 `npm install phantomjs-prebuilt@2.1.16 --ignore-scripts`

#### 这些组件的使用 - file-loader                    
首先把图片文件放在sec/assets/img/目录下面                
在common.less中定义图片的使用                    
```css
.bigBox {
    border: 5px solid #000000;
    height: 400px;
    width: 400px;
    color: #000000;

    > div {
        width: 128px;
        height: 128px;
        float: left;
    }

    .ani1 {
        background: url("../assets/img/1.jpg") no-repeat;
    }

    .ani2 {
        background: url("../assets/img/2.jpg") no-repeat;
    }
    .ani3 {
        background: url("../assets/img/3.jpg") no-repeat;
    }
    .ani4 {
        background: url("../assets/img/4.jpg") no-repeat;
    }
}
```
然后在html中直接去使用就可以了
```html
<div class="bigBox">
    <div class="ani1"></div>
    <div class="ani2"></div>
    <div class="ani3"></div>
    <div class="ani4"></div>
</div>
```
然后更改我们的webpack配置文件：                 
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
}
```
然后直接执行打包命令：结果是我们在根目录下面看到了四张通过file-loader处理的打包文件，直接访问页面是访问不到图片的，因为图片打包的路径有问题。                    
处理方法：
通过配置file-loader的options来控制路径问题                  
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './dist/',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },
}
```    
然后重新打包，然后我们图片文件打包的地址就做了处理了，跟之前引用的图片地址是一样的了，输出的文件地址是正确的。             
但是在html访问的时候，依然访问不到图片，图片相对文件还是访问地址是错误的。                     
在这里时候，我们还需要继续对options进行设置 ，增加一个publicPath 配置项                   
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './assets/img',
                            outputPath: '',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },
}
```          
这种配置是针对于页面就在根目录下面的情况做出的配置项                      
打包之后，就可以直接运行html， 就可以成功访问到我们定义的图片地址了；               

**遗留问题：但是这样会存在一个遗留问题，就是如果我的图片地址不是放置在src/assets/img 目录下面的，然后我就没有办法访问了。**                 

这种情况的解决办法：              
就是不使用useRelativePath， 然后直接用 outputPath 配置输出路径，然后用 publicPath 配置文件调用路径。
实例如下：                   
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../img',
                            outputPath: 'img',
                        }
                    }
                ]
            }
        ]
    },
}
```
这样打包之后，所有的图片文件都会存放在img文件路径下面，publicPath 相对于css的文件路径而言的东西，这样就可以轻松找到我们所需要的静态图片的位置了。                   

#### 使用url-loader，用base64编译图片                    
如果需要设定，当图片大小，小于多少的时候，使用base64来编译图片.                 
这个时候就要使用 url-loader:                
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10
                        }
                    }
                ]
            }
        ]
    },
}
```
这样的话，打包之后，就会发现少了图片文件，但是打开页面之后，又会发现，少了的图片，依然可以展示和打开。因为小于10K的图片已经转为base64，写在了JS代码里面了。                 
但是因为没有其他的配置项，所以打包出来的文件，也就是大于10K的文件，路径错误了。更改路径错误的办法，跟配置file-loader处理方式是一样的。                  
实际上，他在这个地方的作用是跟file-loader作用是一样的。只是多了转换base64图片的功能。

这里有一点需要注意的是，上面的是老版本的url-loader的配置方式，新版本的url-loader配置如下：             
```javascript
module.exports = {
    module: {
        rules: [
            //......
            {
                loader: 'url-loader',
                options: {
                    limit: 1024 * 10,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            // useRelativePath: true,
                            publicPath: '../img',
                            outputPath: 'img',
                        }
                    }
                }
            }
        ]
    },
}
```      

#### 压缩雪碧图和压缩图片质量 img-loader 和 postcss-sprites                          
通过配置img-loader，可以实现压缩图片的功能，但是这个功能并不常用：                  
因为img-loader版本更迭，所以最新文档请见：  [img-loader](https://github.com/vanwagonet/img-loader)         
最新版本的配置项如下：                 
```javascript
{
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                })
              ]
            }
          }
        ]
      }
    ]
  }
}
```

**合成雪碧图**                   
webpack 配置项直接在postcss的基础上配置一条require('postcss-sprites')() 就可以了，这是最基本的用法；
但是这种方式会在项目根目录，生成一个sprite.png的文件，这并不是我们想要的结果，所以对配置项进行如下修改：                   
```javascript
module.exports = {
    //.......
    module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: {
                            loader: 'style-loader',
                            options: {
                                singleton: true,
                                transform: './css.transform.js'
                            }
                        },
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // minimize: true,
                                    // modules: true,
                                    localIdentName: '[path][name]_[local]_[hash:base64:5]'
                                },
                                // loader: 'file-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        // require('autoprefixer')(),
                                        require('postcss-sprites')({
                                            spritePath: './dist/assets/img/sprites'
                                        }),
                                        require('postcss-cssnext')()
                                    ]
                                }
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
                }
                //.......
            ]
        }
        //.......
}
```
**注意：** 但是这样还会有一个非常致命的缺点，就是在设置background-size 的时候，必须跟图片一样的大小，要不然css没有办法切割雪碧图。                    
而且还有一个待解决和待研究的地方： 压缩后的雪碧图，文件体积非常的大。                     

在通常情况下，设计师会根据屏幕大小，谁知不同大小的设计稿，这儿时候就要用到postcss-sprites的其他参数，retina:true,
这个时候，图片或者图标需要该名称为 XXX@2x.png 类似于这样的结尾标识符                


### <div id="class2-item02">02、文件处理-字体处理</div>                  
文件字体处理的方式，实际上还是用到的是file-loader 和 url-loader                      
直接通过如下的简单处理：            
```javascript
{
    test: /\.(eot|woff2|woff|ttf|svg)$/,
    use: [
        {
            loader: 'url-loader'
        }
    ]
}
```
这样处理之后，会吧字体文件全部打包到css里面去，会导致css非常的大; 后续继续使用file-loader来处理文件。
```javascript
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
```
这样就是小于50K的文件，会直接打包到css里面去，如果大于50K的，就用file-loader来处理；                            


## <div id="class2-item03">03、文件处理-处理第三方JS库</div>                   
我们在项目里面一般都会有自己通用的模块，那么我们在处理自己通用库和模块的时候，这个库和模块是非常通用的，我们不希望每次使用的时候都要加载一遍它，我们希望这个模块功能只加载一次，以后使用的时候可以直接调用就可以了。
这个时候处理方式是： webpack.providePlugin 可以给我们所有的模块传递参数，传递对象参数的文件就是json格式；              
第二个处理方式： imports-loader；
第三种处理方式是： 全局window对象；           

本节项目中，用jQuery为例子来说，如果是直接引用的cdn的jQuery，那么直接引用，就可以使用$符号了；                                 

#### 模块化的jquery使用方式                     
如果jQuery是通过npm install 来安装的，这个时候我们可以在webpack中添加如下的设置：               
```javascript
module.exports = {
    plugins: [
        //......
        new Webpack.ProvidePlugin({
            $: 'jquery'
        })
        //......
    ]
}
```
然后直接打包是没有问题的，可以征程运行的。                           


#### 如果公共资源包在本项目内部的那种情况处理办法                      
首要要保证本地模块化安装的时候没有jQuery： npm uninstall jquery --save                    
如果不更改配置，直接打包上面的文件，是找不到模块的。这个时候我们就要用到resolve.alias: 别名的方式，解析到我们放置jQuery的目录去。                     
所以多添加一条这样的配置就可以了                                             
```javascript
module.exports = {
    //......
    resolve: {
         alias: {
             jquery$: path.resolve(__dirname, 'src/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
         }
    },
    //......
}
```

#### 使用imports-loader 可以插入第三方变量                 
这个loader 可以作用在我们具体某一个文件下面，让那个引用的文件里面的模块做为通用变量的范围来使用                     
在webpack 中做如下配置：                    
```javascript
module.exports = {
    module: {
        rules: [
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
            }
        ]
    }
}
```
这个时候，就可以删除Webpack.ProvidePlugin插件了，然后jquery文件的查找，跟上面两种方式是一样的


### <div id="class2-item04">04、html-in-webpack-生成html</div>
因为每次打包都会生成不同的HTML，所以我们希望没吃都自动引入JS，css等静态资源                      
自动生成html、场景优化、

#### 生成html: HtmlWebpackPlugin                  
通过这个插件生成一个html的时候，我们通常会给定一个模板，这个模板使我们想要的html结构
配置项:                
template: 指定配置的模板                   
filename: 输出文件名                 
minify: 是否压缩                    
chunks: 指定那些chunk是需要自动加入到html中的                     
inject: 是否通过标签形式插入html中，如果改为false，那就只能手动插入了

**首先安装模块：** npm install html-webpack-plugin --save-dev                      
webpack 做如下配置：                      
```javascript
module.exports = {
    plugins: [
        //......
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: false,
        }),
        //......
    ]
}
```
做如下配置之后，就只会生成html, 但是不会自动插入js和css文件                 
如果我们做修改的时候，把CSS和JS都改为有版本号的文件名字, 然后祛除inject:false            
打包之后，会发现样式和JS都被自动注入成功了                      

#### 多entry注入                   
如果我们不指定chunks的情况下，那么会自动把所有的entry， 都注入到html中去，但是如果指定了chunks，那么只会把指定的chunks注入到页面中去；               
```javascript
module.exports = {
    plugins: [
        //......
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['app'],
            minify: {
                collapseWhitespace: true                //祛除空格
            }
        }),
        //......
    ]
}
```


#### 解决加载不到JS和CSS的问题                        
按照上面的打包之后，打包是没有问题的，就是打包之后的页面访问不到资源，因为是资源路径有问题：                      
原因是出在了publicPath身上，在entry配置中，删除publicPath， 或者设置为空就可以了；                          

可以尝试结合图片打包，都是没有任何问题的


### <div id="class2-item05">05、html中引入图片</div>
想在html中引入图片，我们所需要借助的就是html-loader                   
配置项：                    
attrs: [img:src]                

#### 安装模块
npm install html-loader --save-dev                  

#### 具体使用               
如果我们不做任何处理，直接打包，打包之后的文件是找不到图片资源的.                   
我们在所有loader的最后面配置如下的loader：             
```javascript
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
}
```
然后打包，发现文件的路径确实是被替换了的，文件也被处理好了，但是还是会出现引用地址错误的问题。

这个时候我们做如下的配置更改，更改url-loader配置项：                     
```javascript
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
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
        },
        {
            loader: 'img-loader'
        }
    ]
}
```
然后打包，发现html中图片位置正常了，但是css打包的图片地址又有问题了。
这个原因是我们没有一个绝对路径的配置，我们只有相对路径的配置。因为我们上线项目中，网站的根目录就是我们的绝对路径，但是本项目里面没有绝对路径。这种情况就需要我们自己来进行配置，配置一个绝对路径就可以了。                   

#### 设置本项目的绝对路径
修改output里面的publicPath 就可以实现我们的目的
```javascript
module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[hash:5].js',
        publicPath: '/',
        chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
    },
}
```

但是这样之后，所有的路径都变成了根目录下面找资源了，但是我们本地访问就直接死掉了。因为没有服务器，没有办法设置根路径。


#### 处理html中图片的其他办法             
通过require可以引入图片，这样我们不通过html-loader，也是可以处理图片问题的；                     
`<img src="${require('./src/assets/img/react.jpg')}" alt="react">`                      


### <div id="class2-item06">06、配合优化</div>
提前载入webpack 加载代码:                   
inline-manifest-webpack-plugin                  
html-webpack-inline-chunk-plugin                 
本节介绍的是第二个插件的使用                      
可以让我们生成的js文件直接打包到html中；             
具体配置如下：                     
```javascript
const path = require('path');
const Webpack = require('webpack');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[hash:5].js',
        publicPath: '/',
        chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
    },

    resolve: {
         alias: {
             jquery$: path.resolve(__dirname, 'src/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
         }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,
                                // modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 2,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../img',
                                    outputPath: './img/',
                                }
                            }
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
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
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename:  (getPath) => {
                return getPath('css/[name].min.[hash:5].css').replace('css/js', 'css');
            },
            allChunks: false
        }),

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

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks: ['app'],
            minify: {
                collapseWhitespace: false                //祛除空格
            }
        }),

        new Webpack.optimize.UglifyJsPlugin()
    ]
};
```
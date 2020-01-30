## <p id='class1'>一、由浅入深Webpack</p>              


- [01、最基本的使用webpack](#class1-item01)
- [02、打包js](#class1-item02)
- [03、编译ES6/7](#class1-item03)
- [04、编译打包TS](#class1-item04)
- [05、提取公用代码](#class1-item05)
- [06、代码分割和懒加载](#class1-item06)                 
- [07、处理css: style-loader](#class1-item07)
- [08、处理css: css-loader](#class1-item08)
- [09、配置less/sass](#class1-item09)
- [10、提取css](#class1-item10)
- [11、postCss-in-webpack](#class1-item11)
- [12、Tree-shaking](#class1-item12)
    

### <p id='class1-item01'>01、最基本的使用webpack</p>          
全局安装webpack之后，可以通过这几个命令来使用最简单的webpack                          
`webpack -h` 查看基本信息             
`webpack -v` 查看版本信息             
`webpack <entry> [<entry>] <output>` 最基本的打包命令行              
`webpack --config <webpack.config.js>` 最基本的命令行打包                


### <p id='class1-item02'>02、打包js</p>          

webpack支持es6, CommonJS, AMD。

#### 2.1、命令行打包js
在目录 `book/11、深入webpack工程化/01、由浅入深Webpack/02、打包js` 下面建立两个文件 一个是 `app.js` 另外一个是 `sum.js`                  
并且书写相关代码，然后使用命令行打包来试一试效果看看如何, 这种命令行必须要在当前文件目录下面进行, 命令行: `webpack app.js bundle.js`                   
打包之后的文件放在html中执行，就可以直接执行了。 - **说明webpack支持ES6规范**

在添加一个文件 `minus.js`文件，添加commonjs规范的模块化文件，添加到 `app.js` 文件中，打包之后执行成功。 - **说明webpack支持commonjs模块化规范**                   

如果我们在继续添加一个文件 `muti.js` ，这个文件里面我们使用amd的模块规范来定义文件，然后在 `app.js` 中引用，这个时候打包之后，会发现可以运行，
但是会多生成出来一个 `0.bundle.js` 的文件, 这是因为amd是异步加载模块的方式； - **说明webpack支持amd模块规范**

#### 2.2、通过配置文件打包js
在文件根目录下面，我们需要定义一个webpack.config.js的配置文件, 然后只需要直接执行 `webpack` 就可以了；              
如果我们配置文件不叫webpack.config.js，那我们需要重新给我们指定自己的配置文件名称 `webpack --config <webpack.config.js>`            
配置文件如下                  
```javascript
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:5].js'
    }
};
```
[代码示例](./02、打包js/)


### <p id='class1-item03'>03、编译ES6/7</p>                    
首先我们要安装babel 编译文件 `npm install --save-dev babel-loader babel-core`          
同时还需要安装 `npm install babel-preset-env --save-dev`           
这个时候，给webpack.config.js一个基础配置：          
```javascript
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: "[name].[hash:8].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    }
};
```

我们因为要使用 babel-preset-env，所以要对webpack.config.js module规则进行改造
```javascript
rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: '/node_modules/'
            }
        ]
```

其中presets还有一些其他的参数              
targets: 指定什么编译什么不编译                
targets.browers: 指定什么浏览器编译，什么浏览器不编译, 写了之后就是要编译的                 
    例如： targets.browers: "last 2 versions" 主流浏览器最后两个版本编译
    例如： targets.browers: ">1%" 全球占有率超过百分之一的浏览器就编译
天假targets参数的配置文件如下：
```javascript
rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browers: ['>1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/node_modules/'
            }
        ]
```
    
接下来介绍 `babel polyfill` 和 `babel tuntime Transform`              
我们很多时候会有一些ES6的高级语法，但是浏览器还没有支持这些语法的时候，我们就要借助上面的插件帮助我们实现这些语法；         
比如： Generator、Set、Map、Array.form、Array.prototype.includes 等，这些函数和方法都是需要借助上面插件来实现的；                    
安装： `npm install babel-polyfill --save` 在使用的时候，只要 `import 'babel-polyfile'` 就可以随意使用高级语法了；           
`babel tuntime Transform`: 这个是局部垫片，为开发框架准备的 - 不会污染全局；               
安装： `npm install babel babel-plugin-transform-runtime --save-dev` 和 `npm install babel-runtime --sve`           
安装完毕之后，直接就可以 import 'babel-polyfile',就可以直接使用了；

babel配置文件的写法： .babelrc                  
在webpack.config.js 的同一级目录下面定义文件，文件内容如下：         
```json
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions"
          ]
        }
      }
    ]
  ],
  "plugins": ["transform-runtime"]
}
```
这样定义好了之后，那么webpack.config.js 配置文件里面的babel-loader的配置项就行相当于移动到了 .babelrc里面去，就可以直接删除原来的options了。                   
然后这些都做完了之后，直接打包用就可以了；                   

在我们实际开发中，我们可以不要 配置`"plugins": ["transform-runtime"]`， 直接在需要使用高级语法的地方使用 `import 'babel-polyfill';`                   

请看示例文件： [03、编译ES6](./03、编译ES6/)


### <p id='class1-item04'>04、编译打包TS</p>          
是JS的超集      
需要安装 `typescript-loader`:               
npm install typescript ts-loader --save-dev                     
npm install typescript awesome-typescript-loader --save-dev                

配置：                 
需要配置一个tsconfig.json 文件在根目录下面                
配置webpack.config.js             

tsconfig.json:           
相关配置项可以看这里：[https://www.tslang.cn/docs/handbook/compiler-options.html](https://www.tslang.cn/docs/handbook/compiler-options.html)                       

常用选项：               
compilerOptions: 就是常用选项                 
include: 编译的文件路径
exclude: 不编译的路径         

示范：             
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "typeRoots": [
      "/node_modules/@type",
      "/typings/modules"
    ],
    "allowJs": true
  },
  "include": ["./src/*"],
  "exclude": ["/node_modules"]
}
```
webpack.config.js配置文件：              
```javascript
module.exports = {
    entry: {
        'app': './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
};
```

接下来就是定义app.ts，然后打包就可以了。                     

**在ts中使用js的模块**
比如我们在js中使用到了 lodash 这个模块， 首先我们要安装这个模块 `npm install lodash --save`  
然后我们直接使用，然后直接打包，是没有任何问题的，是可以和平共处的。                  


**申明文件**
但是如果直接使用，就没有typescript的申明检测了，没有办法使用ts的特性了，如果我们想使用ts的特性，那么我们可以这样来安装文件：               
npm install @types/lodash               
npm install @types/vue              
用这种模块，就会在传递错误参数的时候报错。               
例如我们装上 @types/lodash之后，在使用                  
```javascript
import * as _ from 'lodash';
console.log(_.chunk(2));
```
这样ts文件就会报错，而且打包文件也不成功               
然后修改为正确的语法格式，就不会报错了，而且编译打包也会成功：           
```javascript
import * as _ from 'lodash';
console.log(_.chunk([1,2,3,4,5,6,7],2));
```

**Typings**                 
如果觉得每次都要安装
npm install @types/lodash 是一件很麻烦的事情，那么可以直接使用Typings来安装模块：               
npm install typings -g             
typings install lodash              

对于这种安装模块的使用方法：                  
这个时候需要配置tsconfig.json了：                 
```
"typeRoots": [
  "./node_modules/@type",
  "./typings/modules"
]
```
typeRoots：这个配置项，是告诉ts打包编译的时候，要到什么地方去找申明文件，而且这个时候我们的文件也会有报错提示了               
           

### <p id='class1-item05'>05、提取公用代码</p>
目的：减少代码冗余、提高加载速度                    
这个时候我们就需要使用到 CommonsChunkPlugin 插件                      
这个插件已经内置到webpack里面去了： `webpack.optimize.CommonsChunkPlugin` 
配置：             
```javascript
{
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(options)
    ]
}
```
其中options配置项:                               
name/names: 给那些文件提出公用                               
filename: 打包之后的文件名                              
minChunks: 如果接受的是数字表示你这个公共代码出现的次数，大多这个次数了就提取公共代码。 可以是函数，自定义提取逻辑                         
chunks: 限定公用代码的提取范围，我需要在那几个代码块中提取。                              
children: 表示是不是在你的模块中，或者所有模块中查找公用模块                             
deepChildren: 表示是不是在你的模块中，或者所有模块中查找公用模块                             
async: 创建异步的公共代码块                           

场景：             
单页引用、 单页引用 + 第三方依赖、 多页引用 + 第三方依赖 + webpack生成代码              

在webpack中，公共代码的提取是建立在多entry的基础之上的，如果是单个entry， 是不会有任何效果的                 
因为单页应用使用的是懒加载，所以有其他的处理方式                    

所以我们要再加入一个入口 pageB:   

一般来说因为单页应用会有懒加载效果，所以我们一般都是看不出来提取公共commonjs的效果的，所以我们要处理为多页打包来看效果情况；               
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]
};
```
这样打包的缺点也很明显：没有区分业务代码和第三方模块的代码


接下来还有一个问题：如果我们希望吧pageA和pageB中的公共部分的代码提取出来，就要做如下的配置！
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['pageA', 'pageB']  //指定需要提取公共文件文件对象
        }),

        new webapck.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new webapck.optimize.CommonsChunkPlugin({
            name: 'mainfest',
            minChunks: Infinity
        })
    ]
};
```

对上面的代码，还可以进行一下的优化
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['pageA', 'pageB']  //指定需要提取公共文件文件对象
        }),

        new webapck.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest'],
            minChunks: Infinity
        }),
    ]
};
```

### <div id='class1-item06'>06、代码分割和懒加载<div> 

> 实现代码分割的办法：

`webapck methods` 和 `ES2015 Loader spec`

**webpack methods webpack内置方法**

require.ensure      

    []: dependencies        
    callback        
    errorCallback
    chunkName       

require.include
    
**ES2015 Loader spec**            

System.import() ->  import()


> 代码分割的场景

分离业务代码 和 第三方依赖            
分离业务代码 和 业务公共代码 和 第三方依赖         
分离首次加载 和 访问后加载的代码           

> 具体使用方式            

**用require.ensure方式分割代码的示例**        
webpack.config.js配置文件如下：        
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    }
};
```

在paegA.js中做如下的模块引用：     
```javascript
import './subPageA'
import './subPageB'

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'
```

这个时候再打包，就可以实现分别打包第三方模块代码vendor.js和我们自己的业务代码pageA.js了            

**如果我们希望在pageA中提取公共的模块subPageA和subPageB**           
那么我们可以对pageA.js做如下的改造           
```javascript
if(page === 'subPageA') {
    require.ensure(['./subPageA'], function() {
        let subPageA = require('./subPageA');
    }, 'subPageA');
} else if(page === 'subPageB') {
    require.ensure(['./subPageB'], function() {
        let subPageB = require('./subPageB');
    }, 'subPageB');
}

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'
```

但是这样还会有一个问题，就是subPageA和subPageB都同时用了moduleA，我们可以吧moduleA提出来公用           
```javascript
require.include('./moduleA');
let page = 'subPageA';
if(page === 'subPageA') {
    require.ensure(['./subPageA'], function() {
        let subPageA = require('./subPageA');
    }, 'subPageA');
} else if(page === 'subPageB') {
    require.ensure(['./subPageB'], function() {
        let subPageB = require('./subPageB');
    }, 'subPageB');
}

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'
```
这种做法实际上是吧moduleA的代码，直接提取到了pageA中去了，我们在subPageA和subPageB打包后的文件中，再也找不到moduleA的代码了！


**关于测试：**           
我们在根目录下面创建一个html文件，引入我们的打包后的文件，来测试一下打包是否成功，如果出现了资源找不到的情况，那我们需要改一下webpack的output中的publicPath:        
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        publicPath: "./dist/",
        chunkFilename: "[name].chunk.js"
    }
};
```

html:       
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>


<script src="./dist/pageA.bundle.js"></script>
</body>
</html>
```


**通过实现动态import来实现分割代码的功能**          
```javascript
    require.include('./moduleA');
    
    let page = 'subPageA';
    
    if(page === 'subPageA') {
        import(
            /* webpackChunkName:'subPageA' */
            './subPageA').then(function(subPageA) {
            console.log(subPageA);
        })
    } else if(page === 'subPageB') {
        import(
            /* webpackChunkName:'subPageA' */
            './subPageB').then(function(subPageB) {
            console.log(subPageB);
        })
    }
    
    require.ensure(['lodash'], function () {
        let _ = require('lodash');
        _.join([1, 2], 3);
    }, 'vendor');
    
    export default 'pageA'
```
上面的注解是魔法注解。用来让webpack识别打包模块用的           

**异步分割代码: async**              
```javascript
let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        publicPath: "./dist/",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            async: 'async-common',
            children: true,
            minChunks: 2
        }),
        new webapck.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest'],
            minChunks: Infinity
        })
    ]
};
```

### <div id="class1-item07">07、处理css: style-loader</div>
css的引入：                     
css modules             
配置 less / sass               
提取 css 代码                           

**引入css:**                  
style-loader: 创建样式标签，               
css-loader: 可以让我们，在JS中直接require加载css样式文件                        

style-loader:           
与这个相关的有： `style-loader、style-loader/url、style-loader/useable`                   

**最单的一个实例简：**                                  
我们首先定义样式文件，然后require加载到js文件中去，然后配置如下的webpack.config.js 文件                   
```javascript
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};
```            
然后把打包之后的文件，放入index.html文件中执行                

**style-loader/url 和 style-loader/useable的使用**                          
- style-loader/url                  
在我们使用style-loader的webpack.config.js的地方 直接使用style-loader/url，就可以实现让我们的样式文件直接link进来。但是这种使用还需要一个file-loader.
之前使用css-loader的地方，要改为使用file-loader              
这种情况下的打包，会直接打包出来一个单独的css文件              

这种方式不常用，甚至很少用，因为这种不能处理多个样式。如果我们插入多个样式，就会有多个link标签，这样每一个文件都要走一次http请求，会额外侵占网络资源。                 


- style-loader/useable                    
是用来控制样式，插入还是不插入到页面中去         
```javascript
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
```
这个时候我们引入的样式文件就会获得两个方法，一个是use(), 一个是unuse(); 分别控制样式的显示和不显示；可以通过程序来控制器展示与否；
```javascript
import base from './css/base.css'
import common from './css/common.css'

let flag = false;

setInterval(function(){
    if(flag) {
        base.unuse();
        flag = false
    } else {
        base.use();
        flag = true;
    }
}, 500);
```

**style-loader的配置项**                    
options:                
insertAt: 插入位置                
insertInto: 插入到具体的dom               
singleton: 是否使用一个style标签                
transform: 转化，在浏览器环境下，插入页面前                             

```javascript
module.export = {
    //......
    module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insertInto: '#app',
                                singleton: true,
                                transform: './css.transform.js'
                            }
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                }
            ]
        }
}
```

然后我们需要在其同级目录下面创建css.transform.js文件，这个文件就可以拿到我们所有的css样式，在这个地方我们可以修改和编辑等等的操作了！
```javascript
module.exports =function(css) {
    console.log(css);
    console.log(window.innerHeight);
    return css;
};
```
我们定义的这个函数，并不会在打包的时候执行，是在loader把我们样式人间插入浏览器的时候执行的，这个时候我们可以拿到浏览器相关的一些参数，在此之前我们可以做一切的处理；
而且会对么一个文件都会操作一遍。
这个知识点儿很冷门，可以不做重点掌握。


### <div id="class1-item08">08、处理css: css-loader</div>              
options:                
alias: 解析别名                 
importLoader: 支持@import                 
Minimize: 是否压缩样式文件                  
modules: 是否启用css-modules                        

**css-modules模块化语法**                    
:local 本地样式                 
:global 定义全局样式              
compose 继承样式                
compose ... from path 从path路径下面继承样式                 

例如我们队modules: true 的配置项的使用：             
```javascript
rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true
                        },
                    }
                ]
            }
        ]
```
```javascript
import base from './css/base.css'
import common from './css/common.css'

let app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}"></div>`
```
这个时候打包出来的结果，我们的className会直接被编译了；                                
具体样式代码可以看css文件中；                           
```css
.box {
    composes: bigBox from './common.css';
    height: 200px;
    width: 200px;
    border-radius: 8px;
    background-color: #00B7FF;
}
```
当我们使用composes的时候还要注意，我们要把composes放在第一行；                     

这样打包出来的className 是乱的，我们可以通过配置项
localIdentName: '[path][name]_[local]_[hash:base64:5]'类似于这样的格式来定义我们的的className                 


### <div id="class1-item09">09、配置less/sass</div>                 
首先要分别安装下面模块：                            
npm install less-loader less --save-dev                         
npm install sass-loader node-sass --save-dev                    

在配置webpack的时候，如果全局只有一种样式文件类型，
```javascript
module: {
    rules: [
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        singleton: true,
                        transform: './css.transform.js'
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: true,
                        localIdentName: '[path][name]_[local]_[hash:base64:5]'
                    },
                },
                {
                    loader: 'less-loader'
                }
            ]
        }
    ]
}
```
[本节实例请见: 09、配置less/sass](./09、处理css%20配置less和sass/)


### <div id="class1-item10">10、提取css</div>                   
之前的样式实际上是在js中的， 现在我们要把css提取出来形成独立的文件
extract-loader                  
ExtractTextWebpackPlugin 这种是主流最常用的方式                           
安装依赖包：                  
npm install extract-text-webpack-plugin --save-dev                                      

```javascript
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
                                minimize: true,
                                modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            },
                            // loader: 'file-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false
        })
    ]
```
在module中使用的rules中， fallback表示，如果提取失败，我们将怎么处理，下面的use表示如果提取成功，写下来还需要用什么loader处理样式文件                       
在plugins里面，定义这输出的样式文件名；                 

但是接下来的问题来了，提起出来的样式并不会自动加入到我们的html当中，需要手动添加到html当中，这样的方式是相当蛋疼的；                      
plugins里面ExtractTextWebpackPlugin的其他配置项参数                       
allChunks: 默认值是false ，它可以限定提取范围。如果改为true，那么所有的import进来的css样式文件都会打包到同一个文件中去。如果是false，那么它只提取初始化的样式文件（非异步加载文件样式）                           
比如我们在app.js中实现一个异步加载                             
```javascript
import base from './css/base.less'
import common from './css/common.less'

let app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}"></div>`;

//实现异步加载a模块
import(
    /* webpackChunkName: 'a' */
    './components/a'
    ).then(function(a) {
        console.log(a)
});
```
然后对应webpack 打包配置中allChunks设置为false, 那么模块a加载的样式是不会被独立打包到app.min.css文件里面去， 而是跟a.bundle.js一起打包到相对应的js文件去了；                
通过allChunks可以控制初始化加载和动态加载。                              
如果我们期望a.js引用的css能独立打包出来，这个时候，就可以直接在入口文件中添加a模块的打包入口就可以了；                     

[本节实例请见: 10、处理css 提取css](./10、处理css%20提取css/)


### <div id="class1-item11">11、postCss-in-webpack</div>                  
postCss 是一个强大的处理css的一个工具                    
**安装和使用**                 
npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev                                                      
Autoprefixer: 可以帮我们自动加上前缀；              
postcss-cssnano: 帮助压缩和优化css的工具；             
postcss-cssnext: 可让我们使用css4的新语法；                

安装完毕之后，就接着需要修改webpack的相关配置                                      
```javascript
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
                                modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            },
                            // loader: 'file-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
```
然后尝试给less文件加上一个transition属性，那么打包出来的文件，就会自动加上前缀了                         


关于cssnext的使用， cssnext中自动集成了autoprefixer的， 所以插件中，可以一处autoprefixer                
配置文件写法类类似于上面的autoprefixer插件的写法：                             
然后可以在less文件中写入cssnext的语法规则，然后打包编译                   


**关于Broswerslist**                  
因为所有插件公用：可以配置到一个地方，让所有插件都公用                 
package.json                
.browserslistrc                         

**postcss的其他一些插件**              
postcss-import                  
postcss-url             
postcss-assets              


### <div id="class1-item12">12、Tree-shaking</div>
Tree-shaking 如果有一些代码没有用到的，或者不需要的资源。在上线的时候，不需要，这个时候就要祛除这样的的代码，tree-shaking就是做这个用处的。                  
JS Tree Shaking             
CSS Tree Shaking                

使用场景：               
    常规优化                    
    引入第三方库的某一个功能                    
    

**JS Tree Shaking**             
我们用到的插件是： webpack.optimize.uglifyJS                 
首先我们在util.js里面定义很多的方法，然后在app.js中只使用其中某一个方法：                         
```javascript
import base from './css/base.less'
import {a} from './common/util';

let app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}"></div>`;

console.log(a());
```
在不做任何配置的情况之下直接打包，那么打包之后的app.bundle.js中，会出现很全部之前定义好的方法。                  

**祛除没有用到的代码的方法：**                   
```javascript
const Webpack = require('webpack');

module.exports = {
    //.........
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false
        }),

        new Webpack.optimize.UglifyJsPlugin()
    ]
}
```
然后执行打包，我们发现打包之后的文件是被压缩了，而且我们没有用到的方法是找不到的，说明压缩的时候已经自动过滤掉了。                           

- 对于第三方库祛除的一个实例，这个地方以lodash为例子                      
在app.js中引入lodash的方法：            
```javascript
import {chunk} from 'lodash';
console.log(chunk([1,2,3,4,5,6,7], 2));
```
然后按照上面的配置webpack不动，直接打包。会祛除掉绝大部分的没有用到的代码，但是打包之后出来的文件还是有70多K，追查原因，可以打开lodash查看其源码，发现lodash文件本身就有一万多行，
所以我们打包的时候吧这本身一万多行的代码都打包进来了。             
解决这个问题的办法：我们可以安装lodash的esmodule: npm install lodash-es --save                           
```javascript
import {chunk} from 'lodash-es';
console.log(chunk([1,2,3,4,5,6,7], 2));
```
打包之后会发现，文件大小更加大了。这个就说明了有些模块是没有办法用tree-shaking来过滤掉全部没有用到的代码的，这是模块本身写法有问题。                    

当然为了解决这个问题，还有其他的解决办法： npm install babel-plugin-lodash --save-dev , 初次之外，还需要安装babel全家桶
```javascript
module.exports = {
    //.........
module: {
        rules: [
            //......
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['lodash']
                        }
                    }
                ]
            }
        ]
    },
}
```
然后再次打包就可以了                      


**CSS Tree Shaking**                 
对于这个的tree-shaking 需要借助purifycss                 
配置项options                  
paths: glob.sync([]) 一个路径，检查一个路径下面的css

安装： npm install purifycss-webpack glob-all purify-css --save-dev                   
```javascript
module.exports = {
    // .........
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css',
            allChunks: false
        }),

        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ]),
        }),

        new Webpack.optimize.UglifyJsPlugin()
    ]
};
```
但是感觉PurifyCSS是打包失败的，把我所有的样式文件都祛除掉了；                                         
失败的原因是这个插件是不可以和css-loader里面的modules同用的；去掉css-loader中的modules,这样就可以正常使用了。                                         

与这部分相关的知识点可以直接查看：[purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)   

# webpack 专题

## 一、深入浅出webpack 
- [1、打包](#class01)


### <div class='class01'>1、打包</div>      
> 命令行打包
  
webpack 是支持es6模块化规范和commonJs模块化规范的，而且还可以混用，建立两个es6模块规范的文件，如果用命令行打包的话，打包指令如下:      
`webpack app.js bundle.js` 第一个参数是入口文件，第二个参数是输出文件；     

例如：     
我们建立一个app.js        
```javascript
    import sum from './sum';
    
    let minus = require('./minus');
    
    console.log('sum = ', sum(23, 34));
    console.log('minus = ', minus(34,23));
```

建立起引用文件：sum.js          
```javascript
export default function (num1, num2) {
    return num1 + num2;
}
```

建立引用文件： minus.js
```javascript
module.exports = function(num1, num2) {
    return num1 - num2;
};
```

这个时候执行打包命令，就可以得到我们打包处理完成的bundle.js文件了，它拥有app.js的所有功能，包括模块化的引用

> 配置文件打包

建立一个webpack的配置文件，其命名一定为webpack.config.js        
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
然后就可以直接执行命令行webpack就可以进行打包了；
[请见实例1：打包](./01、深入浅出webpack/01、打包/)


### <div class='class02'>2、编译ES6</div> 
**babel**           
首先要安装babel-loader、babel-core、babel-preset-env  
`npm install babel-loader babel-core babel-preset-env --save-dev`        
  
然后在webpack.config.js中写入配置文件如下：
```javascript
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/mode_modules/'
            }
        ]
    }
};
```

介绍两个处理函数和方法的babel插件： Babel Polyfill 、Babel Runtime Transform        

`Babel Polyfill`              
全局垫片、为应用准备：         
npm install babel-polyfill --save       
npm install babel-runtime --save             
import 'babel-polyfill'     

`Babel Runtime Transform`       
局部垫片、为开发框架准备：   
npm install babel-plugin-transform-runtime --save-dev       
npm install babel-runtime --save        

使用的话要创建文件.babelrc       
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


[请见实例2:编译es6](./01、深入浅出webpack/02、编译es6/)

### <div class='class03'>3、编译typescrip</div> 
安装：     
`npm install typescript ts-loader --save-dev`           
`npm install typescript awesome-typescript-loader --save-dev`       

配置：tsconfig.json        
[配置信息文档](https://www.tslang.cn/docs/handbook/tsconfig-json.html)            

常用选项：
    compilerOptions、include、exclude
    
安装配置文件：
```json
{
"ts-loader": "^3.2.0",
    "typescript": "^2.6.2",
    "webpack": "^3.10.0",
    "awesome-typescript-loader": "3.4.1"
}
```

webpack.config.js打包文件：
```javascript
module.exports = {
    entry: {
        'app': './src/app.ts'
    },

    output: {
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            }
        ]
    }
};
```

配置tsconfig.json文件
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "allowJs": true
  },
  "include": ["./src/*"],
  "exclude": ["/node_modules"]
}
```

然后可以在src/app.ts里面写自己的一些代码实现         
最后执行打包命令： webpack  就可以实现打包typescript了！

如果我们需要在ts文件中引入第三方库，这个时候有一个申明文件的问题，比如我们需要引用lodash模块，会报错，说这个模块需要一个tsconfig.jsos的申明文件；但是对于这个问题，官方有解决办法     
我们直接安装 `npm install @types/lodash` 或者 `npm install @types/vue` 之类的文件就可以解决这类问题了！     

但是这样的话，我们还是会有一些麻烦，这个时候还有一个好用的模块就是 `typings`， 这个模块最好需要全局安装       
然后需要某一个模块的时候，就只可以 `typings install lodash`这种方式安装模块纠就OK了

其实关于typescript程序还有一个typings的全局模块，可以自动把我们的模块文件编译为支持ts类型检测的文件，不过坑非常的大，以后再来研究！

[请见实例3:编译typescript](./01、深入浅出webpack/03、编译typescript)


### <div class='class04'>4、提取公用代码/div> 
作用：减少代码冗余、提高页面加载速度；

我们需要用到的是CommonsChunkPlugin这个插件，这个插件是集成到webpack内部的一个插件 `webapck.optimize.CommonsChunkPlugin`         

配置：
```javascript
{
    plugins: [
        new webapck.optimize.CommonsChunkPlugin(options)
    ]
}
```
其中options配置如下：      
options.name / options.names        
options.filename        
options.minChunks
options.chunks      
options.children            
options.deepChildren            
options.async           

场景： 
单页应用        
单页应用 + 第三方依赖
多页应用 + 第三方依赖 + webpack 生成代码

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


如果我们希望区分业务代码和第三方模块代码，就要使用以下的办法才行：
我们需要多加入一个entry, 然后分离公共代码部分的打包就直接指向我们多加入的entry文件，那么打包出来的文件就是我们的第三方代码了；           
如果我们需要分离webpack生成的代码，和我们自己第三方库的代码，就可以做如下的配置改变       
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
        }),

        new webapck.optimize.CommonsChunkPlugin({
            name: 'mainfest',
            minChunks: Infinity
        })
    ]
};
```

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
[请见实例4： 提取用工代码](./01、深入浅出webpack/04、提取公用代码/)



### <div class='class05'>5、代码分割和懒加载/div> 

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

[实例5:代码分割和懒加载](./01、深入浅出webpack/05、代码分割和懒加载/)


### <div class='class06'>6、处理css文件/div> 

> style-loader 和 css-loader         

引用css的情况我们需要 `style-loader` 和 `css-loader`
```javascript
let path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: "[name].bundle.js"
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
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
};
```
这样配置之后，我们就可以直接js中require我们需要的css文件了，当我们引用打包之后的js文件的时候，程序会执行给我们在header里面创建一个style标签，然后包裹住我们的css样式；

**如果我们不想要创建header内联的方式来加入css，希望通过url的方式来引入一个文件达到加载css的目的，那么可以用如下的方式**           
我们需要安装 `file-loader`，之后对webpack配置文件做如下的配置       
```javascript
let path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        loader: "file-loader"
                    }
                ]
            }
        ]
    }
};
```
备注：其实这种方式并不常用，缺点很大，因为每一次require一个css，然后就会多生成一个文件和url出来，然后会在页面加载的时候，多发送一次http请求，其实这是非常消耗资源的，不推荐使用！

**关于style-loader/useable**      
这个方式，可以让我们在js，css对象上面得到一个use() 和 unuse() 的方法， 这两个方法就能控制样式的现实与不显示；           
webpack 中做如下的配置：
```javascript
module.exports = {
    //........
    module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader/useable'
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

实际使用方式如下：       
```javascript
import base from './css/base.css';
import common from './css/common.css'

let flag = true;

setInterval(function() {
    if(flag) {
        base.use();
        flag = false
    } else {
        base.unuse();
        flag = true;
    }
}, 1500);
```

**style-loader 的一起配置项**
options:        
    insertAt:插入位置       
    insertInto:插入到dom       
    singleton:是否只使用一个style标签
    transform:转化，浏览器环境下，插入页面前

webpack 配置如下：
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






































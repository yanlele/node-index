# Webpack 3.0 前端工程化             

我的目的是这个做一个最强大的webpack教程手册，供以后工作中翻阅查询                

目录：             
- [一、由浅入深Webpack](#class1)
    - [01、最基本的使用webpack](#class1-item01)
    - [02、打包js](#class1-item02)
    - [03、编译ES6/7](#class1-item03)
    

## <p id='class1'>一、由浅入深Webpack</p>              

### <p id='class1-item01'>01、最基本的使用webpack</p>          
全局安装webpack之后，可以通过这几个命令来使用最简单的webpack                          
`webpack -h` 查看基本信息             
`webpack -v` 查看版本信息             
`webpack <entry> [<entry>] <output>` 最基本的打包命令行              
`webpack --config <webpack.config.js>` 最基本的命令行打包                


### <p id='class1-item02'>02、打包js</p>          
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
[代码示例](./01、由浅入深Webpack/02、打包js/)


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
安装： `npm install babel transform-plugin-transform-runtime --save-dev` 和 `npm install babel-runtime --sve`           
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

请看示例文件： [03、编译ES6](./01、由浅入深Webpack/03、编译ES6/)


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






          
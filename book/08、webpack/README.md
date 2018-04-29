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
[请见实例](./01、深入浅出webpack/01、打包/)


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


[请见实例](./01、深入浅出webpack/02、编译es6/)

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

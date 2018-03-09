# 移动端rem转换的办法和策略

- 1、通过css3设置html font-size标准来转换
- 2、通过JS实时监听屏幕大小变化，通过实时计算来实现比例的转换
```javascript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      if (clientWidth > 750) {
        docEl.style.fontSize = 50 + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```
- 3、通过postcss插件postcss-adaptive 和 webpack 配置一劳永逸解决px2rem问题
webpack配置如下
```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        'url-loader?limit=20000&name=[name]-[hash].[ext]&outputPath=images/',
        'image-webpack-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['latest']
        }
      },
      exclude: '/node_modules/',
      include: '/src/',
    }
  ]
}
```
在webpac.config.js同级目录下面简历一个postcss的配置文件：postcss.config.js，并且做如下配置
```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'autoprefixer': { browsers: ['ie>=8', '>1% in CN'] },
    'cssnano': {},
    'postcss-adaptive': { remUnit: 75, autoRem: true }
  }
}
```

- 4、通过webpack 插件 px2rem来实现转换
首先安装插件`npm install px2rem-loader`
然后在webpack中做如下配置
```javascript
{
  loaders: [{ test: /\.css$/, loader: 'style!css!px2rem?remUnit=75&remPrecision=8' }]
}
```

-5 [其他解决方案可以见github](https://github.com/songsiqi/px2rem)
  
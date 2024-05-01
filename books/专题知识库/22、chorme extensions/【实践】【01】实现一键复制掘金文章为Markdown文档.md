# 掘金扩展插件

最近学习谷歌插件，学以致用，所以顺手就搓出来了一个插件： **支持一键将当前阅读的掘金文档复制为 Markdown**

话不多说， 直接上墙：

![01.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7985326eea74aec87fc47b6bee5e9aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1280&h=832&s=5175476&e=gif&f=117&b=f8f7f3)

## 使用本插件

按照以下步骤来即可

1. 访问代码源码

- https://github.com/pro-collection/extension-tools/tree/master/apps/juejin

2. 下载代码
3. 导入 crx 文件 或者 直接导入编译后的产物代码

3.1. 访问 chrome://extensions/ ， 然后开启开发者模式
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072637288fb24101b2379d0fccd046bb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2928&h=490&s=105918&e=png&b=ffffff)

3.2 直接将 crx 拖拽到扩展程序面板即可。

**备选: 导入编译后的产物代码**

下载本仓库的项目， 然后进入到 `apps/juejin` 目录下面, 直接运行 `pnpm prod` ；

然后回得到 dist 的一个产物目录， 将产物目录导入到浏览器扩展程序页面即可（【添加已解压的扩展程序】）。  
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b68bdb1ddfd64df0bc1955f0dfb42db2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2936&h=472&s=101093&e=png&b=ffffff)

## 还有哪些想法可以做到插件里面来？

可以通过留言和私信的方式给作者提需求， 满足大家的需求的同时， 能够精进一下自己的技能，作者是非常乐意。

当然如果有 BUG 也可以联系作者， 掘金私信即可。

# 来聊聊里面用到了哪些技术

通过上面的内容， 其实可以直接访问到源码。

本插件， 主要又两部分组成。 一部分是 pupup 页面， 也就是点击插件图标， 弹出的一个小弹出层界面。 还有一个运行在后台的 service worker。

## 构建篇

麻雀虽小， 五脏俱全。

使用的是 webpack + antd + typescript + tailwindcss 进行构建的。

其中 service worker 是一个不同的编译体系， 所以使用了多 entry 的方式记性打包。

**TypeScritp + react**

使用的 babel 全家桶， 这个没有啥好说的。

```shell
pnpm add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader -D
```

**样式**

直接使用 CSS 即可。 2023 年 CSS 迎来重大更新， 功能已经非常强大了。 无需 less 等工具了。

同时毕竟是一个简单的应用， 如果能上 `tailwindcss` 几乎可以说是不用写一行样式代码。

需要的依赖：

```
pnpm add css-loader postcss-loader style-loader mini-css-extract-plugin -D
```

直接上 webpack.config.js 配置文件

```
 {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin.loader 代替 style-loader
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            require("postcss-preset-env")({
              // Configurations for postcss-preset-env
              stage: 3,
              features: {
                "nesting-rules": true,
              },
            }),
            require("tailwindcss"),
          ],
        },
      },
    },
  ],
  // 排除 node_modules 目录
  exclude: /node_modules/,
},
```

## 核心能力实现

最关键的是， 如何将 当前掘金的文章， 复制为 Markdown 。

先说说这个的实现逻辑：

popup 页面触发事件， 复制当前文章  
--> `service worker` 接收到事件，然后通过注入脚本的方式到当前用户访问的页面

--> 获取当前用户的 dom 节点， 拿到文章的 `article.innerHtml`

--> 将 `article.innerHtml` 返还给 `service worker`

--> `service worker` 调用 `html-to-md` 这个库与一些特殊字符串处理

--> 处理完成的结果返回给 popup 页面， pupup 页面调用 `navigator.clipboard.writeText` 实现复制即刻。

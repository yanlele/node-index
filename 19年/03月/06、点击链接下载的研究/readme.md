# 点击链接下载的研究

### 一个基础的示例：
```js
/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-24 22:52
 */

require('./index.less');
import * as html2canvas from 'html2canvas';
import Canvas2Image from './canvas2image';
import 'js-base64';

/*生成canvas图形*/

// 获取按钮id
const btnSave = document.getElementById("btnSave");
// 获取内容id
const content = document.getElementById("content");
// 进行canvas生成
btnSave.onclick = function () {
    html2canvas(content).then(canvas => {
        //添加属性
        // canvas.setAttribute('id', 'thecanvas');
        //读取属性值
        // var value= canvas.getAttribute('id');
        document.getElementById('images').appendChild(canvas);
    });
};

const Download = document.getElementById("Download");
Download.onclick = function () {
    const oCanvas = document.getElementById("thecanvas");

    /*自动保存为png*/
    // 获取图片资源
    const img_data1 = Canvas2Image.saveAsPNG(oCanvas, true).getAttribute('src');
    console.log(img_data1);
    saveFile(img_data1, 'abc');

    /*下面的为原生的保存，不带格式名*/
    // 这将会提示用户保存PNG图片
    // Canvas2Image.saveAsPNG(oCanvas);
};
// 保存文件函数
const saveFile = function (data, filename) {
    const save_link: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
```


### 一个比较成熟的示例
- [下载图片](./下载图片.html)



### 参考文章
- [html页面点击生成图片并可以下载图片](https://blog.csdn.net/qq_35695041/article/details/82344490)
- [html元素转canvas并一键生成png图片(支持img图片元素)html2canvas、canvas2image](https://blog.csdn.net/csl125/article/details/79214929)


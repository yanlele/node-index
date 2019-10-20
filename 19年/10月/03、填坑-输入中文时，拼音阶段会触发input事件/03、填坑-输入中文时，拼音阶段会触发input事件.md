## 填坑-输入中文时，拼音阶段会触发input事件

问题：
监听文本输入框的input事件，在拼写汉字（输入法）但汉字并未实际填充到文本框中（选词）时会触发input事件


需求：选词完成后触发input事件，只触发一次。

解决办法：

通过查阅资料得知在输入中文（包括语音识别时）会先后触发compositionstart、compositionend事件，类似于keydown和keyup的组合。

触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）。

先看看 compositionstart 的描述 和 compositionend 的 描述

compositionstart 事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）。

compositionend 当文本段落的组织已经完成或取消时，会触发该事件。


compositionstart 在输入一段需要确认的文本如拼音to汉字、语音时会触发

compositionend 在拼音选词完成、语音输入完毕时会触发

声明一个标记flag，在compositionstart、compositionend两个事件过程之间的时候flag值为false，在input事件中通过flag的值来判断当前输入的状态。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="http://libs.baidu.com/jquery/1.8.3/jquery.min.js"></script>
        <title></title>
    </head>
    <body>
    <input id="txt" type="text">
    <script>
        var flag = true;
        $('#txt').on('compositionstart',function(){
            flag = false;
        })
        $('#txt').on('compositionend',function(){
            flag = true;
        })
        $('#txt').on('input',function(){
            var _this = this;
            setTimeout(function(){
                if(flag){
                    console.log($(_this).val());
                }
            },0)
        })
    </script>
    </body>
</html>
```


### 参考文章
- [填坑-输入中文时，拼音阶段会触发input事件](https://lonhon.top/2017/10/09/problem-when-Chinese-input/)





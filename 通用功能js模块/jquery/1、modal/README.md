## modal 使用手册

html 模板如下:
```html
<div class="modal fade" tabindex="-1" id="accountFreeze" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" style="width: 510px;">
        <div class="layer modal-content">
            我是内容提！！！！！！！！！！
        </div><!-- 弹出层end -->
    </div>
</div>
```
如果希望通过点击来关闭弹窗，就要在元素标签上面设置如下属性：data-dismiss="modal"
data-backdrop="static"是禁止外部点击退出弹窗的
data-keyboard="false" 是静止按下"Esc"退出这个弹窗


js 用法如下：
```javascript
const Modal= require('./module/modal');
const $modal=$('#accountFreeze');
Modal.call($modal);


function show(message){
    $modal.find('.prompt-tit').text(message);
    Modal.call($modal);
}

$(document).on('click','button',function(){
    show('yanlelelelelelelelellele')
});
```
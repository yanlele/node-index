/*// 输入框元素
let telInput = document.getElementById('tel_input');
// 输入框提示文案
let telWarnText = document.getElementById('tel_warn_text');
// 点击输入框显示输入框输入格式提示文案
input.onclick = function () {
    telWarnText.style.display = 'inline-block';
};*/

/*修改后的代码*/
// 输入框元素
let telInput = document.getElementById('tel_input');
// 输入框输入格式提示文案
let telWarnText = document.getElementById('tel_warn_text');
// 输入框提示输入文案
let telDemoText = document.getElementById('tel_demo_text');
// 点击输入框显示输入框输入格式提示文案
input.onclick = function () {
    telWarnText.style.display = 'inline-block';
    telDemoText.style.display = 'none';
};



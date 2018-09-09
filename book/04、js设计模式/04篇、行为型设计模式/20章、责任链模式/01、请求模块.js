// 异步请求对象
let sendData = function (data, dealType, dom) {
    let xhr = new XMLHttpRequest(),
        url = 'getData.json?mod=userInfo';
    // 请求返回事件
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            dealData(xhr.responseText, dealType, dom);
        } else {
            // 请求失败
        }
        // 拼接请求字符串
        for (let i in data) {
            url += '&' + i + '=' + data[i];
        }
        // 发送请求
        xhr.open('get', url, true);
        xhr.send(null);
    }
};

// 响应数据适配模块
let dealData = function (data, dealType, dom) {
    let dataType = Object.prototype.toString.call(data);
    switch (dealType) {
        // 输入框提示
        case 'sug':
            // 如果是数组对象
            if (dataType === '[object Array]') {
                // 创建提示框组件
                return createSug(data, dom);
            }
            // 将相应的对象数据转化为数组
            if (dataType === '[object Object]') {
                let newData = [];
                for (let i in data) {
                    newData.push(data[i]);
                }
                return createSug(newData, dom);
            }
            return createSug([data], dom);
        case 'validate':
            // 校验组件
            return createValidateResult(data, dom);
    }
};

// 创建提示框组件
let createSug = function (data, dom) {
    let i = 0,
        len = data.length,
        html = '';
    // 拼接每一条语句
    for (; i < len; i++) {
        html += `<li> ${data[i]} </li>`
    }
    dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html;
};

// 创建校验组件
let createValidateResult = function (data, dom) {
    dom.parentNode.getElementsByTagName('span')[0].innerHTML = data;
};

/*站点的测试*/
/*dealData('用户名不对', 'validate', input[0]);
dealData(123, 'sug', input[1]);
dealData(['爱奇艺', '阿里巴巴'], 'sug', input[1]);
dealData({
    'iqy': '爱奇艺',
    'albb': '阿里巴巴'
}, 'sug', input[1]);
// 这样测试会直接调用到了， createSug 和 createValidateResult , 可以先暂时简化他们， 模拟一下测试方法
let createSug = function (data, dom) {
    console.log(data, dom, 'createSug');
};
let createValidateResult = function (data, dom) {
    console.log(data, dom, 'createValidateResult')
};*/
// 然后就可以执行了
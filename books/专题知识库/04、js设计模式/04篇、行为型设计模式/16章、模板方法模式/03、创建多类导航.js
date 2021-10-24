function formateString(str, data) {
    return str.replace(/\{(\w+)}/g, function (match, key) {
        return typeof data[key] === "undefined" ? '' : data[key];
    })
}

// 基础导航类
exports.loader = function (path) {
    if (/.css$/.test(path)) return `<link rel="stylesheet" type="text/css" href="${config.staticURI}${path}">`;
    else return `<script type="text/javascript" src="${config.staticURI}${path}"></script>`;
};
let Nav = function (data) {
    this.item = `<a href="${href}" title="${title}">${name}</a>  `;
    this.html = '';
    for (let i = 0, len = data.length; i < len; i++) {
        this.html += formateString(this.item, data[i]);
    }
    return this.html
};

// 带有消息提示的导航类
let NumNav = function (data) {
    // 创建信息模板
    let tep = `<b>${num}</b>`;
    // 装饰数据
    for (let i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tep, data[i]);
    }
    return Nav.call(this, data);
};

//带有链接的导航地址
let LinkNav = function (data) {
    let tpl = `<span>${link}</span>`;
    for (let i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    return Nav.call(this, data);
};
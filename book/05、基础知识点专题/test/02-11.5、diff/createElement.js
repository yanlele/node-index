/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-18 13:28
 */

let createElement = function(vnode) {
    let tag = vnode.tag;
    let attrs = vnode.attrs || {};
    let children = vnode.children || {};

    if(!tag) return null;

    // 创建元素
    let elem = document.createElement(tag);

    // 属性
    let attrName;
    for (attrName in attrs) {
        if(attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }

    // 子元素
    children.forEach(function (childVnode) {
        // 给 elem 添加元素
        elem.appendChild(createElement(childVnode))
    });

    return elem;
};
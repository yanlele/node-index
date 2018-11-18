/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-18 14:12
 */

let updateChildren = function (vnode, newVnode) {
    let children = vnode.children || [];
    let newChildren = newVnode.children || [];

    children.forEach(function (childVnode, index) {
        let newChildVnode = newChildren;
        if(childVnode.tag === newChildVnode.tag) {
            // 深度对比
            updateChildren(childVnode, newChildVnode)
        } else {
            replaceNode(childVnode, newChildVnode)
        }
    })
};

let replaceNode = function(vnode, newVnode) {
    let elem = vnode.elem;
    let newElem = createElement(newVnode);
};
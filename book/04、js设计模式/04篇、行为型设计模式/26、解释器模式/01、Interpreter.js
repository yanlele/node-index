/**
 * create by yanle
 * create time 2019/1/3 下午7:14
 */

//  解释器
class Interpreter {
    // 获取兄弟元素名称
    static getSiblingName(node) {
        // 存在兄弟节点
        if(node.previousSibling) {
            let name = '',
                count = 1,
                nodeName = node.nodeName,
                sibling = node.previousSibling;

            // 如果存在前一个兄弟元素
            while(sibling) {
                // 如果节点为元素， 并且节点类型与前一个兄弟元素类型相同， 并且前一个兄弟元素名称存在
                if(sibling.nodeType === 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
                    // 如果节点名称和前一个兄弟元素名称相同
                    if(nodeName === sibling.nodeName) {
                        // 节点名称后面添加计数
                        name += ++count;
                    } else {
                        count = 1;
                        name += '|' + sibling.nodeName.toUpperCase();
                    }
                }
                sibling = sibling.previousSibling;
            }
            return name;
        } else {
            return ''
        }
    }

    // XPath 解释器
    static main(node, wrap = document) {
        let path = [];      // 路径数组
        if(node === wrap) {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                path.push(wrap.nodeName.toUpperCase());
            }
            return path;
        }

        // 当前节点的父节点不等于容器节点
        if(node.parentNode !== wrap) {
            // 对当前节点的父节点执行遍历操作
            path = arguments.callee(node.parentNode, wrap);
        } else {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                path.push(wrap.nodeName.toUpperCase());
            }
        }

        // 获取元素的兄弟元素名称统计
        let siblingsNames = this.getSiblingName(node);
        // 如果节点为元素
        if(node.nodeType === 1) {
            path.push(node.nodeName.toUpperCase() + siblingsNames);
        }
        return path;
    }
}

// 使用方式
let path = Interpreter.main(document.getElementById('span7'));
console.log(path);          // HTML>BODY|HEAD>DEV2>DEV2>DEV>UL>LI2>SPAN
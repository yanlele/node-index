
// 兼容nodejs 和 浏览器端
function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
}

// 区分变化的类型
function Diff(kind, path) {
    Object.defineProperty(this, 'kind', {
        value: kind,
        enumerable: true
    });
    if (path && path.length) {
        Object.defineProperty(this, 'path', {
            value: path,
            enumerable: true
        });
    }
}

// 编辑的变化情况
function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, 'update', path);
    Object.defineProperty(this, 'lhs', {
        value: origin,
        enumerable: true
    });
    Object.defineProperty(this, 'rhs', {
        value: value,
        enumerable: true
    });
}
inherits(DiffEdit, Diff);

// 添加的更新情况
function DiffNew(path, value) {
    DiffNew.super_.call(this, 'add', path);
    Object.defineProperty(this, 'rhs', {
        value: value,
        enumerable: true
    });
}
inherits(DiffNew, Diff);

// 删除的情况
function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, 'delete', path);
    Object.defineProperty(this, 'lhs', {
        value: value,
        enumerable: true
    });
}
inherits(DiffDeleted, Diff);

// 数组变化的情况
function DiffArray(path, index, item) {
    DiffArray.super_.call(this, 'array change', path);
    Object.defineProperty(this, 'index', {
        value: index,
        enumerable: true
    });
    Object.defineProperty(this, 'item', {
        value: item,
        enumerable: true
    });
}
inherits(DiffArray, Diff);


// 获取对象的类型
function realTypeOf(subject) {
    var type = typeof subject;
    if (type !== 'object') {
        return type;
    }
    if (subject === Math) {
        return 'math';
    } else if (subject === null) {
        return 'null';
    } else if (Array.isArray(subject)) {
        return 'array';
    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
        return 'date';
    } else if (typeof subject.toString === 'function' && /^\/.*\//.test(subject.toString())) {
        return 'regexp';
    }
    return 'object';
}


/**
 * 对比核心函数
 * @param lhs   左边对象
 * @param rhs   右边对象
 * @param changes   变化结果
 * @param path     变化的索引
 * @param key       变化的具体位置
 * @param stack     比较的两个对象缓存
 */
function deepDiff(lhs, rhs, changes, path=null, key=null, stack=[]) {
    changes = changes || [];
    path = path || [];
    stack = stack || [];
    var currentPath = path.slice(0);
    if (typeof key !== 'undefined' && key !== null) {
        currentPath.push(key);
    }
    // Use string comparison for regexes
    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
        lhs = lhs.toString();
        rhs = rhs.toString();
    }

    var ltype = typeof lhs;
    var rtype = typeof rhs;
    var i, j, k, other;

    var ldefined = ltype !== 'undefined' ||
        (stack && (stack.length > 0) && stack[stack.length - 1].lhs &&
            Object.getOwnPropertyDescriptor(stack[stack.length - 1].lhs, key));
    var rdefined = rtype !== 'undefined' ||
        (stack && (stack.length > 0) && stack[stack.length - 1].rhs &&
            Object.getOwnPropertyDescriptor(stack[stack.length - 1].rhs, key));

    if (!ldefined && rdefined) {
        changes.push(new DiffNew(currentPath, rhs));
    } else if (!rdefined && ldefined) {
        changes.push(new DiffDeleted(currentPath, lhs));
    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
        changes.push(new DiffEdit(currentPath, lhs, rhs));
    } else if (realTypeOf(lhs) === 'date' && (lhs - rhs) !== 0) {
        changes.push(new DiffEdit(currentPath, lhs, rhs));
    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
        for (i = stack.length - 1; i > -1; --i) {
            if (stack[i].lhs === lhs) {
                other = true;
                break;
            }
        }
        if (!other) {
            stack.push({ lhs: lhs, rhs: rhs });
            if (Array.isArray(lhs)) {

                i = rhs.length - 1;
                j = lhs.length - 1;
                while (i > j) {
                    changes.push(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i--])));
                }
                while (j > i) {
                    changes.push(new DiffArray(currentPath, j, new DiffDeleted(undefined, lhs[j--])));
                }
                for (; i >= 0; --i) {
                    deepDiff(lhs[i], rhs[i], changes, currentPath, i, stack);
                }
            } else {
                var akeys = Object.keys(lhs);
                var pkeys = Object.keys(rhs);
                for (i = 0; i < akeys.length; ++i) {
                    k = akeys[i];
                    other = pkeys.indexOf(k);
                    if (other >= 0) {
                        deepDiff(lhs[k], rhs[k], changes, currentPath, k, stack);
                        pkeys[other] = null;
                    } else {
                        deepDiff(lhs[k], undefined, changes, currentPath, k, stack);
                    }
                }
                for (i = 0; i < pkeys.length; ++i) {
                    k = pkeys[i];
                    if (k) {
                        deepDiff(undefined, rhs[k], changes, currentPath, k, stack);
                    }
                }
            }
            stack.length = stack.length - 1;
        } else if (lhs !== rhs) {
            // lhs is contains a cycle at this element and it differs from rhs
            changes.push(new DiffEdit(currentPath, lhs, rhs));
        }
    } else if (lhs !== rhs) {
        if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
            changes.push(new DiffEdit(currentPath, lhs, rhs));
        }
    }
}


// 观察函数 观察， 直接注册执行对比不同的地方
function observableDiff(lhs, rhs) {
    var changes = [];
    deepDiff(lhs, rhs, changes);
    return changes;
}


// 入口函数
let diff = function (lhs, rhs) {
    var changes = observableDiff(lhs, rhs);
    // 如果changes 存在 就直接changes 函数
    return changes.length ? changes : undefined;
};

module.exports = diff;
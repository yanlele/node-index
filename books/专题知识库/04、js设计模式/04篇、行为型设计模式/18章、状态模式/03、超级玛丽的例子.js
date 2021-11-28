
// 单动作条件判断 每增加一个动作就需要添加一个判断
let lastAction = '';
function changeMarry(action) {
    if(action === 'jump') {
        // 跳跃
    } else if(cation === 'move') {
        // 移动动作
    } else {
        // 默认情况
    }
}

// 复合动作的判断 开销是要翻倍的
let lastAction1 = '';
let lastAction2 = '';
function changeMarry(action1, action2) {
    if(action1 === 'shoot') {
        // 射击
    } else if(action1 === 'jump') {
        // 跳跃
    } else if(action1 === 'move' && action2 === 'shoot') {
        // 移动射击
    } else if(action1 === 'jump' && action2 === 'shoot') {
        // 跳跃射击
    }
    //保留上一个动作
    lastAction1 = action1 || '';
    lastAction2 = action2 || '';
}

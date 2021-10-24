class Action {
    constructor() {
        // 内部私有变量
        this._currentState = {};
        // 动作与状态方法的映射
        this.states = {
            jump() {
                console.log('跳跃')
            },
            move() {
                console.log('移动')
            },
            shoot() {
                console.log('移动')
            },
            squat() {
                console.log('下蹲')
            }
        }
    }
}

class MarryState extends Action {
    constructor() {
        super();
    }

    //改变状态方法
    changeState() {
        let arg = arguments;
        // 重置内部状态
        this._currentState = {};
        if(arg.length) {
            for(let i  = 0, len = arg.length; i< len; i++) {
                // 向内部添加动作
                this._currentState[arg[i]] = true;
            }
        }
        return this;
    }
    // 执行动作
    gose() {
        console.log('触发一次动作');
        for(let i in this._currentState) {
            // 如果该动作在就执行
            this.states[i] && this.states[i]();
        }
        return this;
    }
}

let marry  = new MarryState();
marry.changeState('jump', 'shoot').gose().gose().changeState('shoot').gose();
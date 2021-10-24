// 投票结果状态对象
class ResultState {
    // 判断结果保存在内部状态中
    constructor() {
        this.states = {
            state0: function () {
                console.log('这里是第一种结果状态')
            },
            state1: function () {
                console.log('这里是第二种状态结果')
            },
            state2: function () {
                console.log('这里是第三种状态结果')
            },
            state3: function () {
                console.log('这里是第四种状态结果')
            }
        }
    }
    show(result) {
        this.states['state' + result] && this.states['state' + result]()
    }
}
let resultState = new ResultState();

/*测试*/
resultState.show(3);
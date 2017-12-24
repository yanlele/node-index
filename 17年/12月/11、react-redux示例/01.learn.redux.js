import { createStore } from 'redux'

// 这就是reducer处理函数，参数是状态和新的action
function counter(state=0, action) {
  // let state = state||0
  switch (action.type) {
    case '加机关枪':
      return state + 1
    case '减机关枪':
      return state - 1
    default:
      return 10
  }
}
// 新建保险箱
const store = createStore(counter)
// console.log
const init = store.getState()
console.log(`一开始有机枪${init}把`)
function listener(){
  const current = store.getState()
  console.log(`现在有机枪${current}把`)
}
// 订阅，每次state修改，都会执行listener
store.subscribe(listener)
// 提交状态变更的申请
store.dispatch({ type: '加机关枪' })
store.dispatch({ type: '加机关枪' })
store.dispatch({ type: '加机关枪' })
store.dispatch({ type: '减机关枪' })
store.dispatch({ type: '减机关枪' })

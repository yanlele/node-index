## 复杂判断的优雅写法

### if/else 这个没有啥好说的
绝对不适合复杂场景， 复杂场景， 首先规避
```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  if(status == 1){
    sendLog('processing')
    jumpTo('IndexPage')
  }else if(status == 2){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 3){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 4){
    sendLog('success')
    jumpTo('SuccessPage')
  }else if(status == 5){
    sendLog('cancel')
    jumpTo('CancelPage')
  }else {
    sendLog('other')
    jumpTo('Index')
  }
}
```


### switch
```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  switch (status){
    case 1:
      sendLog('processing')
      jumpTo('IndexPage')
      break
    case 2:
    case 3:
      sendLog('fail')
      jumpTo('FailPage')
      break  
    case 4:
      sendLog('success')
      jumpTo('SuccessPage')
      break
    case 5:
      sendLog('cancel')
      jumpTo('CancelPage')
      break
    default:
      sendLog('other')
      jumpTo('Index')
      break
  }
}
```

### 使用对象来简化
```js
const actions = {
  '1': ['processing','IndexPage'],
  '2': ['fail','FailPage'],
  '3': ['fail','FailPage'],
  '4': ['success','SuccessPage'],
  '5': ['cancel','CancelPage'],
  'default': ['other','Index'],
}
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  let action = actions[status] || actions['default'],
    logName = action[0],
    pageName = action[1]
  sendLog(logName)
  jumpTo(pageName)
}
```


### 使用map简化
```js
const actions = new Map([
  [1, ['processing','IndexPage']],
  [2, ['fail','FailPage']],
  [3, ['fail','FailPage']],
  [4, ['success','SuccessPage']],
  [5, ['cancel','CancelPage']],
  ['default', ['other','Index']]
])
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status)=>{
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}
```

### map的key使用复杂字符串
```js
const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```

### map的key使用对象
```js
const actions = new Map([
  [{identity:'guest',status:1},()=>{/*do sth*/}],
  [{identity:'guest',status:2},()=>{/*do sth*/}],
  //...
])

const onButtonClick = (identity,status)=>{
  let action = [...actions].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```


### 多个key对应一个方法的场景
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  return new Map([
    [{identity:'guest',status:1},functionA],
    [{identity:'guest',status:2},functionA],
    [{identity:'guest',status:3},functionA],
    [{identity:'guest',status:4},functionA],
    [{identity:'guest',status:5},functionB],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```

### map的key可以使用正则
```js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
```


### 参考文档
- [JavaScript 复杂判断的更优雅写法](https://juejin.cn/post/6844903705058213896)

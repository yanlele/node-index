# JS 执行 100 万个函数， 还能保证浏览器不卡？

总所周知，浏览器下 JS 是单线程的，你执行 100万个函数， 不做任何防御措施， 浏览器只能原地爆炸。 那有没有在大批量 JS 任务执行的时候， 浏览器不卡呢？ 当然是有的 react fiber 任务调度就能做到。 当然本次文章不是介绍
react 任务调度。 我们只是简单讨论一下， 如何执行大批量任务的时候， 有什么办法避免浏览器不卡。

## 为何浏览器会感觉到卡顿

首先要明白， 为何会感觉到浏览器卡顿， 这个就不得不说到 长任务 了。

我们浏览器主线程一次只能处理一个任务（任务按照队列执行）。**当任务超过某个确定的点时，准确的说是50毫秒，就会被称为长任务(Long Task)**
。当长任务在执行时，如果用户想要尝试与页面交互或者一个重要的渲染更新需要重新发生，那么浏览器会等到Long Task执行完之后，才会处理它们。结果就会导致交互和渲染的延迟。

所以从以上信息可以得知，如果存在Long Task，那么对于我们Load（加载时）和Runtime（运行时）的性能都有影响

阻塞主线程达 50 毫秒或以上的任务会导致以下问题：

- 可交互时间 延迟
- 严重不稳定的交互行为 (轻击、单击、滚动、滚轮等) 延迟（High/variable input latency）
- 严重不稳定的事件回调延迟（High/variable event handling latency）
- 紊乱的动画和滚动（Janky animations and scrolling）

任何连续不间断的且主 UI 线程繁忙 50 毫秒及以上的时间区间。比如以下常规场景：

- 长耗时的事件回调（long running event handlers）
- 代价高昂的回流和其他重绘（expensive reflows and other re-renders）
- 浏览器在超过 50 毫秒的事件循环的相邻循环之间所做的工作（work the browser does between different turns of the event loop that exceeds 50 ms）

**那么我们解决了长任务， 是不是就不会让用户感觉到卡顿啦？** 答案是肯定的

## web worker 灵巧越过主线程阻塞问题

web worker是运行在Main线程之外的一个线程，叫做worker线程。我们可以把一些计算量大的任务放到worker中去处理。

主线程上的所有Long Task都消失了，复杂的计算都到单独的worker线程去处理了。但是`workder`线程仍然存在`Long Task`，不过没有关系，只要主线程没有Long Task，那就不影响构建、渲染了。

这个就没有什么好说的， 实现起来也非常的简单：

```js
// 主线程代码
const worker = new Worker('worker.js'); // 创建一个新的Web Worker

worker.postMessage({ start: 0, end: 1000000 }); // 向Web Worker发送消息

worker.onmessage = function(event) {
  const result = event.data;
  console.log('任务完成：', result);
};

// worker.js - Web Worker代码
onmessage = function(event) {
  const start = event.data.start;
  const end = event.data.end;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  postMessage(sum); // 向主线程发送消息
};
```

这样的方式好处是， 独立于主线程， 不会阻塞页面渲染。但是如果实时通信计算结果， 比如这样试试：
```js
// worker.js - Web Worker代码
onmessage = function(event) {
  const start = event.data.start;
  const end = event.data.end;
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum = i + 1;
    postMessage(sum); // 向主线程发送消息
  }
};
```
依然会被卡死。 

而且 `web worker` 不是本文介绍的重点。 我们来探索一下别的方式。

## 利用 requestAnimationFrame 实现任务调度

本质就是利用 `requestAnimationFrame` 对大批量的执行任务进行分割；`requestAnimationFrame` 的调用频率通常与显示器的刷新率相匹配 60Hz（每秒 60 次）。这样可以确保动画在不同设备上都能保持流畅。

我们先来创建一个 100 万个函数硬执行的例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<p id="result"></p>

<script>
  const $result = document.getElementById("result");

  /* ==============================  长任务 - Start ============================== */
  const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

  // 定义一个处理函数，例如对数组中的每个元素进行平方操作
  function processChunk(chunk) {
    return `chunk: ${chunk}`;
  }

  for (const item in bigArray) {
    $result.innerText = processChunk(item);
  }
  /* ==============================  长任务 - End   ============================== */
</script>
</body>
</html>
```
执行上面的代码， 效果会非常非常的酸爽；页面一直处于卡顿，然后最后结果闪出来， 如下图：                
![20240116002922_rec_.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/023b13712f674a2aac4c9ee2ac5f0f15~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1852&h=1120&s=340712&e=gif&f=115&b=fdfcff)

### 使用 chunkSize 来对长任务进行切分
首先定义个 chunkSize ， 用于申明每个函数区块可以容纳函数的大小。 然后再对 100 万个函数进行切割即可；

每一帧执行一小块范围的函数任务， 尽量让其控制在 langTask 时间范围内。 这个时候就能骗过人体肉眼， 就不会觉得卡顿了。

```javascript
// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

// 定义一个处理函数，例如对数组中的每个元素进行平方操作
function processChunk(chunk) {
  return `chunk: ${chunk}`;
}

// 分割任务并使用requestAnimationFrame
const chunkSize = 1000; // 每个小块的大小
let index = 0;

function processArrayWithRAF() {
  function processChunkWithRAF() {
    for (let i = 0; i < chunkSize; i++) {
      if (index < bigArray.length) {
        const result = processChunk(bigArray[index]); // 对每个元素执行处理函数
        console.log(result); // 输出处理结果
        index++;
      }
    }
    
    if (index < bigArray.length) {
      requestAnimationFrame(processChunkWithRAF); // 继续处理下一个小块
    }
  }

  requestAnimationFrame(processChunkWithRAF); // 开始处理大数组
}

processArrayWithRAF();
```

这次咱们再来看看执行效果：               
![20240116003620_rec_.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee3574a530a64cbda4837c7a68cc922a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1852&h=1120&s=337644&e=gif&f=97&b=fdfcff)

就已经明显丝滑太多了。 

但是这个时候就可能会有爱学习的同学发问了：chunkSize 是写死的 1000， 你凭什么保证每一帧执行 1000 次函数， 浏览器就不卡顿了？

对的， 我没法保证。 那么我们就让程序来帮我们保证。 

### 动态计算 chunkSize 

让程序来帮我们动态计算 chunkSize , 这样既可以丝滑的运行我们 一百万 的函数，同时能保证浏览器的。 
怎么动态计算？ 其实关键在于， 每次 `requestAnimationFrame` 执行频次， 一秒钟执行 60 次， 那么每次消耗时间是 16ms 左右；
那么我们每次程序执行耗时， 就对比 16 ms 这个时间。如果程序执行时间， 超过 16 ms , 那么就减少 chunkSize ， 让执行时间减少。 
同理如果 chunkSize 指定的函数数量执行完， 时间少于 16ms , 那么增加 chunkSize 数量即可。 
当然 16ms 是占满所有浏览器可执行函数的空间， 如果你还需要让浏览器执行别的任务， 那么这个 16ms 时间进行相对应的减少就可以了。 

> 例如 react 调度器里面：
> 为了保证给浏览器预留足够的渲染时间，那么在每一帧（16ms）中预留给 JS 线程的执行时间就是 5ms
> 源码可以看这里： [https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e99e307cc70947e991bf95d98e1b6166~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1660&h=1174&s=269017&e=png&b=fffefe)

所以这儿就直接贴代码了：
```js
// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1);

// 定义一个处理函数，对数组中的每个元素执行一次
function processChunk(chunk) {
return `chunk: ${chunk}`;
}

// 动态调整 chunkSize 的优化方式
let chunkSize = 1000; // 初始的 chunkSize
let index = 0;

function processArrayWithDynamicChunkSize() {
function processChunkWithRAF() {
  let startTime = performance.now(); // 记录结束时间
  for (let i = 0; i < chunkSize; i++) {
    if (index < bigArray.length) {
      const result = processChunk(bigArray[index]); // 对每个元素执行处理函数
      $result.innerText = result;
      index++;
    }
  }
  let endTime = performance.now();
  let timeTaken = endTime - startTime; // 计算处理时间

  // 根据处理时间动态调整 chunkSize
  if (timeTaken > 16) { // 如果处理时间超过一帧的时间（16毫秒），则减小 chunkSize
    chunkSize = Math.floor(chunkSize * 0.9); // 减小10%
  } else if (timeTaken < 16) { // 如果处理时间远小于一帧的时间（8毫秒），则增加 chunkSize
    chunkSize = Math.floor(chunkSize * 1.1); // 增加10%
  }

  if (index < bigArray.length) {
    requestAnimationFrame(processChunkWithRAF); // 继续处理下一个小块
  }
}

requestAnimationFrame(processChunkWithRAF); // 开始处理大数组
}

processArrayWithDynamicChunkSize();
```
上面代码的关键点就在于： `startTime` 和 `endTime` ， 其差值记录 一个 `chunkSize` 限定的函数执行所需要的时间。 拿这个时间去对比 16ms 的时间大小， 然后动态调整 chunkSize 就可以了。

效果如下：

![20240127210300_rec_.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18550417475b43b1ae8d382149274927~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1908&h=976&s=94886&e=gif&f=52&b=fdfcff)

执行完100万行函数， 只需要 1 秒多， 而且浏览器非常丝滑。（gif 录制会掉帧， 实际上是非常丝滑的）；


------------------

最后这个只是一个简单的实现任务调度的一个思路， 真正的任务调度器， 可能复杂度是非常高的。 可以参考 `react scheduler`

最后附上源码：

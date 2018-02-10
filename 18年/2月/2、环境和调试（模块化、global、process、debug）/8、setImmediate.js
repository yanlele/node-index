/*把一个方法放在下一个事件队列中去*/
setImmediate(()=>{
   console.log('setImmediate');
});

/*也是把一个方法放在下一个事件队列中去,不过在setImmediate之前，在nextTick之后*/
setTimeout(()=>[
    console.log('timeout')
],0);

/*也是把一个方法放在下一个事件队列中去,不过在setImmediate之前*/
process.nextTick(()=>{
   console.log('nextTick');
});
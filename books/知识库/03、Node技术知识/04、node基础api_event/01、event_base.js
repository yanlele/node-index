const EventEmitter=require('events');

class CustomEvent extends EventEmitter{

}

const ce=new CustomEvent();

ce.on('test',()=>{
    console.log('this is test!');
});

setInterval(()=>{
    ce.emit('test')
},1000);
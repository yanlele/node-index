var app=require('http').createServer();
var io=require('socket.io')(app);

var port=3000;
var clientCount=0;//客户的个数
app.listen(port);

//开启socket.io的链接
io.on('connection',function(socket){
    clientCount++;
    socket.nickName='user'+clientCount;
    //socket.emit()是想客户端发送信息，io.emit是想所有链接客户广播信息
    io.emit('enter',socket.nickName+'comes in');

    socket.on('message',function(str){
        io.emit('message',socket.nickName+': '+str);
    });

    socket.on('disconnect',function(){
        io.emit('leave',socket.nickName+' leave')
    });
});

console.log('webSocket server listening on port '+port);
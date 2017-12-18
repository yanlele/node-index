var app=require('http').createServer();
var io=require('socket.io')(app);

app.listen(3000);
io.on('connection',function(socket){
    socket.emit('news',{
        hello:'word'
    });
    socket.on('my other event',function(data){
        console.log(data)
    })
});
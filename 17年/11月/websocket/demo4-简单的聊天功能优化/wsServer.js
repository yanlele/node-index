var ws = require("nodejs-websocket")

var clientCount=0;//客户的个数

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");

    clientCount++;
    conn.nickName='user'+clientCount;

    var message={};
    message.type='enter';
    message.data=conn.nickName+'comes in';

    //给每一个客户都广播一个信息，告知有新用户进来
    broadcast(JSON.stringify(message));

    //获取连接信息
    conn.on("text", function (str) {
        console.log("Received "+str);

        var message={};
        message.type='message';
        message.data=conn.nickName+": "+str;
        broadcast(JSON.stringify(message));
    });

    //断开连接的回调
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var message={};
        message.type='leave';
        message.data=conn.nickName+' leave';
        broadcast(JSON.stringify(message));
    });

    //处理错误事件信息
    conn.on('error',function(err){
        console.log('throw : err');
        console.log(err);
    });


}).listen(8001);

console.log('webSocket server listening on port 8001');

//建议一个公共广播的函数
function broadcast(str){
    //首先要拿到server的所有连接
    server.connections.forEach((item)=>{
        item.sendText(str)
    })
}
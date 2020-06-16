const WebScoket = require('ws')
const ws = new WebScoket('ws://localhost:5656')

ws.onopen = function (e) {
    console.log('服务器连接成功');
    console.log('open...');
    ws.send('hello!')
}
ws.onerror = function(e) {
    console.log(e);
}
ws.onmessage = function(e) {
    console.log(`server said: ${e.data}`);
}
ws.onclose = function(e) {
    console.log('连接断开');
    ws.close()
}

// 终端输入事件
process.stdin.on('data',data=> {
    ws.send(data.toString().trim());
})
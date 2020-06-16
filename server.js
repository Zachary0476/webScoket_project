const WebScoketServer = require('ws').Server
const http = require('http')
const express = require('express')
const WebScoket = require('ws')


const app = express()
const httpServer = http.createServer(app)

const wss = new WebScoketServer({server:httpServer})

// const 
httpServer.on('request',(req,res)=> {
    console.log(req.url);
})

let clientList = []

wss.on('connection',webScoket=> {
    clientList.push(webScoket)
    console.log('客户端连接成功');
    webScoket.send('ok 你连上我了 我给你发个消息试试!!')
    
	webScoket.on("message", function(data) {
        console.log(`wsClient Said:  ${data}`);
        clientList.forEach(socekt=> {
            socekt.send(data.toString().trim());
        })
    });

    // 终端输入事件
    process.stdin.on('data',data=> {
        console.log(data.toString().trim());
    })

    webScoket.on("error", function(err) {
		console.log("client error", err);
    });

    webScoket.on("close", function() {
		console.log("client close");
    });
    

})  





httpServer.listen(5656,()=> {
    console.log('server running at localhost:5656');
})
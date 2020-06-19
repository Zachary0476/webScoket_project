'user strict'
const WebScoketServer = require('ws').Server
const http = require('http')
const express = require('express')
const WebScoket = require('ws')
const app = express()
const httpServer = http.createServer(app)
const wss = new WebScoketServer({
    server: httpServer
})

let webClients = new Map()
let wsClient = null
wss.on('connection', (webScoket, req) => { //web客户端连接时触发
    console.log('web客户端连接成功');
    webScoket.send('给web客户端发个消息测试')
    // ---------------webSocket客户端与真实服务器事件监听--------------------
    let path = req.url
    if (webClients.keys)
        webClients.set(path, webScoket)
    wsClient = new WebScoket(`ws://47.96.227.159:23011/kfkconsumer/websocket${path}`) //向真实的服务端发起请求
    wsClient.onopen = function (e) {
        console.log('connection open...');
    }
    wsClient.onmessage = function (e) {
        webClients.get(path).send(e.data) //精准发送数据
    }
    wsClient.onerror = function (e) {
        console.log(e);
    }
    wsClient.onclose = function (e) {
        console.log('连接断开');
        wsClient.close()
    }
})

//web客户端消息推送
let timer = setInterval(() => {
    console.log(`当前在线客户机数量 ：${webClients.size}`);
    if (webClients.size > 0) {
        for (let [key, wsItem] of webClients) {
            wsItem.send(`
                    当前在线客户机数量：${webClients.size}\n
                    当前正在为：${key}推送消息
                `)
        }
    }
}, 2000)



wss.on('close', () => {
    webClients = {}
    wsClient = null
    wss = null
    wsClient = null
    timer = null
    console.log('服务器宕机了哈');
})


httpServer.listen(5656, () => {
    console.log('server running at localhost:5656');
})
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redisHelper = require("./redis-helper")


shopIdMap = {}
cartMap = {}

io.on('connection', function (client) {
    console.log('Client connected...', client.handshake.query);
    client.on('join', function (data) {
        console.log(data);
    });
    let oneSignal = {}
    if(client.handshake.query.oneSignal && client.handshake.query.oneSignal != 'undefined')
    {
        oneSignal = JSON.parse(client.handshake.query.oneSignal || {})
    }
    let shopId = client.handshake.query.shopId || oneSignal.shopId

    if(oneSignal && shopId)
        {
            if(!shopIdMap[shopId])
                {
                    shopIdMap[shopId] = []
                }
            if(oneSignal.id)
                shopIdMap[shopId].push(oneSignal.id)
        }

    if(client.handshake.query.cartId && shopId)
        {
            if(!cartMap[client.handshake.query.cartId]){
                cartMap[client.handshake.query.cartId] = []
            }
            
            if(oneSignal.id)
                cartMap[client.handshake.query.cartId].push(oneSignal.id)
        }
        console.log(shopIdMap, cartMap)
})

function sendMsg(msg) {
    console.log(" ## SOCKET MSG ## ", msg.cartId)
    io.emit("cartUpdate", msg)
}

exports.sendMsg = sendMsg
exports.shopIdMap = shopIdMap
exports.cartMap = cartMap
try {
    console.log(" ## SOCKET ## started")
    server.listen(3003);
} catch (e) {

}

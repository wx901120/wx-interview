
// 服务端通过ws
let WebSocket = require('ws')


let wss = new WebSocket.Server({
    port: 3000
})
wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        console.log(data);
        ws.send('我也爱你')
    })
})

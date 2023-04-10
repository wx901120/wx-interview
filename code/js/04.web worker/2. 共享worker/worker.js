// 共享worker中是通过onconnect接收消息的
onconnect = function(e) {
    // 调试发现这里没进来
    debugger
    console.log('worker中：',e.port);
    var port = e.ports[0];
  
    port.onmessage = function(e) {
        // 这里也没有进来
        debugger
      var workerResult = 'res: ' + (e.data[0] * e.data[1]);
      port.postMessage(workerResult);
    }
  }
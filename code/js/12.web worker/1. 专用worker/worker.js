// 在专用worker中 通过onmessage接收消息
onmessage = function(e){
    console.log('worker: message received from main script')
    const result = e.data[0] * e.data[1]
    if(isNaN(result)) {
        postMessage('worker: please input two numbers')
    } else {
        const workerRes = `Result: ${result}`
        postMessage(workerRes)
    }
}
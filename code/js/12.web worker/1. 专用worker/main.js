const first = document.querySelector('#number1')
const second = document.querySelector('#number2')

const btn = document.querySelector('#btn') 
const htmlCanvas = document.querySelector('#myCanvas')

const result = document.querySelector('.result')

// 这里是主线程
// 用来检测是否支持worker
if (window.Worker) {
    const myWorker = new Worker('worker.js')
    const canvasWorker = new Worker('canvasWorker.js')
    btn.addEventListener('click', () => {
        const offscreen = htmlCanvas.transferControlToOffscreen()
        // 注意：第二个参数不能省略
        canvasWorker.postMessage({ canvas: offscreen }, [offscreen])
    })
    first.onchange = function () {
        // 主线程发送消息给worker线程
        myWorker.postMessage([first.value, second.value])
        console.log('main: Message posted to worker');
    }
    second.onchange = function () {
        // 主线程发送消息给worker线程
        myWorker.postMessage([first.value, second.value]);
        console.log('main: Message posted to worker');
    }
    // 主线程接收消息来自worker线程
    myWorker.onmessage = function (e) {
        result.textContent = e.data
        console.log('main: message received from worker.js')
    }
} else {
    console.log('your browser doesnt support web worker')
}
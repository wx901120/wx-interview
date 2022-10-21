## web worker 关键点
- 运行在独立的线程
- 在worker内，不能直接操作dom节点，也不能使用window对象上的属性和方法，能使用WebSockets,indexDB这些
- workers和主线程之间的消息传递机制---双方都是通过`postMessage`发送各自的消息，使用`onmessage`事件处理消息 ******
- 在主线程中使用时，onmessage和postMessage必须挂载worker对象上，而在worker中时，不用，因为在worker内部，worker是有效的全局作用域
- 如何终止worker，通过`myWorker.terminate()`,worker线程会被立即杀死
- 优势在于处理**密集型**运算而不会阻塞 UI线程

### 专用 worker
只能被生成它的脚本使用
具体使用参考专用worker文件夹

### 共享 worker

与专用worker最大的区别：与一个共享worker通信，必须通过端口对象--就是要拿到一个确切的端口与worker通信

### 场景
一般用于需要执行时间比较久的计算，就可以开启一个worker进行计算，这也是它的优势：能够处理 **密集型** 的运算而不会阻塞 UI线程


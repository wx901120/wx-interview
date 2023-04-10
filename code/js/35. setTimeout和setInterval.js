/**
 * setTimeout模拟setInterval
 */
function _setInterval(fn, interval) {
    let timer
    function intervalFn() {
        timer && fn() // 有timer才执行，否则一上来就执行了，
        timer = setTimeout(intervalFn, interval);
    }
    intervalFn()
}
// _setInterval(() => {
//     console.log('a');
// }, 2000);

/**
 * setInterval模拟setTimeout
 */
function _setTimeout(fn, timeout) {
    let timer
    timer = setInterval(() => {
        clearInterval(timer)
        fn()

    }, timeout);
}
_setTimeout(() => {
    console.log('a');
}, 2000);

/// 第二次
// function _setInterval2(fn,delay){
//     let timer
//     function delayFn(){
//         timer && fn()
//         timer = setTimeout(delay, timeout);
//     }
//     delayFn()
// }

// settimeout小知识
var name = 1
const myObj = {
  name: 2,
  showName() {
    console.log(this.name)
  },
}
setTimeout(myObj.showName, 1000) // 输出1
// 可以通过bind改变this指向
setTimeout(myObj.showName.bind(myObj), 1000)// 2
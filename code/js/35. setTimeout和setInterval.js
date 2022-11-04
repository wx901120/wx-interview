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
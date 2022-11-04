/**
 * JS没有语言内置的休眠（sleep or wait）函数，所谓的sleep只是实现一种延迟执行的效果
 */

/**
 * 1. 利用伪死循环阻塞主线程
 */
function sleep1(fn, time) {
    let start = new Date().getTime()
    while (new Date().getTime() - start < time) {
        continue
    }
    fn()
}

/**
 * 2. settimeout
 */
function sleep2(fn, time) {
    setTimeout(fn, time)
}
/**
 * 3. promise
 */
function sleep3(fn, time) {
    new Promise(resolve => {
        // 时间到了才resolve
        setTimeout(resolve, time)
    }).then(() => {
        fn()
    })
}
/**
 * promise的版本
 * 4. async。。。await
 */
async function sleep4(fn, time) {
    await new Promise(resolve => {
        setTimeout(resolve, time)
    })
    fn()
}

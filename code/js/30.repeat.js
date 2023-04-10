/**
 * 1. repeat(str,nums)
 */
function repeat(str, nums) {
    let res = ''
    while (nums--) {
        res += str
    }
    return res
}
// console.log(repeat('124', 3));

/**
 * 2. repeat(fn,times,delay)
 */
function repeatFn(fn, times, delay) {
    return async (...args) => {
        while (times--) {
            await new Promise(resolve => {
                setTimeout(() => {
                    fn(...args)
                    resolve()
                }, delay)
            })
        }
    }
}
// function fn(...args) {
//     console.log(...args)
// }
// 函数调用四次，每次间隔 1s 打印 hello
// const repeat2 = repeatFn(fn, 4, 1000)
// repeat2('hello')

// 实现一个函数, 可以间隔输出（快手）
function createRepeat(fn, repeat, interval) {
    // 返回一个函数
    return async (...args) => {
        while (repeat--) {
            await new Promise(resolve => {
                setTimeout(() => {
                    fn(...args)
                    resolve()
                }, interval * 1000)
            })
        }
    }
}

const fn = createRepeat(console.log, 3, 4)

fn('helloWorld') // 每4秒输出一次helloWorld, 输出3次

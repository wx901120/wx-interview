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
function fn(...args) {
    console.log(...args)
}
// 函数调用四次，每次间隔 1s 打印 hello
const repeat2 = repeatFn(fn, 4, 1000)
repeat2('1')
/**
 * 函数执行结果会被缓存下来，只执行一次
 */

const once = (fn) => {
    let isFirst = true, res;
    return (...args) => {
        if (!isFirst) return res
        res = fn(...args)
        isFirst = false
        return res
    }
}
const fn = (x) => x
const onceFn = once(fn)
console.log(onceFn(3));
console.log(onceFn(4));
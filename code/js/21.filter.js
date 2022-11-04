/**
 * 1. filter 中的 exc 接受三个参数，与map一致，主要实现的是数组的过滤功能，会根据 exc 函数的返回值来判断是否“留下”该值
 * 2. 返回一个新的数组
 */
const a = [1, 2, 3]
console.log(a.filter((value, index, arr) => value > 1))
Array.prototype._filter = function (exc) {
    const ans = []
    this.forEach((value, index, arr) => {
        // 根据返回的结果来返回
        const res = exc(value, index, arr)
        // 为true的才返回
        if (!!res) {
            ans.push(value)
        }
    })
    return ans
}
console.log(a._filter((value, index, arr) => value > 1))
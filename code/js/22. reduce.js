/**
 * 1. reduce 接收两个参数，第一个为exc函数，第二个为初始值，如果不传默认为0
 * 2. 
 */
const a = [1, 2, 3]
console.log(a.reduce((pre, curValue, curIndex, arr) => pre + curValue, 0))

Array.prototype._reduce = function (exc, initialValue = 0) {
    let res = initialValue
    this.forEach((value, index, arr) => {
        res = exc(res, value, index, arr)
    })
    return res
}
console.log(a._reduce((pre, curValue, curIndex, arr) => pre + curValue, 2))
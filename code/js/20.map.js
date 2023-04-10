/**
 * 1. map中的exc接收三个参数，分别是：元素值，元素数组下标，原数组
 * 2. map返回的是一个新的数组
 */
// 这里不能直接使用箭头函数，否则无法访问到 this
Array.prototype._map = function (exc) {
    if(typeof exc !== 'function') return;
    const res = []
    // 这里的arr，还是利用了forEach遍历数组的参数
    this.forEach((item, index, arr) => {
        res[index] = exc(item, index, arr)
    })
    return res
}
const a = Array.from({ length: 3 }).fill(1)
console.log(a._map((item, index, arr) => item + 1));


// Array.prototype._map2 = function (exc) {
//     let ans = []
//     this.forEach((value, index, arr)=>{
//         ans[index] = exc(value, index, arr)
//     })
//     return ans
// }
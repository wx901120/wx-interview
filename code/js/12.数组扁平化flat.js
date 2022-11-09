const arr = [1, 2, 3, [4, 5, [6, 7]]]
console.log(arr.flat(1));

// 模板
Array.prototype._flat = function (depth = 1) {
    let arr = this
    // 递归结束条件
    if (depth === 0) return arr
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...cur._flat(depth - 1)]
        } else {
            return [...pre, cur]
        }
    }, [])
}
console.log([1, 2, 3, [4, [5, [6]]]]._flat(2)); // [1, 2, 3, 4, 5, [6]]


// 第二次
Array.prototype._flat2 = function (depth = 1) {
    let arr = this
    if(depth === 0) return arr
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...cur._flat2(depth - 1)]
        } else {
            return [...pre, cur]
        }
    })
} 
// 第三次 50%
// 注意：它是一个递归，所以return不能少，递归终止条件不能少
Array.prototype._flat = function (depth = 1) {
    if (depth === 0) return this
    return this.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...cur._flat(depth - 1)]
        } else {
            return [...pre, cur]
        }
    }, [])
}
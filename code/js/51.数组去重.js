/**
 * 方式1：古老做法
 */
const _deleteRepeat = array => {
    // 补全代码
    return array.reduce((pre, cur) => {
        if (!pre.includes(cur)) {
            pre.push(cur)
        }
        return pre
    }, [])
}
console.log(_deleteRepeat([-1, 1, 2, 2]))
/**
 * 方式2：es6的new Set数据结构
 */
const _deleteRepeat2 = array => {
    // 补全代码
    // return [...new Set(array)]
    return Array.from(new Set(array))
}
console.log(_deleteRepeat2([-1, 1, 2, 2]))

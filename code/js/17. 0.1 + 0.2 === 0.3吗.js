console.log(0.1 + 0.2 === 0.3);// false
/**
 * 为什么？
 * 计算机在存储数据时的基本原则：
 * 1. 用有限的存储空间，来存储二进制数据
 * 十进制的 0.1 转换为二进制时，得到的是一个无限循环小数0.00011…，0.2同理
 * 所以，其实计算机存储的是0.1和0.2的近似值
 * 问题的本质：浮点数精度问题导致的
 */

/**
 * 怎么解决？
 * 在es6中提供了一个属性，用来标识js能够表达的最小精度，误差如果小于这个值，则认为是么有意义了，即不存在误差
 */
// 1. Number.EPSILON
function equal(a, b) {
    return Math.abs(a - b) < Number.EPSILON
}
console.log(equal(0.1 + 0.2, 0.3));// true

// 2. parseFlot
console.log(parseFloat((0.1 + 0.2).toFixed(10))) // 0.3

// 3. 通过转换成整数
/**
 * 返回一个新的函数，新函数的this 是bind()的第一个参数
 */
const obj = {
    name: 'wx',
    getName() {
        return this.name
    }
}
const obj2 = {
    name: 'wyc'
}
const fn = obj.getName.bind(obj2)
console.log(fn());

Function.prototype._bind = function (target, ...args) {

    // 因为是箭头函数，所以不需要_self = this
    // const fn = (...rest) => {
    //     return this.call(target, ...args, ...rest)
    // }
    // return fn
    return (...rest) => {
        return this.call(target, ...args, ...rest)
    }
}
const fn2 = obj.getName._bind(obj2)
console.log(fn2());

/**
 * 1. Object.create() 创建一个新对象，使用参数中传进去的参数作为新创建对象的原型
 */
const obj = Object.create(null)
console.log(obj);

Object.prototype._create = function (obj) {
    const Fn = function () { }
    Fn.prototype = obj
    return new Fn()
}
const obj2 = Object._create(null)
console.log(obj2);
/**
 * 1. Object.create(xxx) 创建一个新对象，使用传进去的参数xxx作为新创建对象的原型
 */
const obj = Object.create(null)// 让obj.__proto__ = null
console.log(obj);

Object.prototype._create = function (obj) {
    const Fn = function () { }
    Fn.prototype = obj
    return new Fn()
}
const obj2 = Object._create(null)
console.log(obj2);

// 牛客网
const _objectCreate = proto=>{
    const obj = {}
    obj.prototype = proto
    return obj
}
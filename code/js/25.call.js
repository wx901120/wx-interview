/**
 * 用来改变this的执行
 */

const obj = {
    name: 'wx',
    getName() {
        return this.name
    }
}
const obj2 = {
    name: 'wyc',
    // [Symbol()](){// call的效果类似这样，给obj2上增加一个属性，属性值是调用call的 ********很关键这个思路*********
    //     return this.name
    // }
}
console.log(obj.getName.call(obj2));

Function.prototype._call = function (ctx, ...args) {
    // 对ctx包装一层，否则，如果传进来的是个字符串，那就有问题了
    ctx = Object(ctx) || window
    const key = Symbol()
    // this : 表示调用_call的，这里表示 obj.getName
    ctx[key] = this
    const res = ctx[key](...args)
    // 用完就扔，渣男～～
    delete ctx[key]
    return res
}
console.log(obj.getName._call(obj2));


// 第二次
Function.prototype._call2 = function (obj, ...args) {
    ctx = Object(ctx) || window
    const key = Symbol()
    obj[key] = this
    const res = obj[key](obj, ...args)
    delete obj[key]
    return res
}
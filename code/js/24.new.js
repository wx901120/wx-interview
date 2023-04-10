/**
 * 
 */
// 用来测验了一下call
//  Function.prototype._call = function (ctx, ...args) {
//     // 对ctx包装一层，否则，如果传进来的是个字符串，那就有问题了
//     ctx = Object(ctx) || window
//     const key = Symbol()
//     // this : 表示调用_call的，这里表示 obj.getName
//     ctx[key] = this
//     // 这里的res主要就是看有返回值时，要把返回值返回回去，本身没有什么作用
//     const res = ctx[key](...args)
//     // 用完就扔，渣男～～
//     delete ctx[key]
//     return res
// }
function Foo() {
    this.name = 'wx'
    this.age = 18
    // return 'ab'
    // return {
    //     a: 'wx',
    //     b: 18
    // }
}
// const fn = new Foo()
// console.log(fn);

const _new = function (fn, ...args) {
    let obj = {}//或者Object.create({})
    obj.__proto__ = fn.prototype
    // 将obj赋给fn 的 this
    const res = fn.call(obj, ...args)
    // 如果res 是对象,则返回 res这个对象，否则，返回obj
    return typeof res === 'object' && res !== null ? res : obj
}
console.log(_new(Foo));


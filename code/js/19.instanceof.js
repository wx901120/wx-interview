/**
 * 1. 如果target为基本类型，直接返回false
 * 2. 判断Fn.prototype是否在target的影式原型链上
 */
const _instanceof = (target, Fn) => {
    if(typeof target !== 'object' || target == null) return false
    // target = target.__proto__
    // while (true) {
    //     if (target === Fn.prototype) return true;
    //     if (target === null) return false;
    //     target = target.__proto__
    // }
    while(target?.__proto__){
        if(target.__proto__ === Fn.prototype) return true
        target = target.prototype
    }
    return false
}
function Foo() { }
const obj = new Foo()
const arr = new Array()
const date = new Date()
console.log(_instanceof(date, Foo))
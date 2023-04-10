/**
 * Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
 */
// 基本使用
const obj = {
    prop: 42
}

Object.freeze(obj)

obj.prop = 33
// Throws an error in strict mode

console.log(obj.prop)
// Expected output: 42

// 实现
const _objectFreeze = obj => {
    if (typeof obj === null) return
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            _objectFreeze(obj[key])
        } else {
            Object.defineProperty(obj, key, {
                writable: false, // 不可修改
                configurable: false // 不可配置
            })
        }
    }
    Object.seal(obj) //封闭 obj 对象，在对象外面不能增加，不可删除，可修改
}

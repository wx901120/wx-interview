
// 使用vuex中的方式
function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 函数，日期，正则
    if (typeof obj === 'function') return obj
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    // if obj is hit, it is in circular structure
    /**
     * 类似下面这种
     * var a = {b:1}
     * a.c = a
     * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
     * 解决循环引用报错问题
     */
    const hit = cache.filter(c => c.original === obj)[0] //find(cache, c => c.original === obj)
    if (hit?.length) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {} // obj instanceof Array ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

let originObj = { a: 1, b: { e: 1 }, c: [1, 2, 3,], d: function () { }, e: new Map() }
const deep = deepCopy(originObj)
deep.a = 2
console.log(originObj.a);// 1
console.log(deep.b === originObj.b);// false


/**
 * 1. 对于函数，正则，日期，ES6新对象，需要重写创建
 * 2. 需要处理循环引用的问题
 */
// 面试用这个
function _deepClone(target, map = new WeakMap()) {
    // 1. 基本数据类型直接返回
    if (typeof target !== 'object' || target === null) return target
    // 2. 函数，正则，日期，ES6新对象，执行构造器，返回新的对象
    const constructor = target.constructor // 如：Object(){}
    // 匹配任何开头为 Function结尾也是Function  constructor.name: 'Object'
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return new constructor(target)

    // 3. 避免循环引用
    if (map.get(target)) return map.get(target)
    
    // 4.针对数组和对象区分
    const cloneTarget = Array.isArray(target) ? [] : {}
    // 放这里
    map.set(target, cloneTarget)

    //5.递归遍历
    Object.keys(target).forEach(key => {
        cloneTarget[key] = _deepClone(target[key], map)
    })
    return cloneTarget
}
const deep2 = _deepClone(originObj)

// 浅copy
function _shallowClone(target) {
    if (typeof target !== 'object' || target === null) return target

    const constructor = target.constructor
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) return target

    const cloneTarget = Array.isArray(target) ? [] : {}
    Object.keys(target).forEach(key => {
        cloneTarget[key] = target[key]
    })
    return cloneTarget
}

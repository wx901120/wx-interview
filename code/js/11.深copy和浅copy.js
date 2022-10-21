
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

let originObj = { a: 1, b: { e: 1 }, c: [1, 2, 3,], d: function () { } }
const deep = deepCopy(originObj)
deep.a = 2
console.log(originObj.a);// 1
console.log(deep.b === originObj.b);// false
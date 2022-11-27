let obj = {
    wx: 'wx',
    age: 18
}
/**
 * 1. for...in
 */
for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        // console.log(element);
    }
}
/**
 * 2. for...of
 * 但是for...of用来遍历可迭代对象，普通对象是不能用for of来遍历的，那怎么把它变成可迭代对象呢？
 */

let o2 = {
    wx: 'wx',
    age: 18,
    [Symbol.iterator]() {
        let _this = this
        const arr = Object.keys(_this)
        const len = arr.length
        let index = 0
        return {
            next() {// next()是next:function(){}的简写
                if (index < len) {
                    const res = { value: arr[index], done: false }
                    index++
                    return res
                } else {
                    return {
                        value: undefined,
                        done: true
                    }

                }
            }
        }
    }
}
for (const key of o2) {
    console.log(`${key}-${o2[key]}`);
}
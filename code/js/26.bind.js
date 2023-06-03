/**
 * 返回一个新的函数，新函数的this 是bind()的第一个参数
 * 解决什么问题的：某个对象想要用另外一个对象的方法时
 *
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
// console.log(fn())

Function.prototype._bind = function (target, ...args) {
    // 因为是箭头函数，所以不需要_self = this
    return (...rest) => {
        return this.call(target, ...args, ...rest)
    }
}
const fn2 = obj.getName._bind(obj2)
// console.log(fn2())

// mdn例子：
// 例子1:
this.x = 9 // 在浏览器中，this 指向全局的 "window" 对象
var module = {
    x: 81,
    getX: function () {
        return this.x
    }
}

module.getX() // 81

var retrieveX = module.getX
retrieveX()
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module)
boundGetX() // 81

// 例子2
function LateBloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
    setTimeout(this.declare.bind(this), 1000)
    // 在默认情况下，使用 setTimeout() 时，this 关键字会指向 window（或 global）对象,所以如果使用这种方式，那么window上面没有petalCount属性
    // setTimeout(this.declare, 1000)
}

LateBloomer.prototype.declare = function () {
    console.log(this);
    console.log('I am a beautiful flower with ' + this.petalCount + ' petals!')
}

var flower = new LateBloomer()
flower.bloom() // 一秒钟后，调用 'declare' 方法

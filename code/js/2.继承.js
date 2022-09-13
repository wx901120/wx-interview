/**
 * es5的继承
 */
function Father(name) {
    // 属性
    this.name = name
    // 方法
    this.sayName = function () {
        console.log(this.name);
    }
    this.colors = ['red', 'green']

}
// 原型对象上的属性/方法
Father.prototype.age = 18
Father.prototype.sayAge = function () {
    console.log(this.age);
}


/**
 * 1. 原型链继承
 * 核心：父类的实例作为子类的原型
 * 
 * 优点：
 * 1. 父类的原型和实例上的属性和方法，子类都能访问到
 * 缺点：
 * 1. 父类的属性和方法被所有实例共享，即一个儿子改变，其他儿子也会改变
 * 2. 创建子类实例时，无法向父构造函数传参
 */
function Son(name) {
    this.name = name
}
Son.prototype = new Father()

const s1 = new Son('s1')
const s2 = new Son('s2')

// s1.colors.push('blue')
// console.log(s1.name);
// console.log(s1.age);
// console.log(s1.sayAge());
// console.log(s1.colors);
// console.log(s2.colors);


/**
 * 2. 调用父类的构造函数继承
 * 核心：复制父类的实例属性给子类
 * 
 * 优点：
 * 1. 可以向父类传递参数
 * 2. 父类的引用属性不在共享，即一个儿子改变，其他儿子不会改变
 * 缺点：
 * 1. 无法继承父类原型的属性和方法
 */
function Son1(name) {
    Father.call(this, '传给父的参数')
    // this.name = name// 如果没有这一句，那么son1子类上的name属性就是：传给父的参数
}

const s3 = new Son1('s3')
const s4 = new Son1('s4')

console.log(s3.name);
s3.colors.push('blue')// 传给父的参数
console.log(s3.colors);// [ 'red', 'green', 'blue' ]
console.log(s4.colors);// [ 'red', 'green' ]
console.log(s3.age);// undefined
// console.log(s3.sayAge());// 抛出错误

/**
 * 3. 组合继承
 * 核心：使用原型继承的方式对父类原型属性和方法的继承，使用构造函数继承实现对实例属性的继承
 * 优点：
 * 1. 集合了上面两种的优势
 * 缺点：
 * 1. 调用了两次构造函数
 * 2.constructor指向问题
 */
function Son2(name) {
    // call的实现会调用Father构造函数，这是第一次调用，子类的实例增加了父类实例
    Father.call(this,'传给父类的')
}
// new Father也会调用一次构造函数，子类的原型也增加了父类实例
Son2.prototype = new Father()

/**
 * 4. 寄生组合继承
 * 核心：解决子类增加两份实例的问题
 * 
 */

function Son4(name) {
    Father.call(this)
}
Son4.prototype = Object.create(Father.prototype)// Object.create(Father.prototype)会新创建一个对象，这个对象的__proto__指向Father.prototype
// 修复构造函数指向
Son4.prototype.constructor = Son4

// Son4.__proto__ === Function.prototype // true



/**
 * es6的class 继承extends
 * 
 */
class Sub extends Super {
    constructor(name) {
        super(name)
    }
}
let sub1 = new Sub('sub1')

// Sub.__proto__ === Super // true 
// 总结区别：
// sub的指向的原型不一样，es6指向的就是父类Super，而es5指向的是Function.prototype
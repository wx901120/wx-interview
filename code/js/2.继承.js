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
 * 2. constructor指向问题
 */
function Son2(name) {
    Father.call(this,'传给父类的') // 第二次调用Father()
}
Son2.prototype = new Father() // 第一次调用Father()
Son2.prototype.constructor = Son2 // 很重要

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
 */
class Super{
    constructor(name){
        this.name = name
    }
}
class Sub extends Super {
    constructor(name) {
        super(name)// 它必须在使用this关键字前面调用
        this.xxx = 'wwww'
    }
}
let sub1 = new Sub('sub1')
console.log(Sub.prototype.__proto__ === Super.prototype) // true
console.log(Sub.__proto__ === Super) // true

// es6的class继承和es5的继承有什么区别？面试题
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
/**
 * (1) 子类的 __proto__ 属性指向父类：Sub.__proto__ === Super
 * (2) 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
 * 怎么理解？
 * 子类作为一个实例对象，它的原型是父类，即B.__proto__ = A
 *     作为一个构造函数，子类的原型对象是父类原型对象的 实例
 */


// mdn 官网例子
// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
  }
  
  // superclass method
  Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
  };
  
  // Rectangle - subclass
  function Rectangle() {
    Shape.call(this); // call super constructor.
  }
  
  // subclass extends superclass
//   const temp = Object.create(Shape.prototype)
//   console.log(temp.__proto__ === Shape.prototype); // true
//   console.log(Shape.prototype.constructor);// Shape
  Rectangle.prototype = Object.create(Shape.prototype);
  
  //If you don't set Rectangle.prototype.constructor to Rectangle,
  //it will take the prototype.constructor of Shape (parent).
  //To avoid that, we set the prototype.constructor to Rectangle (child).
  Rectangle.prototype.constructor = Rectangle;
  
  const rect = new Rectangle();
//   console.log(rect);
  
//   console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
//   console.log('Is rect an instance of Shape?', rect instanceof Shape); // true
//   rect.move(1, 1); // Outputs, 'Shape moved.'

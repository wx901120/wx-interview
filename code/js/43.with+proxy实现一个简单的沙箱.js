/**
 * 1. 简单的沙箱
 * 问题：若提供的ctx上下文对象中，没有找到某个变量时，代码仍会沿着作用域链一层层向上查找，
 * 假如上文示例中的 ctx 对象没有设置 foo属性，打印的结果还是外层作用域的foo1
 */
// 定义全局变量
var foo = 'foo1'
var ctx = {
    func: variable => {
        console.log(variable)
    },
    foo: 'f1'
}
var code = `func(foo)`
function veryPoorSandbox(code, ctx) {
    // 使用with，将eval函数执行时的执行上下文指定为ctx
    with (ctx) {
        // eval可以将字符串按js代码执行，如eval('1+2')
        eval(code)
    }
}
veryPoorSandbox(code, ctx) // 打印结果："f1"，不是最外层的全局变量"foo1"

/**
 * 2. with + proxy
 */

var foo = 'foo1'
const ctx = {
    func: variable => {
        console.log(variable);
    }
}
function withedYourCode(code) {
    code = `with(shadow) {${code}}`
    return new Function('shadow', code)//使用 new Function() 运行代码比eval更为好一些，函数的参数提供了清晰的接口来运行代码
}
const access_white_list = ['func']
const code = 'func(foo)'

const ctxProxy = new Proxy(ctx, {
    has: (target, prop) => {
        if (access_white_list.includes(prop)) {
            return target.hasOwnProperty(prop)
        }
        if (!target.hasOwnProperty(prop)) {
            throw new Error(`Not found - ${prop}!`)
        }
        return true
    }
})
function littlePoorSandbox(code, ctx) {
    withedYourCode(code).call(ctx, ctx)
}

littlePoorSandbox(code, ctxProxy)

/**
 * 3. 天然的优质沙箱（iframe）
 */

// 沙箱全局代理对象类
class SandboxGlobalProxy {
    constructor(sharedState) {
        // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement("iframe", { url: "about:blank" });
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // sandboxGlobal作为沙箱运行时的全局对象
        const sandboxGlobal = iframe.contentWindow;

        return new Proxy(sandboxGlobal, {
            has: (target, prop) => {
                // has 可以拦截 with 代码块中任意属性的访问
                if (sharedState.includes(prop)) {
                    // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
                    return false;
                }
                // 如果没有该属性，直接报错
                if (!target.hasOwnProperty(prop)) {
                    throw new Error(`Not find: ${prop}!`);
                }
                // 属性存在，返回sandboxGlobal中的值
                return true;
            }
        });
    }
}

// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
function withedYourCode(code) {
    code = "with(sandbox) {" + code + "}";
    return new Function("sandbox", code);
}
function maybeAvailableSandbox(code, ctx) {
    withedYourCode(code).call(ctx, ctx);
}

// 要执行的代码
const code = `
    console.log(history == window.history) // false
    window.abc = 'sandbox'
    Object.prototype.toString = () => {
        console.log('Traped!')
    }
    console.log(window.abc) // sandbox
  `;

// sharedGlobal作为与外部执行环境共享的全局对象
// code中获取的history为最外层作用域的history
const sharedGlobal = ["history"];

const globalProxy = new SandboxGlobalProxy(sharedGlobal);

maybeAvailableSandbox(code, globalProxy);

// 这是外层的，对外层的window对象没有影响
console.log(window.abc); // undefined
Object.prototype.toString(); // 并没有打印 Traped
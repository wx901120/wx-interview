// 例2
function foo() {
    const a = 1
    return function () {
        return a
    }
}
const f = foo()
console.log(f()) // 1

// mdn官网例子2
function makeAdder(x) {
    return function (y) {
        return x + y
    }
}
// add5和add10都是闭包，他们都是makeAdder创造出来的，但是却拥有不同的词法环境，
// 在add5中，x为5，add10中，x为10
var add5 = makeAdder(5)
var add10 = makeAdder(10)

console.log(add5(2)) // 7
console.log(add10(2)) // 12

// 官网例子3：私有化变量
var makeCounter = function(){
    // 这两个就是私有变量privateCount，changeBy
    var privateCount = 0;
    function changeBy(val){
        return privateCount += val
    }
    return {
        increment(val){
            changeBy(val)
        },
        decrement(val){
            changeBy(val)
        },
        value(){
            return privateCount
        }
    }
}

var counter1 = makeCounter()
var counter2 = makeCounter()
console.log(counter1.value());// 0
counter1.increment(1)
counter1.increment(1)
console.log(counter1.value());// 2
console.log(counter2.value());// 0 counter1的改变不会对counter2有任何影响，因为每个闭包都是一个独立的环境



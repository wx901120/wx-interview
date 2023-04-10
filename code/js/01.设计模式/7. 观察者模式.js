/**
 * 被观察者 发出一点动静，所有 观察者 都会被通知
 */

// 被观察者
// class Observed {
//     constructor() {
//         // 存放观察者
//         this.observerList = []
//     }
//     addObserver(observer) {
//         // 添加一个观察俺的人
//         this.observerList.push(observer)
//     }
//     // 被观察者有动静了
//     notify() {
//         this.observerList.forEach(o => o.update())
//     }
// }

// // 观察者
// class Observer {
//     constructor(doSome) {
//         this.doSome = doSome
//     }
//     update() {
//         console.log(this.doSome)
//     }
// }
// const father = new Observer('我是爸爸，观察孩子的变化')
// const mother = new Observer('我是妈妈，观察孩子的变化')
// const son = new Observed()
// son.addObserver(father)
// son.addObserver(mother)
// son.notify()

// 牛客
class Observerd {
    constructor(name, state = '走路') {
        this.name = name
        this.state = state
        this.observerList = []
    }
    setObserver(observer) {
        this.observerList.push(observer)
    }
    setState(state) {
        this.state = state
        this.observerList.forEach(o => o.update(this))
    }
}

class Observer {
    update(observerd) {
        console.log(`${observerd.name}正在${observerd.state}`)
    }
}
let observer = new Observer()
let observerd = new Observerd('小明')
observerd.setObserver(observer)
observerd.setState('拉屎')

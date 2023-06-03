/**
 * 被观察者 发出一点动静，所有 观察者 都会被通知
 */
// 被观察者：宝宝
class Observerd {
	constructor(name, state) {
		this.name = name || ''
		this.state = state || ''
		this.observers = []
	}
	addObserver(observer) {
		this.observers.push(observer)
	}
	changeState(state) {
		this.state = state
		this.observers.forEach(o => o.update(this))
	}
}
// 观察者
class Observer {
	constructor(name) {
		this.name = name
	}
	update(o) {
		console.log(`${this.name}收到了 ${o.name} 的状态：${o.state}`)
	}
}
const child = new Observerd('baobao')
const father = new Observer('baba')
const mother = new Observer('mm')
child.addObserver(father)
child.addObserver(mother)
child.changeState('cry')

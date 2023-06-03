/**
 * 特点：只有订阅了该事件的才会被触发
 */
class EventEmitter {
	constructor() {
		// key: 事件名  value: [callback,callback2,...]
		this.map = new Map()
		// this.obj = {}
	}
	// 订阅
	on(name, callback) {
		if (this.map.has(name)) {
			this.map.set(name, [...this.map.get(name), callback])
		} else {
			this.map.set(name, [callback])
		}
		// if(this.obj[name]){
		//     this.obj[name].push(callback)
		// }else {
		//     this.obj[name] = [callback]
		// }
	}
	// 删除订阅
	off(name, callback) {
		if (!this.map.has(name)) return

		if (!callback) {
			this.map.set(name, [])
		}
		this.map.set(
			name,
			this.map.get(name).filter(fn => fn !== callback)
		) // 因为这里可以出来[]，所以下面emit要判断length
		// this.obj[name] =  this.obj[name].filter(fn=>fn !== callback)
	}
	// 发射事件
	emit(name, ...args) {
		if (!this.map.get(name)?.length) {
			throw new Error(`没有订阅 ${name} 事件`)
		} else {
			this.map.get(name).forEach(fn => fn.call(this, ...args))
		}
	}
	// 只执行一次，执行完就删除
	once(name, callback) {
		const fn = (...args) => {
			callback(...args)
			this.off(name, fn)
		}
		this.on(name, fn)
	}
}
function foo(...args) {
	console.log(...args)
}
const events = new EventEmitter()
events.on('a', foo)
events.on('a', foo)
events.emit('a', 1, 2, 3)
events.off('a', foo)
console.log(events)
events.emit('a', 1, 2, 3)

// 牛客
class EventEmitter {
	constructor() {
		this.map = new Map()
	}
	on(name, cb) {
		if (!this.map.has(name)) {
			this.map.set(name, new Set())
		}
		this.map.get(name).add(cb)
	}
	emit(name, ...args) {
		if (!this.map.has(name)) return
		this.map.get(name).forEach(cb => cb(...args))
	}
	off(name, fn) {
		if (!this.map.has(name) || !fn) return
		const filterCb = [...this.map.get(name)].filter(cb => cb !== fn)
		this.map.set(name, filterCb)
	}
	once(name, cb) {
		const fn = (...args) => {
			cb(...args)
			this.off(name, fn)
		}
		this.on(name, fn)
	}
	eventNames() {
		return [...this.map.keys()] || []
	}
}

// const ev = new EventEmitter()
// ev.on('myEvent', data => {
// 	console.log(data)
// })
// ev.emit('myEvent', { foo: 'bar' })
// const {EventEmitter} = require('events')
const ev = new EventEmitter()
ev.on('foo', (...args) => {
	console.log(args)
})
ev.on('foo', (...args) => {
	console.log(args)
})
ev.on('foo', (...args) => {
	console.log(args)
})
ev.emit('foo', 1, 2, 3)
ev.off('foo', () => {})
console.log(ev.eventNames())

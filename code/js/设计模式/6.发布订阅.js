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
        this.map.set(name, this.map.get(name).filter(fn => fn !== callback))// 因为这里可以出来[]，所以下面emit要判断length
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
        function fn(...args) {
            callback(...args)
            this.off(name, fn)
        }
        this.on(name, fn)
    }
}
function foo(...args) {
    console.log(...args);
}
const events = new EventEmitter()
events.on('a', foo)
events.on('a', foo)
events.emit('a', 1, 2, 3)
events.off('a', foo)
console.log(events);
events.emit('a', 1, 2, 3)

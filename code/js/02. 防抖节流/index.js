function throttle(cb, delay) {
    if(typeof cb !== 'function'){
        throw new Error('Expected a function')
    }

    let last = 0
    let timerId = null
    return (...args) => {
        const now = Date.now()
        // 距离下次触发func还需要等待的时间
        const remain = delay - (now - last)
        // 第一次上来会里面进入这里，因为delay-now肯定小于0
        if (remain <= 0) {
            if(timerId){
                // clearTimeout(timerId) 并不会把 timeout 设为 null
                clearTimeout(timerId)
                timerId = null
            }
            last = now
            cb(...args)
        } else if (!timerId) {
            // 进到这里的就是有剩余时间，没有定时器
            // 最后一次触发情况：在剩余时间要执行最后一次func函数
            clearTimeout(timerId)
            timerId = null
            timerId = setTimeout(() => {
                last = now
                cb(...args)
            }, remain)
        }
    }
}
// 防抖: 这个只会触发最后一次事件
function debounce(cb, delay) {
    // 兼容性处理
    if(typeof cb !== 'function') {
        throw new TypeError('Expected a function')
    }
    delay = +delay || 0

    let timerId = null
    return (...args) => {
        // 清除旧的
        if (timerId) clearTimeout(timerId)
        // 设置新的
        timerId = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}
export {
    debounce,
    throttle
}

/**
 * leetcode 146题使用了双向链表解决这个问题
 */

/**
 * 
 * @param {*} capacity 最长可存储的
 */
var LRUCache = function (capacity) {
    this.cacheMap = new Map()
    this.capacity = capacity
}
LRUCache.prototype.get = function (key) {
    if (this.cacheMap.has(key)) {
        const value = this.cacheMap.get(key)
        this.cacheMap.delete(key)
        this.cacheMap.set(key, value)
        return value
    }
    return -1
}

LRUCache.prototype.put = function (key, value) {
    if (this.cacheMap.has(key)) {
        this.cacheMap.delete(key)
    }
    this.cacheMap.set(key, value)
    // 如果超过了最大容量
    if (this.cacheMap.size > this.capacity) {
        // 这个第一次看到
        // map.keys()/values() 返回一个迭代器 MapIterator {'a', 'b', 'c'}  值得学习
        // 这里map中最久没使用的放在最前面了，而146题是放在最后面了
        this.cacheMap.delete(this.cacheMap.keys().next().value)
    }

}
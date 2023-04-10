/**
 * 以前，web环境：window,self,frames
 *      web workers: self
 *      node: global
 * 现在：统一使用globalThis
 */

/** globalThis 提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身) */
const freeGlobalThis = typeof globalThis === 'object' && typeof globalThis !== null && globalThis.Object === Object && globalThis

/** node环境 */
const freeGlobal = typeof global === 'object' && typeof global !== null && global.Object === Object && global

/** web workers下面只有self */
const freeSelf = typeof self === 'object' && typeof self !== null && self.Object === Object && self

const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()
export default root

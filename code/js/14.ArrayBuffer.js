
/**
 * 1. 让js能够拥有操作字节的一个API
 * 2. 它是一个二进制数据的缓冲区: 内存划分出一段连续的固定长度的空间
 */

let buffer = new ArrayBuffer(3)// 内存划分出了3个字节长度的一段内存空间，3*8 = 24位
console.log(buffer);
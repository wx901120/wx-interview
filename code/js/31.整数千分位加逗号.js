/**
 * 1234412=>1,234,412
 */
function toThousands(num) {
    num = num.toString()
    let ans = ''
    while (num.length > 3) {
        ans = ',' + num.substring(num.length - 3) + ans // ans = ',412'=> ans = ',234' + ',412' 
        // 剩余的还没分割的
        num = num.substring(0, num.length - 3)// 1234 => 1
    }
    ans = num + ans
    return ans
}
// console.log(toThousands(1231231232312));

// 不能这样写
// function divideThousand(nums) {
//     let remain = nums.toString()
//     const len = remain.length
//     let ans = ''
//     while (remain.length > 3) {
//         ans = ',' + remain.substring(len - 3) + ans
//         remain = remain.substring(0, len - 3)
//     }
//     ans = remain + ans
//     return ans
// }
// console.log(divideThousand(1231231232312));
function divideThousand(nums) {
    nums = nums.toString()
    let ans = ''
    while (nums.length > 3) {
        ans = ',' + nums.substring(nums.length - 3) + ans
        nums = nums.substring(0, nums.length - 3)
    }
    ans = nums + ans
    return ans
}
console.log(divideThousand(1231231232312));
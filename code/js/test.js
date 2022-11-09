
// promise

// 18

const urls = Array.from({
    length: 10
}, (v, i) => `/api/test?num=${i}`)

const req = url => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(url);
            resolve(url)
        }, 1000);
    })
}

function sendRequestParallel(urls, maxNums) {
    return new Promise((resolve, reject) => {
        const len = urls.length
        let count = 0
        let ans = []
        const start = () => {
            while (maxNums > 0) {
                const url = urls.shift()
                maxNums--
                req(url).then(res => {
                    ans[i] = res
                    maxNums++
                    count++
                    if (count === len) {
                        resolve(ans)
                    } else {
                        start()
                    }
                })
            }
        }
        start()
    })
}
sendRequestParallel(urls, 3).then(res => {
    console.log(res);
});

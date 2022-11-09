// 要求并行获取图片，但按顺序展示。如
//   1.jpg 未完成，2.jpg 未完成，3.jpg 未完成，此时都不显示；
//   1.jpg 未完成，2.jpg 已完成，3.jpg 未完成，此时都不显示；
//   1.jpg 已完成，2.jpg 已完成，3.jpg 未完成，此时马上显示1、2；
//   1.jpg 已完成，2.jpg 已完成，3.jpg 已完成，此时马上显示1、2、3；

const toImg = (text) => {
    const svg = `
    <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
      <text font-size="52px" y="52">${text}</text>
    </svg>
	`;
    const img = new Image(100, 80);
    img.src = `data:image/svg+xml;data,${encodeURI(svg)}`;
    return img;
};

// 模拟获取一张图片，随机0~20秒后返回一个 Image 对象
const fetchImage = (url) => {
    const r = Math.random() * 20000;
    return new Promise((resolve) => {
        setTimeout(resolve(toImg(url)), r);
    });
};

// 并行获取20张图片('/1.svg' ~ '/20.svg')，按顺序显示在 document.body 上。
// Your code...
let urlList = Array.from({ length: 20 }, (v, k) => `${k}.svg`)
let urlsPromise = urlList.map(url => fetchImage(url))
Promise.all(urlsPromise).then(res => {
    console.log(res);
    res.forEach(url => {
        document.body.appendChild(url)
    })
})
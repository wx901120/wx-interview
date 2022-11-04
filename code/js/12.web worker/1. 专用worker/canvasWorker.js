onmessage = function (e) {
  // 使用OffscreenCanvas（离屏Canvas）
  let canvas = e.data.canvas //as HTMLCanvasElement;
  // 获取绘图上下文
  let ctx = canvas.getContext("2d") //as CanvasRenderingContext2D;
  // 绘制一个圆弧
  ctx.beginPath();
  ctx.arc(150, 75, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#1989fa";
  ctx.fill();
  ctx.stroke();
};

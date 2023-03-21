<template>
  <canvas id="canvas" width="300" height="300"></canvas>
</template>

<script>
export default {
  name: "",
};
</script>
<script setup>
import { ref, watch, computed, reactive, onMounted } from "vue";

onMounted(() => {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // 笑脸
    // ctx.beginPath();
    // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    // ctx.moveTo(110, 75);
    // ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
    // ctx.moveTo(65, 65);
    // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
    // ctx.moveTo(95, 65);
    // ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
    // ctx.stroke();

    // 填充三角形
    // ctx.beginPath();
    // ctx.moveTo(25, 25);
    // ctx.lineTo(105, 25);
    // ctx.lineTo(25, 105);
    // ctx.closePath();
    // ctx.fill();

    // // 描边三角形
    // ctx.beginPath();
    // ctx.moveTo(125, 125);
    // ctx.lineTo(125, 45);
    // ctx.lineTo(45, 125);
    // ctx.closePath();
    // ctx.stroke();

    // for (var i = 0; i < 4; i++) {
    //   for (var j = 0; j < 3; j++) {
    //     ctx.beginPath();
    //     var x = 25 + j * 50; // x 坐标值
    //     var y = 25 + i * 50; // y 坐标值
    //     var radius = 20; // 圆弧半径
    //     var startAngle = 0; // 开始点
    //     var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
    //     var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

    //     ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    //     if (i % 2 == 1) {
    //       ctx.fill();
    //     } else {
    //       ctx.stroke();
    //     }
    //   }
    // }

    // 二次贝塞尔曲线
    // ctx.beginPath();
    // ctx.moveTo(75, 25);
    // ctx.quadraticCurveTo(25, 25, 25, 62.5);
    // ctx.quadraticCurveTo(25, 100, 50, 100);
    // ctx.quadraticCurveTo(50, 120, 30, 125);
    // ctx.quadraticCurveTo(60, 120, 65, 100);
    // ctx.quadraticCurveTo(125, 100, 125, 62.5);
    // ctx.quadraticCurveTo(125, 25, 75, 25);
    // ctx.stroke();

    //三次贝塞尔曲线
    // ctx.beginPath();
    // ctx.moveTo(75, 40);
    // ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    // ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    // ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    // ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    // ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    // ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    // ctx.fillStyle = "#ffaabb";
    // ctx.fill();

    // for (var i = 0; i < 6; i++) {
    //   for (var j = 0; j < 6; j++) {
    //     ctx.fillStyle =
    //       "rgb(" +
    //       Math.floor(255 - 42.5 * i) +
    //       "," +
    //       Math.floor(255 - 42.5 * j) +
    //       ",0)";
    //     ctx.fillRect(j * 25, i * 25, 25, 25);
    //   }
    // }

    // 画背景
    ctx.fillStyle = "#FD0";
    ctx.fillRect(0, 0, 75, 75);
    ctx.fillStyle = "#6C0";
    ctx.fillRect(75, 0, 75, 75);
    ctx.fillStyle = "#09F";
    ctx.fillRect(0, 75, 75, 75);
    ctx.fillStyle = "#F30";
    ctx.fillRect(75, 75, 75, 75);
    ctx.fillStyle = "#FFF";
    // 设置透明度值
    ctx.globalAlpha = 0.2;
    // 画半透明圆
    for (var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
});
</script>
<style lang="less" scoped>
canvas {
  border: 1px solid black;
}
</style>

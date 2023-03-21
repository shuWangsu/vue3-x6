<template>
  <div class="box">
    <div>
      <a-button @click="enlarge">放大</a-button>
      <a-button @click="narrow">缩小</a-button>
      <a-button @click="reset">重置</a-button>
      <a-button @click="drag">拖拽</a-button>
    </div>
    <div id="canvas" class="canvas" ref="canvasRef">
      <div
        class="canvas-container"
        ref="containerRef"
        draggable="true"
        :style="{
          transform: `scale(${multiples})`,
        }"
      >
        <img src="@/assets/logo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>
<script setup>
import { ref, watch, computed, reactive, nextTick } from "vue";

const multiples = ref(1);
const containerRef = ref(null);
const canvasRef = ref(null);
const draggable = ref(false);
const enlarge = () => {
  multiples.value += 0.1;
};
const narrow = () => {
  multiples.value -= 0.1;
};
const reset = () => {
  multiples.value = 1;
  containerRef.value.style.left = 0 + "px";
  containerRef.value.style.top = 0 + "px";
};
const drag = () => {
  draggable.value = !draggable.value;
};
nextTick(() => {
  containerRef.value.onmousedown = (e) => {
    console.log(e, canvasRef.value.getBoundingClientRect());
    if (draggable.value) {
      //鼠标按下触发
      let disx = e.pageX - containerRef.value.offsetLeft; //获取鼠标相对元素距离
      let disy = e.pageY - containerRef.value.offsetTop;
      document.onmousemove = function (e) {
        //鼠标移动触发事件，元素移到对应为位置
        containerRef.value.style.left = e.pageX - disx + "px";
        containerRef.value.style.top = e.pageY - disy + "px";
      };
      document.onmouseup = function () {
        //鼠标抬起，清除绑定的事件，元素放置在对应的位置
        document.onmousemove = null;
        document.onmousedown = null;
      };
      e.preventDefault(); //阻止浏览器的默认事件
    }
  };
});
</script>
<style lang="less" scoped>
.box {
  //   height: 1000px;
  //   width: 1500px;
}
.canvas {
  height: 500px;
  width: 500px;
  margin: 100px auto;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
  .canvas-container {
    position: absolute;
  }
}
</style>

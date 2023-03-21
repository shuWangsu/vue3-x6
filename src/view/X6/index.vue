<template>
  <div class="home">
    <button @click="getGraphNodes()" class="graphBtn">保存画布</button>
    <div class="left-dragger-nav" id="left-dragger-nav"></div>

    <div class="Graph">
      <div id="container"></div>
    </div>
  </div>
</template>

<script setup>
import { Graph, Addon, Shape, Model } from "@antv/x6";

import { onMounted } from "vue";
var { Rect, Circle } = Shape;

//存储初始化保存画布上的节点数据
var nodes = [];
//初始化保存画布上的边数据
var edges = [];
if (sessionStorage.getItem("nodes")) {
  //拿到之前画布保存时保存在缓存中的节点数据
  nodes = JSON.parse(sessionStorage.getItem("nodes"));
}
if (sessionStorage.getItem("edges")) {
  //拿到之前画布保存时保存在缓存中的边数据
  edges = JSON.parse(sessionStorage.getItem("edges"));
}

//初始化画布的数据
const graphData = {
  // 节点
  nodes: nodes, //将初始化画布的节点数据赋值
  // 边
  edges: edges, //将初始化画布的边数据赋值
};

//创建存储画布对象的变量
var graph = null;

//保存画布
function getGraphNodes() {
  window.sessionStorage.setItem("nodes", JSON.stringify(graph.getNodes())); //graph.getNodes()为返回画布中所有的节点，然后再存储在session中，初始化画布的时候，再从缓存中拿到节点数据添加到画布的节点属性中
  window.sessionStorage.setItem("edges", JSON.stringify(graph.getEdges())); //graph.getEdges()为返回画布中所有边。边也就是箭头线，然后再存储在session中，再从缓存中拿到边数据添加到画布的边属性中
  // console.log(graph.getEdges())
}
onMounted(() => {
  graph = new Graph({
    container: document.getElementById("container"),
    width: 800,
    height: 800,
    background: {
      color: "#fffbe6", // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  });
  graph.fromJSON(graphData); //加载画布初始化的数据

  //创建左侧拖拽导航栏

  const stencil = new Addon.Stencil({
    target: graph,
    getDragNode(node) {
      console.log(node, "--");
      var { attrs, position, shape, size } = node.store.data;
      // 这里返回一个新的节点作为拖拽节点
      return graph.createNode({
        position: position,
        width: size.width,
        height: size.height,
        shape: shape,
        attrs: attrs,
        ports: {
          groups: {
            // 输入链接桩群组定义
            in: {
              position: "top",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
            // 输出链接桩群组定义
            left: {
              position: "left",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
            // 输出链接桩群组定义
            right: {
              position: "right",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
            // 输出链接桩群组定义
            out: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
            },
          },
          items: [
            {
              id: "port1",
              group: "in",
            },

            {
              id: "port3",
              group: "right",
            },
            {
              id: "port4",
              group: "left",
            },
            {
              id: "port5",
              group: "out",
            },
          ],
        },
      });
    },
    groups: [{ name: "group1" }, { name: "group2" }],
    collapsable: true,
    stencilGraphWidth: 200, //模板画布宽度
    stencilGraphHeight: 180, //模板画布高度
  });

  document.getElementById("left-dragger-nav").appendChild(stencil.container);

  const r = new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
      text: { text: "rect", fill: "white" },
    },
  });

  const c = new Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
      text: { text: "ellipse", fill: "white" },
    },
  });

  const c2 = new Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: "#4B4A67", "stroke-width": 6, stroke: "#FE854F" },
      text: { text: "ellipse", fill: "white" },
    },
  });

  const r2 = new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: "#4B4A67", stroke: "#31D0C6", strokeWidth: 6 },
      text: { text: "rect", fill: "white" },
    },
  });

  const r3 = new Rect({
    width: 70,
    height: 40,
    attrs: {
      rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
      text: { text: "rect", fill: "white" },
    },
  });

  const c3 = new Circle({
    width: 60,
    height: 60,
    attrs: {
      circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
      text: { text: "ellipse", fill: "white" },
    },
  });

  //向分组模板画布下添加拖动的元素，记住一定要在创建Stencil的时候添加模板画布的宽度和高度，不然将拖动元素添加进去不会显示
  stencil.load([r, c, c2, r2.clone()], "group1");
  stencil.load([c2.clone(), r2, r3, c3], "group2");
});
</script>

<style scoped lang="less">
.home {
  display: flex;
  height: 100vh;
}
.left-dragger-nav {
  width: 300px;
  height: 100%;
  border: 1px solid red;
  position: relative;
}
.Graph {
  flex: 1;
  position: relative;
  border: 1px solid red;
}
.graphBtn {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>

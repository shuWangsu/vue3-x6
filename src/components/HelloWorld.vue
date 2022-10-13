<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { Graph } from "@antv/x6";
import { DagreLayout } from "@antv/layout"; // 布局算法

import { data } from "./js/data";

let container;
let graph;

// 层次布局
// 按照不同的需求，选用合适的布局算法，让画布中的图形规律分布
const dagreLayout = new DagreLayout({
  type: "dagre",
  rankdir: "TB",
  align: "DR",
  ranksep: 80,
  nodesep: 20,
  controlPoints: true,
});
const newModel = dagreLayout.layout(data);

// 自定义节点（多种方式）
Graph.registerNode(
  "custom-node", // 自定义节点名
  {
    width: 200,
    height: 60,
    attrs: {
      body: {
        stroke: "#ffaabb",
        strokeWidth: 1,
        fill: "rgba(95,149,255,0.05)",
      },
      image: {
        "xlink:href":
          "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
        width: 16,
        height: 16,
        x: 12,
        y: 12,
      },
      title: {
        text: "Node1111111",
        refX: 40,
        refY: 14,
        fill: "rgba(0,0,0,0.85)",
        fontSize: 12,
        "text-anchor": "start",
      },
      text: {
        text: "this is content text",
        refX: 40,
        refY: 38,
        fontSize: 12,
        fill: "rgba(0,0,0,0.6)",
        "text-anchor": "start",
      },
    },
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "image",
      },
      {
        tagName: "text",
        selector: "title",
      },
      {
        tagName: "text",
        selector: "text",
      },
    ],
  },
  true // 重名时是否覆盖
);

// 自定义边
Graph.registerEdge(
  "org-edge", // 自定义边名
  {
    zIndex: -1,
    attrs: {
      line: {
        fill: "none",
        strokeLinejoin: "round",
        strokeWidth: 2,
        stroke: "#A2B1C3",
        sourceMarker: null,
        targetMarker: null,
      },
    },
  },
  true // 重名时是否覆盖
);

// 挂载完成后
onMounted(() => {
  container = document.getElementById("container");
  getData();
});

// 加载数据创建画布
const getData = () => {
  createGraph(newModel);
};

// 创建画布
const createGraph = (newModel) => {
  graph = new Graph({
    container: container,
    width: 1500,
    height: 800,
    background: { color: "#08ffff" }, // 创建画布时初始化背景相关配置对象
    grid: { size: 10, visible: true, type: "mesh" }, //创建画布时，通过配置对象来设置背景网格
  });

  graph.fromJSON(newModel);
  graph.drawBackground({ color: "#999999" }); // 创建画布后也可调用方法重绘背景
  graph.drawGrid({ type: "mesh" }); // 创建画布后也可调用方法重绘画布网格
  graph.zoom(0.5); // 画布和图形整体的缩放
  graph.translate(200, 40); // 图形相对画布的相对位置，平移
  graph.centerContent(); // 将画布内容中心与视口中心对齐
};
</script>

<style scoped></style>

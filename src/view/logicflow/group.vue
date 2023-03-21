<template>
  <div>
    <a-button type="primary" @click="getData">获取数据</a-button>
    <a-button type="primary" @click="changeGraph">修改画布</a-button>
  </div>
  <div class="flow-chart">
    <div class="flow-palette">
      <div
        class="red-ui-palette-node ui-draggable ui-draggable-handle"
        v-for="(item, index) in baseNodes"
        @mousedown="startDrag(item)"
        :key="index"
        :style="{ backgroundColor: item.background }"
      >
        <div class="red-ui-palette-label">{{ item.text }}</div>
        <div class="red-ui-palette-icon-container">
          <div
            class="red-ui-palette-icon"
            :style="{ backgroundImage: `url(${item.icon})` }"
          ></div>
        </div>
        <div class="red-ui-palette-port red-ui-palette-port-input"></div>
        <div class="red-ui-palette-port red-ui-palette-port-output"></div>
      </div>
    </div>
    <div ref="container" class="container"></div>
    <Setting
      v-if="currentNode"
      @changeStyle="changeStyle"
      :nodeData="currentNode"
      class="setting-panel"
    ></Setting>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LogicFlow from "@logicflow/core";
import { BpmnAdapter } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import NodeRedExtension from "./node-red/index";
import Setting from "./node-red/tools/Setting.vue";

import "./node-red/style.css";

const count = ref(0);
const currentNode = ref(null);
let lf = undefined;
const container = ref(null);
const config = {
  visible: true,
  type: "dot",
  size: 10,
  config: {
    color: "#ccc",
  },
};
const gridConfig = ref(config);

const baseNodes = ref([
  {
    type: "fetch-node",
    text: "fetch",
    background: "rgb(231, 231, 174)",
    icon: "images/fetch.svg",
  },
  {
    type: "function-node",
    text: "function",
    background: "rgb(253, 208, 162)",
    icon: "images/function.svg",
  },
  {
    type: "switch-node",
    text: "switch",
    background: "rgb(226, 217, 110)",
    icon: "images/switch.svg",
  },
  {
    type: "delay-node",
    text: "delay",
    background: "rgb(230, 224, 248)",
    icon: "images/delay.svg",
  },
  {
    type: "vue-html",
    text: "vue-xx",
    background: "rgb(230, 224, 248)",
    icon: "images/delay.svg",
  },
]);

const init = () => {
  // 注册插件
  // LogicFlow.use(BpmnAdapter);
  lf = new LogicFlow({
    container: container.value,
    grid: gridConfig.value,
    // adjustEdge: false,
    hoverOutline: true,
    edgeSelectedOutline: false,
    // isSilentMode: true,
    edgeTextEdit: false,
    nodeTextEdit: false,
    keyboard: {
      enabled: true,
    },
    adjustEdgeStartAndEnd: true,
    // keyboard: true,
    plugins: [NodeRedExtension],
  });
  lf.render({
    nodes: [
      {
        id: "node_1",
        type: "start-node",
        x: 400,
        y: 160,
        properties: {
          attr: "qwerty",
          ui: "node-red",
        },
        text: {
          x: 410,
          y: 160,
          value: "start",
        },
      },
      {
        id: "f84c0037-5b14-40ba-8a86-288cb8719d0d",
        type: "fetch-node",
        x: 480,
        y: 290,
        properties: {
          attr: "qwerty",
          style: {
            backgroundColor: "rgb(228, 226, 168)",
          },
          ui: "node-red",
        },
        text: {
          x: 490,
          y: 290,
          value: "fetch",
        },
      },
      {
        id: "df6765ee-7d96-46e8-af57-393b1738463c",
        type: "function-node",
        x: 480,
        y: 380,
        properties: {
          attr: "qwerty",
          ui: "node-red",
        },
        text: {
          x: 490,
          y: 380,
          value: "function",
        },
      },
      {
        id: "e503f9f4-91df-4702-bacb-6d11cacda7bf",
        type: "switch-node",
        x: 480,
        y: 460,
        properties: {
          attr: "qwerty",
          ui: "node-red",
        },
        text: {
          x: 490,
          y: 460,
          value: "switch",
        },
      },
      {
        id: "482e5b0c-478b-4318-afda-6ebd04feea38",
        type: "delay-node",
        x: 480,
        y: 590,
        properties: {
          attr: "qwerty",
          ui: "node-red",
        },
        text: {
          x: 489.9999999999998,
          y: 590,
          value: "delay",
        },
      },
      {
        id: "eff7ca56-68c0-471b-bd2a-5cca83a80ae4",
        type: "vue-html",
        x: 480,
        y: 690,
        properties: {},
        text: {
          x: 480,
          y: 690,
          value: "vue-xx",
        },
      },
    ],
    edges: [
      {
        id: "d1de607f-4938-4560-aaf4-a17f504beb34",
        type: "flow-link",
        sourceNodeId: "node_1",
        targetNodeId: "f84c0037-5b14-40ba-8a86-288cb8719d0d",
        startPoint: {
          x: 450,
          y: 160,
        },
        endPoint: {
          x: 480,
          y: 275,
        },
        properties: {},
        pointsList: [
          {
            x: 450,
            y: 160,
          },
          {
            x: 480,
            y: 160,
          },
          {
            x: 480,
            y: 275,
          },
        ],
      },
      {
        id: "b3a7fb22-ad58-4286-9b13-7d69224f4384",
        type: "flow-link",
        sourceNodeId: "f84c0037-5b14-40ba-8a86-288cb8719d0d",
        targetNodeId: "df6765ee-7d96-46e8-af57-393b1738463c",
        startPoint: {
          x: 480,
          y: 305,
        },
        endPoint: {
          x: 480,
          y: 365,
        },
        properties: {},
        pointsList: [
          {
            x: 480,
            y: 305,
          },
          {
            x: 480,
            y: 365,
          },
        ],
      },
      {
        id: "6267d95e-93fb-4dd1-bcfe-b690f9bbdf6e",
        type: "flow-link",
        sourceNodeId: "df6765ee-7d96-46e8-af57-393b1738463c",
        targetNodeId: "e503f9f4-91df-4702-bacb-6d11cacda7bf",
        startPoint: {
          x: 480,
          y: 395,
        },
        endPoint: {
          x: 480,
          y: 445,
        },
        properties: {},
        pointsList: [
          {
            x: 480,
            y: 395,
          },
          {
            x: 480,
            y: 425,
          },
          {
            x: 480,
            y: 425,
          },
          {
            x: 480,
            y: 415,
          },
          {
            x: 480,
            y: 415,
          },
          {
            x: 480,
            y: 445,
          },
        ],
      },
      {
        id: "327840bd-15c6-4016-9710-707f624e042e",
        type: "flow-link",
        sourceNodeId: "e503f9f4-91df-4702-bacb-6d11cacda7bf",
        targetNodeId: "482e5b0c-478b-4318-afda-6ebd04feea38",
        startPoint: {
          x: 480,
          y: 475,
        },
        endPoint: {
          x: 480,
          y: 575,
        },
        properties: {},
        pointsList: [
          {
            x: 480,
            y: 475,
          },
          {
            x: 480,
            y: 575,
          },
        ],
      },
      {
        id: "9df270fb-d2ac-4cb3-9e81-1e8371c56a5e",
        type: "flow-link",
        sourceNodeId: "482e5b0c-478b-4318-afda-6ebd04feea38",
        targetNodeId: "eff7ca56-68c0-471b-bd2a-5cca83a80ae4",
        startPoint: {
          x: 480,
          y: 605,
        },
        endPoint: {
          x: 480,
          y: 670,
        },
        properties: {},
        pointsList: [
          {
            x: 480,
            y: 605,
          },
          {
            x: 480,
            y: 670,
          },
        ],
      },
    ],
  });

  lf.on("node-red:start", () => {
    // todo: 让流程跑起来
    console.log("我要开始执行流程了");
  });
  lf.on("vue-node:click", (data) => {
    console.log("coming", data);
    lf.setProperties(data.id, {
      t: ++data.val,
    });
  });
  lf.on("node:click", ({ data }) => {
    console.log("===coming===", data);
    currentNode.value = data;
    const graphData = getData();
    console.log("===graphData===", graphData);
    graphData.nodes.forEach((item) => {
      console.log(item, "==");
      if (item.type === "fetch-node") {
        lf.setProperties(item.id, {
          style: {
            backgroundColor: "#ffaabb",
          },
          sameType: true,
        });
      }
    });
  });
  lf.on("blank:click", ({ data }) => {
    currentNode.value = null;
    const graphData = getData();
    console.log("===graphData===", graphData);
    graphData.nodes.forEach((item) => {
      if (item.type === "fetch-node") {
        lf.setProperties(item.id, {
          style: {
            backgroundColor: "rgb(228, 226, 168)",
          },
          sameType: false,
        });
      }
    });
  });
  lf.on("anchor:drop", ({ data, nodeModel }) => {
    console.log(nodeModel, "===node===");
    nodeModel.setProperties({ attr: "qwerty" });
    console.log(lf.getNodeModelById("node_123_1"), "===node_123_1===");
  });

  console.log(lf, "===lf===");
};
const changeStyle = (style) => {
  lf.setProperties(currentNode.value.id, {
    style,
  });
};
const startDrag = (item) => {
  lf.dnd.startDrag({
    type: item.type,
    text: item.text,
  });
};

const changeGraph = () => {
  gridConfig.value = false;
  init();
};
const getData = () => {
  const graphData = lf.getGraphData();
  console.log(graphData);
  return graphData;
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
.flow-chart {
  /* position: relative;
  width: 100%;
  height: 100vh; */
  width: 100%;
  height: 100vh;
  display: flex;
  .flow-palette {
    width: 200px;
  }
  .container {
    flex: 1;
  }
}
.flow-chart /deep/ .lf-red-node,
.flow-chart /deep/ .lf-element-text {
  cursor: move;
}
.flow-chart /deep/ svg {
  display: block;
}
.flow-chart-palette {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.setting-panel {
  position: absolute;
  top: 0;
  right: 0;
}

.red-ui-palette-node {
  cursor: move;
  background: #fff;
  margin: 10px auto;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #999;
  background-position: 5% 50%;
  background-repeat: no-repeat;
  width: 120px;
  background-size: contain;
  position: relative;
}
.red-ui-palette-label {
  color: #333;
  font-size: 13px;
  margin: 4px 0 4px 32px;
  line-height: 20px;
  overflow: hidden;
  text-align: center;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.red-ui-palette-icon-container {
  position: absolute;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  width: 30px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  background-color: rgba(0, 0, 0, 0.05);
}
.red-ui-palette-icon {
  display: inline-block;
  width: 20px;
  height: 100%;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
}
.red-ui-palette-port-output {
  left: auto;
  right: -6px;
}
.red-ui-palette-port {
  position: absolute;
  top: 8px;
  left: -5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: #d9d9d9;
  border-radius: 3px;
  width: 10px;
  height: 10px;
  border: 1px solid #999;
}
.red-ui-palette-port-output {
  left: auto;
  right: -6px;
}
</style>

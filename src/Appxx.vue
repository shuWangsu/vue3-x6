// App.vue // App.vue //
因一些固定数据过于庞大，省略的部分请复制上一节的代码数据
<template>
  <div></div>
  <HelloWorld />
  <!-- <div id="app"></div> -->
</template>

<script>
import { Graph, Path } from "@antv/x6";
import "@antv/x6-vue-shape";
import nodetemplate from "./components/nodeTemplate.vue";
// import HelloWorld from "./components/HelloWorld.vue";

let graph = null;

export default {
    name: "App",
    // components: { HelloWorld },
    data() {
        return {
            nodeData: [
                {
                    id: "1",
                    shape: "vue-shape",
                    x: 290,
                    y: 110,
                    data: {
                        label: "读数据",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "1-1",
                            group: "bottom",
                        },
                    ],
                },
                {
                    id: "2",
                    shape: "vue-shape",
                    x: 290,
                    y: 225,
                    data: {
                        label: "逻辑回归",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "2-1",
                            group: "top",
                        },
                        {
                            id: "2-2",
                            group: "bottom",
                        },
                        {
                            id: "2-3",
                            group: "bottom",
                        },
                    ],
                },
                {
                    id: "3",
                    shape: "vue-shape",
                    x: 170,
                    y: 350,
                    data: {
                        label: "模型预测",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "3-1",
                            group: "top",
                        },
                        {
                            id: "3-2",
                            group: "bottom",
                        },
                    ],
                },
                {
                    id: "4",
                    shape: "vue-shape",
                    x: 450,
                    y: 350,
                    data: {
                        label: "读取参数",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "4-1",
                            group: "top",
                        },
                        {
                            id: "4-2",
                            group: "bottom",
                        },
                    ],
                },
                {
                    id: "5",
                    shape: "dag-edge",
                    source: {
                        cell: "1",
                        port: "1-1",
                    },
                    target: {
                        cell: "2",
                        port: "2-1",
                    },
                    zIndex: 0,
                },
                {
                    id: "6",
                    shape: "dag-edge",
                    source: {
                        cell: "2",
                        port: "2-2",
                    },
                    target: {
                        cell: "3",
                        port: "3-1",
                    },
                    zIndex: 0,
                },
                {
                    id: "7",
                    shape: "dag-edge",
                    source: {
                        cell: "2",
                        port: "2-3",
                    },
                    target: {
                        cell: "4",
                        port: "4-1",
                    },
                    zIndex: 0,
                },
            ],
            nodeImage: {
                logo: "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ",
                success: "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ",
                failed: "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ",
                running: "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ",
            },
            nodeStatusList: [
                [
                    {
                        id: "1",
                        status: "running",
                    },
                    {
                        id: "2",
                        status: "default",
                    },
                    {
                        id: "3",
                        status: "default",
                    },
                    {
                        id: "4",
                        status: "default",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "running",
                    },
                    {
                        id: "3",
                        status: "default",
                    },
                    {
                        id: "4",
                        status: "default",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "success",
                    },
                    {
                        id: "3",
                        status: "running",
                    },
                    {
                        id: "4",
                        status: "running",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "success",
                    },
                    {
                        id: "3",
                        status: "success",
                    },
                    {
                        id: "4",
                        status: "failed",
                    },
                ],
            ],
        };
    },
    methods: {
        init(data) {
            let cells = [];
            data.forEach((item) => {
                if (item.shape === "vue-shape") {
                    item.width = 180;
                    item.height = 36;
                    item.component = <nodetemplate />;
                    item.data.logo = this.nodeImage.logo;
                    item.data.statusImg = "";
                    if (item.ports)
                        item.ports = {
                            groups: {
                                top: {
                                    position: "top",
                                    attrs: {
                                        circle: {
                                            r: 4,
                                            magnet: true,
                                            stroke: "#C2C8D5",
                                            strokeWidth: 1,
                                            fill: "#fff",
                                        },
                                    },
                                },
                                bottom: {
                                    position: "bottom",
                                    attrs: {
                                        circle: {
                                            r: 4,
                                            magnet: true,
                                            stroke: "#C2C8D5",
                                            strokeWidth: 1,
                                            fill: "#fff",
                                        },
                                    },
                                },
                            },
                            items: item.ports,
                        };
                    cells.push(graph.createNode(item));
                }
                else {
                    cells.push(graph.createEdge(item));
                }
            });
            graph.resetCells(cells);
        },
        showNodeStatus(statusList) {
            let status = statusList.shift();
            status?.forEach((item) => {
                let { id, status } = item;
                let node = graph.getCellById(id);
                let data = node.getData();
                node.setData({
                    ...data,
                    status: status,
                    statusImg: this.nodeImage[status],
                });
            });
            setTimeout(() => {
                this.showNodeStatus(statusList);
            }, 3000);
        },
    },
    mounted() {
        graph = new Graph({
            container: document.getElementById("app"),
            grid: true,
            autoResize: true,
            panning: {
                enabled: true,
                eventTypes: ["leftMouseDown", "mouseWheel"],
            },
            mousewheel: {
                enabled: true,
                modifiers: "ctrl",
                factor: 1.1,
                maxScale: 1.5,
                minScale: 0.5,
            },
            highlighting: {
                magnetAdsorbed: {
                    name: "stroke",
                    args: {
                        attrs: {
                            fill: "#fff",
                            stroke: "#31d0c6",
                            strokeWidth: 4,
                        },
                    },
                },
            },
            connecting: {
                snap: true,
                allowBlank: false,
                allowLoop: false,
                highlight: true,
                connector: "algo-connector",
                connectionPoint: "anchor",
                anchor: "center",
                validateMagnet({ magnet }) {
                    return magnet.getAttribute("port-group") !== "top";
                },
                createEdge() {
                    return graph.createEdge({
                        shape: "dag-edge",
                        attrs: {
                            line: {
                                strokeDasharray: "5 5",
                            },
                        },
                        zIndex: -1,
                    });
                },
            },
            selecting: {
                enabled: true,
                multiple: true,
                rubberEdge: true,
                rubberNode: true,
                modifiers: "shift",
                rubberband: true,
            },
        });
        // 注册 nodeTemplate
        Graph.registerVueComponent("nodetemplate", {
            template: `<nodetemplate />`,
            components: {
                nodetemplate,
            },
        }, true);
        // 注册 nodeTemplate 的链接线
        Graph.registerEdge("dag-edge", {
            inherit: "edge",
            attrs: {
                line: {
                    stroke: "#C2C8D5",
                    strokeWidth: 1,
                    targetMarker: null,
                },
            },
        }, true);
        // 注册 nodeTemplate 的链接之间的线样式
        Graph.registerConnector("algo-connector", (s, e) => {
            const offset = 4;
            const deltaY = Math.abs(e.y - s.y);
            const control = Math.floor((deltaY / 3) * 2);
            const v1 = { x: s.x, y: s.y + offset + control };
            const v2 = { x: e.x, y: e.y - offset - control };
            return Path.normalize(`M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `);
        }, true);
        // 控制线链接时的样式
        graph.on("edge:connected", ({ edge }) => {
            edge.attr({
                line: {
                    strokeDasharray: "",
                },
            });
        });
        // 控制节点数据变更时线的样式
        graph.on("node:change:data", ({ node }) => {
            let edges = graph.getIncomingEdges(node);
            let { status } = node.getData();
            edges?.forEach((edge) => {
                if (status === "running") {
                    edge.attr("line/strokeDasharray", 5);
                    edge.attr("line/style/animation", "running-line 30s infinite linear");
                }
                else {
                    edge.attr("line/strokeDasharray", "");
                    edge.attr("line/style/animation", "");
                }
            });
        });
        // this.init(this.nodeData);
        // this.showNodeStatus(this.nodeStatusList);
        // graph.centerContent();
    }
};
</script>

<style>
#app {
  width: 100%;
  min-height: 500px;
}

.node {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5f95ff;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
}
.node img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 8px;
}
.node .label {
  display: inline-block;
  flex-shrink: 0;
  width: 104px;
  margin-left: 8px;
  color: #666;
  font-size: 12px;
}
.node .status {
  flex-shrink: 0;
}
.node.success {
  border-left: 4px solid #52c41a;
}
.node.failed {
  border-left: 4px solid #ff4d4f;
}
.node.running .status img {
  animation: spin 1s linear infinite;
}
.x6-node-selected .node {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

@keyframes running-line {
  to {
    stroke-dashoffset: -1000;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

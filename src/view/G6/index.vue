<template>
  <div id="container"></div>
  <button @click="big">放大</button>
  <button @click="small">缩小</button>
  <button @click="center">居中</button>
</template>
<script setup>
import G6 from "@antv/g6";
import { nextTick } from "vue";

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ["M", x - r, y - r],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x + 2 - r, y - r],
    ["L", x + r - 2, y - r],
    ["M", x, y - 2 * r + 2],
    ["L", x, y - 2],
  ];
};

const data = {
  id: "root",
  label: "root",
  tile: "xxx",
  children: [
    {
      id: "c1",
      label: "c1",
      children: [
        {
          id: "c1-1",
          label: "c1-1",
        },
        {
          id: "c1-2",
          label: "c1-2",
          children: [
            {
              id: "c1-2-1",
              label: "c1-2-1",
            },
            {
              id: "c1-2-2",
              label: "c1-2-2",
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "c2",
    },
    {
      id: "c3",
      label: "c3",
      children: [
        {
          id: "c3-1",
          label: "c3-1",
        },
        {
          id: "c3-2",
          label: "c3-2",
          children: [
            {
              id: "c3-2-1",
              label: "c3-2-1",
              other: [
                {
                  id: "c3-2-1",
                  label: "c3-2-1",
                  active: true,
                },
                {
                  id: "c3-2-2",
                  label: "c3-2-2",
                },
                {
                  id: "c3-2-3",
                  label: "c3-2-3",
                },
              ],
            },
          ],
        },
        {
          id: "c3-3",
          label: "c3-3",
        },
      ],
    },
  ],
};

G6.Util.traverseTree(data, (d) => {
  d.leftIcon = {
    style: {
      fill: "#ffaabb",
      stroke: "#ccc",
    },
    img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
  };
  return true;
});

G6.registerNode(
  "icon-node",
  {
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;

      const keyShape = group.addShape("rect", {
        attrs: {
          ...styles,
          x: -w / 2,
          y: -h / 2,
        },
      });

      /**
       * leftIcon 格式如下：
       *  {
       *    style: ShapeStyle;
       *    img: ''
       *  }
       */
      if (cfg.leftIcon) {
        const { style, img } = cfg.leftIcon;
        group.addShape("rect", {
          attrs: {
            x: 1 - w / 2,
            y: 1 - h / 2,
            width: 38,
            height: styles.height - 2,
            fill: "#8c8c8c",
            ...style,
          },
        });

        group.addShape("image", {
          attrs: {
            x: 8 - w / 2,
            y: 8 - h / 2,
            width: 24,
            height: 24,
            img:
              img ||
              "https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png",
          },
          name: "image-shape",
        });
        group.addShape("image", {
          attrs: {
            x: 8 - w / 2,
            y: 8 - h / 2,
            width: 24,
            height: 24,
            img:
              img ||
              "https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png",
          },
          name: "image-shape",
        });
      }

      // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
      group.addShape("marker", {
        attrs: {
          x: 40 - w / 2,
          y: 52 - h / 2,
          r: 6,
          stroke: "#73d13d",
          cursor: "pointer",
          symbol: EXPAND_ICON,
        },
        name: "add-item",
      });

      group.addShape("marker", {
        attrs: {
          x: 80 - w / 2,
          y: 52 - h / 2,
          r: 6,
          stroke: "#ff4d4f",
          cursor: "pointer",
          symbol: COLLAPSE_ICON,
        },
        name: "remove-item",
      });

      if (cfg.label) {
        group.addShape("text", {
          attrs: {
            ...labelCfg.style,
            text: cfg.label,
            x: 50 - w / 2,
            y: 25 - h / 2,
          },
        });
      }

      return keyShape;
    },
    update: undefined,
  },
  "rect"
);

G6.registerNode(
  "custom-node",
  {
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      //   const { labelCfg = {} } = cfg;

      const w = styles.width;
      const h = styles.height;
      const keyShape = group.addShape("dom", {
        attrs: {
          x: 8 - w / 2,
          y: 8 - h / 2,
          width: cfg.size[0],
          height: cfg.size[1],
          // DOM's html
          html: `
            <div class="bgc" style="border-radius: 5px; width: ${
              cfg.size[0] - 5
            }px; height: ${cfg.size[1] - 5}px; display: flex;">
              <div>
                <img style="height: 50px; width: 100px;" src=${cfg.img} />
                </div>
            </div>
              `,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: "dom-shape",
        draggable: true,
      });

      //   if (cfg.label) {
      //     group.addShape("text", {
      //       attrs: {
      //         ...labelCfg.style,
      //         text: cfg.label,
      //         x: 30 - w / 2,
      //         y: -h / 2,
      //       },
      //     });
      //   }

      return keyShape;
    },
    update: undefined,
  },
  "rect"
);

G6.registerNode(
  "custom-node1",
  {
    draw(cfg, group) {
      const styles = this.getShapeStyle(cfg);
      const { other = [] } = cfg;

      const w = styles.width;
      const h = styles.height;
      let template = `<div class="left-node" style="border-radius: 5px; width: ${
        cfg.size[0] - 5
      }px; height: 100%;">`;
      other.forEach((item) => {
        template += `<div class="node-item ${item.active ? "active" : ""}">${
          item.label
        }</div>`;
      });
      template += "</div>";
      const keyShape = group.addShape("dom", {
        attrs: {
          x: 8 - w / 2,
          y: 8 - h / 2,
          width: cfg.size[0],
          height: cfg.size[1],
          // DOM's html
          html: template,
        },
        name: "dom-shape1",
        draggable: true,
      });

      //   if (cfg.label) {
      //     group.addShape("text", {
      //       attrs: {
      //         ...labelCfg.style,
      //         x: 30 - w / 2,
      //         y: -h / 2,
      //       },
      //     });
      //   }

      return keyShape;
    },
    update: undefined,
  },
  "rect"
);

G6.registerEdge("flow-line", {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const { style } = cfg;
    const shape = group.addShape(
      "path",
      {
        attrs: {
          stroke: style.stroke,
          lineDash: [5, 5],
          endArrow: {
            // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
            path: "M 0,0 L 20,10 L 20,-10 Z",
            // 箭头的偏移量，负值代表向 x 轴正方向移动
            // d: -10,
          },
          path: [
            ["M", startPoint.x, startPoint.y],
            ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
            ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
            ["L", endPoint.x, endPoint.y],
          ],
        },
      },
      "cubic-vertical"
    );

    return shape;
  },
});

G6.registerEdge(
  "line-with-arrow",
  {
    draw(cfg, group) {
      var startPoint = cfg.startPoint;
      var endPoint = cfg.endPoint;
      var centerPoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: (startPoint.y + endPoint.y) / 2,
      };
      // 控制点坐标
      var controlPoint = {
        x: (startPoint.x + centerPoint.x) / 2,
        y: startPoint.y,
      };

      // 为了更好的展示效果, 对称贝塞尔曲线需要连到箭头根部
      var path = group.addShape("path", {
        attrs: {
          path: [
            ["M", startPoint.x, startPoint.y],
            ["Q", controlPoint.x, controlPoint.y, centerPoint.x, centerPoint.y],
            ["T", endPoint.x, endPoint.y],
            ["L", endPoint.x, endPoint.y],
          ],
          stroke: "#ccc",
          lineWidth: 1,
          lineDash: [2, 2],
          endArrow: {
            path: G6.Arrow.circle(5, -10),
            d: 10,
          },
          startArrow: {
            path: G6.Arrow.circle(5, 0),
            d: 0,
          },
        },
      });

      return path;
    },
    // afterDraw(cfg, group) {
    //   const shape = group.get('children')[0];
    //   const length = shape.getTotalLength();
    //   shape.animate(
    //     (ratio) => {
    //       const startLen = ratio * length;
    //       const cfg = {
    //         lineDash: [startLen, length - startLen],
    //         stroke: "#ccc",
    //       };
    //       return cfg;
    //     },
    //     {
    //       repeat: false,
    //       duration: 1000,
    //     },
    //   );
    // }
  },
  "cubic-horizontal"
);

const defaultStateStyles = {
  //   hover: {
  //     stroke: '#1890ff',
  //     lineWidth: 2,
  //   },
};

const defaultNodeStyle = {
  fill: "#91d5ff",
  stroke: "#40a9ff",
  radius: 5,
};

// const defaultEdgeStyle = {
//   stroke: "#91d5ff",
//   endArrow: {
//     path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
//     fill: "#91d5ff",
//     d: -20,
//   },
// };

const defaultLayout = {
  type: "compactBox",
  direction: "TB",
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 70;
  },
};

const defaultLabelCfg = {
  style: {
    fill: "#000",
    fontSize: 12,
  },
};
let graph, count1, count;
count = count1 = 1;
const big = () => {
  const { cfg } = graph;
  count += 0.1;
  count1 = 1;
  console.log(count, cfg.width / 2, "+");
  graph.zoom(Number(count)), { x: cfg.width / 2, y: cfg.height / 2 };
};
const small = () => {
  count1 -= 0.1;
  count = 1;
  console.log(count1, "-");
  graph.zoom(Number(count1));
};
const center = () => {
  graph.fitView();
  count = count1 = 1;
};
nextTick(() => {
  const container = document.getElementById("container");
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;

  const minimap = new G6.Minimap({
    size: [150, 100],
  });
  graph = new G6.TreeGraph({
    renderer: "svg",
    container: "container",
    width,
    height,
    linkCenter: true,
    fitView: true,
    fitCenter: true,
    animate: true,
    plugins: [minimap],
    modes: {
      default: [
        {
          type: "collapse-expand",
          onChange: function onChange(item, collapsed) {
            const data = item.get("model");
            data.collapsed = collapsed;
            return true;
          },
        },
        "drag-canvas",
        "zoom-canvas",
      ],
    },
    defaultNode: {
      type: "icon-node",
      size: [100, 40],
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg,
    },
    // defaultEdge: {
    //   type: 'flow-line',
    //   style: defaultEdgeStyle,
    // },
    defaultEdge: {
      type: "cubic-horizontal",
      style: {
        cursor: "pointer",
        lineDash: [2, 2],
        stroke: "#000",
        strokeOpacity: 0.8,
        // startArrow: {
        //   path: G6.Arrow.circle(5, 5), // 内置箭头，参数为箭头宽度、长度、偏移量 d（默认为 0）
        //   d: 5,
        // },
        // endArrow: {
        //   path: G6.Arrow.circle(5, 0),
        //   d: 0,
        // },
      },
      //   labelCfg: {
      //     position: 'middle',
      //     style: {
      //       textAlign: 'center',
      //       textBaseline: 'middle',
      //       fontStyle: 'normal',
      //     },
      //     autoRotate: false,
      //   },
    },
    nodeStateStyles: defaultStateStyles,
    // edgeStateStyles: defaultStateStyles,
    layout: defaultLayout,
  });

  // 以下重点
  graph.node(function (node) {
    // depth 类似节点标识
    if (node.depth == 0) {
      return {
        size: [100, 40],
        type: "custom-node",
        img: require("./group.png"),
        // style: {
        //   fill: 'red',
        //   // stroke:''
        // },
        label: node.id,
      };
    }

    if (node.depth == 1) {
      return {
        size: [100, 40],
        type: "icon-node",
        style: {
          fill: "blue",
        },
        label: node.id,
      };
    }

    if (node.depth == 3 && node.other) {
      return {
        size: [120, 40],
        type: "custom-node1",
        // style: {
        //   fill: "blue",
        //   stroke: 'red'
        // },
        label: node.id,
      };
    }
    return {
      label: node.id, // 设置显示名称
      labelCfg: {
        offset: 5,
      },
    };
  });

  graph.data(data);
  graph.render();
  graph.fitView();

  graph.on("node:mouseenter", (evt) => {
    const { item } = evt;
    graph.setItemState(item, "hover", true);
  });

  graph.on("node:mouseleave", (evt) => {
    const { item } = evt;
    graph.setItemState(item, "hover", false);
  });

  graph.on("node:click", (evt) => {
    const { item, target } = evt;
    const targetType = target.get("type");
    const name = target.get("name");

    // 增加元素
    if (targetType === "marker") {
      const model = item.getModel();
      if (name === "add-item") {
        if (!model.children) {
          model.children = [];
        }
        const id = `n-${Math.random()}`;
        model.children.push({
          id,
          label: id.substr(0, 8),
          leftIcon: {
            style: {
              fill: "#e6fffb",
              stroke: "#e6fffb",
            },
            img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
          },
        });
        graph.updateChild(model, model.id);
      } else if (name === "remove-item") {
        graph.removeChild(model.id);
      }
    }
  });
});
</script>
<style lang="less">
foreignObject {
  overflow: initial;
}
#container {
  svg {
    overflow: initial;
  }
}
.bgc {
  /* background-color: red; */
  border: 1px solid #ccc;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.left-node {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: #fff;
}
.node-item {
  width: 45px;
  height: 45px;
  border-radius: 5px;
  border: 1px dotted rgb(11, 185, 11);
  margin: 2px 2px;
}
.active {
  border: 1px dotted rgb(49, 87, 228);
}
</style>

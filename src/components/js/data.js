export const data = {
  // 节点
  nodes: [
    {
      id: "node1", // String，可选，节点的唯一标识
      shape: "rect", // 使用 rect 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "hello", // String，节点标签
      attrs: {
        body: {
          // 节点里面主体的样式
          fill: "#2ECC71",
          stroke: "#000",
          strokeDasharray: "10,2",
        },
        label: {
          // 节点边框的样式
          text: "Hello",
          fill: "#333",
          fontSize: 13,
        },
      },
    },
    {
      id: "node2", // String，节点的唯一标识
      shape: "ellipse", // 使用 ellipse 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
      attrs: {
        body: {
          fill: "#F39C12",
          stroke: "#000",
          rx: 16,
          ry: 16,
        },
        label: {
          text: "World",
          fill: "#333",
          fontSize: 18,
          fontWeight: "bold",
          fontVariant: "small-caps",
        },
      },
      ports: [
        {
          id: "port1",
          attrs: {
            circle: {
              r: 6,
              magnet: true, // 这个特殊属性，使链接桩在连线交互时可以被连接上。
              stroke: "#31d0c6",
              strokeWidth: 2,
              fill: "#fff",
            },
          },
        },
        {
          id: "port2",
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
        {
          id: "port3",
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
      ],
    },
    {
      id: "node3", // String，节点的唯一标识
      shape: "circle", // 使用 circle 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
    },
    {
      id: "node4", // String，节点的唯一标识
      shape: "polygon", // 使用 polygon 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 80, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
      points: "100,10 40,198 190,78 10,78 160,198",
      attrs: {
        body: {
          fill: "#ffd591",
          stroke: "#ffa940",
          strokeWidth: 2,
          fillRule: "nonzero",
        },
      },
    },
    {
      id: "node5", // String，节点的唯一标识
      shape: "image-bordered", // 使用 image 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      imageUrl:
        "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
      attrs: {
        body: {
          fill: "#2ECC71",
          stroke: "#000",
          strokeDasharray: "10,2",
        },
        label: {
          text: "Hello",
          fill: "#333",
          fontSize: 5,
        },
      },
    },
    {
      id: "node6", // String，节点的唯一标识
      shape: "polyline", // 使用 polyline 渲染
      width: 40, // Number，可选，节点大小的 width 值
      height: 80, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
      // 使用 points 属性指定顶点数组
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 10 },
        { x: 10, y: 0 },
      ],
      attrs: {
        body: {
          fill: "#efdbff",
          stroke: "#9254de",
        },
      },
    },
    {
      id: "node7", // String，节点的唯一标识
      shape: "path", // 使用 path 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 80, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
      path: "M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z",
      attrs: {
        body: {
          fill: "#D75A4A",
          stroke: "none",
        },
      },
    },
    {
      id: "node8", // String，节点的唯一标识
      shape: "custom-node", // 使用 path 渲染
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: "world", // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: "node1", // String，必须，起始节点 id
      target: "node2", // String，必须，目标节点 id
      shape: "double-edge",
      attrs: {
        // 连线样式
        line: {
          stroke: "pink",
        },
      },
      router: {
        // 边连线方式（只能垂直或水平）
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node3", // String，必须，目标节点 id
      shape: "shadow-edge",
      attrs: {
        line: {
          fill: "none",
          strokeLinejoin: "round",
          strokeWidth: "2",
          stroke: "#4b4a67",
          sourceMarker: null,
          targetMarker: null,
        },
      },
      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node4", // String，必须，目标节点 id
      attrs: {
        line: {
          fill: "none",
          strokeLinejoin: "round",
          strokeWidth: "2",
          stroke: "#4b4a67",
          sourceMarker: null,
          targetMarker: null,
        },
      },
      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node5", // String，必须，目标节点 id
      shape: "org-edge",

      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node6", // String，必须，目标节点 id
      shape: "org-edge",

      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node7", // String，必须，目标节点 id
      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
    {
      source: "node1", // String，必须，起始节点 id
      target: "node8", // String，必须，目标节点 id
      router: {
        name: "er",
        args: {
          offset: "center",
        },
      },
    },
  ],
};

import { createRouter, createWebHashHistory } from "vue-router";
// 1. 定义路由组件：这里直接用的对象数据，也可以导入其他组件。
const G6 = () => import("@/view/G6");
const X6 = () => import("@/view/X6");
const SearchBar = () => import("@/view/searchBar");
const ZoomInOut = () => import("@/view/ZoomInOut");
const Bpmn = () => import("@/view/bpmn");
const LogicFlow = () => import("@/view/logicflow/FlowChart");
const Group = () => import("@/view/logicflow/group");
const Canvas = () => import("@/view/canvas");
const UploadImg = () => import("@/view/upload-img");

// 2. 定义一些路由：每个路由都需要映射到一个组件。
const routes = [
  { path: "/g6", component: G6 },
  { path: "/search-bar", component: SearchBar },
  { path: "/zoom-in-out", component: ZoomInOut },
  { path: "/x6", component: X6 },
  { path: "/bpmn", component: Bpmn },
  {
    path: "/logicflow",
    component: LogicFlow,
    children: [
      {
        path: "/group",
        name: "logicGroup",
        meta: {
          title: "分组",
        },
        component: Group,
      },
    ],
  },
  { path: "/canvas", component: Canvas },
  { path: "/upload-img", component: UploadImg },
];

// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;

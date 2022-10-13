import { createRouter, createWebHashHistory } from "vue-router";
// 1. 定义路由组件：这里直接用的对象数据，也可以导入其他组件。
const G6 = () => import('@/view/G6')
const SearchBar = () => import('@/view/searchBar')

// 2. 定义一些路由：每个路由都需要映射到一个组件。
const routes = [
  { path: "/g6", component: G6 },
  { path: "/search-bar", component: SearchBar },
];

// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router

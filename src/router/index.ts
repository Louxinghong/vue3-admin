import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const requireRoutes: any = import.meta.glob("./routes/*.ts", { eager: true });
const allRoutes: any[] = Object.keys(requireRoutes).reduce((total, path: string) => {
  total = total.concat(requireRoutes[path].routes);
  return total;
}, []);

if (process.env.NODE_ENV !== "development") {
  const findTestIndex = allRoutes.findIndex((item) => item.name === "Test");
  findTestIndex && allRoutes.splice(findTestIndex, 1);
}

const routes: RouteRecordRaw[] = allRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

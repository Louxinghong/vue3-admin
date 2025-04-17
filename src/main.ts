import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.less";
import "./style/common.less";
import "virtual:svg-icons-register";

router.beforeEach((to, from, next) => {
  if (!to.matched || to.matched.length === 0) {
    next("/404");
  } else {
    next();
  }
});

const app = createApp(App);
// 注册全局组件
Object.keys(components).forEach((key) => {
  // 为 components 添加类型断言，确保 TypeScript 知道 components 是一个对象，且可以通过字符串索引访问
  app.component(key, (components as { [key: string]: any })[key]);
});
app.use(router).use(store).use(ArcoVue).mount("#app");

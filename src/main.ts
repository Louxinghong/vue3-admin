import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.less";
import "./style/common.less";
import "./style/tailwind.css";
import "virtual:svg-icons-register";
import "@/utils/permission";

const app = createApp(App);
app.use(router).use(store).use(ArcoVue).mount("#app");

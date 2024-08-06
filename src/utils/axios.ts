import axios from "axios";
import { Message } from "@arco-design/web-vue";

const service = axios.create({
  timeout: 30000
});

service.interceptors.request.use(
  (config: any) => {
    if (config.url.indexOf("https://api.chatanywhere.tech") > -1) {
      config.headers["Authorization"] = "";
      config.redirect = "follow";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error) => {
    Message.error(error);
    return Promise.reject(error);
  }
);

export default service;

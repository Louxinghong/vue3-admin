import axios from "@/utils/axios";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ChatGptResult } from "@/utils/interface";

export const getViewData = () => axios.get("/bilibili-api/x/web-interface/view");

/**
 * 获取高德引入结果
 */
export const getAMapData = (params: CommonConfig.MapParams = {}) => {
  AMapLoader.reset();
  return AMapLoader.load({
    key: "7243d2aa043b480d7b4808c9fd90d78b", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: params.mapVersion || "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: params.mapPlugins || [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    AMapUI: {
      // 是否加载 AMapUI，缺省不加载
      version: params.uiVersion || "1.1", // AMapUI 缺省 1.1
      plugins: params.uiPlugins || [] // 需要加载的 AMapUI ui插件
    }
  });
};

export const getAIData = (message: string) =>
  axios({
    url: "/qingyunke-api",
    method: "GET",
    params: {
      key: "free",
      appid: 0,
      msg: message
    }
  });

export const getGptMessage = (params: { content: string }): Promise<ChatGptResult> =>
  axios("https://api.chatanywhere.tech/v1/chat/completions", {
    method: "POST",
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${params.content}`
        }
      ]
    }
  });

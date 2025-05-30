import Layout from "@/components/Layout/index.vue";

export const routes = [
  {
    path: "/tool",
    name: "Tool",
    redirect: "/tool/coordinate-point",
    component: Layout,
    meta: { title: "工具类", icon: "tool" },
    children: [
      {
        path: "coordinate-point",
        name: "CoordinatePoint",
        component: () => import("@/views/tool/coordinate-point/index.vue"),
        meta: { title: "坐标点定位", icon: "" }
      },
      {
        path: "data-conversion",
        name: "DataConversion",
        component: () => import("@/views/tool/data-conversion/index.vue"),
        meta: { title: "数据转换", icon: "" }
      },
      {
        path: "draw-area",
        name: "DrawArea",
        component: () => import("@/views/tool/draw-area/index.vue"),
        meta: { title: "绘制区域", icon: "" }
      }
      // {
      //   path: "chat-ai",
      //   name: "ChatAI",
      //   component: () => import("@/views/tool/chat-ai/index.vue"),
      //   meta: { title: "Chat-GPT", icon: "" }
      // }
    ]
  }
];

import Layout from "@/components/Layout/index.vue";

export const routes = [
  {
    path: "/test",
    name: "Test",
    redirect: "/test/test-demo",
    component: Layout,
    meta: { title: "测试管理", icon: "person" },
    children: [
      {
        path: "test-demo",
        name: "TestDemo",
        component: () => import("@/views/test/index.vue"),
        meta: { title: "测试方法", icon: "", lastPageCache: ["TestDetail"] }
      },
      {
        path: "test-detail",
        name: "TestDetail",
        component: () => import("@/views/test/components/TestDetail.vue"),
        meta: { title: "测试详情", icon: "", hidden: true }
      }
    ]
  }
];

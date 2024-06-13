import Layout from "@/components/Layout/index.vue";

export const routes = [
  {
    path: "/test",
    name: "Test",
    redirect: "/test/test-son",
    component: Layout,
    meta: { title: "测试管理", icon: "person" },
    children: [
      {
        path: "test-son",
        name: "TestSon",
        component: () => import("@/views/test/index.vue"),
        meta: { title: "测试方法", icon: "" }
      }
    ]
  }
];

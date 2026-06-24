import Layout from "@/components/Layout/Layout.vue";

export const routes = [
  {
    path: "/todo",
    name: "TodoList",
    component: Layout,
    meta: { title: "待办事项", icon: "person" },
    children: [
      {
        path: "",
        name: "TodoListIndex",
        component: () => import("@/views/todo/index.vue"),
        meta: { title: "待办列表", icon: "" },
      },
    ],
  },
];

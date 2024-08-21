export const routes = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      hidden: true
    }
  }
];

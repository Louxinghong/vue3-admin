import Layout from "@/components/Layout/index.vue";

export const routes = [
  {
    path: "/",
    name: "Dashboard",
    redirect: "/dashboard",
    component: Layout,
    meta: { title: "首页", icon: "dashboard", isDashboard: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
];

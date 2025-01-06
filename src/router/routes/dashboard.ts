import Layout from "@/components/Layout/index.vue";

export const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    meta: { title: "去码头整点薯条", icon: "dashboard", isDashboard: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue")
      }
    ]
  }
];

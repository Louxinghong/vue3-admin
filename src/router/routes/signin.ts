import Layout from "@/components/Layout/Layout.vue";

export const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Layout,
    meta: { title: "签到日历", icon: "person" },
    children: [
      {
        path: "",
        name: "SigninCalendar",
        component: () => import("@/views/signin/index.vue"),
        meta: { title: "签到日历", icon: "" },
      },
    ],
  },
];

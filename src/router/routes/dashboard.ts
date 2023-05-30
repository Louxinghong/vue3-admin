import Layout from '@/components/Layout/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    redirect: '/dashboard',
    component: Layout,
    isDashboard: true,
    meta: { title: '迷你遛统一门户', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  }
]

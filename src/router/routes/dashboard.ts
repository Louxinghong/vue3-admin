import Layout from '@/components/Layout/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: '' }
      }
    ]
  }
]

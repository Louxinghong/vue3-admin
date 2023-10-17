import Layout from '@/components/Layout/index.vue'

export const routes = [
  {
    path: '/foreign-page',
    name: 'ForeignPage',
    redirect: '/foreign-page/coordinate',
    component: () => import('@/views/foreign-page/index.vue'),
    hidden: true,
    children: [
      {
        path: 'coordinate',
        name: 'Coordinate',
        component: () => import('@/views/tool/coordinate-point/index.vue')
      }
    ]
  }
]

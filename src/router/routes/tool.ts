import Layout from '@/components/Layout/index.vue'

export const routes = [
  {
    path: '/tool',
    name: 'Tool',
    redirect: '/tool/coordinate-point',
    component: Layout,
    isDashboard: true,
    meta: { title: '工具类', icon: 'tool' },
    children: [
      {
        path: 'coordinate-point',
        name: 'CoordinatePoint',
        component: () => import('@/views/tool/coordinate-point/index.vue'),
        meta: { title: '坐标点定位', icon: '' }
      }
    ]
  }
]

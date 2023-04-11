import Layout from '@/components/Layout/index.vue'

export const routes = [
  {
    path: '/test',
    name: 'Test',
    redirect: '/test/test-son',
    component: Layout,
    children: [
      {
        path: 'test-son',
        name: 'TestSon',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '测试', icon: '' }
      }
    ]
  }
]

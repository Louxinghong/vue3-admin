import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const requireRoutes = import.meta.glob('./routes/*.ts', { eager: true })
let allRoutes: any[] = Object.keys(requireRoutes).reduce((total, path: string) => {
  total = total.concat(requireRoutes[path].routes)
  return total
}, [])

if (process.env.NODE_ENV !== 'development') {
  let findTestIndex = allRoutes.findIndex((item) => item.name === 'Test')
  findTestIndex && allRoutes.splice(findTestIndex, 1)
}

const routes: Array<RouteRecordRaw> = allRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

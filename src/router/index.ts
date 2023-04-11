import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const requireRoutes = import.meta.globEager('./routes/*.ts')
const allRoutes = Object.keys(requireRoutes).reduce((total, path: string) => {
  total = total.concat(requireRoutes[path].routes)
  return total
}, [])

const routes: Array<RouteRecordRaw> = allRoutes

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

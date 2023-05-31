import { createPinia } from 'pinia'

// const requireStores = import.meta.glob('./modules/*.ts', { eager: true })
// const allStores = Object.keys(requireStores).reduce((modules, path: string) => {
//   modules[requireStores[path].default.$id] = requireStores[path]
//   return modules
// }, {})
const store = createPinia()
export default store

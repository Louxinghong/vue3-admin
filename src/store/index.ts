import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// const requireStores = import.meta.glob('./modules/*.ts', { eager: true })
// const allStores = Object.keys(requireStores).reduce((modules, path: string) => {
//   modules[requireStores[path].default.$id] = requireStores[path]
//   return modules
// }, {})
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store

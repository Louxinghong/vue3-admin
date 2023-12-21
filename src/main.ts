import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import JsonViewer from 'vue-json-viewer'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import './style/common.scss'
import 'virtual:svg-icons-register'

router.beforeEach((to, from, next) => {
  console.log(to.matched)
  if (!to.matched || to.matched.length === 0) {
    next('/404')
  } else {
    next()
  }
})

const app = createApp(App)
// 注册全局组件
Object.keys(components).forEach((key) => {
  app.component(key, components[key])
})
app.use(router).use(store).use(ArcoVue).use(JsonViewer).mount('#app')

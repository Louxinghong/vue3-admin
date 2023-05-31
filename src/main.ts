import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import './style/common.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
// 注册全局组件
Object.keys(components).forEach((key) => {
  app.component(key, components[key])
})
app.use(router).use(store).use(ArcoVue).mount('#app')

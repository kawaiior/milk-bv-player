import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
// @ts-ignore
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css';
import { router } from '../../routes'

const app = createApp(App)

app.use(router)

app.mount('#app')
import { createApp, prop } from 'vue'
import App from './App.vue'
import router from './router/lot'
import Alert from './plugins/lot/alert'

let MyApp = createApp(App)
//console.log(Alert)
MyApp.use(Alert)
MyApp.use(router)

MyApp.mount('#app')

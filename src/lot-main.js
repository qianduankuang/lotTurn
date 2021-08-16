import { createApp, prop } from 'vue'
import App from './App-Lot.vue'
import router from './router/lot'
import Alert from './plugins/lot/alert'
import {appCmdApply} from './utils/cmd'

let MyApp = createApp(App)
//console.log(Alert)
MyApp.use(Alert)
MyApp.use(router)

MyApp.config.globalProperties.$appCmdApply = appCmdApply

MyApp.config.globalProperties.$appName = 'lot'

MyApp.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/turntable'
import Alert from './components/turntable/alert.vue'
import Wrap from './components/turntable/wrap.vue'
import animate from "animate.css";

let MyApp = createApp(App)
MyApp.component(Alert.name, Alert)
MyApp.component(Wrap.name, Wrap)
MyApp.use(animate)
MyApp.use(router).mount('#app')
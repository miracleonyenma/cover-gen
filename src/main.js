import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './tailwind.css'
import './assets/css/main.css'

// export default viteSSR(App, {routes}, (context) => {

// })

createApp(App).use(router).mount('#app')

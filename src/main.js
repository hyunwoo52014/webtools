import { createApp } from 'vue'
import router from '@/router/router'
import MainApp from '@/mainApp.vue'

createApp(MainApp).use(router).mount('#app')

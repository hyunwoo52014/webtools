import GenericCalculator from '@/components/GenericCalculator.vue'
import HomePage from '@/components/HomePage.vue'
import TextEditor from '@/components/TextEditor.vue'
import TimerNCounter from '@/components/TimerNCounter.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomePage },
  { path: '/textEditor', component: TextEditor },
  { path: '/calculator', component: GenericCalculator },
  { path: '/timerNcounter', component: TimerNCounter },
  //{ path: '/paintBoard', component: undefined },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

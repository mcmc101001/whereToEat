import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/routes/Home.vue'
import Recommendation from './routes/recommendation/Recommendation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/recommendation', name: 'Recommendation', component: Recommendation }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/routes/Home.vue'
import Recommendation from './routes/recommendation/Recommendation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'WhereToEat - Search',
        metaTags: [{ name: 'description', content: 'Search for nearby restaurants!' }]
      }
    },
    {
      path: '/recommendation',
      name: 'Recommendation',
      component: Recommendation,
      meta: {
        title: 'WhereToEat - Recommendation',
        metaTags: [{ name: 'description', content: 'View the list of nearby restaurants!' }]
      }
    }
  ]
})

export default router

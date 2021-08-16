//求签路由
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Lot',
    component: () => import('../pages/lot/index.vue')
  },
  {
    path: '/lot-first',
    name: 'LotFirst',
    component: () => import('../pages/lot/lot-first.vue')
  },
  {
    path: '/lot-second',
    name: 'LotSecond',
    component: () => import('../pages/lot/lot-second.vue')
  },
  {
    path: '/lot-result',
    name: 'LotResult',
    component: () => import('../pages/lot/lot-result.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

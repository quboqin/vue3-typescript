import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import { getUser } from '@/utils/aws-auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/creditCard',
    name: 'creditCard',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/Login/CreditCard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/Login/SignIn.vue'),
  },
  {
    path: '/verifyCode',
    name: 'verifyCode',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/Login/VerifyCode.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = await getUser()
  if (!user && to.matched.some((record) => record.meta.requiresAuth)) {
    return next({
      name: 'signIn',
    })
  }
  return next()
})

export default router

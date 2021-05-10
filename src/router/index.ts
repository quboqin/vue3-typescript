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
    path: '/addCreditCard',
    name: 'addCreditCard',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/CreditCard/AddCreditCard.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: '/creditCardList',
    name: 'creditCardList',
    component: () =>
      import(
        /* webpackChunkName: "sign" */ '../views/CreditCard/CreditCardList.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: '/donate',
    name: 'donate',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/CreditCard/Donate.vue'),
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

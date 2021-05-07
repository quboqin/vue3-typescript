import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/Login/SignUp.vue'),
    props: true,
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () =>
      import(/* webpackChunkName: "sign" */ '../views/Login/SignIn.vue'),
    props: true,
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

export default router

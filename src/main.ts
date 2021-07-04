import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

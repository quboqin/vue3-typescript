import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

<<<<<<< HEAD
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

createApp(App).use(router).mount('#app')
=======
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
>>>>>>> provide-inject

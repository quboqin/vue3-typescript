<template>
  <div id="app">
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { userAuthProvide, UserInfo } from '@/store/user'
import { useAsync } from '@/utils/async'
import { checkHealth } from '@/apis/health'
import { getUser } from '@/utils/aws-auth'

export default defineComponent({
  name: 'App',
  setup() {
    const newUser: UserInfo = reactive({
      user: {
        phone: '',
      },
    })
    userAuthProvide(newUser)
    const userName = computed(() =>
      newUser.user?.firstName
        ? `${newUser.user?.firstName} ${newUser.user?.lastName}`
        : newUser.user?.phone
        ? newUser.user?.phone
        : newUser.user?.email,
    )

    const router = useRouter()
    const state = reactive({
      transitionName: 'slide-left',
    })
    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left'
      } else if (to.meta.index < from.meta.index) {
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = ''
      }
    })

    const loading = useAsync(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          checkHealth({})
          resolve()
        }, 2000)
      })
    })

    const getUserName = async () => {
      const user = await getUser()
      newUser.user.phone = user.username
    }
    onMounted(getUserName)

    return { ...toRefs(state), userName, loading }
  },
})
</script>

<style lang="less">
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

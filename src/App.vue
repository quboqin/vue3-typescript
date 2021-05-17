<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="onSelectMenuItem">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="/">Home</el-dropdown-item>
            <el-dropdown-item command="/signIn">Sign In</el-dropdown-item>
            <el-dropdown-item command="/signOut">Sign Out</el-dropdown-item>
            <el-dropdown-item command="/addCreditCard"
              >Add Credit Card</el-dropdown-item
            >
            <el-dropdown-item command="/creditCardList"
              >Credit Card List</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-show="!loading">{{ userName }}</span>
    </el-header>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { userAuthProvide, UserInfo } from '@/store/user'
import { useAsync } from '@/utils/async'
import { checkHealth } from '@/apis/health'
import { signOut, getUser } from '@/utils/aws-auth'

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
    function onSelectMenuItem(command: string) {
      if (command === '/signOut') {
        signOut()
        router.push({
          path: '/',
        })
      } else {
        router.push({
          path: command,
        })
      }
    }

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
      console.log(user.username)
      newUser.user.phone = user.username
    }
    onMounted(getUserName)

    return { onSelectMenuItem, userName, loading }
  },
})
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>

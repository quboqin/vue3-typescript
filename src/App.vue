<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onSelectMenuItem(0)"
              >Sign In</el-dropdown-item
            >
            <el-dropdown-item @click="onSelectMenuItem(1)"
              >Add Credit Card</el-dropdown-item
            >
            <el-dropdown-item @click="onSelectMenuItem(2)"
              >Credit Card List</el-dropdown-item
            >
            <el-dropdown-item @click="onSelectMenuItem(3)"
              >Donate</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>Qubo Qin</span>
    </el-header>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { userAuthProvide, UserInfo } from '@/store/user'
export default defineComponent({
  setup() {
    const router = useRouter()
    const pages = ['/signIn', '/addCreditCard', '/creditCardList', '/donate']

    const newUser: UserInfo = {
      user: {
        phone: '+16264895188',
      },
      token: 'secret_token_9df91e67-9af6-4ffe-9322-a5a27a829210',
    }

    userAuthProvide(newUser)

    function onSelectMenuItem(index: number) {
      console.log(`onSelectMenuItem = ${index}`)
      router.push({
        path: pages[index],
      })
    }

    return { onSelectMenuItem }
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

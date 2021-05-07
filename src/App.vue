<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="1" router="true">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="/signUp">
          <i class="el-icon-user"></i>
          <span>Sign Up</span>
        </el-menu-item>
        <el-menu-item index="/signIn">
          <i class="el-icon-user-solid"></i>
          <span>Sign In</span>
        </el-menu-item>
        <el-menu-item index="/verifyCode">
          <i class="el-icon-finished"></i>
          <span>Verify Code</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main><router-view /></el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userAuthProvide, UserInfo } from '@/store/user'
export default defineComponent({
  setup() {
    const newUser: UserInfo = {
      token: 'secret_token_9df91e67-9af6-4ffe-9322-a5a27a829210'
    }
    userAuthProvide(newUser)
  },
})
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50
  margin-top 60px
</style>

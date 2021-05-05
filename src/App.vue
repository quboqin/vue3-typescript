<template>
  <el-container>
    <el-aside width="200px">
      <el-menu default-active="1" router="true">
        <el-menu-item index="/">
          <i class="el-icon-home"></i>
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

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>

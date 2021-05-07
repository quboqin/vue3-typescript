<template>
  <el-container>
    <el-header align="center">Sign In</el-header>
    <el-main>
      <el-form label-width="200px">
        <el-form-item label="Phone or Email">
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="onSubmit">Submit</el-button>
          <el-button @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userAuthInject } from '@/store/user'

export default defineComponent({
  name: 'Sign In',
  setup() {
    const user = ''

    const { setUserAuthToken } = userAuthInject()

    function onSelect(index: number): void {
      console.log(`onSelect: ${index}`)
    }

    function onSubmit(): void {
      setUserAuthToken('1369b1d6-85a8-4f2f-b4fa-d42fcb4c21e4_secret_token')
      console.log(`onSubmit - setUserAuthToken`)
    }

    function onReset(): void {
      console.log(`onReset`)
    }

    return { user, onSelect, onSubmit, onReset }
  },
})
</script>

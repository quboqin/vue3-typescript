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
import { defineComponent, inject } from 'vue'

type UpdateTokenFun = (newToken: string) => void

export default defineComponent({
  name: 'Sign In',
  setup() {
    const updateToken = inject('updateToken') as UpdateTokenFun
    const user = ''

    function onSelect(index: number): void {
      console.log(`onSelect: ${index}`)
    }

    function onSubmit(): void {
      updateToken('1369b1d6-85a8-4f2f-b4fa-d42fcb4c21e4')
      console.log(`onSubmit`)
    }

    function onReset(): void {
      console.log(`onReset`)
    }

    return { updateToken, user, onSelect, onSubmit, onReset }
  },
})
</script>

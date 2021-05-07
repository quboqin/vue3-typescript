<template>
  <el-header align="center">Verify Code</el-header>
  <el-main>
    <el-form label-width="200px">
      <el-form-item label="Phone or Email">
        <el-input v-model="user"></el-input>
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="code"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userAuthInject } from '@/store/user'

export default defineComponent({
  name: 'Verify Code',
  setup() {
    const { userInfo } = userAuthInject()

    const user = userInfo.token
    const code = ''

    function onSelect(index: number): void {
      console.log(`onSelect: ${index}`)
    }

    function onSubmit(): void {
      console.log(`onSubmit`)
    }

    function onReset(): void {
      console.log(`onReset`)
    }

    return { user, code, onSelect, onSubmit, onReset }
  },
})
</script>

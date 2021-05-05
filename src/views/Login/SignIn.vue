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
import { Vue } from 'vue-class-component'

export default class SignIn extends Vue {
  user = ''

  onSelect(index: number): void {
    console.log(`onSelect: ${index}`)
  }

  onSubmit(): void {
    console.log(`onSubmit`)
  }

  onReset(): void {
    console.log(`onReset`)
  }
}
</script>

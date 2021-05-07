<template>
  <el-container>
    <el-header align="center">Sign Up</el-header>
    <el-main>
      <el-form label-width="200px">
        <el-form-item label="Phone or Email">
          <el-input v-model="creditCard"></el-input>
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

export default defineComponent({
  name: 'CreditCard',
  setup() {
    const creditCard = ''

    function onSubmit(): void {
      console.log(`onSubmit`)
    }

    function onReset(): void {
      console.log(`onReset`)
    }

    return { creditCard, onSubmit, onReset }
  },
})
</script>

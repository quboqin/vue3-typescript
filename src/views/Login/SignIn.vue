<template>
  <el-container>
    <el-header align="center">Sign In</el-header>
    <el-main>
      <el-form label-width="200px">
        <el-form-item label="Phone or Email">
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="onSignIn">Sign In</el-button>
          <el-button @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userAuthInject } from '@/store/user'
import { signIn } from '@/utils/aws-auth'

export default defineComponent({
  name: 'Sign In',
  setup() {
    const router = useRouter()
    const phoneOrEmail = ref('')

    const { setCognitoUser, setUserPhone } = userAuthInject()

    async function onSignIn(): Promise<void> {
      try {
        const cognitoUser = await signIn(
          phoneOrEmail.value,
          true,
          'Qubo',
          'Qin',
        )
        setCognitoUser(cognitoUser)
        setUserPhone(phoneOrEmail.value)
        router.push({
          path: '/verifyCode',
        })
      } catch (error) {
        console.log(error.message)
      }
      console.log(`onSignIn - setCognitoUser`)
    }

    function onReset(): void {
      phoneOrEmail.value = ''
      console.log(`onReset`)
    }

    return { phoneOrEmail, onSignIn, onReset }
  },
})
</script>

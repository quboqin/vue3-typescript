<template>
  <el-header align="center">Verify Code</el-header>
  <el-main>
    <el-form label-width="200px">
      <el-form-item label="Phone or Email">
        <el-input v-model="userPhone"></el-input>
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="code"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="onSubmitOTP">Submit</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { signIn, sendCustomChallengeAnswer } from '@/utils/aws-auth'
import { userAuthInject } from '@/store/user'
import { createUser } from '@/apis/user'
import { useRouter } from 'vue-router'
import { User } from 'quboqin-lib-typescript/lib/user'

export default defineComponent({
  name: 'Verify Code',
  setup() {
    const router = useRouter()
    const { userInfo, setCognitoUser } = userAuthInject()

    const userPhone = userInfo.user?.phone
    const code = ref('')

    async function onSubmitOTP(): Promise<void> {
      const cognitoUser = userInfo.cognitoUser
      if (cognitoUser) {
        try {
          await sendCustomChallengeAnswer(cognitoUser, code.value)
          const user: User = {
            phone: userPhone,
          }
          await createUser({ user })
          router.push({
            path: '/',
          })
        } catch (error) {
          if (error.code === 'UserLambdaValidationException') {
            const _cognitoUser = await signIn(
              cognitoUser.getUsername(),
              true,
              'Qubo',
              'Qin',
            )
            setCognitoUser(_cognitoUser)
          }
        }
      }
      console.log(`onSubmit`)
    }

    function onReset(): void {
      console.log(`onReset`)
    }

    return { userPhone, code, onSubmitOTP, onReset }
  },
})
</script>

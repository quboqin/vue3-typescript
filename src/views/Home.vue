<template>
  <el-container>
    <el-header>
      <HelloWorld
        align="center"
        msg="Welcome to Full Stack World + TypeScript App"
      />
    </el-header>
    <el-main>
      <el-row :gutter="20" justify="space-around">
        <el-col :span="12">
          <div align="center">Avatar</div>
          <div align="center">
            <el-image :src="require('@/assets/avatar.jpg')"></el-image>
          </div>
        </el-col>
        <el-col :span="12">
          <div align="center">Vue</div>
          <div align="center">
            <el-image :src="require('@/assets/logo.png')"> </el-image>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="space-around">
        <el-col :span="12" align="center">
          <el-button type="primary" icon="el-icon-search" @click="onGetUserById"
            >Get a user by id</el-button
          ></el-col
        >
        <el-col :span="12" align="center">
          <el-button type="primary" icon="el-icon-zoom-in" @click="onGetUsers"
            >Get all users</el-button
          ></el-col
        >
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

import { User } from 'quboqin-lib-typescript/lib/user'

import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

import { result } from '@/utils/axios'

const getUserById = (params: Record<string, unknown> = {}) => {
  return result('get', '/users', params)
}

const checkHealth = (params: Record<string, unknown> = {}) => {
  return result('get', '/health', params)
}

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  user: User = {
    userId: '4d53f6c8-528e-4c79-ac05-d296ba1a5a90',
    phone: '+8613004151097',
  }

  async onGetUserById(): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await getUserById(this.user as any)
  }

  async onGetUsers(): Promise<unknown> {
    return await getUserById()
  }

  async mounted(): Promise<void> {
    await checkHealth()
  }
}
</script>

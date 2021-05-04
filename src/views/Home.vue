<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div><button v-on:click="onGetUserById">Get user by id</button></div>
    <div><button v-on:click="onGetUsers">Get users</button></div>
  </div>
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
    console.log('mounted')
    await checkHealth()
  }
}
</script>

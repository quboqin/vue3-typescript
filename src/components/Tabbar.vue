<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">Tab</van-tabbar-item>
    <van-tabbar-item icon="search">Tab</van-tabbar-item>
    <van-tabbar-item icon="friends-o">Tab</van-tabbar-item>
    <van-tabbar-item icon="setting-o">Tab</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(0)
    return { active }
  },
})
</script>

<style lang="stylus"></style>

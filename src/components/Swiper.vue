<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" alt="" @click="onJump(item.redirectUrl)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    list: Array,
  },
  setup() {
    function onJump(url: string) {
      window.open(url)
    }

    return {
      onJump,
    }
  },
})
</script>

<style lang="stylus" scoped>
.my-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

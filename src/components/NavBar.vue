<template>
  <div class="nav-bar container mx-auto bg-purple-300 p-2">
    <ul class="flex flex-row justify-between">
      <li class="mx-2 flex-auto text-center">
        <a
          class="
            text-xs
            font-bold
            uppercase
            px-5
            py-3
            shadow-lg
            rounded
            block
            leading-normal
          "
          v-on:click="toggleTabs(1)"
          v-bind:class="{
            'text-pink-600 bg-white': openTab !== 1,
            'text-white bg-pink-600': openTab === 1,
          }"
        >
          <HomeIcon class="h-5 w-5" />
          Profile
        </a>
      </li>
      <li class="mx-2 flex-auto text-center">
        <a
          class="
            text-xs
            font-bold
            uppercase
            px-5
            py-3
            shadow-lg
            rounded
            block
            leading-normal
          "
          v-on:click="toggleTabs(2)"
          v-bind:class="{
            'text-pink-600 bg-white': openTab !== 2,
            'text-white bg-pink-600': openTab === 2,
          }"
        >
          <BeakerIcon class="h-5 w-5 text-blue-500 text-center" /> Settings
        </a>
      </li>
      <li class="mx-2 flex-auto text-center">
        <a
          class="
            text-xs
            font-bold
            uppercase
            px-5
            py-3
            shadow-lg
            rounded
            block
            leading-normal
          "
          v-on:click="toggleTabs(3)"
          v-bind:class="{
            'text-pink-600 bg-white': openTab !== 3,
            'text-white bg-pink-600': openTab === 3,
          }"
        >
          <CogIcon class="h-5 w-5 text-blue-500 text-center" /> Options
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { BeakerIcon, HomeIcon, CogIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: { BeakerIcon, HomeIcon, CogIcon },
  setup() {
    return {
      BeakerIcon,
      HomeIcon,
      CogIcon,
    }
  },
})
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
</style>

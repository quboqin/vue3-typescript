<template>
  <div class="hello">
    <h1>{{ environmentMsg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    const environmentMsg = computed(
      () => `${props.msg} + ${process.env.VUE_APP_TITLE}`,
    )
    return { environmentMsg }
  },
})
</script>

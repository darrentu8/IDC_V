<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    function startWatchJson() {
      // window.myAPI?.watchJson()
    }
    return { startWatchJson }
  },
  mounted() {
    this.startWatchJson()
  }
})
</script>

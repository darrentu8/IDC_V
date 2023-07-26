<template>
  <q-ajax-bar position="top" color="primary" size="7px" />
  <router-view @getText="sendText" />
  <!-- <ConfirmDialog /> -->
</template>

<script>
// import X2js from 'x2js'
// import ConfirmDialog from 'src/components/dialog/ConfirmDialog.vue'
// import io from 'socket.io-client'
import { defineComponent } from 'vue'
import { mixinWebsocket } from 'src/mixins/ws.js'
export default defineComponent({
  name: 'App',
  mixins: [mixinWebsocket],
  setup() {
    return {
    }
  },
  created() {
    this.initWebsocket()
  },
  async mounted() {
  },
  methods: {
    sendText(val) {
      const Data = {
        Command: 'Preview',
        Playlist: val
      }
      this.websocketsend(JSON.stringify(Data))
    }
  }
})
</script>
<style></style>

<template>
  <q-ajax-bar position="top" color="primary" size="7px" />
  <router-view @getText="sendText" />
  <!-- <div v-else class="flex flex-center" style="height: 100vh;">
    <q-spinner color="primary" size="3em" />
  </div> -->
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
      hasData: false
    }
  },
  created() {
  },
  async mounted() {
    this.initWebsocket()
    // const result = await this.websocketonmessage()
    // if (result !== undefined) {
    //   console.log('result', result)
    //   this.hasData = true
    //   console.log('this.hasData', this.hasData)
    // }
    // console.log('this.hasData', this.hasData)
    // console.log('result', result)
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

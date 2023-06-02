<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="bg-white text-black brand-round-l q-pa-lg" style="min-width: 1200px;height:80vh;min-height:650px;">
      <q-bar class="row bg-white text-bold q-mb-sm" style="font-size:20px;">
        Configure Event/Action
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <HardWareComponent />
      <q-card-actions class="q-pb-lg absolute-bottom">
        <q-space />
        <q-btn v-close-popup color="primary" label="close" class="brand-round-l text-capitalize"
          style="width:116px;margin:auto 20px" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import HardWareComponent from '../HardWareComponent.vue'

export default {
  name: 'ConfigureHardwareDialog',
  components: {
    HardWareComponent
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    toFlow() {
      this.$router.push({ path: '/flow' })
    }
  }
}
</script>
<style lang="scss">
.pin-rect {
  height: 50px;
  width: 50px;
  border: 1px solid #C0C0C0;
  margin: 0 -1px -1px 0;
  cursor: pointer;
  background-color: #F1F1F1;
}

.pin-in-use {
  border-radius: 50%;
  background-color: $primary;
  width: 5px;
  height: 5px;
}

.is-pin-selected {
  z-index: 1;
  border: 1px solid $primary;
  background-color: white;
}
</style>

<template>
  <q-scroll-area style="height: calc(100% - 86px);">
    <q-item-label header>
      Connection settings
    </q-item-label>
    <ConnectionSettingList />
  </q-scroll-area>
</template>
<script>
// import ConnectionSettingList from './ConnectionSettingList.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FlowPage',
  components: {
    // ConnectionSettingList
  },
  setup() {
    return {
    }
  },
  methods: {
  }
})
</script>

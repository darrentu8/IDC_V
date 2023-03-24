<template>
  <q-page class="flex flex-center">
    <ContentSetting />
    <StoreFlow />
  </q-page>
</template>

<script>
import ContentSetting from 'src/components/ContentSetting.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FlowPage',
  components: {
    ContentSetting,
    StoreFlow
  }
})
</script>

<template>
  <q-page class="q-px-md items-start">
    <ContentSetting />
    <StoreFlow />
  </q-page>
</template>

<script>
import ContentSetting from 'src/components/ContentSetting.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { defineComponent } from 'vue'
// import { useWidgetListStore } from 'src/stores/widget'
// import { ref, nextTick, computed, toRef } from 'vue'
// const layoutStore = useLayoutStore()
// const widgetListStore = useWidgetListStore()
// const currentGridIndex = computed(() => layoutStore.currentGridIndex)
export default defineComponent({
  name: 'FlowPage',
  components: {
    ContentSetting,
    StoreFlow
  }
})
</script>

<template>
  <q-page class="q-px-md items-start">
    <q-tabs v-model="tab" inline-label class="text-grey" active-color="primary" indicator-color="primary" align="left"
      narrow-indicator>
      <q-tab name="source" label="Source library" />
      <q-tab name="flow" label="Story Flow" />

      <q-btn v-if="tab === 'source'" label="Add new source" @click="addState()" flat class="theme-tab-btn" color="green"
        icon="add" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="source" class="q-py-none">
        <ContentSetting />
      </q-tab-panel>

      <q-tab-panel name="flow" class="q-py-none">
        <StoreFlow />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script s>
import ContentSetting from 'src/components/ContentSetting.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { ref, defineComponent } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
const widgetStore = useWidgetListStore()
const addState = () => {
  widgetStore.AddState()
}
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
  },
  setup() {
    const tab = ref('source')
    return {
      addState,
      tab
    }
  }
})
</script>

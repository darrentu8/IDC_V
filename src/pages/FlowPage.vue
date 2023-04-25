<template>
  <q-page :class="['items-start', tab === 'source' ? 'col-12' : 'col-6 row']">
    <div :class="[tab === 'source' ? 'col-12' : 'col-6']">
      <q-tabs v-model="tab" inline-label class="text-grey" active-color="primary" indicator-color="primary" align="left"
        narrow-indicator>
        <q-tab name="source" label="Source library" />
        <q-tab name="flow" label="Story Flow" />

        <q-btn v-if="tab === 'source'" label="Add new state" @click="addState()" flat class="theme-tab-btn"
          color="primary" icon="add" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated @update:model-value="loadComponent" keep-alive>
        <q-tab-panel name="source" class="q-pa-none">
          <Suspense v-if="isLoading">
            <SouceLibrary />
            <template #fallback>
              <div class="my-3 d-flex align-items-center">
                <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
              </div>
            </template>
          </Suspense>
        </q-tab-panel>

        <q-tab-panel name="flow" class="q-pa-none">
          <Suspense v-if="isLoading">
            <StoreFlow />
            <template #fallback>
              <div class="my-3 d-flex align-items-center">
                <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
              </div>
            </template>
          </Suspense>
        </q-tab-panel>
      </q-tab-panels>

    </div>
    <div v-if="tab === 'flow'" class="col-6 q-pl-lg">
      <ConnectionSettingList />
    </div>
  </q-page>
</template>

<script>
import ConnectionSettingList from 'src/components/ConnectionSettingList.vue'
import SouceLibrary from 'src/components/SouceLibrary.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { ref, defineComponent, watch } from 'vue'
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
    ConnectionSettingList,
    SouceLibrary,
    StoreFlow
  },
  setup() {
    const tab = ref('source')
    const isLoading = ref('false')
    function loadComponent(val) {
      console.log('loadComponent;:', val)
      if (val) { isLoading.value = true }
    }
    watch(tab, (val) => {
      console.log('watch:', val)
      loadComponent(val)
    })
    return {
      isLoading,
      loadComponent,
      addState,
      tab
    }
  }
})
</script>

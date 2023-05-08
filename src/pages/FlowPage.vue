<template>
  <q-page :class="['items-start', tab === 'source' ? 'col-12 row' : 'col-6 row']">
    <div class="fixed" v-if="tab === 'source'"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);background-color: #F8F8F8;width:300px;height: 100vh;">
      <SettingList />
    </div>
    <div :class="[tab === 'source' ? 'offSetL q-pa-md' : 'offSetR q-pa-md']">
      <q-tabs v-model="tab" inline-label class="text-grey" active-color="primary" indicator-color="primary" align="left"
        narrow-indicator>
        <q-tab name="source" icon="img:/icon/view-grid-add.svg" label="State Definition"
          style="text-transform: capitalize;" />
        <q-tab name="flow" icon="img:/icon/flow.svg" label="Story Flow" style="text-transform: capitalize;" />

        <q-btn v-if="tab === 'source'" label="Add new state" @click="addState()" flat class="theme-tab-btn"
          color="primary" icon="add">
        </q-btn>
      </q-tabs>

      <q-tab-panels v-model="tab" style="background-color: #F1F1F1;" animated @update:model-value="loadComponent"
        keep-alive>
        <q-tab-panel name="source" class="">
          <Suspense v-if="isLoading">
            <SouceLibrary />
            <template #fallback>
              <div class="my-3 d-flex align-items-center">
                <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
              </div>
            </template>
          </Suspense>
        </q-tab-panel>

        <q-tab-panel name="flow" class="">
          <Suspense v-if="isLoading">
            <StoreFlow />
            <template #fallback>
              <div class="my-3 d-flex align-items-center">
                <q-spinner color="grey-2" size="3em" :thickness="2" />
              </div>
            </template>
          </Suspense>
        </q-tab-panel>
      </q-tab-panels>

    </div>
    <div v-if="tab === 'flow'" class="fixed" style="background-color: #F8F8F8;width:500px;height: 100vh;right:0;">
      <ConnectionSettingList />
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import SettingList from 'src/components/SettingList.vue'
import ConnectionSettingList from 'src/components/ConnectionSettingList.vue'
import SouceLibrary from 'src/components/SouceLibrary.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { useWidgetListStore } from 'src/stores/widget'
const widgetStore = useWidgetListStore()
const addState = () => {
  widgetStore.AddState()
}

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
</script>

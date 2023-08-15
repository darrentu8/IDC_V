<template>
  <q-page :class="['items-start', tab === 'source' ? 'col-12 row' : 'col-6 row']">
    <div v-if="!lockState" class="fixed fixed-full full-width full-height absolute-right absolute-top"
      style="background-color: rgb(238 238 238 / 60%);z-index:100;">
      <div class="text-primary flex flex-center items-center full-height" style="margin-top: -30px;">
        <q-icon size="lg" name="info" />
        <span class="q-ml-md" style="font-size: 16px;">
          Please select the widget type on the left.
        </span>
      </div>
    </div>
    <div class="fixed" v-if="tab === 'source'"
      style="border-right: 1px solid rgba(0, 0, 0, 0.12);background-color: #F8F8F8;width:300px;height: 100vh;">
      <SettingList />
    </div>
    <div :class="[tab === 'source' ? 'offSetL q-pa-md' : 'offSetR q-pt-md']">
      <q-tabs v-model="tab" inline-label class="text-grey" active-color="primary" indicator-color="primary" align="left"
        narrow-indicator>
        <q-tab name="source" label="State Definition" style="text-transform: capitalize;">
          <img class="q-ml-xs" src="~assets/icon/view-grid-add.svg" />
        </q-tab>
        <q-tab name="flow" label="Story Flow" style="text-transform: capitalize;">
          <img class="q-ml-xs" src="~assets/icon/flow.svg" />
        </q-tab>
        <q-btn v-if="tab === 'source'" label="Add new state" @click="addState()" flat class="theme-tab-btn"
          color="primary" icon="add">
        </q-btn>
      </q-tabs>

      <q-tab-panels v-model="tab" style="background-color: #F1F1F1;" animated @update:model-value="loadComponent"
        keep-alive>
        <q-tab-panel name="source" class="">
          <Suspense v-if="!loading">
            <SouceLibrary />
            <template #fallback>
              <div class="my-3 d-flex align-items-center">
                <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
              </div>
            </template>
          </Suspense>
        </q-tab-panel>

        <q-tab-panel name="flow" class="">
          <Suspense v-if="!loading">
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
      <Suspense v-if="!loading">
        <ConnectionSettingList />
        <template #fallback>
          <div class="my-3 d-flex align-items-center">
            <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
          </div>
        </template>
      </Suspense>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import SettingList from 'src/components/SettingList.vue'
import ConnectionSettingList from 'src/components/ConnectionSettingList.vue'
import SouceLibrary from 'src/components/SouceLibrary.vue'
import StoreFlow from 'src/components/StoreFlow.vue'
import { useWidgetListStore } from 'src/stores/widget'
const widgetStore = useWidgetListStore()

const loading = computed(() => widgetStore.loading)
const lockState = computed(() => widgetStore.GetLockState)

const addState = () => {
  widgetStore.AddState()
}

const tab = ref('source')
function loadComponent(val) {
  // console.log('loadComponent;:', val)
  if (val) {
    widgetStore.SetLoading(false)
  }
}
watch(tab, (val) => {
  // console.log('watch:', val)
  loadComponent(val)
})
</script>

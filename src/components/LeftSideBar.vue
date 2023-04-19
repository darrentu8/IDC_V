<template>
  <q-toolbar class="q-px-md q-my-md flex justify-center">
    <q-btn class="theme col-6 text-no-wrap" unelevated color="grey-4" text-color="grey-9" size="md" @click="backToGrid()">
      Playlist detail
    </q-btn>
    <q-space />
    <q-btn class="theme col-6" unelevated color="grey-4" text-color="grey-9" size="md" stack @click="exportFile()">
      <!-- <q-icon name="img:/icon/export.svg" color="white" size="xs" /> -->
      Hardware
      <br>configuration
    </q-btn>
  </q-toolbar>
  <GridViewStaticSelect :view-layout="layouts.layout" :view-row-count="layouts.rowCount"
    :view-col-count="layouts.colCount" :view-width="280" />
  <q-item-label header class="q-pb-xs">Selected widget</q-item-label>
  <q-scroll-area style="height: calc(100% - 250px);">
    <q-list padding>
      <EditWidgetList v-for="(widget, Index) in widgetLists" :Index="Index" :key="widget.id"
        :ContentType="widget.ContentType" :options="widgetOptions" />
    </q-list>
  </q-scroll-area>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GridViewStaticSelect from 'src/components/GridViewStaticSelect.vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import EditWidgetList from './EditWidgetList.vue'

const router = useRouter()
const LayoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const layouts = computed(() => LayoutStore.layout)
const widgetLists = computed(() => widgetStore.GetWidgetListData)
const widgetOptions = computed(() => widgetStore.widgetOption)

const backToGrid = () => {
  router.push({ path: '/grid' })
}
onMounted(() => {
})
</script>

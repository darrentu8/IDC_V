<template>
  <q-toolbar class="text-primary bg-grey-3">
    <q-toolbar-title class="text-subtitle1">
      Default layout
    </q-toolbar-title>
    <q-btn color="primary" size="md" @click="backToGrid()">
      Change widget
    </q-btn>
  </q-toolbar>
  <GridViewStaticSelect :view-layout="layouts.layout" :view-row-count="layouts.rowCount"
    :view-col-count="layouts.colCount" :view-width="280" />
  <q-item-label header class="q-pb-xs">Selected widget</q-item-label>
  <q-scroll-area style="height: calc(100% - 250px);">
    <q-list padding>
      <EditWidgetList v-for="widget in widgetLists" :key="widget.id" :type="widget.type" :title="widget.title"
        :options="widgetOptions" />
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
const widgetLists = computed(() => widgetStore.getWidgetListData)
const widgetOptions = computed(() => widgetStore.widgetOption)
const backToGrid = () => {
  router.push({ path: '/grid' })
}
onMounted(() => {
})
</script>

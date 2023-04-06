<template>
  <div class="absolute-top bg-transparent">
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
  </div>
  <q-scroll-area style="
                              height: calc(100% - 250px);
                              margin-top: 250px;
                              border-right: 1px solid #ddd;
                              ">
    <q-list padding>
      <EditWidgetList v-for="widget in widgetLists" :key="widget.title" :title="widget.title" :icon="widget.icon" />
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
const widgetLists = computed(() => widgetStore.widgetList)
const backToGrid = () => {
  router.push({ path: '/grid' })
}
onMounted(() => {
})
</script>

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
    <svg width="300" height="200" style="border: 1px solid; background: #fff;" viewbox="0,0,100,160"
      preserveAspectRatio="xMidYMid slice">
      <rect width="40" height="30" x="0" y="0" fill="#c00"></rect>
      <rect width="40" height="30" x="60" y="0" fill="#f80"></rect>
      <rect width="40" height="30" x="0" y="130" fill="#09c"></rect>
      <rect width="40" height="30" x="60" y="130" fill="#0c0"></rect>
      <rect width="40" height="30" x="30" y="65" fill="#000"></rect>
    </svg>
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
import { useWidgetListStore } from 'src/stores/widget'
import EditWidgetList from './EditWidgetList.vue'

const router = useRouter()
const widgetStore = useWidgetListStore()
const widgetLists = computed(() => widgetStore.widgetList)

const backToGrid = () => {
  router.push({ path: '/grid' })
}
onMounted(() => {
})
</script>

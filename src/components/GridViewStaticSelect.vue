<template>
  <div class="q-mx-sm">
    <q-item-label header class="flex justify-between items-center q-pb-xs q-px-sm text-dark text-bold">Layout
      <q-btn round dense flat color="primary" class="" @click="showLayout()">
        <img src="~assets/icon/edit.svg" />
      </q-btn>
    </q-item-label>
    <div class="flex flex-center">
      <div :style="{ width: `${viewWidth}px`, height: `${wrapperHeight}px` }">
        <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount" :row-height="rowHeight"
          :is-draggable="false" :is-resizable="false" :vertical-compact="true" :margin="[5, 5]">
          <grid-item class="gridItem" static v-for="(item, Index) in viewLayout" :x="item.x" :y="item.y" :w="item.w"
            :h="item.h" :i="item.i" :key="item.i">
            <div @click="selectGrid(Index)" class="fit flex flex-start rounded-borders"
              :class="[currentSection == Index ? ['bg-grey-5', 'active'] : 'bg-grey-3']">
              <span class="q-pa-xs">{{ Index + 1 }}</span>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
  </div>
  <layoutDialog />
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import layoutDialog from './dialog/LayoutDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()
const layoutStore = useLayoutStore()
const widgetListStore = useWidgetListStore()
const props = defineProps(['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth', 'isPortrait'])
const { viewRowCount, viewColCount, viewLayout, viewWidth } = toRefs(props)
const wrapperHeight = computed(() => {
  if (props.isPortrait) {
    return props.viewWidth * 800 / 600
  } else {
    return props.viewWidth * 1080 / 1920
  }
})
const rowHeight = computed(() => {
  if (props.isPortrait) {
    return (props.viewWidth * 800 / 600) / props.viewRowCount
  } else {
    return (props.viewWidth * 1080 / 1920) / props.viewRowCount
  }
})
const currentSection = computed(() => layoutStore.currentSection)

function showLayout() {
  $q.dialog({
    component: layoutDialog
  }).onOk(() => {
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

const selectGrid = (i) => {
  layoutStore.SetCurrentSection(i)
  widgetListStore.ResetWidgetListData()
}
</script>
<style lang="scss" scoped>
.gridItem:hover {
  cursor: pointer;
  outline: 2px solid $primary;
  border-radius: 4px;
}

.gridItem .active {
  cursor: pointer;
  outline: 2px solid $primary;
  border-radius: 4px;
}
</style>

<template>
  <div class="q-mx-sm">
    <q-item-label header class="q-pb-xs text-dark text-bold">Layout</q-item-label>
    <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
      :row-height="((viewWidth * 1400 / 1920) / viewRowCount) - 5" :is-draggable="false" :is-resizable="false"
      :vertical-compact="true" :margin="[5, 5]">
      <grid-item class="gridItem" static v-for="(item, Index) in viewLayout" :x="item.x" :y="item.y" :w="item.w"
        :h="item.h" :i="item.i" :key="item.i">
        <div @click="selectGrid(Index)" class="fit flex flex-center rounded-borders"
          :class="[currentSection == Index ? ['bg-grey-5', 'active'] : 'bg-grey-3']">
          {{ Index + 1 }}
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
const LayoutStore = useLayoutStore()
const props = defineProps(['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth'])
const { viewRowCount, viewColCount, viewLayout, viewWidth } = toRefs(props)

const currentSection = computed(() => LayoutStore.currentSection)
const selectGrid = (i) => {
  LayoutStore.SetCurrentSection(i)
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

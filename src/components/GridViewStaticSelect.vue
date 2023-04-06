<template>
  <div class="">
    <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
      :row-height="((viewWidth * 1400 / 1920) / viewRowCount) - 5" :is-draggable="false" :is-resizable="false"
      :vertical-compact="true" :margin="[5, 5]">
      <grid-item class="gridItem" static v-for="item in viewLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
        :i="item.i" :key="item.i">
        <div class="fit flex flex-center rounded-borders"
          :class="[item.selected ? ['bg-light-blue-2', 'active'] : 'bg-grey-3']">
          {{ item.i }}
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
// import { useLayoutStore } from 'src/stores/layout'
// const LayoutStore = useLayoutStore()
const props = defineProps(['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth'])
const { viewRowCount, viewColCount, viewLayout, viewWidth } = toRefs(props)

</script>
<style lang="scss" scoped>
.gridItem:hover {
  cursor: pointer;
  outline: 2px solid rgb(69, 195, 229);
  border-radius: 4px;
}

.gridItem .active {
  cursor: pointer;
  outline: 2px solid rgb(69, 195, 229);
  border-radius: 4px;
}
</style>

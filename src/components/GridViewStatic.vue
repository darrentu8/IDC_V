<template>
  <div class="static-grid-view-wrapper flex flex-center q-pa-xs">
    <div :style="{ width: isPortrait ? '40%' : '100%' }">
      <!-- <q-resize-observer @resize="onResize" /> -->
      <div class="" :style="{ width: `${viewWidth}px`, height: `${wrapperHeight}px` }">
        <grid-layout class="full-width" :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
          :row-height="rowHeight" :is-draggable="false" :is-resizable="false" :vertical-compact="true" :margin="[0, 0]">
          <grid-item static v-for="(item) in  viewLayout " :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
            :key="item.i">
            <div v-if="isCustom" class="fit">
              <div class="bg-grey-3 flex flex-center" :class="{ 'is-selected': selected }"
                style="width: calc(100% - 3px); height: calc(100% - 3px);border-radius: 2px;">
                <div v-if="!isCustom"></div>
              </div>
            </div>
            <div v-else class="fit">
              <div class="bg-grey-3 flex flex-center" :class="{ 'is-selected': selected }"
                style="width: calc(100% - 3px); height: calc(100% - 3px);border-radius: 2px;">
                <div v-if="!isCustom"></div>
              </div>
            </div>
          </grid-item>
          <div v-if="isCustom && !isPortrait" class="row flex flex-center full-width absolute"
            style="background-color: #FFFFFFB2;top: 33px;">
            <div>
              <q-icon name="edit" color="primary" size="sm" />
              <span> Customize </span>
            </div>
          </div>
          <div v-else-if="isCustom && isPortrait" class="row flex flex-center full-width absolute"
            style="background-color: #FFFFFFB2;top: 28px;">
            <div class="text-center">
              <div class="q-pt-md">
                <q-icon class="" name="edit" color="primary" size="sm" />
              </div>
              <p class="full-width"> Customize </p>
            </div>
          </div>
        </grid-layout>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth', 'selected', 'isCustom', 'isPortrait'])

// const onResize = size => {
//   const { width } = size
//   rowHeight.value = props.isPortrait.value ? width / 3 * 4 : width / 16 * 9
// }
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
</script>
<style lang="scss" scoped>
.static-grid-view-wrapper:hover {
  cursor: pointer;
}

.is-selected {
  background-color: $primary !important;
  color: white;
}
</style>

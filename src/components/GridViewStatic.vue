<template>
  <div class="static-grid-view-wrapper flex flex-center q-pa-xs">
    <div :style="{ width: `${viewWidth}px`, height: `${viewWidth * 1080 / 1920}px` }">
      <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
        :row-height="(viewWidth * 1080 / 1920) / viewRowCount" :is-draggable="false" :is-resizable="false"
        :vertical-compact="true" :margin="[0, 0]">
        <grid-item static v-for="(item, index) in viewLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
          :key="item.i">
          <div class="fit">
            <div class="bg-grey-3 rounded-borders  flex flex-center"
              style="width: calc(100% - 3px); height: calc(100% - 3px);">
              {{ index + 1 }}
            </div>
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridViewComponent',
  props: ['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth'],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.static-grid-view-wrapper:hover {
  cursor: pointer;
  outline: 1px solid #2B2B2B;
  border-radius: 10px;
}
</style>

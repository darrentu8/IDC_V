<template>
  <div class="static-grid-view-wrapper flex flex-center q-pa-xs">
    <div :style="{ width: `${viewWidth}px`, height: `${viewWidth * 1080 / 1920}px` }">
      <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
        :row-height="(viewWidth * 1080 / 1920) / viewRowCount" :is-draggable="false" :is-resizable="false"
        :vertical-compact="true" :margin="[0, 0]">
        <grid-item static v-for="(item, index) in viewLayout" :x="item._X" :y="item._Y" :w="item._Width" :h="item._Height"
          :i="item._Index" :key="item._Index">
          <div class="fit">
            <div class="bg-grey-3 flex flex-center" :class="{ 'is-selected': selected }"
              style="width: calc(100% - 3px); height: calc(100% - 3px);border-radius: 2px;">
              <div v-if="!isCustom"> {{ index + 1 }}</div>
            </div>
          </div>
        </grid-item>
        <div v-if="isCustom" class="row flex flex-center full-width absolute"
          style="background-color: #FFFFFFB2;top: 33px;">
          <div>
            <q-icon name="edit" color="primary" size="sm" />
            <span> Customize </span>
          </div>
        </div>
      </grid-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridViewComponent',
  props: ['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth', 'selected', 'isCustom'],
  data() {
    return {

    }
  },
  mounted() {
    console.log('this.viewLayout', this.viewLayout)
  },
  methods: {
  }
}
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

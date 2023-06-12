<template>
  <div class="column">
    <div class="col row overflow-hidden">
      <div class="q-pa-sm" style="width:550px">
        <q-scroll-area style="height: 400px; width: 100%;">
          <div class="row q-gutter-sm">
            <GridViewStatic :selected="isChooseCustom" :isCustom="true" @click="toCustomize"
              :view-layout="customGrid.layout" :view-row-count="customGrid.rowCount"
              :view-col-count="customGrid.columnCount" :view-width="isPortrait ? 100 : 160" :isPortrait="isPortrait" />
            <GridViewStatic :selected="!isChooseCustom && index === currentGridIndex" :isCustom="false"
              @click="chooseGrid(index, grid)"
              v-for="(grid, index) in isPortrait ? layoutTemplatesPortrait : layoutTemplates" :key="index"
              :view-layout="grid.layout" :view-row-count="grid.rowCount" :view-col-count="grid.columnCount"
              :view-width="isPortrait ? 100 : 160" :isPortrait="isPortrait" />
          </div>
        </q-scroll-area>
      </div>
      <div class="col q-pa-sm" style="width:500px">
        <div class="q-pt-sm" v-if="currentGrid">
          <div class="row">
            <div class="col-6">
              <div v-if="isPortrait" class="text-body2 q-pa-sm">
                Grids :
                {{ `(${currentGrid.columnCount} x ${currentGrid.rowCount})` }}
              </div>
              <div v-if="!isPortrait" class="text-body2 q-pa-sm">
                Grids :
                {{ `(${currentGrid.rowCount} x ${currentGrid.columnCount})` }}
              </div>
            </div>
            <div class="col-6">
              <div class="text-body2 q-pa-sm">Region size :
                <span v-if="currentCube">
                  {{ `(${currentCube.w} x ${currentCube.h})` }}
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="text-body2 q-pa-sm">Region location :
                <span v-if="currentCube">
                  {{ `(${currentCube.x} , ${currentCube.y})` }} -
                  {{ `(${currentCube.x + currentCube.w} , ${currentCube.y +
                    currentCube.h})` }}
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="text-body2 q-pa-sm">Dimension :
                <span v-if="currentCube && isPortrait">
                  {{ `(${(currentCube.w / currentGrid.columnCount *
                    1080).toFixed(0)}` }} x
                  {{ `${(currentCube.h / currentGrid.rowCount *
                    1920).toFixed(0)})` }}
                </span>
                <span v-if="currentCube && !isPortrait">
                  {{ `(${(currentCube.w / currentGrid.columnCount *
                    1920).toFixed(0)}` }} x
                  {{ `${(currentCube.h / currentGrid.rowCount *
                    1080).toFixed(0)})` }}
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="text-body2 q-pa-sm">Ratio :
                <span v-if="currentCube && isPortrait">
                  {{ `(${(currentCube.w / currentGrid.columnCount * 1080).toFixed(0)
                    /
                    getMaxCommonDivisorData((currentCube.w / currentGrid.columnCount *
                      1080).toFixed(0),
                      (currentCube.h
                        /
                        currentGrid.rowCount * 1920).toFixed(0))}` }} /
                  {{ `${(currentCube.h / currentGrid.rowCount * 1920).toFixed(0) /
                    getMaxCommonDivisorData((currentCube.w / currentGrid.columnCount *
                      1080).toFixed(0),
                      (currentCube.h
                        /
                        currentGrid.rowCount * 1920).toFixed(0))})` }}
                </span>
                <span v-if="currentCube && !isPortrait">
                  {{ `(${(currentCube.w / currentGrid.columnCount * 1920).toFixed(0)
                    /
                    getMaxCommonDivisorData((currentCube.w / currentGrid.columnCount *
                      1920).toFixed(0),
                      (currentCube.h
                        /
                        currentGrid.rowCount * 1080).toFixed(0))}` }} /
                  {{ `${(currentCube.h / currentGrid.rowCount * 1080).toFixed(0) /
                    getMaxCommonDivisorData((currentCube.w / currentGrid.columnCount *
                      1920).toFixed(0),
                      (currentCube.h
                        /
                        currentGrid.rowCount * 1080).toFixed(0))})` }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentGrid" class="q-pt-md flex flex-center">
          <div :style="{ width: isPortrait ? '164px' : '100%' }">
            <grid-layout :layout="currentGrid.layout" :col-num="currentGrid.columnCount" :maxRows="currentGrid.rowCount"
              :row-height="265 / currentGrid.rowCount" :is-draggable="false" :is-resizable="false"
              :vertical-compact="true" :margin="[0, 0]">
              <grid-item static v-for="(item, index) in currentGrid.layout" :x="item.x" :y="item.y" :w="item.w"
                :h="item.h" :i="item.i" :key="item.i">
                <div class="fit cursor-pointer" @click="chooseCube(item.i)">
                  <div class="Frounded-borders flex flex-start grid-cube bg-grey-3"
                    :class="{ 'selected-cube': currentCubeId === item.i }"
                    style="width: calc(100% - 3px); height: calc(100% - 3px);border-radius: 2px;">
                    <span class="q-pa-sm">{{ index + 1 }}</span>
                  </div>
                </div>
              </grid-item>
            </grid-layout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import GridViewStatic from 'src/components/GridViewStatic.vue'
import { useWidgetListStore } from 'src/stores/widget'
import { getMaxCommonDivisor } from 'src/js/math'
import { layoutTemplates, layoutTemplatesPortrait } from 'src/js/constant'

const emit = defineEmits(['setCustom', 'setCurrentCubeId', 'toPanel', 'currentGridIndex'])
const props = defineProps({
  layoutNumber: Number,
  currentGridIndex: Number,
  isChooseCustom: Boolean,
  customGrid: Object,
  currentGrid: Object,
  currentCubeId: String
})

const widgetStore = useWidgetListStore()

// const gridWidth = 160

const currentCube = computed(() => {
  return props.currentGrid.layout.find(o => o.i === props.currentCubeId)
})

const isPortrait = computed(() => widgetStore.GetIsPortrait)

function chooseGrid(index, grid) {
  const customData = {
    layoutNumber: index + 1,
    currentGrid: grid,
    currentGridIndex: index,
    currentCubeId: grid.layout[0].i,
    isChooseCustom: false,
    lock: false
  }
  emit('setCustom', customData)
}

function chooseCube(id) {
  emit('setCurrentCubeId', id)
}

function toCustomize() {
  emit('toPanel', 'customGrid')
}

function getMaxCommonDivisorData(n1, n2) {
  return getMaxCommonDivisor(n1, n2)
}
</script>

<style lang="scss" scoped>
.grid-cube:hover {
  filter: brightness(0.9)
}

.selected-cube {
  outline: 2px solid $primary;
}
</style>

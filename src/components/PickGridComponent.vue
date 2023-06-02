<template>
  <div class="column">
    <div class="col row overflow-hidden">
      <div class="q-pa-sm" style="width:550px">
        <q-scroll-area style="height: 400px; width: 100%;">
          <div class="row q-gutter-sm">
            <GridViewStatic :selected="isChooseCustom" :isCustom="true" @click="toCustomize"
              :view-layout="customGrid.layout" :view-row-count="customGrid.rowCount" :view-col-count="customGrid.colCount"
              :view-width="gridWidth" />
            <GridViewStatic :selected="!isChooseCustom && grid === currentGrid" :isCustom="false"
              @click="chooseGrid(index, grid)" v-for="(grid, index) in grids" :key="index" :view-layout="grid.layout"
              :view-row-count="grid.rowCount" :view-col-count="grid.colCount" :view-width="gridWidth" />
          </div>
        </q-scroll-area>
      </div>
      <div class="col q-pa-sm" style="width:500px">
        <div class="q-pt-sm" v-if="currentGrid">
          <div class="row">
            <div class="col-6">
              <div class="text-body2 q-pa-sm">
                Grids :
                {{ `(${currentGrid.rowCount} x ${currentGrid.colCount})` }}
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
                <span v-if="currentCube">
                  {{ `(${(currentCube.w / currentGrid.colCount *
                    1920).toFixed(0)}` }} x
                  {{ `${(currentCube.h / currentGrid.rowCount *
                    1080).toFixed(0)})` }}
                </span>
              </div>
            </div>
            <div class="col-6">
              <div class="text-body2 q-pa-sm">Ratio :
                <span v-if="currentCube">
                  {{ `(${(currentCube.w / currentGrid.colCount * 1920).toFixed(0)
                    /
                    getMaxCommonDivisor((currentCube.w / currentGrid.colCount *
                      1920).toFixed(0),
                      (currentCube.h
                        /
                        currentGrid.rowCount * 1080).toFixed(0))}` }} /
                  {{ `${(currentCube.h / currentGrid.rowCount * 1080).toFixed(0) /
                    getMaxCommonDivisor((currentCube.w / currentGrid.colCount *
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
          <div style="width:100%">
            <grid-layout :layout="currentGrid.layout" :col-num="currentGrid.colCount" :maxRows="currentGrid.rowCount"
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

<script>
import { uid } from 'quasar'
import GridViewStatic from 'src/components/GridViewStatic.vue'
import { getMaxCommonDivisor } from 'src/js/math'

export default {
  name: 'PickGrid',
  components: {
    GridViewStatic
  },
  props: [
    'layoutNumber',
    'isChooseCustom',
    'customGrid',
    'currentGrid',
    'currentCubeId'
  ],
  data() {
    return {
      grids: [
        {
          rowCount: 1,
          colCount: 1,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 1,
          colCount: 2,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 1,
          colCount: 3,
          layout: [{ x: 0, y: 0, w: 2, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 1,
          colCount: 3,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 1, i: uid() }]
        },
        {
          rowCount: 2,
          colCount: 1,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 1,
          colCount: 3,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 2,
          colCount: 6,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 5, h: 2, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 1, h: 3, i: uid() }, { x: 1, y: 0, w: 3, h: 3, i: uid() }, { x: 0, y: 2, w: 4, h: 1, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 3, i: uid() }, { x: 0, y: 2, w: 4, h: 1, i: uid() }]
        },
        {
          rowCount: 3,
          colCount: 3,
          layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 3, i: uid() }]
        },
        {
          rowCount: 3,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 2,
          colCount: 2,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 4, h: 3, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 4, h: 3, i: uid() }]
        },
        {
          rowCount: 2,
          colCount: 3,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 3,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 3, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 2, i: uid() }]
        },
        {
          rowCount: 3,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 2, h: 2, i: uid() }, { x: 2, y: 0, w: 2, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 3, h: 3, i: uid() }]
        },
        {
          rowCount: 4,
          colCount: 4,
          layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }]
        }
        // ,
        // {
        //   rowCount: 3,
        //   colCount: 3,
        //   layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }]
        // }
      ],
      gridWidth: 160
    }
  },
  computed: {
    currentCube() {
      return this.currentGrid.layout.find(o => o.i === this.currentCubeId)
    }
  },
  methods: {
    chooseGrid(index, grid) {
      const customData = {
        layoutNumber: index + 1,
        currentGrid: grid,
        currentCubeId: grid.layout[0].i,
        isChooseCustom: false,
        lock: false
      }
      this.$emit('setCustom', customData)
    },
    chooseCube(id) {
      this.$emit('setCurrentCubeId', id)
    },
    toCustomize() {
      this.$emit('toPanel', 'customGrid')
    },
    getMaxCommonDivisor(n1, n2) {
      return getMaxCommonDivisor(n1, n2)
    }
  }
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

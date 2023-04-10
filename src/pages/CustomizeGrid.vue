<template>
  <q-page class="flex flex-center overflow-hidden">
    <div class="column">
      <div class="row q-gutter-md">
        <q-input @update:model-value="changeRowCount" style="width:150px" outlined type="number" :min="1" :max="10"
          v-model.number="rowCount" label="row count" />
        <q-input @update:model-value="changeColCount" style="width:150px" outlined type="number" :min="1" :max="20"
          v-model.number="colCount" label="column count" />
        <q-btn outline @click="addGrid" color="primary" icon="add" label="Add Grid" />
      </div>
      <div class="row q-mt-lg q-mb-lg relative-position"
        :style="{ width: `${width}px`, height: `${width * 1080 / 1920}px` }">
        <div class="absolute fit column">
          <div class="col row" v-for="i in rowCount" :key="i">
            <div class="col" style="border: 1px solid lightgray;padding: 5px;" v-for="k in colCount" :key="k" />
          </div>
        </div>
        <grid-layout class="fit" v-model:layout="layout" :col-num="colCount" :maxRows="rowCount" :prevent-collision="true"
          :responsive="false" :vertical-compact="false" :row-height="((width * 1080 / 1920) / rowCount)" :margin="[0, 0]">
          <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
            <div class="fit flex flex-center">
              <div class="bg-grey-3 rounded-borders shadow-2"
                style="width: calc(100% - 10px); height: calc(100% - 10px);">
                <!-- <div class="text-subtitle1"> {{ item.i }}</div> -->
                <q-btn @click="removeGrid(item.i)" size="sm" class="float-right" flat round icon="close" />
              </div>
            </div>
          </grid-item>
        </grid-layout>
      </div>
      <div class="row reverse q-gutter-md">
        <q-btn outline @click="finishGrids" color="primary" label="Finish" />
        <q-btn outline @click="goBack" color="primary" label="Back" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'
const layoutStore = useLayoutStore()

const isCubeInGrid = (row, col, layout) => {
  let isCubeInGrid = false
  layout.forEach(grid => {
    if (col >= grid.x && col < (grid.x + grid.w) && row >= grid.y && row < (grid.y + grid.h)) {
      isCubeInGrid = true
    }
  })

  return isCubeInGrid
}

const fixOutsideGrid = (row, col, layout) => {
  const deleteArray = []
  layout.forEach(grid => {
    if (grid.x >= col || grid.y >= row) {
      deleteArray.push(grid)
    } else if (grid.x + grid.w > col) {
      grid.w = col - grid.x
    } else if (grid.y + grid.h > row) {
      grid.h = row - grid.y
    }
  })

  deleteArray.forEach(grid => {
    const index = layout.findIndex(o => o.i === grid.i)
    layout.splice(index, 1)
  })
}

export default {
  name: 'CustomizeGrid',
  data() {
    return {
      layout: [{ x: 0, y: 0, w: 5, h: 2, i: uid() }, { x: 0, y: 2, w: 5, h: 2, i: uid() }, { x: 5, y: 0, w: 5, h: 4, i: uid() }],
      rowCount: 4,
      colCount: 10,
      width: 800
    }
  },
  methods: {
    changeRowCount(val) {
      fixOutsideGrid(val, this.colCount, this.layout)
    },
    changeColCount(val) {
      fixOutsideGrid(this.rowCount, val, this.layout)
    },
    addGrid() {
      for (let row = 0; row < this.rowCount; ++row) {
        for (let col = 0; col < this.colCount; ++col) {
          if (!isCubeInGrid(row, col, this.layout)) {
            this.layout.push({
              x: col,
              y: row,
              w: 1,
              h: 1,
              i: uid()
            })
            return
          }
        }
      }
    },
    removeGrid(i) {
      const index = this.layout.findIndex(o => o.i === i)
      this.layout.splice(index, 1)
    },
    goBack() {
      this.$router.push({ path: '/grid' })
    },
    finishGrids() {
      console.log('this.layout', this.layout)
      layoutStore.SetLayout(this.layout)
      this.$router.push({ path: '/flow' })
    }
  }
}
</script>
<style lang="scss"></style>

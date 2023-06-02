<template>
  <div class="column">
    <div class="row" style="height:30px">
      <div class="text-body1 text-bold" style="margin:auto 20px">Select layout | Customize</div>
    </div>
    <div class="row">
      <div style="width:300px">
        <div class="row q-pa-sm">
          <div class="q-pa-sm" style="width:120px"> Row Count:</div>
          <div class="col">
            <q-input class="brand-round-m" @update:model-value="changeRowCount" dense outlined type="number" :min="1"
              :max="10" v-model.number="grid.rowCount" />
          </div>
        </div>
        <div class="row q-pa-sm">
          <div class="q-pa-sm" style="width:120px"> Column Count:</div>
          <div class="col">
            <q-input class="brand-round-m" @update:model-value="changeColCount" dense outlined type="number" :min="1"
              :max="20" v-model.number="grid.colCount" />
          </div>
        </div>
        <div class="row q-pa-sm">
          <q-btn class="brand-round-l text-capitalize" @click="addGrid" color="primary" icon="add" label="Add Grid" />
        </div>
      </div>
      <q-separator vertical class="q-ma-md" />
      <div class="col">
        <div class="row relative-position overflow-hidden"
          :style="{ width: `${width}px`, height: `${width * 1080 / 1920}px` }">
          <div class="absolute fit column">
            <div class="col row" v-for="i in grid.rowCount" :key="i">
              <div class="col" style="border: 1px solid lightgray;padding: 5px;" v-for="k in grid.colCount" :key="k" />
            </div>
          </div>
          <grid-layout class="fit" v-model:layout="grid.layout" :col-num="grid.colCount" :maxRows="grid.rowCount"
            :prevent-collision="true" :responsive="false" :vertical-compact="false"
            :row-height="((width * 1080 / 1920) / grid.rowCount)" :margin="[0, 0]">
            <grid-item v-for="(item, index) in grid.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
              :key="item.i">
              <div class="fit flex flex-center">
                <div class="bg-grey-3 rounded-borders shadow-2 flex flex-center"
                  style="width: calc(100% - 10px); height: calc(100% - 10px);">
                  <div class="text-subtitle2 text-center"> {{ index + 1 }}</div>
                  <q-btn @click="removeGrid(item.i)" size="sm" flat round icon="close" class="absolute-top-right" />
                </div>
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uid } from 'quasar'

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
      grid: {
        rowCount: 4,
        colCount: 10,
        layout: [{ x: 0, y: 0, w: 5, h: 2, i: uid() }, { x: 0, y: 2, w: 5, h: 2, i: uid() }, { x: 5, y: 0, w: 5, h: 4, i: uid() }]
      },
      width: 700
    }
  },
  methods: {
    changeRowCount(val) {
      fixOutsideGrid(val, this.grid.colCount, this.grid.layout)
    },
    changeColCount(val) {
      fixOutsideGrid(this.grid.rowCount, val, this.grid.layout)
    },
    addGrid() {
      for (let row = 0; row < this.grid.rowCount; ++row) {
        for (let col = 0; col < this.grid.colCount; ++col) {
          if (!isCubeInGrid(row, col, this.grid.layout)) {
            this.grid.layout.push({
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
      const index = this.grid.layout.findIndex(o => o.i === i)
      this.grid.layout.splice(index, 1)
    }
  }
}
</script>
<style lang="scss"></style>

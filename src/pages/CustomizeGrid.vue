<template>
  <q-page class="flex flex-center overflow-hidden">
    <div class="column">
      <div class="row">
        <div class="q-pa-sm" style="margin: auto;"> Row Count:</div>
        <div style="margin: auto">
          <q-input @update:model-value="changeRowCount" dense style="width:150px" outlined type="number" :min="1"
            :max="10" v-model.number="grid.rowCount" />
        </div>
        <div class="q-pa-sm" style="margin: auto;"> Column Count:</div>
        <div style="margin: auto">
          <q-input @update:model-value="changeColCount" dense style="width:150px" outlined type="number" :min="1"
            :max="20" v-model.number="grid.colCount" />
        </div>
        <div class="col"></div>
        <div class="q-pa-sm" style="margin: auto">
          <q-btn @click="addGrid" color="primary" icon="add" label="Add Grid" />
        </div>
      </div>
      <div class="row q-mt-md q-mb-md relative-position"
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
      <div class="row">
        <q-btn @click="goBack" color="primary" label="Back" />
        <q-space />
        <q-btn @click="finishGrids" color="primary" label="Finish" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'

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
      width: 800
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
    },
    goBack() {
      this.$router.push({ path: '/grid' })
    },
    finishGrids() {
      const layoutStore = useLayoutStore()
      layoutStore.SetLayout(this.grid)

      this.$router.push({ path: '/flow' })
    }
  }
}
</script>
<style lang="scss"></style>

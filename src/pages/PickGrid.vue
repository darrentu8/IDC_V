<template>
  <q-page class="flex flex-center" style="min-width: 1200px;">
    <div class="column">
      <div class="flex flex-center">
        <q-stepper :model-value="2" :bordered="false" flat alternative-labels color="primary"
          style="background-color: transparent;width: 800px;">
          <q-step :name="1" prefix="1" title="Enter playlist name" :done="true" />
          <q-step :name="2" prefix="2" title="Select layout" />
          <q-step :name="3" prefix="3" title="Configure Event/Action" />
        </q-stepper>
      </div>
      <div class="col">
        <q-card class="bg-white text-black brand-round-l q-pa-lg q-mb-lg"
          style="width:1100px;margin-top: -50px;height: 550px;">
          <q-tab-panels v-model="panel" keep-alive animated>
            <q-tab-panel name="pickGrid" class="q-pa-none">
              <div class="column">
                <div class="row" style="height:30px">
                  <div class="text-body1 text-bold" style="margin:auto 20px">Select layout </div>
                </div>
                <div class="col row overflow-hidden">
                  <div class="q-pa-sm" style="width:550px">
                    <q-scroll-area style="height: 400px; width: 100%;">
                      <div class="row q-gutter-sm">
                        <GridViewStatic :selected="isChooseCustom" :isCustom="true" @click="toCustomize"
                          :view-layout="customGrid.Section" :view-row-count="customGrid._Row"
                          :view-col-count="customGrid._Column" :view-width="gridWidth" />
                        <GridViewStatic :selected="!isChooseCustom && grid === currentGrid" :isCustom="false"
                          @click="chooseGrid(grid)" v-for="(grid, index) in grids" :key="index"
                          :view-layout="grid.Section" :view-row-count="grid._Row" :view-col-count="grid._Column"
                          :view-width="gridWidth" />
                      </div>
                    </q-scroll-area>
                  </div>
                  <div class="col q-pa-sm" style="width:500px">
                    <div class="q-pt-sm" v-if="currentGrid">
                      <div class="row">
                        <div class="col-6">
                          <div class="text-body2 q-pa-sm">
                            Grids :
                            {{ `(${currentGrid._Row} x ${currentGrid._Column})` }}
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="text-body2 q-pa-sm">Region size :
                            <span v-if="currentCube">
                              {{ `(${currentCube._Width} x ${currentCube._Height})` }}
                            </span>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="text-body2 q-pa-sm">Region location :
                            <span v-if="currentCube">
                              {{ `(${currentCube._X} , ${currentCube._Y})` }} -
                              {{ `(${currentCube._X + currentCube._Width} , ${currentCube._Y +
                                currentCube._Height})` }}
                            </span>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="text-body2 q-pa-sm">Dimension :
                            <span v-if="currentCube">
                              {{ `(${(currentCube._Width / currentGrid._Column *
                                1920).toFixed(0)}` }} x
                              {{ `${(currentCube._Height / currentGrid._Row *
                                1080).toFixed(0)})` }}
                            </span>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="text-body2 q-pa-sm">Ratio :
                            <span v-if="currentCube">
                              {{ `(${(currentCube._Width / currentGrid._Column * 1920).toFixed(0)
                                /
                                getMaxCommonDivisor((currentCube._Width / currentGrid._Column *
                                  1920).toFixed(0),
                                  (currentCube._Height
                                    /
                                    currentGrid._Row * 1080).toFixed(0))}` }} /
                              {{ `${(currentCube._Height / currentGrid._Row * 1080).toFixed(0) /
                                getMaxCommonDivisor((currentCube._Width / currentGrid._Column *
                                  1920).toFixed(0),
                                  (currentCube._Height
                                    /
                                    currentGrid._Row * 1080).toFixed(0))})` }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="currentGrid" class="q-pt-md flex flex-center">
                      <div style="width:100%">
                        <grid-layout :layout="currentGrid.Section" :col-num="currentGrid._Column"
                          :maxRows="currentGrid._Row" :row-height="265 / currentGrid._Row" :is-draggable="false"
                          :is-resizable="false" :vertical-compact="true" :margin="[0, 0]">
                          <grid-item static v-for="(item, index) in currentGrid.Section" :x="item._X" :y="item._Y"
                            :w="item._Width" :h="item._Height" :i="item._Index" :key="item._Index">
                            <div class="fit cursor-pointer" @click="chooseCube(item._Index)">
                              <div class="Frounded-borders flex flex-center grid-cube bg-grey-3"
                                :class="{ 'selected-cube': currentCubeId === item._Index }"
                                style="width: calc(100% - 3px); height: calc(100% - 3px);border-radius: 2px;">
                                {{ index + 1 }}
                              </div>
                            </div>
                          </grid-item>
                        </grid-layout>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="customGrid" class="q-pa-none">
              <CustomizeGrid ref="customGrid" />
            </q-tab-panel>
          </q-tab-panels>

          <q-card-actions v-show="panel === 'pickGrid'" class="q-pb-lg absolute-bottom">
            <q-btn class="brand-round-l text-capitalize" @click="toNew" style="width:116px;margin:auto 20px" color="grey"
              label="Back" outline="" icon="arrow_back" />
            <q-space />
            <q-btn :disable="lock" class="brand-round-l text-capitalize" @click="toHardware"
              style="width:116px;margin:auto 20px" color="primary" label="Next" icon="arrow_forward" />
          </q-card-actions>

          <q-card-actions v-show="panel === 'customGrid'" class="q-pb-lg absolute-bottom">
            <q-btn class="brand-round-l text-capitalize" @click="toPickGrid" style="width:116px;margin:auto 20px"
              color="grey" label="Back" outline="" icon="arrow_back" />
            <q-space />
            <q-btn class="brand-round-l text-capitalize" @click="saveCustom" style="width:116px;margin:auto 20px"
              color="primary" label="Save" icon="check" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
import { defTemplateLandscape } from '../components/widget/OnLineEditor'
import GridViewStatic from 'src/components/GridViewStatic.vue'
import CustomizeGrid from 'src/pages/CustomizeGrid.vue'
import { useLayoutStore } from 'src/stores/layout'
import { getMaxCommonDivisor } from 'src/helper/math'

export default {
  name: 'PickGrid',
  components: {
    GridViewStatic,
    CustomizeGrid
  },
  data() {
    return {
      panel: 'pickGrid',
      customGrid: {
        _Row: 1,
        _Column: 1,
        Section: [{ _X: 0, _Y: 0, _Width: 1, _Height: 1, _Index: uid() }]
      },
      isChooseCustom: false,
      grids: defTemplateLandscape,
      gridWidth: 160,
      currentGrid: null,
      layoutNumber: '',
      currentCubeId: null,
      lock: true
    }
  },
  computed: {
    currentCube() {
      return this.currentGrid.Section.find(o => o._Index === this.currentCubeId)
    }
  },
  methods: {
    chooseGrid(grid) {
      this.layoutNumber = grid._Layout
      this.currentGrid = grid
      this.currentCubeId = grid.Section[0]._Index
      this.isChooseCustom = false
      this.lock = false
    },
    chooseCube(id) {
      this.currentCubeId = id
    },
    toNew() {
      this.$router.push({ path: '/new' })
    },
    toFlow() {
      const layoutStore = useLayoutStore()
      layoutStore.SetLayout(this.currentGrid)

      this.$router.push({ path: '/flow' })
    },
    toHardware() {
      const layoutStore = useLayoutStore()
      layoutStore.SetLayout(this.currentGrid)

      this.$router.push({ path: '/hardware' })
    },
    toPickGrid() {
      this.panel = 'pickGrid'
    },
    toCustomize() {
      this.panel = 'customGrid'
    },
    saveCustom() {
      const customGrid = this.$refs.customGrid.grid

      this.toPickGrid()
      this.customGrid = customGrid
      this.currentGrid = customGrid
      this.currentCubeId = customGrid.Section[0]._Index
      this.isChooseCustom = true
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

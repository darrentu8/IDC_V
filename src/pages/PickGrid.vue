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
              <div class="row" style="height:30px">
                <div class="text-body1 text-bold" style="margin:auto 20px">Select layout </div>
              </div>
              <PickGridComponent ref="pickGrid" :customGrid="customGrid" :isChooseCustom="isChooseCustom"
                :currentGrid="currentGrid" :layoutNumber="layoutNumber" :currentGridIndex="currentGridIndex"
                :currentCubeId="currentCubeId" @toPanel="toPanel" @setCustom="setCustom"
                @setCurrentCubeId="setCurrentCubeId" />
            </q-tab-panel>
            <q-tab-panel name="customGrid" class="q-pa-none">
              <CustomizeGridComponent ref="customGrid" />
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
import PickGridComponent from 'src/components/PickGridComponent.vue'
import CustomizeGridComponent from 'src/components/CustomizeGridComponent.vue'
import { useLayoutStore } from 'src/stores/layout'
import { getMaxCommonDivisor } from 'src/js/math'

export default {
  name: 'PickGrid',
  components: {
    PickGridComponent,
    CustomizeGridComponent
  },
  data() {
    return {
      panel: 'pickGrid',
      customGrid: {
        rowCount: 1,
        colCount: 1,
        layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
      },
      isChooseCustom: false,
      currentGrid: null,
      currentGridIndex: null,
      layoutNumber: 0,
      currentCubeId: null,
      lock: true
    }
  },
  computed: {
    currentCube() {
      return this.currentGrid.layout.find(o => o.i === this.currentCubeId)
    }
  },
  methods: {
    toNew() {
      this.$router.push({ path: '/new' })
    },
    toHardware() {
      const layoutStore = useLayoutStore()
      if (this.isChooseCustom) {
        layoutStore.SetLayout('@Frame Designer@', this.currentGrid)
      } else {
        layoutStore.SetLayout('Landscape' + ' ' + this.layoutNumber, this.currentGrid)
      }

      this.$router.push({ path: '/hardware' })
    },
    toPickGrid() {
      this.panel = 'pickGrid'
    },
    toPanel(val) {
      this.panel = val
    },
    setCustom(customData) {
      this.layoutNumber = customData.layoutNumber
      this.currentGrid = customData.currentGrid
      this.currentCubeId = customData.currentCubeId
      this.currentGridIndex = customData.currentGridIndex
      this.isChooseCustom = customData.isChooseCustom
      this.lock = customData.lock
    },
    setCurrentCubeId(val) {
      this.currentCubeId = val
    },
    saveCustom() {
      const customGrid = this.$refs.customGrid.grid
      console.log('customGrid', customGrid)
      this.customGrid = customGrid
      this.currentGrid = customGrid
      this.currentCubeId = customGrid.layout[0].i
      this.isChooseCustom = true
      this.lock = false
      this.toPickGrid()
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

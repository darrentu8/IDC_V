<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="bg-white text-black brand-round-l q-pa-lg" style="min-width: 1200px;height:60vh;min-height:580px;">
      <q-bar class="row bg-white text-bold q-mb-md" style="font-size:20px;">
        Select layout
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <div class="col">
        <q-tab-panels v-model="panel" keep-alive animated>
          <q-tab-panel name="pickGrid" class="q-pa-none">
            <PickGridComponent ref="pickGrid" :customGrid="customGrid" :isChooseCustom="isChooseCustom"
              :currentGrid="currentGrid" :currentGridIndex='currentGridIndex' :layoutNumber="layoutNumber"
              :currentCubeId="currentCubeId" @toPanel="toPanel" @setCustom="setCustom"
              @setCurrentCubeId="setCurrentCubeId" />
          </q-tab-panel>
          <q-tab-panel name="customGrid" class="q-pa-none">
            <CustomizeGridComponent ref="customGrid" />
          </q-tab-panel>
        </q-tab-panels>

        <q-card-actions v-show="panel === 'customGrid'" class="q-pb-lg absolute-bottom">
          <q-btn class="brand-round-l text-capitalize" @click="toPickGrid" style="width:116px;margin:auto 20px"
            color="grey" label="Back" outline="" icon="arrow_back" />
          <q-space />
          <q-btn class="brand-round-l text-capitalize" @click="saveCustom" style="width:116px;margin:auto 20px"
            color="primary" label="Save" icon="check" />
        </q-card-actions>
      </div>
      <q-card-actions v-show="panel !== 'customGrid'" class="q-pb-lg absolute-bottom">
        <q-space />
        <q-btn :disable="lock" color="primary" label="Apply" class="brand-round-l text-capitalize"
          style="width:116px;margin:auto 20px" icon="check" @click="apply" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { uid } from 'quasar'
import { useWidgetListStore } from 'src/stores/widget'
import PickGridComponent from 'src/components/PickGridComponent.vue'
import CustomizeGridComponent from 'src/components/CustomizeGridComponent.vue'
import { useLayoutStore } from 'src/stores/layout'
import { getMaxCommonDivisor } from 'src/js/math'
const widgetStore = useWidgetListStore()

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
        columnCount: 1,
        layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
      },
      isChooseCustom: false,
      currentGrid: null,
      layoutNumber: 0,
      currentGridIndex: null,
      currentCubeId: null,
      lock: true
    }
  },
  computed: {
    currentCube() {
      return this.currentGrid.layout.find(o => o.i === this.currentCubeId)
    },
    isLandscape() {
      return widgetStore.GetIsLandscape
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    toFlow() {
      this.$router.push({ path: '/flow' })
    },
    toNew() {
      this.$router.push({ path: '/new' })
    },
    apply() {
      const layoutStore = useLayoutStore()
      if (this.isChooseCustom) {
        layoutStore.SetLayout('@Frame Designer@', this.currentGrid)
      } else {
        layoutStore.SetLayout((this.isLandscape ? 'Landscape' : 'Portrait') + ' ' + this.layoutNumber, this.currentGrid)
      }
      this.hide()
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

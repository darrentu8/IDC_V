<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="flex flex-center">
        <q-stepper :model-value="1" alternative-labels color="primary" :bordered="false" flat
          style="background-color: transparent;width: 800px">
          <q-step :name="1" prefix="1" title="Define the name" />
          <q-step :name="2" prefix="2" title="Select layout" />
          <q-step :name="3" prefix="3" title="Hardware configuration" />
        </q-stepper>
      </div>
      <div class="col flex flex-center">
        <q-card class="bg-white text-black brand-round-l q-pa-lg" style="width:550px;margin-top: -50px;height:550px">
          <q-card-section>
            <div class="column">
              <div class="col">
                <div class="text-h5 text-bold">New playlist</div>
              </div>
              <div class="col q-mt-sm">
                <div class="text-body1">Play List Name</div>
                <q-input v-model="description" standout="bg-primary text-white" rounded dense />
              </div>
              <div class="col q-mt-sm">
                <div class="text-body1">Play List Description</div>
                <q-input v-model="description" type="textarea" standout="bg-primary text-white" rounded dense />
              </div>
              <div class="col row q-mt-md">
                <div class="col">
                  <div class="text-body2 text-bold">Device Model</div>
                  <div class="text-body2 q-mt-sm">{{ deviceType }}</div>
                </div>
                <div class="col">
                  <div class="text-body2 text-bold">Screen Orientation</div>
                  <div class="text-body2 q-mt-sm">Landscape</div>
                </div>
              </div>
              <div class="col" v-show="false">
                <div class="row">
                  <div class="col">
                    <q-btn @click="loadJSONTest" color="grey-3" text-color="black" label="Load JSON Test"
                      style="width: 140px;border-radius: 10px;" />
                  </div>
                  <div class="col">
                    <q-btn @click="loadXMLTest" color="grey-3" text-color="black" label="Load XML Test"
                      style="width: 140px;border-radius: 10px;" />
                  </div>
                  <div class="col">
                    <q-btn @click="exportFile" color="grey-3" text-color="black" label="Export XML Test"
                      style="width: 140px;border-radius: 10px;" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-pb-lg absolute-bottom">
            <q-space />
            <q-btn class="brand-round-l text-capitalize" @click="toGrid" style="width:116px" color="primary" label="Next"
              icon="arrow_forward" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <!-- <SourceManager /> -->
  </q-page>
</template>

<script>
// import SourceManager from 'src/components/SourceManager.vue'
import { useNovoDSStore } from 'src/stores/NovoDS'
const NovoDSStore = useNovoDSStore()

export default {
  name: 'StartNew',
  components: {
    // SourceManager
  },
  data() {
    return {

    }
  },
  computed: {
    description: {
      get() {
        return NovoDSStore.NovoDS.$.Description
      },
      set(val) {
        NovoDSStore.NovoDS.$.Description = val
      }
    },
    deviceType() {
      return NovoDSStore.NovoDS.$.Model_Type
    }
  },
  methods: {
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    loadJSONTest() {
      const testFileString = window.myAPI.loadJSONTest()
      alert(testFileString)
    },
    loadXMLTest() {
      const textXMLString = window.myAPI.loadXMLTest()
      textXMLString.then(data => {
        console.log(data, JSON.stringify(data))
      })
    },
    exportFile() {
      NovoDSStore.WriteToXml()
    }
  }
}
</script>
<style lang="scss" scoped></style>

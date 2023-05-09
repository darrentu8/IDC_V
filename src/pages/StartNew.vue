<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="flex flex-center">
        <q-stepper :model-value="1" alternative-labels color="primary" :bordered="false" flat
          style="background-color: transparent;width: 800px">
          <q-step :name="1" prefix="1" title="Enter playlist name" />
          <q-step :name="2" prefix="2" title="Select layout" />
          <q-step :name="3" prefix="3" title="Configure hardware" />
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
                <q-input v-model="_Playlist_Name" placeholder="Enter playlist name" class="brand-round-s input-border"
                  bg-color="grey-2" dense outlined>
                </q-input>
              </div>
              <div class="col q-mt-sm">
                <div class="text-body1">Playlist Description (Optional)</div>
                <q-input v-model="_Description" type="textarea" placeholder="Enter playlist description"
                  class="brand-round-s input-border" bg-color="grey-2" dense outlined>
                </q-input>
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
          <q-card-actions class="q-pb-lg q-mr-lg absolute-bottom">
            <q-space />
            <q-btn :disable="!_Playlist_Name" class="brand-round-l text-capitalize" @click="toGrid" style="width:116px"
              color="primary" label="Next" icon="arrow_forward" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <!-- <SourceManager /> -->
  </q-page>
</template>

<script>
import { useLayoutStore } from 'src/stores/layout'
const layoutStore = useLayoutStore()

export default {
  name: 'StartNew',
  components: {
  },
  data() {
    return {

    }
  },
  computed: {
    _Playlist_Name: {
      get() {
        return layoutStore.NovoDS._Playlist_Name
      },
      set(val) {
        layoutStore.NovoDS._Playlist_Name = val
      }
    },
    _Description: {
      get() {
        return layoutStore.NovoDS._Description
      },
      set(val) {
        layoutStore.NovoDS._Description = val
      }
    },
    deviceType: {
      get() {
        return layoutStore.NovoDS._Model_Type
      },
      set(val) {
        layoutStore.NovoDS._Model_Type = val
      }
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
      layoutStore.WriteToXml()
    }
  }
}
</script>
<style lang="scss" scoped></style>

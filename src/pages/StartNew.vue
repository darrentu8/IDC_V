<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="flex flex-center">
        <q-stepper :model-value="1" alternative-labels color="primary" :bordered="false" flat
          style="background-color: transparent;width: 800px">
          <q-step :name="1" prefix="1" title="Enter playlist name" />
          <q-step :name="2" prefix="2" title="Select layout" />
          <q-step :name="3" prefix="3" title="Configure Event/Action" />
        </q-stepper>
      </div>
      <div class="col flex flex-center">
        <q-card class="bg-white text-black brand-round-l q-pa-lg q-mb-lg"
          style="width:550px;margin-top: -50px;height:550px">
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
                    <q-btn @click="loadXMLTest" color="grey-3" text-color="black" label="Load XML Test"
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
import useQuasar from 'quasar/src/composables/use-quasar.js'
import { useWidgetListStore } from 'src/stores/widget'
import { useRouter } from 'vue-router'
const widgetStore = useWidgetListStore()

export default {
  name: 'StartNew',
  components: {
  },
  data() {
    return {

    }
  },
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    function loadXMLTest() {
      const textXMLString = window.myAPI.loadXMLTest()
      console.log('textXMLString', textXMLString)
      const setData = widgetStore.SetNovoDS(textXMLString)
      if (setData) {
        router.push({ path: '/flow' })
      } else {
        $q.dialog({
          title: 'Ｆile format error',
          okBtn: 'ok'
        }).onOk(() => {
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
      }
    }
    return { loadXMLTest }
  },
  computed: {
    _Playlist_Name: {
      get() {
        return widgetStore.NovoDS._Playlist_Name
      },
      set(val) {
        widgetStore.NovoDS._Playlist_Name = val
      }
    },
    _Description: {
      get() {
        return widgetStore.NovoDS._Description
      },
      set(val) {
        widgetStore.NovoDS._Description = val
      }
    },
    deviceType: {
      get() {
        return widgetStore.NovoDS._Model_Type
      },
      set(val) {
        widgetStore.NovoDS._Model_Type = val
      }
    }
  },
  mounted() {
    // this.getFilePath()
  },
  methods: {
    getFilePath() {
      widgetStore.SetFilePath()
    },
    toGrid() {
      this.$router.push({ path: '/grid' })
    }
  }
}
</script>
<style lang="scss" scoped></style>

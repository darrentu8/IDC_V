<template>
  <q-page class="flex flex-center">
    <div class="column" style="width:768px">
      <div class="col">
        <div class="text-body1 text-bold">New playlist</div>
      </div>
      <div class="col q-mt-sm">
        <div class="text-body1">Play List Name</div>
        <q-input outlined dense square />
      </div>
      <div class="col q-mt-sm">
        <div class="text-body1">Play List Description</div>
        <q-input v-model="description" type="textarea" outlined dense square />
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
      <div class="col flex flex-center q-mt-lg">
        <q-btn @click="toGrid" style="width:116px" color="primary" label="Next" />
      </div>
      <div class="col" v-show="false">
        <div class="column q-gutter-md">
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
  </q-page>
</template>

<script>

import { useNovoDSStore } from 'src/stores/NovoDS'
const NovoDSStore = useNovoDSStore()

export default {
  name: 'StartNew',
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

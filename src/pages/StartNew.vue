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
        <q-input type="textarea" outlined dense square />
      </div>
      <div class="col row q-mt-md">
        <div class="col">
          <div class="text-body2 text-bold">Device Model</div>
          <div class="text-body2 q-mt-sm">DS310</div>
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
            <q-btn to="/grid" color="grey-3" text-color="black" label="New" style="width: 140px;border-radius: 10px;" />
          </div>
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

let testFileData = null

export default {
  name: 'StartNew',
  data() {
    return {

    }
  },
  methods: {
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    loadJSONTest() {
      const testFileString = window.myAPI.loadJSONTest()
      alert(testFileString)
      testFileData = JSON.parse(testFileString)
    },
    loadXMLTest() {
      const textXMLString = window.myAPI.loadXMLTest()
      textXMLString.then(data => {
        alert(JSON.stringify(data))
      })
    },
    exportFile() {
      const xmlFileString = window.myAPI.exportXmlFile(testFileData, 'TestPlayList')
      alert(xmlFileString)
    }
  }
}
</script>
<style lang="scss" scoped></style>

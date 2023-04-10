<template>
  <q-page class="flex flex-center">
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

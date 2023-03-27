<template>
  <q-page class="flex flex-center">
    <div class="column q-gutter-md">
      <div class="col">
        <q-btn to="/grid" color="grey-3" text-color="black" label="New" style="width: 140px;border-radius: 10px;" />
      </div>
      <div class="col">
        <q-btn @click="loadFileTest" color="grey-3" text-color="black" label="Load File Test"
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
    loadFileTest() {
      const testFileString = window.myAPI.loadFileTest()
      alert(testFileString)
      testFileData = JSON.parse(testFileString)
    },
    exportFile() {
      const xmlFileString = window.myAPI.exportXmlFile(testFileData)
      alert(xmlFileString)
    }
  }
}
</script>
<style lang="scss" scoped></style>

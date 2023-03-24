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
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'StartNew',
  data() {
    return {

    }
  },
  methods: {
    loadFileTest() {
      const testFile = window.myAPI.loadFileTest()
      alert(testFile)
    }
  }
}
</script>
<style lang="scss" scoped></style>

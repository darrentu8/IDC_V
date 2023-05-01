<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="shadow-1">
      <q-bar class="q-electron-drag text-black" style="border-bottom: 1px solid #f1f1f1;background-color: #f8f8f8">
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
      <q-toolbar class="q-px-lg q-py-md" style="background-color: #fff;">
        <img :src="logo" style="height:30px" />
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container style="background-color: #F5F5F5;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import logoSVG from '../assets/logo.svg'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
    const logo = ref(logoSVG)

    function minimize() {
      window.myAPI?.minimize()
    }

    function toggleMaximize() {
      window.myAPI?.toggleMaximize()
    }

    function closeApp() {
      window.myAPI?.close()
    }

    return { logo, minimize, toggleMaximize, closeApp }
  }
})
</script>
<style lang="scss" scoped></style>

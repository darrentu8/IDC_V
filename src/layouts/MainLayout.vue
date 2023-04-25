<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-bar class="q-electron-drag text-black" style="background: #F5F5F5;">
        <img :src="logo" style="height:30px" />
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
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

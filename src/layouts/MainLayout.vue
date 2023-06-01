<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="">
      <q-bar class="q-electron-drag text-black" style="border-bottom: 1px solid #f1f1f1;background-color: #f8f8f8">
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
      <q-toolbar class="q-px-lg q-py-md" style="background-color: #f5f5f5;">
        <img class="cursor-pointer" :src="logo" style="height:30px" @click="$router.push({ path: '/new' })" />
        <span class="ver">{{ appVersion }}</span>
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
import { useWidgetListStore } from 'src/stores/widget'
import { version } from '../../package.json'
import logoSVG from '../assets/logo.svg'

const widgetStore = useWidgetListStore()
export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  data: () => ({ appVersion: version }),
  setup() {
    const logo = ref(logoSVG)

    function minimize() {
      window.myAPI?.minimize()
    }

    function toggleMaximize() {
      window.myAPI?.toggleMaximize()
    }

    function closeApp() {
      window.myAPI.delTempFolderWithClose(widgetStore.nowPlayListPath)
    }

    return { logo, minimize, toggleMaximize, closeApp }
  }
})
</script>
<style lang="scss" scoped></style>

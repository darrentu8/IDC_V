<template>
  <q-layout view="hHh LpR lFf">
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
        <q-btn class="" unelevated rounded color="" text-color="grey-9" size="md" @click="showPageSettings()">
          <q-icon class="q-mr-xs" name="img:/icon/settings.svg" color="" size="xs" />
          Page Settings
        </q-btn>
        <q-btn class="" unelevated rounded color="" text-color="grey-9" size="md" @click="showHardware()">
          <q-icon class="q-mr-xs" name="img:/icon/adjustments.svg" color="white" size="xs" />
          Hardware Configurator
        </q-btn>
        <q-separator vertical class="q-mx-md" />
        <q-btn class="" unelevated color="primary" rounded size="md" @click="backToGrid()">
          <q-icon class="q-mr-xs" name="img:/icon/fast-forward.svg" color="white" size="xs" />
          Preview
        </q-btn>
        <q-btn class="q-ml-md" unelevated color="primary" rounded size="md" @click="exportXmlFile()">
          <q-icon class="q-mr-xs" name="img:/icon/save.svg" color="white" size="xs" />
          Save
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered show-if-above :width="300" :breakpoint="400"
      style="background-color: #f8f8f8;">
      <LeftSideBar />
    </q-drawer>

    <q-page-container style="background-color: #f1f1f1;">
      <router-view />
    </q-page-container>
    <q-drawer v-model="rightDrawerOpen" side="right" bordered class="" :width="200" :breakpoint="400"
      style="background-color: #f8f8f8;">
      <RightSideBar />
    </q-drawer>
    <PlaylistSettingsDialog />
    <ConfigureHardwareDialog />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import X2js from 'x2js'
import PlaylistSettingsDialog from 'src/components/dialog/PlaylistSettingsDialog.vue'
import ConfigureHardwareDialog from 'src/components/dialog/ConfigureHardwareDialog.vue'
import LeftSideBar from 'src/components/LeftSideBar.vue'
import RightSideBar from 'src/components/RightSideBar.vue'
import logoSVG from '../assets/logo.svg'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()

const logo = ref(logoSVG)
// const router = useRouter()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
function minimize() {
  window.myAPI?.minimize()
}

function toggleMaximize() {
  window.myAPI?.toggleMaximize()
}

function closeApp() {
  window.myAPI?.close()
}

function showPageSettings() {
  $q.dialog({
    component: PlaylistSettingsDialog
  }).onOk(() => {
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

function showHardware() {
  $q.dialog({
    component: ConfigureHardwareDialog
  }).onOk(() => {
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

// function exportFile() {
//   const x2js = new X2js({ attributePrefix: '-' })
//   const novoObj = {
//     NovoDS: {
//       '-Description': '',
//       '-Playlist_UUID': '',
//       '-Layout_Type': '0',
//       '-Version': '1.1',
//       '-Model_Type': 'ds200',
//       Pages: {
//         Page: {
//           '-Description': '',
//           '-BackgroundMusic': '',
//           '-SerialNumber': 'Page 1',
//           '-AudioSource': '',
//           '-BgMusicApplyToAll': 'false',
//           '-ID': 'Page 1',
//           '-FreeDesignerMode': 'false',
//           '-BackgroundImageSize': '160',
//           '-BackgroundImage': '',
//           '-Layout': 'Portrait 14',
//           '-Row': '6',
//           '-BackgroundMusicSize': '160',
//           '-BackgroundMusicUrl': '',
//           '-Column': '2',
//           '-Orientation': '1'
//         }
//       },
//       Timeline: {
//         '-Looping': 'true',
//         Item: {
//           '-Page': 'Page 1',
//           '-Duration': '1800',
//           '-self-closing': 'true'
//         }
//       }
//     }
//   }
//   const xmlData = x2js.js2xml(novoObj)
//   console.log(xmlData)
//   const blob = new Blob([xmlData], { type: 'application/xml,' })
//   const link = document.createElement('a')
//   link.href = URL.createObjectURL(blob)
//   link.download = 'index'
//   link.click()
//   URL.revokeObjectURL(link.href)
// }
</script>

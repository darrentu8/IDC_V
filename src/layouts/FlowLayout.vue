<template>
  <q-layout view="hHr LpR lFf">
    <q-header class="shadow-1">
      <q-bar class="q-electron-drag text-black" style="border-bottom: 1px solid #f1f1f1;background-color: #f8f8f8">
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="saveAlert" />
      </q-bar>
      <q-toolbar class="q-px-lg q-py-md" style="background-color: #fff;">
        <img class="cursor-pointer" :src="logo" style="height:30px" @click="$router.push({ path: '/new' })" />
        <span class="ver">{{ appVersion }}</span>
        <q-space />
        <q-btn class="" unelevated rounded color="" text-color="grey-9" size="md" @click="showPageSettings()">
          <img class="q-mr-xs" src="~assets/icon/settings.svg" color="" size="xs" />
          Page Settings
        </q-btn>
        <q-btn class="" unelevated rounded color="" text-color="grey-9" size="md" @click="showHardware()">
          <img class="q-mr-xs" src="~assets/icon/adjustments.svg" color="white" size="xs" />
          Configure Event/Action
        </q-btn>
        <q-separator vertical class="q-mx-md" />
        <q-btn :disable="!checkVali" class="" unelevated color="primary" rounded size="md" @click="preview()">
          <img class="q-mr-xs" src="~assets/icon/see.svg" color="white" size="xs" />
          Preview
        </q-btn>
        <q-btn :disable="!checkVali" class="q-ml-md" unelevated color="primary" rounded size="md" @click="exportFile()">
          <img class="q-mr-xs" src="~assets/icon/save.svg" color="white" size="xs" />
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
    <ConfirmDialog />
    <PlaylistSettingsDialog v-model:isShow="isShowPlaylistSettingsDialog" />
    <ConfigureHardwareDialog />
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { version } from '../../package.json'

const widgetStore = useWidgetListStore()
// import { useRouter } from 'vue-router'
import X2js from 'x2js'
import ConfirmDialog from 'src/components/dialog/ConfirmDialog.vue'
import PlaylistSettingsDialog from 'src/components/dialog/PlaylistSettingsDialog.vue'
import ConfigureHardwareDialog from 'src/components/dialog/ConfigureHardwareDialog.vue'
import LeftSideBar from 'src/components/LeftSideBar.vue'
import RightSideBar from 'src/components/RightSideBar.vue'
import logoSVG from '../assets/logo.svg'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()

const appVersion = ref(version)
const logo = ref(logoSVG)
// const router = useRouter()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const checkVali = computed(() => widgetStore.checkVali)
const isShowPlaylistSettingsDialog = ref(false)
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

// function closeApp() {
//   window.myAPI?.close()
// }

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
function saveAlert() {
  $q.dialog({
    component: ConfirmDialog,
    componentProps: {
      title: 'Do you want to save before leaving?',
      message: '',
      okBtn: 'Yes, save',
      cancelBtn: 'No, just leave'
    }
  }).onOk(() => {
    const result = leaveSaveFileClose()
    if (result) {
      console.log('result', result)
    }
  }).onCancel(() => {
    window.myAPI?.closeWatchJson()
    window.myAPI.delTempFolderWithClose(widgetStore.nowPlayListPath)
  }).onDismiss(() => {
  })
}
async function preview() {
  try {
    const setIndexResult = await widgetStore.SetStateFirstIndex()
    if (setIndexResult) {
      const x2js = new X2js({ attributePrefix: '_' })
      const novoObj = { NovoDS: widgetStore.NovoDS }
      const xmlData = x2js.js2xml(novoObj)
      const result = window.myAPI.storeToXML(widgetStore.NovoDS._Playlist_Name, widgetStore.nowPlayListFolder, widgetStore.nowPlayListPath, xmlData)
      if (result) {
        window.myAPI?.writeJson(widgetStore.NovoDS._Playlist_Name).then(() => {
          $q.dialog({
            title: 'Preview' + ' ' + widgetStore.NovoDS._Playlist_Name + ' ' + 'now !'
          }).onOk(() => {
          }).onCancel(() => {
          }).onDismiss(() => {
          })
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
async function leaveSaveFileClose() {
  try {
    const setIndexResult = await widgetStore.SetStateFirstIndex()
    if (setIndexResult) {
      const x2js = new X2js({ attributePrefix: '_' })
      const novoObj = { NovoDS: widgetStore.NovoDS }
      const xmlData = x2js.js2xml(novoObj)
      const result = window.myAPI.storeToXML(widgetStore.NovoDS._Playlist_Name, widgetStore.nowPlayListFolder, widgetStore.nowPlayListPath, xmlData)
      if (result) {
        $q.dialog({
          title: 'Saved successfully!'
        }).onDismiss(() => {
          window.myAPI?.closeWatchJson()
          window.myAPI.delTempFolderWithClose(widgetStore.nowPlayListPath)
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
async function exportFile() {
  try {
    const setIndexResult = await widgetStore.SetStateFirstIndex()
    if (setIndexResult) {
      const x2js = new X2js({ attributePrefix: '_' })
      const novoObj = { NovoDS: widgetStore.NovoDS }
      const xmlData = x2js.js2xml(novoObj)
      try {
        const result = await window.myAPI.storeToXML(widgetStore.NovoDS._Playlist_Name, widgetStore.nowPlayListFolder, widgetStore.nowPlayListPath, xmlData)
        if (result) {
          window.myAPI.delTempFolder(widgetStore.nowPlayListPath)
          $q.dialog({
            component: ConfirmDialog,
            componentProps: {
              title: 'Saved successfully!',
              message: 'The playlist has been successfully saved, do you want to view the folder?',
              okBtn: 'Open',
              cancelBtn: 'cancel'
            }
          }).onOk(() => {
            console.log('xmlData', xmlData)
            window.myAPI.openSaveFolder(result.targetFile)
          })
          widgetStore.ResetNewPlaylistName(widgetStore.NovoDS._Playlist_Name, result.targetFile)
        }
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

</script>

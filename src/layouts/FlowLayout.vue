<template>
  <q-layout view="hHh LpR lFf">
    <q-header>
      <q-bar class="q-electron-drag bg-grey-3 text-black">
        <div>Signage Editor</div>
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered show-if-above :width="300" :breakpoint="400">
      <LeftSideBar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered class="" :width="200" :breakpoint="400">
      <RightSideBar />
    </q-drawer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LeftSideBar from 'src/components/LeftSideBar.vue'
import RightSideBar from 'src/components/RightSideBar.vue'
export default defineComponent({
  name: 'FlowLayout',

  components: {
    LeftSideBar,
    RightSideBar
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    function minimize() {
      window.myAPI?.minimize()
    }

    function toggleMaximize() {
      window.myAPI?.toggleMaximize()
    }

    function closeApp() {
      window.myAPI?.close()
    }

    return {
      minimize,
      toggleMaximize,
      closeApp,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" bordered show-if-above :width="300" :breakpoint="400">
      <LeftSideBar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered class="bg-grey-3">
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

    return {
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

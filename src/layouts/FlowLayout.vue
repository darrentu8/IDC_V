<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      :width="300"
      :breakpoint="400"
    >

<div class="absolute-top bg-transparent">
  <q-toolbar class="text-primary">
    <q-toolbar-title>
      Default layout
    </q-toolbar-title>
    <q-btn flat dense>
      Change widget
    </q-btn>
  </q-toolbar>
  <svg
    width="300"
    height="200"
    style="border: 1px solid; background: #fff;"
    viewbox="0,0,100,160"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="40" height="30" x="0" y="0" fill="#c00"></rect>
    <rect width="40" height="30" x="60" y="0" fill="#f80"></rect>
    <rect width="40" height="30" x="0" y="130" fill="#09c"></rect>
    <rect width="40" height="30" x="60" y="130" fill="#0c0"></rect>
    <rect width="40" height="30" x="30" y="65" fill="#000"></rect>
  </svg>
</div>
      <q-scroll-area
        style="
          height: calc(100% - 250px);
          margin-top: 250px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <EditWidget
            v-for="link in linksLists"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      show-if-above
      bordered
      class="bg-grey-3"
    >
      <q-list>
        <q-item-label header>
          Connection settings
        </q-item-label>
        <ConnectionSetting />
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EditWidget from 'components/EditWidget.vue'
import ConnectionSetting from 'src/components/ConnectionSetting.vue'

const linksList = [
  {
    title: 'Text-1',
    icon: 'img:/icon/text.png',
    active: true
  },
  {
    title: 'Media-1',
    icon: 'img:/icon/media.png',
    active: false
  },
  {
    title: 'Twitter-1',
    icon: 'img:/icon/twitter.png',
    active: false
  },
  {
    title: 'Webpage-1',
    icon: 'img:/icon/webpage.png',
    active: false
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EditWidget,
    ConnectionSetting
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      linksLists: linksList,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>

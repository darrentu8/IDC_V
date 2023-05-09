<template>
  <q-toolbar class="q-px-md flex justify-center">
    <q-item-label class="full-width q-mt-md">
      <q-input bottom-slots v-on:focus="focus = true" v-on:blur="focus = false" v-model="PlaylistName"
        label="Playlist Name">
        <template v-slot:append>
          <q-icon v-if="focus || !PlaylistName" size="xs" name="img:/icon/pencil.svg" />
          <!-- <q-icon v-if="NovoDS._Playlist_Name !== PlaylistName" name="close" @click="PlaylistName = ''"
            class="cursor-pointer" /> -->
          <!-- <q-icon v-if="NovoDS._Playlist_Name !== PlaylistName" name="check" color="green" @click="saveName()"
            class="cursor-pointer" /> -->
        </template>
        <template v-if="NovoDS._Playlist_Name !== PlaylistName && PlaylistName" v-slot:after>
          <q-btn round dense flat color="primary" icon="check_circle" />
        </template>
      </q-input>
      <div v-if="NovoDS._Description">
        <!-- <p class="text-grey-7 q-mb-sm">Description</p> -->
        <p class="text-grey-7">{{ NovoDS._Description }}</p>
      </div>
    </q-item-label>
  </q-toolbar>
  <GridViewStaticSelect :view-layout="layouts.layout" :view-row-count="layouts.rowCount"
    :view-col-count="layouts.colCount" :view-width="280" />
  <q-separator class="q-ma-md" />
  <q-item-label header class="q-pb-xs text-dark text-bold">Widget</q-item-label>
  <q-scroll-area style="height: calc(100% - 250px);">
    <q-list padding>
      <EditWidgetList v-for="(widget, Index) in widgetLists" :Index="Index" :key="widget.id"
        :ContentType="widget._ContentType" :options="widgetOptions" />
    </q-list>
  </q-scroll-area>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import GridViewStaticSelect from 'src/components/GridViewStaticSelect.vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import EditWidgetList from './EditWidgetList.vue'

// const router = useRouter()
const LayoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const NovoDS = computed(() => LayoutStore.NovoDS)
const layouts = computed(() => LayoutStore.layout)
const widgetLists = computed(() => widgetStore.GetWidgetListData)
const widgetOptions = computed(() => widgetStore.widgetOption)

const focus = ref(false)
const PlaylistName = computed({
  get() {
    return NovoDS.value._Playlist_Name
  },
  set(newValue) {
    NovoDS.value._Playlist_Name = newValue
  }
})
onMounted(() => {
})
</script>

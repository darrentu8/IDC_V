<template>
  <q-toolbar class="q-px-md flex justify-center">
    <q-item-label class="full-width q-mt-md">
      <q-input borderless bottom-slots v-on:focus="focus = true" v-on:blur="focus = false" v-model="PlaylistName"
        label="Playlist Name" class="q-pb-none">
        <template v-slot:append>
          <img v-if="focus || !PlaylistName" src="~assets/icon/pencil.svg" />
          <!-- <img v-if="NovoDS._Playlist_Name !== PlaylistName" name="close" @click="PlaylistName = ''"
            class="cursor-pointer" /> -->
          <!-- <img v-if="NovoDS._Playlist_Name !== PlaylistName" name="check" color="green" @click="saveName()"
            class="cursor-pointer" /> -->
        </template>
        <template v-if="NovoDS._Playlist_Name !== PlaylistName && PlaylistName" v-slot:after>
          <q-btn round dense flat color="primary" icon="check_circle" />
        </template>
      </q-input>
      <div>
        <q-input v-on:focus="dfocus = true" v-on:blur="dfocus = false" label="Playlist Description" type="textarea"
          rows="2" class="border-d" borderless v-model="NovoDS._Description">
          <template v-slot:append>
            <img v-if="dfocus || !NovoDS._Description" src="~assets/icon/pencil.svg" />
          </template>
        </q-input>
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
const layouts = computed(() => LayoutStore.layout)
const NovoDS = computed(() => widgetStore.NovoDS)
const widgetLists = computed(() => widgetStore.GetWidgetListData)
const widgetOptions = computed(() => widgetStore.widgetOption)

const focus = ref(false)
const dfocus = ref(false)
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

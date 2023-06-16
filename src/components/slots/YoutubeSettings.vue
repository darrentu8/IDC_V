<template>
    <div class="row">
        <div class="text-h6 q-pa-sm">Youtube Settings</div>
    </div>
    <q-separator />
    <div class="row q-pa-sm q-mt-md q-gutter-sm">
        <q-radio v-model="widgetListData.Content._showType" val="Playlist" label="Playlist" />
        <q-radio v-model="widgetListData.Content._showType" val="Videos" label="Video" />
    </div>
    <div class="row q-pa-sm">
        <div class="col-11">
            <div class="q-pa-sm">URL</div>
            <div class="col">
                <q-input dense outlined bg-color="white" v-model="widgetListData.Content._param" :placeholder="widgetListData.Content._showType === 'Videos' ?
                    'https://www.youtube.com/watch?v=??????' : 'https://www.youtube.com/playlist?list=??????'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'

const widgetStore = useWidgetListStore()
const widgetListData = computed(() => widgetStore.GetWidgetListData)

onBeforeMount(() => {

})
</script>
<style lang="scss" scoped></style>

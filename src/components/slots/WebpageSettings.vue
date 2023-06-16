<template>
    <div class="row">
        <div class="text-h6 q-pa-sm">Web Page Settings</div>
    </div>
    <q-separator />
    <div class="row q-pa-sm">
        <div class="col-11">
            <div class="q-pa-sm">URL</div>
            <div class="col">
                <q-input dense outlined bg-color="white" v-model="widgetListData.Content._URL" />
            </div>
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="col-8">
            <div class="q-pa-sm">Refresh period</div>
            <div class="row">
                <div class="q-pa-sm" style="width: 150px;">
                    <q-checkbox dense v-model="isAutoRefresh" label="Auto Refresh" @update:model-value="setAutoRefresh" />
                </div>
                <div class="col">
                    <q-input :disable="!isAutoRefresh" @update:model-value="setAutoRefresh" type="number" dense outlined
                        bg-color="white" v-model="refreshPeriod" suffix="min" />
                </div>
            </div>
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="col-6">
            <div class="q-pa-sm">Font scale</div>
            <div class="col">
                <q-input type="number" dense outlined bg-color="white" v-model="widgetListData.Content._fontScaleRatio"
                    suffix="%" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useWidgetListStore } from 'src/stores/widget'
import { computed, onBeforeMount, ref } from 'vue'

const widgetStore = useWidgetListStore()

const widgetListData = computed(() => widgetStore.GetWidgetListData)

const isAutoRefresh = ref(false)
const refreshPeriod = ref(30)

onBeforeMount(() => {
    if (+playlistStore.editSection.data.Content._autoRefresh === -1) {
        isAutoRefresh.value = false
    } else {
        isAutoRefresh.value = true
        refreshPeriod.value = (+playlistStore.editSection.data.Content._autoRefresh) / 60
    }
})

const setAutoRefresh = (val) => {
    if (!isAutoRefresh.value) {
        playlistStore.editSection.data.Content._autoRefresh = -1
        return
    }

    playlistStore.editSection.data.Content._autoRefresh = val * 60
}
</script>
<style lang="scss" scoped></style>

<template>
    <div class="row">
        <div class="text-h6 q-pa-sm">Weather Settings</div>
    </div>
    <q-separator />
    <div class="row q-pa-sm">
        <div class="q-pt-sm text-bold">Location</div>
    </div>
    <div class="row q-pa-sm">
        <div class="q-mr-md" style="width:150px">
            <div class="q-pa-sm">City</div>
            <div class="col">
                <q-input dense outlined bg-color="white" v-model="city" />
            </div>
        </div>
        <div class="q-mr-md" style="width:150px">
            <div class="q-pa-sm">State</div>
            <div class="col">
                <q-input dense outlined bg-color="white" v-model="state" />
            </div>
        </div>
        <div class="q-mr-md" style="width:150px">
            <div class="q-pa-sm">Country</div>
            <div class="col">
                <q-input dense outlined bg-color="white" v-model="widgetListData.Content._Weather_Country" />
            </div>
        </div>
        <div style="width:100px">
            <div class="q-pa-sm">Units</div>
            <div class="col">
                <q-select emit-value map-options dense outlined bg-color="white"
                    v-model="widgetListData.Content._Weather_Units_of_Temperature"
                    :options="[{ value: 'Celsius', label: '℃' }, { value: 'Fahrenheit', label: '℉' }]" />
            </div>
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="q-mr-md" style="width:200px" v-if="widgetListData.Content._theme_type === 'Contemporary'">
            <div class="q-pa-sm">Main area style</div>
            <div class="col">
                <q-select emit-value map-options dense outlined bg-color="white"
                    v-model="widgetListData.Content._theme_style"
                    :options="[{ value: 'Square', label: 'Square' }, { value: 'Rectangle(Horizontal)', label: 'Rectangle(Horizontal)' }, { value: 'Rectangle(Vertical)', label: 'Rectangle(Vertical)' }]" />
            </div>
        </div>
        <div class="q-mr-md" style="width:200px">
            <div class="q-pa-sm">Forecast (Days)</div>
            <div class="col">
                <q-select dense outlined bg-color="white" v-model="widgetListData.Content._Weather_Forecast_Day"
                    :options="['1', '5']" />
            </div>
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="col">
            <div class="q-pa-sm">Text color</div>
            <div class="col q-pl-sm">
                <ColorPicker v-model:selectedColor="textColor" v-model:colors="textColorOptions" />
            </div>
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="col">
            <div class="q-pa-sm">Background color</div>
            <div class="col q-pl-sm">
                <ColorPicker v-model:selectedColor="backgroundColor" v-model:colors="backgroundColorOptions" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import ColorPicker from 'src/components/ColorPicker.vue'
import { useWidgetListStore } from 'src/stores/widget'
import { ARGB2RGBA, RGBA2ARGB } from 'src/js/helper'

const widgetStore = useWidgetListStore()

const widgetListData = computed(() => widgetStore.GetWidgetListData)

const textColor = computed({
    get() {
        return ARGB2RGBA(widgetListData.value.Content._textColor)
    },
    set(val) {
        widgetListData.value.Content._textColor = RGBA2ARGB(val)
    }
})

const backgroundColor = computed({
    get() {
        return ARGB2RGBA(widgetListData.value.Content._backgroundColor)
    },
    set(val) {
        widgetListData.value.Content._backgroundColor = RGBA2ARGB(val)
    }
})

const state = computed({
    get() {
        const array = widgetListData.value.Content._Weather_City.split(', ')
        if (array.length > 1) {
            return array[1]
        }
        return ''
    },
    set(val) {
        widgetListData.value.Content._Weather_City = `${city.value}, ${val}`
    }
})

const city = computed({
    get() {
        return widgetListData.value.Content._Weather_City.split(', ')[0]
    },
    set(val) {
        if (state.value === '') {
            widgetListData.value.Content._Weather_City = `${val}`
        } else {
            widgetListData.value.Content._Weather_City = `${val}, ${state.value}`
        }
    }
})

const textColorOptions = reactive(['#00000000', '#FFFFFFFF', '#2A303DFF', '#27393FFF', '#185945FF', '#514E4CFF',
    '#5C636DFF', '#51748EFF', '#C99797FF', '#9E9893FF', '#86AEB7FF'])
const backgroundColorOptions = reactive(['#00000000', '#FFFFFFFF', '#2A303DFF', '#27393FFF', '#185945FF', '#514E4CFF',
    '#5C636DFF', '#51748EFF', '#C99797FF', '#9E9893FF', '#86AEB7FF'])
</script>
<style lang="scss" scoped></style>

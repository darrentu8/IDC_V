<template>
    <div class="row">
        <div class="text-h6 q-pa-sm">Clock Settings</div>
    </div>
    <q-separator />
    <div class="row q-pa-sm q-mt-md q-gutter-sm">
        <q-radio v-model="widgetListData.Content._Clock_Type" val="digital" label="Digital clock" />
        <q-radio v-model="widgetListData.Content._Clock_Type" val="analog" label="Analog clock" />
    </div>
    <template v-if="widgetListData.Content._Clock_Type === 'analog'">
        <div class="row q-pa-sm">
            <div class="col-6">
                <div class="q-pa-sm">Theme</div>
                <div class="col">
                    <q-select emit-value map-options dense outlined bg-color="white"
                        v-model="widgetListData.Content._Analog_Clock_Style"
                        :options="[{ value: 'white', label: 'Light' }, { value: 'black', label: 'Dark' }]" />
                </div>
            </div>
        </div>
    </template>
    <template v-if="widgetListData.Content._Clock_Type === 'digital'">
        <div class="row q-pa-sm">
            <div class="col-6">
                <div class="q-pa-sm">Display format</div>
                <div class="col">
                    <q-select emit-value map-options dense outlined bg-color="white"
                        :model-value="+widgetListData.Content._Clock_Show_Type"
                        @update:model-value="val => { widgetListData.Content._Clock_Show_Type = val }"
                        :options="[{ value: 0, label: 'Time' }, { value: 1, label: 'Data' }, { value: 2, label: 'Time,Date(One line)' },
                        { value: 3, label: 'Time,Date(Two line)' }, { value: 4, label: 'Date,Time(Two line)' }, { value: 5, label: 'Date,Time(Two line)' }]" />
                </div>
            </div>
            <div class="col-5 q-ml-md">
                <div class="q-pa-sm">Time format</div>
                <div class="col">
                    <q-select emit-value map-options dense outlined bg-color="white"
                        :model-value="+widgetListData.Content._Clock_Format"
                        @update:model-value="val => { widgetListData.Content._Clock_Format = val }"
                        :options="[{ value: 0, label: '23:59:59' }, { value: 1, label: 'PM 10:23' },
                        { value: 2, label: '10:23:45 PM' }, { value: 3, label: '10:23 PM' }, { value: 4, label: '23:59' }]" />
                </div>
            </div>
        </div>
        <div class="row q-pa-sm">
            <div class="col-4">
                <div class="q-pa-sm">Font name</div>
                <div class="col">
                    <q-select dense outlined bg-color="white" v-model="widgetListData.Content._font"
                        :options="['Roboto-Light', 'Roboto-Bold', 'Roboto-Italic', 'Roboto-BoldItalic', 'Roboto-LightItalic',
                            'Roboto-Thin', 'Roboto-ThinItalic', 'RobotoCondensed-Regular', 'RobotoCondensed-Bold', 'RobotoCondensed-Italic', 'RobotoCondensed-BoldItalic',
                            'DroidSerif-Regular', 'DroidSerif-Bold', 'DroidSerif-Italic', 'DroidSerif-BoldItalic', 'DroidSans', 'DroidSans-Bold', 'DroidSansMono']" />
                </div>
            </div>
            <div class="q-pl-md" style="width:100px">
                <div class="q-pa-sm">Size</div>
                <div class="col">
                    <q-input dense outlined v-model="widgetListData.Content._fontSize" type="number" bg-color="white" :min="1"
                        :max="1024" />
                </div>
            </div>
            <div class="col-3 q-pl-md" style="width:140px">
                <div class="q-pa-sm">&nbsp;</div>
                <div class="row botton-group  flex flex-center">
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Horizontal = 0">
                        <q-icon name="format_align_left" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Horizontal === 0 ? 'primary' : 'black'" />
                    </div>
                    <q-separator vertical="" />
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Horizontal = 1">
                        <q-icon name="format_align_center" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Horizontal === 1 ? 'primary' : 'black'" />
                    </div>
                    <q-separator vertical="" />
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Horizontal = 2">
                        <q-icon name="format_align_right" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Horizontal === 2 ? 'primary' : 'black'" />
                    </div>
                </div>
            </div>
            <div class="col-3 q-pl-md" style="width:140px">
                <div class="q-pa-sm">&nbsp;</div>
                <div class="row botton-group  flex flex-center">
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Vertical = 0">
                        <q-icon name="align_vertical_top" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Vertical === 0 ? 'primary' : 'black'" />
                    </div>
                    <q-separator vertical="" />
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Vertical = 1">
                        <q-icon name="align_vertical_center" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Vertical === 1 ? 'primary' : 'black'" />
                    </div>
                    <q-separator vertical="" />
                    <div class="cursor-pointer flex flex-center" style="width:40px"
                        @click="widgetListData.Content._Clock_Alignment_Vertical = 2">
                        <q-icon name="align_vertical_bottom" size="sm"
                            :color="+widgetListData.Content._Clock_Alignment_Vertical === 2 ? 'primary' : 'black'" />
                    </div>
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

const textColorOptions = reactive(['#00000000', '#FFFFFFFF', '#2A303DFF', '#27393FFF', '#185945FF', '#514E4CFF',
    '#5C636DFF', '#51748EFF', '#C99797FF', '#9E9893FF', '#86AEB7FF'])
const backgroundColorOptions = reactive(['#00000000', '#FFFFFFFF', '#2A303DFF', '#27393FFF', '#185945FF', '#514E4CFF',
    '#5C636DFF', '#51748EFF', '#C99797FF', '#9E9893FF', '#86AEB7FF'])
</script>
<style lang="scss" scoped>
.botton-group {
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
    background-color: white;
}
</style>

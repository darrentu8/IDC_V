<template>
    <div class="row">
        <div class="text-h6 q-pa-sm">Twitter Settings</div>
    </div>
    <q-separator />
    <div class="row q-pa-sm q-mt-md q-gutter-sm">
        <q-radio v-model="widgetListData.Content._Twitter_DisplayType" val="Twitter_Account" label="Who to follow" />
        <q-radio v-model="widgetListData.Content._Twitter_DisplayType" val="Twitter_Hashtag" label="Hashtag" />
    </div>
    <div class="row q-pa-sm q-gutter-sm">
        <div class="col-8">
            <q-input v-if="widgetListData.Content._Twitter_DisplayType === 'Twitter_Account'" dense outlined
                bg-color="white" v-model="widgetListData.Content._Twitter_Account" placeholder="Account" />
            <q-input v-if="widgetListData.Content._Twitter_DisplayType === 'Twitter_Hashtag'" dense outlined
                bg-color="white" v-model="widgetListData.Content._Twitter_Hashtag" placeholder="Hashtag"
                hint="Note: Only active hashtags, meaning relevant tweets are posted in the last 7 days, will be followed." />
        </div>
    </div>
    <div class="row q-pa-sm">
        <div class="q-mr-md" style="width:250px">
            <div class="q-pa-sm">Speed</div>
            <div class="col">
                <q-select emit-value map-options dense outlined bg-color="white"
                    v-model="widgetListData.Content._Twitter_Speed"
                    :options="[{ value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' }, { value: 'High', label: 'High' }]" />
            </div>
        </div>
        <div style="width:250px">
            <div class="q-pa-sm">Items to show</div>
            <div class="col">
                <q-select emit-value map-options dense outlined bg-color="white"
                    v-model="widgetListData.Content._Twitter_ShowItems"
                    :options="[{ value: 0, label: 'All' }, { value: 5, label: '5' },
                    { value: 10, label: '10' }, { value: 15, label: '15' }, { value: 20, label: '20' }, { value: 25, label: '25' }]" />
            </div>
        </div>
    </div>
    <template v-if="widgetListData.Content._Twitter_DisplayType === 'Twitter_Account'">
        <div class="row q-pa-sm" v-if="widgetListData.Content._Twitter_DisplayType === 'Twitter_Account' &&
            widgetListData.Content._Twitter_DisplayType === 'Twitter_Account'">
            <div class="q-mr-md" style="width:250px">
                <div class="q-pa-sm">Theme</div>
                <div class="col">
                    <q-select emit-value map-options dense outlined bg-color="white"
                        v-model="widgetListData.Content._Twitter_Theme"
                        :options="[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]" />
                </div>
            </div>
            <div style="width:250px">
                <div class="q-pa-sm">Text scale</div>
                <div class="col">
                    <q-input type="number" dense outlined bg-color="white"
                        v-model="widgetListData.Content._Twitter_Text_Scaling" />
                </div>
            </div>
        </div>
        <div class="row q-pa-sm">
            <div style="width:250px">
                <q-checkbox :model-value="isXmlValTrue(widgetListData.Content._Twitter_Transparent)"
                    label="Transparent background" />
            </div>
        </div>
    </template>
    <template v-if="widgetListData.Content._Twitter_DisplayType === 'Twitter_Hashtag'">
        <div class="row q-pa-sm">
            <div class="q-mr-md" style="width:250px">
                <div class="q-pa-sm">Font name</div>
                <div class="col">
                    <q-select dense outlined bg-color="white" v-model="widgetListData.Content._font"
                        :options="['Roboto-Light', 'Roboto-Bold', 'Roboto-Italic', 'Roboto-BoldItalic', 'Roboto-LightItalic',
                            'Roboto-Thin', 'Roboto-ThinItalic', 'RobotoCondensed-Regular', 'RobotoCondensed-Bold', 'RobotoCondensed-Italic', 'RobotoCondensed-BoldItalic',
                            'DroidSerif-Regular', 'DroidSerif-Bold', 'DroidSerif-Italic', 'DroidSerif-BoldItalic', 'DroidSans', 'DroidSans-Bold', 'DroidSansMono']" />
                </div>
            </div>
            <div class="q-mr-md" style="width:100px">
                <div class="q-pa-sm">Size</div>
                <div class="col">
                    <q-input dense outlined v-model="widgetListData.Content._fontSize" type="number" bg-color="white"
                        :min="1" :max="1024" />
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
import { useWidgetListStore } from 'src/stores/widget'
import ColorPicker from 'src/components/ColorPicker.vue'
import { isXmlValTrue, ARGB2RGBA, RGBA2ARGB } from 'src/js/helper'

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

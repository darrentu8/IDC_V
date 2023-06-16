<template>
  <div class="row">
    <div class="text-h6 q-pa-sm">Text Settings</div>
  </div>
  <q-separator />
  <div class="row q-pa-sm">
    <div class="col-6">
      <div class="q-pa-sm">Visual effect</div>
      <div class="col">
        <q-select dense outlined bg-color="white" v-model="widgetListData.Content._showType"
          :options="['Static', 'Horizontal Scrolling', 'Vertical Scrolling', 'QR Code']" />
      </div>
    </div>
  </div>
  <div class="row q-pa-sm">
    <template v-if="widgetListData.Content._showType !== 'QR Code' && widgetListData.Content._showType !== 'Rich Text'">
      <div class="q-mr-md" style="width:200px">
        <div class="q-pa-sm">Font name</div>
        <div class="col">
          <q-select dense outlined bg-color="white" v-model="widgetListData.Content._font"
            :options="['Roboto-Light', 'Roboto-Bold', 'Roboto-Italic', 'Roboto-BoldItalic', 'Roboto-LightItalic',
              'Roboto-Thin', 'Roboto-ThinItalic', 'RobotoCondensed-Regular', 'RobotoCondensed-Bold', 'RobotoCondensed-Italic', 'RobotoCondensed-BoldItalic',
              'DroidSerif-Regular', 'DroidSerif-Bold', 'DroidSerif-Italic', 'DroidSerif-BoldItalic', 'DroidSans', 'DroidSans-Bold', 'DroidSansMono']" />
        </div>
      </div>
      <div class="q-mr-md" style="width:80px">
        <div class="q-pa-sm">Size</div>
        <div class="col">
          <q-input dense outlined v-model="widgetListData.Content._fontSize" type="number" bg-color="white" :min="1"
            :max="1024" />
        </div>
      </div>
    </template>
    <template v-if="widgetListData.Content._showType === 'Static'">
      <div class="q-mr-md" style="width:140px">
        <div class="q-pa-sm">&nbsp;</div>
        <div class="row botton-group  flex flex-center">
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignH('Left')">
            <q-icon name="format_align_left" size="sm" :color="alignH === 'Left' ? 'primary' : 'black'" />
          </div>
          <q-separator vertical="" />
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignH('Center')">
            <q-icon name="format_align_center" size="sm" :color="alignH === 'Center' ? 'primary' : 'black'" />
          </div>
          <q-separator vertical="" />
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignH('Right')">
            <q-icon name="format_align_right" size="sm" :color="alignH === 'Right' ? 'primary' : 'black'" />
          </div>
        </div>
      </div>
      <div style="width:140px">
        <div class="q-pa-sm">&nbsp;</div>
        <div class="row botton-group  flex flex-center">
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignV('Top')">
            <q-icon name="align_vertical_top" size="sm" :color="alignV === 'Top' ? 'primary' : 'black'" />
          </div>
          <q-separator vertical="" />
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignV('Center')">
            <q-icon name="align_vertical_center" :color="alignV === 'Center' ? 'primary' : 'black'" size="sm" />
          </div>
          <q-separator vertical="" />
          <div class="cursor-pointer flex flex-center" style="width:40px" @click="setAlignV('Bottom')">
            <q-icon name="align_vertical_bottom" size="sm" :color="alignV === 'Bottom' ? 'primary' : 'black'" />
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row q-pa-sm">
    <template
      v-if="widgetListData.Content._showType === 'Horizontal Scrolling' || widgetListData.Content._showType === 'Vertical Scrolling'">
      <div class="col-3">
        <div class="q-pa-sm">Speed</div>
        <div class="col">
          <q-select emit-value map-options dense outlined bg-color="white" v-model="widgetListData.Content._speed"
            :options="[{ value: 'Low', label: 'Low' }, { value: 'Medium', label: 'Medium' }, { value: 'High', label: 'High' }]" />
        </div>
      </div>
    </template>
    <template v-if="widgetListData.Content._showType === 'Horizontal Scrolling'">
      <div class="col-3 q-pl-md">
        <div class="q-pa-sm">Direction</div>
        <div class="col">
          <q-select emit-value map-options dense outlined bg-color="white" v-model="widgetListData.Content._direction"
            :options="[{ value: 'Right to Left', label: 'Right to Left' }, { value: 'Left to Right', label: 'Left to Right' }]" />
        </div>
      </div>
    </template>
  </div>
  <template v-if="widgetListData.Content._showType !== 'QR Code' && widgetListData.Content._showType !== 'Rich Text'">
    <div class="row q-pa-sm">
      <div class="col">
        <div class="q-pa-sm">Text color</div>
        <div class="col q-pl-sm">
          <ColorPicker v-model:selectedColor="textColor" v-model:colors="textColorOptions" />
        </div>
      </div>
    </div>
  </template>
  <template v-if="widgetListData.Content._showType !== 'Rich Text'">
    <div class="row q-pa-sm">
      <div class="col">
        <div class="q-pa-sm">Background color</div>
        <div class="col q-pl-sm">
          <ColorPicker v-model:selectedColor="backgroundColor" v-model:colors="backgroundColorOptions" />
        </div>
      </div>
    </div>
  </template>
  <div class="row">
    <div class="text-h6 q-pa-sm">Content</div>
    <q-space />
  </div>
  <q-separator />
  <div class="flex">
    <div class="q-pa-md full-width">
      <q-input v-model="widgetListData.Content._Text" outlined="" bg-color="white" type="textarea" />
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

const alignH = computed(() => {
  const arrayAligns = widgetListData.value.Content._arg1.split('-')

  return arrayAligns[0]
})

const alignV = computed(() => {
  const arrayAligns = widgetListData.value.Content._arg1.split('-')

  if (arrayAligns.length > 1) {
    return arrayAligns[1]
  }

  return ''
})

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

const setAlignH = val => {
  widgetListData.value.Content._arg1 = `${val}-${alignV.value}`
}

const setAlignV = val => {
  widgetListData.value.Content._arg1 = `${alignH.value}-${val}`
}

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

<template>
  <div class="q-pa-md">
    <q-item-label header class="border-b q-mb-lg text-dark text-bold">Media settings</q-item-label>
    <!-- <q-item-label class="q-mx-md">
      <q-input v-model="widgetListData[currentSection].name" label="Standard" />
    </q-item-label> -->
    <div v-if="widgetListData[currentSection]._ContentType" class="q-px-md"><!-- <q-select label="Select Hardware" class="theme sub q-mt-sm" bg-color="white"
        rounded :disable="EventData._next_state_id === ''" emit-value map-options outlined dense
        v-model="EventData._gpio_number" :options="eventTypeOptions[EventData._type].hardwareOptions" option-value="value"
        option-label="text">
      </q-select> -->
      <q-item-label header class="q-pa-none q-mb-sm">View Type</q-item-label>
      <q-select :disable="!widgetListData[currentSection]._ContentType" bg-color="white" emit-value map-options outlined
        rounded dense v-model="widgetListData[currentSection].Content._showType" :options="WidgetOptions.showTypeChoice"
        option-value="value" option-label="value" label="Scale Type" class="q-mb-md" />
      <q-item-label header class="q-pa-none q-mb-sm">Scale type</q-item-label>
      <q-select :disable="!widgetListData[currentSection]._ContentType" bg-color="white" emit-value map-options outlined
        rounded dense v-model="widgetListData[currentSection].Content._scaleType" :options="WidgetOptions.scaleTypeChoice"
        option-value="value" option-label="value" label="View Type" class="q-mb-md" />
      <q-checkbox :disable="!widgetListData[currentSection]._ContentType"
        v-model="widgetListData[currentSection].Content._Detect_Picture_Orientation" label="Detect picture orientatioin"
        color="" />
      <q-checkbox :disable="!widgetListData[currentSection]._ContentType"
        v-model="widgetListData[currentSection].Content._isVideoFillArea" label="Stretch video to fill region" color="" />
    </div>
    <div v-else class="justify-center flex items-center" style="height: 200px;">
      <div class="text-grey">
        Please select a widget first
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import WidgetOptions from './widget/WidgetOptions'
const layoutStore = useLayoutStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const widgetStore = useWidgetListStore()
const widgetListData = computed(() => widgetStore.GetWidgetListData)
// const currentState = computed(() => widgetStore.GetCurrentState)
export default defineComponent({
  name: 'SettingList',
  components: {
  },
  setup() {
    return {
      widgetListData,
      currentSection,
      WidgetOptions,
      data: {
        name: '',
        showType: '',
        scaleType: ''
      }
    }
  }
})
</script>

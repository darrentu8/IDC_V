<template>
  <div>
    <q-item-label header>Media settings</q-item-label>
    <!-- <q-item-label class="q-mx-md">
      <q-input v-model="widgetListData[currentSection].name" label="Standard" />
    </q-item-label> -->
    <q-item-label class="q-mx-md">
      <q-select :disable="!widgetListData[currentSection]._ContentType" filled dense
        v-model="widgetListData[currentSection].Content._showType" :options="WidgetOptions.showTypeChoice"
        option-value="value" option-label="text" emit-value label="Scale Type" />
    </q-item-label>
    <q-item-label class="q-mx-md">
      <q-select :disable="!widgetListData[currentSection]._ContentType" filled dense
        v-model="widgetListData[currentSection].Content._scaleType" :options="WidgetOptions.scaleTypeChoice"
        option-value="value" option-label="text" emit-value label="View Type" />
    </q-item-label>
    <q-item-label class="q-mx-md">
      <q-checkbox :disable="!widgetListData[currentSection]._ContentType"
        v-model="widgetListData[currentSection].Content._Detect_Picture_Orientation" label="Detect_Picture_Orientation"
        color="" />
    </q-item-label>
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

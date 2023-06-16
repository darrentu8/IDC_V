<template>
  <div class="q-pa-md">
    <div v-if="widgetListData[currentSection]._ContentType">
      <MediaSettings v-if="widgetListData[currentSection]._ContentType === ContentType.Media" />
      <TextSettings v-if="widgetListData[currentSection]._ContentType === ContentType.Text" />
      <!-- <WebpageSettings v-if="widgetListData[currentSection]._ContentType === ContentType.Web_Page" />
      <YoutubeSettings v-if="widgetListData[currentSection]._ContentType === ContentType.Youtube" />
      <TwitterSettings v-if="widgetListData[currentSection]._ContentType === 'Misc' &&
        widgetListData[currentSection].Content._widgetType === ContentType.Twitter" />
      <WeatherSettings v-if="widgetListData[currentSection]._ContentType === 'Misc' &&
        widgetListData[currentSection].Content._widgetType === ContentType.Weather" />
      <ClockSettings v-if="widgetListData[currentSection]._ContentType === 'Misc' &&
        widgetListData[currentSection].Content._widgetType === ContentType.Clock" />
      <SocialMediaSettings v-if="widgetListData[currentSection]._ContentType === 'Misc 2' &&
        (widgetListData[currentSection].Content._widgetType === 'Instagram' ||
          widgetListData[currentSection].Content._widgetType === 'Facebook')" /> -->
    </div>
    <div v-else class="justify-center flex items-center" style="height: 200px;">
      <!-- <div class="text-grey">
        Please select a widget first
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { ContentTypeEnum } from 'src/js/constant'

import MediaSettings from './slots/MediaSettings.vue'
// import TextSettings from './slots/TextSettings.vue'
// import WebpageSettings from './slots/WebpageSettings.vue'
// import YoutubeSettings from './slots/YoutubeSettings.vue'
// import TwitterSettings from './slots/TwitterSettings.vue'
// import ClockSettings from './slots/ClockSettings.vue'
// import WeatherSettings from './slots/WeatherSettings.vue'
// import SocialMediaSettings from './slots/SocialMediaSettings.vue'
const ContentType = ContentTypeEnum

const layoutStore = useLayoutStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const widgetStore = useWidgetListStore()
const widgetListData = computed(() => widgetStore.GetWidgetListData)
</script>

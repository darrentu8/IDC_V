<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center bg-grey-4">
        <div class="col-5">
          State 1
        </div>
        <div class="col-7">
          Content settings
        </div>
        <q-btn color="grey" round flat dense :icon="expandedContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedContent = !expandedContent" />
      </q-item-label>

      <div class="col-5">
        <q-slide-transition>
          <div v-show="expandedContent" class="row">
            <div class="col-5 column q-py-md mx-auto items-center">
              <svg width="300" height="200" style="border: 1px solid; background: #fff;" viewbox="0,0,100,160"
                preserveAspectRatio="xMidYMid slice">
              </svg>
            </div>
            <div class="col-7 column q-gutter-md q-py-md" style="max-height: 300px;">
              <q-select class="" filled dense v-model="contentData.media.source" :options="['local', 'Remote']"
                label="Source" />
              <q-select class="" filled dense v-model="contentData.media.viewType" :options="['local', 'Remote']"
                label="View Type" />
              <q-select class="" filled dense v-model="contentData.media.scaleType" :options="['local', 'Remote']"
                label="Scale Type" />
              <q-select class="" filled dense v-model="contentData.media.playEnd" :options="['local', 'Remote']"
                label="Play End" />
              <q-select class="" filled dense v-model="contentData.media.audio" :options="['local', 'Remote']"
                label="Audio" />
              <q-select class="" filled dense v-model="contentData.media.duration" :options="['local', 'Remote']"
                label="Duration(Sec)" />
              <q-toggle dense v-model="contentData.media.detectOrientation" label="Detect Orientation" />
              <q-toggle dense v-model="contentData.media.repeatVideo" label="Repeat Video" />

            </div>
          </div>
        </q-slide-transition>
      </div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ContentSetting',
  components: {
  },
  setup() {
    return {
      expandedContent: ref(true),
      contentData: {
        media: {
          source: '',
          viewType: '',
          fileUpload: '',
          scaleType: '',
          palyEnd: '',
          audio: '',
          duration: '',
          detectOrientation: false,
          repeatVideo: false
        }
      }

    }
  }

})
</script>

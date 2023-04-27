<template>
  <q-item-label header class="border-b">Source
    <q-btn label="" @click="add" flat class="theme-tab-btn" color="primary" icon="add"
      style="height: 49.8px;margin-top: -16px;margin-right: 15px;" />
  </q-item-label>
  <div class="q-mt-md">
    <div v-if="widgetListData[currentSection].Content.State[currentState].File.length">
      <div v-for="(sourceFile, i) in widgetListData[currentSection].Content.MediaItem" :key="sourceFile.fileName"
        class="row flex items-center q-mb-xs">
        <div class="col-1">
          {{ i + 1 }}.
        </div>
        <div class="col-9">
          <div class="full-width">
            <div>{{ sourceFile._src }}</div>
            <small class="text-grey">{{ humanFileSize(sourceFile._fileSize) }}</small>
            <!-- <q-file filled bottom-slots label="Pick File" counter v-model="files">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
              </template>
            </q-file> -->
            <!-- <q-uploader ref="uploader" :url="uploadUrl" :additional-fields="{ token: 'myToken' }" :auto-upload="false"
              @added="startUpload">
            </q-uploader> -->
          </div>
        </div>
        <div class="col-2">
          <q-btn label="" @click="deleteFile(sourceFile._targetPath, sourceFile._src)" round flat class="" color="primary"
            icon="delete_outline" />
        </div>
      </div>
    </div>
    <div v-else class="justify-center flex items-center" style="height: 80px;">
      <div class="text-grey">
        Source is empty
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const currentState = computed(() => widgetStore.GetCurrentState)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
export default defineComponent({
  name: 'SourceManager',
  setup() {
    return {
      currentSection,
      currentState,
      widgetListData
    }
  },
  data() {
    return {
    }
  },
  methods: {
    humanFileSize(size) {
      const i = (size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024)))
      return ((size / Math.pow(1024, i)).toFixed(2) * 1) + ' ' + (['B', 'kB', 'MB', 'GB', 'TB'][i])
    },
    async add() {
      const fileData = await window.myAPI.chooseSources()
      const fileDatas = await window.myAPI.getFileData(fileData)
      widgetStore.AddSourceList(fileDatas)
    },
    deleteFile(sourceFile, fileName) {
      window.myAPI.deleteFile(sourceFile)
      widgetStore.DelSourceList(fileName)
    }
  }
})
</script>
<style lang="scss"></style>

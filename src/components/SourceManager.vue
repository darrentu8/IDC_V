<template>
  <q-item-label header class="border-b">Source
    <q-btn label="" @click="add(currentStateIndex)" flat class="theme-tab-btn" color="primary" icon="add"
      style="height: 49.8px;margin-top: -16px;margin-right: 15px;" />
  </q-item-label>
  <div class="q-mt-md">
    <div v-if="fileList">
      <draggable @change="log" v-bind="dragOptions" :list="fileList" item-key="fileList.fileName" @start="drag = true"
        @end="drag = false">
        <template #item="{ element, index }">
          <q-list bordered separator class="cursor-pointer q-mb-md rounded-borders">
            <q-item v-ripple>
              <q-item-section>
                <div class="flex items-center">
                  <q-icon size="sm" round flat class="q-mr-md" color="grey-5" name="drag_indicator" />
                  {{ index + 1 }}. {{ element._src }}
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn label="" @click="deleteFile(element._targetPath, element._src)" round flat class="" color="pink
" icon="delete_outline" />
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </draggable>
    </div>
    <div v-else class="justify-center flex items-center" style="height: 80px;">
      <div class="text-grey">
        Source is empty
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, computed } from 'vue'
import draggable from 'vuedraggable'
// import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
// const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
// const currentSection = computed(() => layoutStore.GetCurrentSection)
// const currentState = computed(() => widgetStore.GetCurrentState)
const widgetListData = widgetStore.widgetListData
const props = defineProps({
  File: {
    type: Array,
    required: false,
    default: null
  },
  currentStateIndex: {
    type: Number,
    required: true
  }
})
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})
watch(props, () => {
  if (File.value) {
    fileList.value = File.value
  }
})
const { File } = toRefs(props)
const fileList = ref([])
const drag = ref(false)
// const humanFileSize = (size) => {
//   const i = (size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024)))
//   return ((size / Math.pow(1024, i)).toFixed(2) * 1) + ' ' + (['B', 'kB', 'MB', 'GB', 'TB'][i])
// }
const add = async (currentStateIndex) => {
  console.log('currentStateIndex', currentStateIndex)
  const fileData = await window.myAPI.chooseSources()
  const fileDatas = await window.myAPI.getFileData(fileData)
  widgetStore.AddSourceList(currentStateIndex, fileDatas)
}
const deleteFile = (sourceFile, fileName) => {
  window.myAPI.deleteFile(sourceFile)
  widgetStore.DelSourceList(fileName)
}
const log = (evt) => {
  console.log(evt)
  console.log('widgetListData', widgetListData)
}
</script>
<style lang="scss">
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

<template>
  <q-item-label class="border-d q-pb-sm q-pl-sm text-dark text-bold relative-position">Content
    <q-btn label="" @click="add(currentStateIndex)" flat class="theme-tab-btn add" color="primary" icon="add" />
  </q-item-label>
  <div class="q-mt-md dragBox">
    <div v-if="File">
      <draggable @change="log" v-bind="dragOptions" :list="File" item-key="File.fileName" @start="drag = true"
        @end="drag = false">
        <template #item="{ element, index }">
          <q-list separator class="bg-white cursor-pointer q-mb-md rounded-borders">
            <q-item>
              <q-item-section>
                <div class="row items-center">
                  <div class="col-2 flex items-center">
                    <q-icon size="sm" round flat class="q-pr-xs" color="grey-5" name="drag_indicator" />
                    {{ index + 1 }}.
                  </div>
                  <div class="col-10">
                    <div class="flex ellipsis">
                      {{ element._src }}
                    </div>
                    <div class="q-mt-xs" style="max-width: 150px;">
                      <q-input class="brand-round-m" dense outlined
                        @blur="element._duration = checkAndReplaceValue($event.target.value)"
                        v-if="element._type == 'image' || element._type == 'pdf'" v-model="element._duration"
                        type="number" maxlength="4" min="3" prefix="" suffix="sec" />
                    </div>
                  </div>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn label="" @click="deleteFile(currentStateIndex, element._src, element._src)" round flat class=""
                  color="pink">
                  <img src="~assets/icon/delete.svg"></q-btn>
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
import { ref, toRefs, computed } from 'vue'
import draggable from 'vuedraggable'
// import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
// const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
// const currentSection = computed(() => layoutStore.GetCurrentSection)
// const currentState = computed(() => widgetStore.GetCurrentState)
const widgetListData = widgetStore.widgetListData
const nowPlayListFolder = widgetStore.nowPlayListFolder
const props = defineProps({
  File: {
    type: Array,
    required: false,
    default: null
  },
  currentStateIndex: {
    type: Number,
    required: true,
    default: 0
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
const { File } = toRefs(props)
const drag = ref(false)
// const humanFileSize = (size) => {
//   const i = (size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024)))
//   return ((size / Math.pow(1024, i)).toFixed(2) * 1) + ' ' + (['B', 'kB', 'MB', 'GB', 'TB'][i])
// }
const add = async (currentStateIndex) => {
  console.log('currentStateIndex', currentStateIndex)
  const fileData = await window.myAPI.chooseSources(nowPlayListFolder)

  console.log('fileData', fileData)
  const fileDatas = await window.myAPI.getFileData(fileData)
  widgetStore.AddSourceList(currentStateIndex, fileDatas)
}
const deleteFile = (currentStateIndex, fileSrc, sourceFile) => {
  widgetStore.DelSourceList(currentStateIndex, fileSrc, sourceFile)
}
const log = (evt) => {
  console.log(evt)
  console.log('widgetListData', widgetListData)
}
function checkAndReplaceValue(value) {
  const regex = /^\d+$/ // 條件：只允許數字

  if (!regex.test(value)) {
    // 如果不符合條件，返回 3
    return '3'
  } else if (Number(value) < 3) { // 新增條件：不能小於 3
    return '3'
  }

  return value
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

<template>
  <div class="row flex q-py-md" style="border-bottom: 1px solid #eaeaea;"
    v-for="(state, Index) in widgetListData[currentSection].Content.State" :key="state.id">
    <div class="col-2">
      <q-card flat square bordered horizontal @click="setCurrentState(Index)" class="cursor-pointer">
        <q-img src="" style="">
          <div class="absolute-full flex flex-center bg-gery text-white">
          </div>
          <div v-if="currentState === Index" class="absolute-full text-subtitle2 flex flex-center">
            <q-icon size="16px" name="edit" />
          </div>
        </q-img>
        <q-card-section v-if="state.title !== ''" horizontal class="q-pa-xs">
          <div class="text-subtitle2">{{ state.title }}</div>
        </q-card-section>
        <q-card-section v-else horizontal class="q-pa-xs">
          <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
        </q-card-section>
        <!-- 刪除 -->
        <div v-if="currentStateLength > 1" class="absolute-right del-card">
          <q-btn size="sm" class="" color="negative" round dense icon="clear" @click="delState(state.id)" />
        </div>
      </q-card>
    </div>
    <div class="col-4 q-pl-md">
      <q-item-label header class="q-pt-none q-pb-xs">
        State settings
      </q-item-label><q-separator />
      <ConnectionSettingList />
    </div>
    <div class="col-6 q-pl-md">
      <q-item-label header class="q-pt-none q-pb-xs">
        Source
      </q-item-label><q-separator />

    </div>
  </div>
</template>

<script>
import ConnectionSettingList from './ConnectionSettingList.vue'
import { defineComponent, ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
// import { ref, nextTick, computed, toRef } from 'vue'
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const widgetListData = computed(() => widgetStore.GetWidgetListData)
const currentState = computed(() => widgetStore.GetCurrentState)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentSection = computed(() => layoutStore.GetCurrentSection)
const addState = () => {
  widgetStore.AddState()
}
const setCurrentState = (Index) => {
  widgetStore.SetCurrentState(Index)
}
const delState = (id) => {
  widgetStore.DelState(id)
}
export default defineComponent({
  name: 'ContentSetting',
  components: {
    ConnectionSettingList
  },
  setup() {
    return {
      addState,
      setCurrentState,
      delState,
      currentState,
      currentStateLength,
      widgetListData,
      currentSection,
      expandedContent: ref(true),
      showEdit: ref(false),
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

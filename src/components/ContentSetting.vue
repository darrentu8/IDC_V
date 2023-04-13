<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center head-title">
        <div class="col-12">
          Souce library
        </div>
        <q-btn color="grey" round flat dense :icon="expandedContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedContent = !expandedContent" />
      </q-item-label>

      <div class="col-12">
        <q-slide-transition>
          <div v-show="expandedContent" class="row q-py-md no-wrap"
            style="max-height: 170px; overflow-y: hidden; overflow-x: scroll;">
            <q-card v-for="(state, Index) in widgetListData[currentSection].Content.State" :key="state.id" flat square
              bordered horizontal @click="setCurrentState(Index)" class="cursor-pointer flowBox q-ml-md">
              <q-img src="" style="min-height: 98.69px;">
                <div class="absolute-full flex flex-center bg-gery text-white">
                </div>
                <div v-if="currentState === Index" class="absolute-full text-subtitle2 flex flex-center">
                  <q-icon size="22px" name="edit" />
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
            <q-card flat square bordered horizontal class="flowBox q-ml-md">
              <q-btn @click="addState()" flat size="22px" class="q-px-xl q-py-xs full-width full-height" color="grey-5"
                icon="add" />
            </q-card>
          </div>
        </q-slide-transition>
      </div>
    </q-list>
  </div>
</template>

<script>
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

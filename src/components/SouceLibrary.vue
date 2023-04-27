<template>
  <div class="row">
    <div v-if="widgetListData[currentSection]._ContentType" class="col-4">
      <SettingList />
    </div>
    <div :class="[widgetListData[currentSection]._ContentType ? 'col-8' : 'col-12']">
      <div class="row flex q-pb-lg border-b" v-for="(state, Index) in widgetListData[currentSection].Content.State"
        :key="state._id">
        <div :class="[widgetListData[currentSection]._ContentType ? 'col-3' : 'col-3 q-pl-md']">
          <q-card flat square bordered horizontal class="q-mt-lg cursor-pointer flowBox">
            <q-img src="" style="">
              <div class="absolute-full flex flex-center bg-gery text-white">
              </div>
            </q-img>
            <q-card-section v-if="state._title !== ''" horizontal class="q-pa-xs">
              <div class="text-subtitle2">{{ state._title }}</div>
            </q-card-section>
            <q-card-section v-else horizontal class="q-pa-xs">
              <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
            </q-card-section>
            <!-- 刪除 -->
            <div v-if="currentStateLength > 1" class="absolute-right del-card">
              <q-btn size="sm" class="" color="negative" round dense icon="clear" @click="delState(state._id)" />
            </div>
          </q-card>
          <!-- <q-card flat square bordered horizontal @click="setCurrentState(Index)" class="q-mt-lg cursor-pointer">
            <q-img src="" style="">
              <div class="absolute-full flex flex-center bg-gery text-white">
              </div>
              <div v-if="currentState === Index" class="absolute-full text-subtitle2 flex flex-center">
                <q-icon size="16px" name="edit" />
              </div>
            </q-img>
            <q-card-section v-if="state._title !== ''" horizontal class="q-pa-xs">
              <div class="text-subtitle2">{{ state._title }}</div>
            </q-card-section>
            <q-card-section v-else horizontal class="q-pa-xs">
              <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
            </q-card-section>
            <div v-if="currentStateLength > 1" class="absolute-right del-card">
              <q-btn size="sm" class="" color="negative" round dense icon="clear" @click="delState(state._id)" />
            </div>
          </q-card> -->
        </div>
        <div class="col-9 q-px-md">
          <SourceManager />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SettingList from './SettingList.vue'
import SourceManager from './SourceManager.vue'
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
    SettingList,
    SourceManager
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
      showEdit: ref(false)

    }
  }

})
</script>

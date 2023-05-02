<template>
  <div class="row">
    <div class="col-12">
      <div class="row flex q-pb-lg q-mb-md border-w"
        v-for="(state, Index) in widgetListData[currentSection].Content.State" :key="state._id">
        <div :class="[widgetListData[currentSection]._ContentType ? 'col-3' : 'col-3']">
          <q-card bordered class="q-mt-lg q-mx-auto cursor-pointer flowBox">
            <q-icon size="lg" name="img:/icon/mark.svg" class="q-mt-xs flag">
            </q-icon>
            <q-card-section v-if="state._title !== ''" class="q-pa-xs">
              <div class="text-subtitle2">{{ state._title }}</div>
            </q-card-section>
            <q-card-section v-else class="q-pa-xs">
              <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
            </q-card-section>
            <!-- 刪除 -->
            <div v-if="currentStateLength > 1" class="absolute-right del-card">
              <q-btn size="sm" class="" color="negative" round dense icon="clear" @click="delState(state._id)" />
            </div>
          </q-card>
        </div>
        <div class="col-9 q-px-md">
          <SourceManager :File="state.File" :currentStateIndex='Index' />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
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

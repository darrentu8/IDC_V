<template>
  <div class="col-6">
    <div v-for="(stateData, Index) in widgetListData[currentSection].Content.State" :key="stateData._id"
      class="flowBoxWrap border-b">
      <div class="row justify-center items-top q-pt-md">
        <!-- Flow Labels -->
        <div class="flex text-center" style="min-height: 139px;">
          <q-chip v-if="Index == 0" class="q-mx-lg" style="margin-top:50px;">Default</q-chip>
          <q-chip v-else class="q-mx-lg" style="margin-top:50px;">Flow {{ Index }}</q-chip>
          <q-card flat square bordered horizontal class="flowBox" @click="setCurrentState(Index)">
            <q-img src="" style="">
              <div class="absolute-full flex flex-center bg-gery text-white">
              </div>
              <div v-if="currentState === Index" class="absolute-full text-subtitle2 flex flex-center">
                <q-icon size="16px" name="edit" />
              </div>
            </q-img>
            <q-card-section v-if="stateData._title !== ''" horizontal class="q-pa-xs">
              <div class="text-subtitle2">{{ stateData._title }}</div>
            </q-card-section>
            <q-card-section v-else horizontal class="q-pa-xs">
              <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
            </q-card-section>
          </q-card>
        </div>
        <!-- Flow Events -->
        <div class="no-wrap">
          <div class="flex items-center">
            <div>
              <!-- 有Event -->
              <div>
                <div v-for="(EventData, EventIndex) in stateData.Event" :key="EventData._id"
                  class="flex items-center q-mb-md">
                  <div class="q-mr-md q-ml-lg">
                    <!-- <q-btn v-if="currentEvent === EventData._id" @click="setCurrentEvent(EventIndex, EventData._id)"
                      unelevated class="border-round-select" text-color="grey-7" color="grey-4" round icon="link">
                      <q-badge color="grey" class="link-badge" floating>{{ EventData.Action.length && 0 }}</q-badge>
                    </q-btn>
                    <q-btn v-else @click="setCurrentEvent(EventIndex, EventData._id)" unelevated
                      class="border-round-unselect" text-color="grey-7" color="grey-2" round icon="link">
                      <q-badge color="grey" class="link-badge" floating>{{ EventData.Action.length && 0 }}</q-badge>
                    </q-btn> -->
                    <q-btn :disable="EventData._next_state_id === ''" @click="setCurrentEvent(EventIndex, EventData._id)"
                      unelevated class="border-round-unselect" text-color="grey-7" color="grey-2" round icon="link">
                      <q-badge color="grey" class="link-badge" floating>{{ EventData.Action.length }}</q-badge>
                    </q-btn>
                  </div>
                  <q-card v-if="EventData._next_state_id !== undefined" flat square bordered horizontal
                    class="flowBox q-ml-md select">
                    <q-btn v-if="EventData._next_state_id !== ''" flat size="16px" class="full-width full-height"
                      color="grey-5">{{
                        mapCurrentStateOptions(EventData._next_state_id) }}</q-btn>
                    <q-btn v-else flat size="16px" class="full-width full-height" color="grey-5" icon="add" />
                    <q-popup-edit v-model="EventData._next_state_id" v-slot="scope">
                      <q-select v-model="scope.value" :options="currentStateOptions" option-value="_stateIndex"
                        option-label="_title" dense autofocus
                        @update:model-value="setFlowState(Index, EventIndex, scope.value)" />
                    </q-popup-edit>
                    <!-- 刪除 -->
                    <div class="absolute-right del-card">
                      <q-btn size="sm" class="" color="negative" round dense icon="clear"
                        @click="delStateEvent(EventData._id, Index, EventIndex)" />
                    </div>
                  </q-card>
                  <q-card v-else flat square bordered horizontal class="flowBox q-ml-md select">
                    <q-btn flat size="16px" class="full-width full-height" color="grey-5" icon="add" />
                    <q-popup-edit v-model="EventData._next_state_id" v-slot="scope">
                      <q-select v-model="scope.value" :options="currentStateOptions" option-value="_stateIndex"
                        option-label="_title" dense autofocus
                        @update:model-value="setFlowState(Index, EventIndex, scope.value)" />
                    </q-popup-edit>
                    <!-- 刪除 -->
                    <div class="absolute-right del-card">
                      <q-btn size="sm" class="" color="negative" round dense icon="clear"
                        @click="delStateEvent(EventData._id, Index, EventIndex)" />
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 刪除 state -->
      <!-- <div class="absolute-right q-ma-xs">
        <q-btn class="" color="grey" round flat dense icon="clear" @click="delFlow(Index, EventIndex)" />
      </div> -->
      <!-- Add Flow Btn -->
      <div flat square class="text-center q-mb-md">
        <q-btn @click="addStateEvent(Index)" unelevated round dense color="grey-2" text-color="positive" icon="add" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'

const popEdit = ref(true)
// const sectionData = ref([
//   { x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }
// ])
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const currentState = computed(() => widgetStore.GetCurrentState)
// const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
// const currentEvent = computed(() => eventStore.GetCurrentEvent)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
const setCurrentState = (Index) => {
  widgetStore.SetCurrentState(Index)
}
const setFlowState = (Index, EventIndex = 0, currentStateData) => {
  widgetStore.SetFlowState(Index, EventIndex, currentStateData)
  popEdit.value = false
}
const setCurrentEvent = (Index, id) => {
  eventStore.SetCurrentEvent(id)
  eventStore.SetCurrentEventIndex(Index)
}
const addStateEvent = (Index) => {
  widgetStore.AddStateEvent(Index)
}
// const delFlow = (ID, Index, EventIndex) => {
//   widgetStore.DelFlow(ID, Index, EventIndex)
// }
const delStateEvent = (ID, Index, EventIndex) => {
  widgetStore.DelStateEvent(ID, Index, EventIndex)
}
const mapCurrentStateOptions = computed(() => {
  return function (stateIndex) {
    const Data = currentStateOptions.value.filter(e => e._stateIndex === stateIndex)
    return Data[0]._title
  }
})
</script>
<style lang="scss"></style>

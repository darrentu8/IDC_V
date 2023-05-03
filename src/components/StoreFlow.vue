<template>
  <div class="col-6">
    <div v-for="(stateData, Index) in widgetListData[currentSection].Content.State" :key="stateData._id"
      class="flowBoxWrap border-w">
      <div class="row justify-center items-top q-pt-md">
        <!-- Flow Labels -->
        <div class="flex text-center" style="min-height: 139px;">
          <q-chip v-if="Index == 0" class="q-mr-md" text-color="white" color="grey-5"
            style="margin-top:35px;margin-left: -20px;">Default</q-chip>
          <q-chip v-else class="q-mr-md" text-color="white" color="grey-5"
            style="margin-top:35px;margin-left: -20px;">Flow {{ Index
            }}</q-chip>
          <q-card bordered class="flowBox">
            <q-icon size="lg" name="img:/icon/mark.svg" class="q-mt-xs flag">
            </q-icon>
            <q-card-section v-if="stateData._title !== ''" class="q-pa-xs">
              <div class="text-subtitle2">{{ stateData._title }}</div>
            </q-card-section>
            <q-card-section v-else class="q-pa-xs">
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
                <div v-for="(EventData, EventIndex) in filterStateEvents(stateData)" :key="EventData._id"
                  class="flex items-center q-mb-md">
                  <div class="q-mr-md q-ml-lg">
                    <!-- link -->
                    <q-btn v-if="currentEvent === EventData._id" :disable="EventData._next_state_id === ''"
                      @click="setCurrentEvent(Index, EventData._id)" unelevated class="border-round-select"
                      text-color="white" color="primary" round icon="img:/icon/link.svg">
                      <q-badge color="primary" class="link-badge" floating>{{ EventData.length && 0 }}</q-badge>
                    </q-btn>
                    <q-btn v-else :disable="EventData._next_state_id === ''"
                      @click="setCurrentEvent(Index, EventData._id)" unelevated class="border-round-select"
                      text-color="white" color="grey-6" round icon="img:/icon/link.svg">
                      <q-badge color="primary" class="link-badge" floating>{{ EventData.length && 0 }}</q-badge>
                    </q-btn>
                  </div>
                  <!-- state -->
                  <q-card v-if="EventData._next_state_id !== undefined" bordered class="flowBox q-ml-md select">
                    <q-icon v-if="EventData._next_state_id !== ''" size="lg" name="img:/icon/mark.svg"
                      class="q-mt-xs flag">
                    </q-icon>
                    <q-btn v-if="EventData._next_state_id !== ''" flat color="primary" class="text-capitalize">{{
                      mapCurrentStateOptions(EventData._next_state_id) }}</q-btn>
                    <q-btn v-else flat class="full-width" color="grey-6" icon="add" />
                    <q-popup-edit v-model="EventData._next_state_id" v-slot="scope">
                      <q-select v-model="scope.value" :options="filterCurrentStateOptions(stateData)"
                        option-value="_stateIndex" option-label="_title" dense autofocus
                        @update:model-value="setFlowState(Index, EventData._id, scope.value)" />
                    </q-popup-edit>
                    <!-- 刪除 -->
                    <div class="absolute-right del-card">
                      <q-btn size="sm" class="" color="negative" round dense icon="clear"
                        @click="delStateEvent(EventData._id, Index, EventIndex)" />
                    </div>
                  </q-card>
                  <q-card v-else bordered class="flowBox q-ml-md select">
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
      <div v-if="currentStateLength > 1" class="absolute-right q-ma-xs">
        <q-btn class="" color="grey" round flat dense icon="clear" @click="delState(stateData._id)" />
      </div>
      <!-- Add Flow Btn -->
      <div v-if="stateData.Event.length < currentStateLength" flat square class="text-center q-mb-md">
        <q-btn @click="addStateEvent(Index)" unelevated round dense color="grey-2" text-color="grey-6" icon="add" />
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
// const currentState = computed(() => widgetStore.GetCurrentState)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
const currentEvent = computed(() => eventStore.GetCurrentEvent)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
// const setCurrentState = (Index) => {
//   widgetStore.SetCurrentState(Index)
// }
const setFlowState = (Index, EventIndex = 0, currentStateData) => {
  widgetStore.SetFlowState(Index, EventIndex, currentStateData)
  popEdit.value = false
}
const setCurrentEvent = (stateIndex, eventId) => {
  console.log('stateIndex', stateIndex)
  console.log('eventId', eventId)
  widgetStore.SetCurrentState(stateIndex)
  widgetStore.SetCurrentEventData(stateIndex, eventId)
  eventStore.SetCurrentEvent(eventId)
}
const addStateEvent = (Index) => {
  widgetStore.AddStateEvent(Index)
}
const delState = (ID) => {
  widgetStore.DelState(ID)
}
const delStateEvent = (ID, Index, EventIndex) => {
  widgetStore.DelStateEvent(ID, Index, EventIndex)
}
const mapCurrentStateOptions = computed(() => {
  return function (stateIndex) {
    const Data = currentStateOptions.value.filter(e => e._stateIndex === stateIndex)
    return Data[0]._title
  }
})
const filterCurrentStateOptions = computed(() => {
  return function (stateData) {
    const differentIdElements = currentStateOptions.value.filter(
      option => !stateData.Event.some(event => event._stateId === option._id)
    )
    return differentIdElements
  }
})
const filterStateEvents = computed(() => {
  return function (stateData) {
    const eventData = stateData.Event
    const nextIdCounts = {}
    for (let i = 0; i < eventData.length; i++) {
      const nextId = eventData[i]._next_state_id
      if (!nextIdCounts[nextId]) {
        nextIdCounts[nextId] = [eventData[i]]
      } else {
        nextIdCounts[nextId].push(eventData[i])
      }
    }
    console.log(nextIdCounts)
    return nextIdCounts
  }
})
</script>
<style lang="scss"></style>

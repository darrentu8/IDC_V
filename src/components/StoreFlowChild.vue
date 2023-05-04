<template>
  <div>
    <div v-for="(EventData, EventIndex) in filterStateEvents" :key="EventData._id" class="flex items-center q-mb-md">
      <div class="q-mr-md q-ml-lg">
        <!-- link -->
        <q-btn v-if="currentEvent === EventData._id" :disable="EventData._next_state_id === ''"
          @click="setCurrentEvent(Index, EventData._id)" unelevated class="border-round-select" text-color="white"
          color="primary" round icon="img:/icon/link.svg">
          <q-badge color="primary" class="link-badge" floating>{{ EventData.sameNextStateIdCount ?
            EventData.sameNextStateIdCount : 0
          }}</q-badge>
        </q-btn>
        <q-btn v-else :disable="EventData._next_state_id === ''" @click="setCurrentEvent(Index, EventData._id)" unelevated
          class="border-round-select" text-color="white" color="grey-6" round icon="img:/icon/link.svg">
          <q-badge color="primary" class="link-badge" floating>{{ EventData.sameNextStateIdCount ?
            EventData.sameNextStateIdCount : 0
          }}</q-badge>
        </q-btn>
      </div>
      <!-- state -->
      <q-card v-if="EventData._next_state_id !== undefined" bordered class="flowBox q-ml-md select">
        <q-icon v-if="EventData._next_state_id !== ''" size="lg" name="img:/icon/mark.svg" class="q-mt-xs flag">
        </q-icon>
        <q-btn v-if="EventData._next_state_id !== ''" flat color="primary" class="text-capitalize">{{
          mapCurrentStateOptions(EventData._next_state_id) }}</q-btn>
        <q-btn v-else flat class="full-width" color="grey-6" icon="add" />
        <q-popup-edit v-model="EventData._next_state_id" v-slot="scope">
          <q-select v-model="scope.value" :options="filterCurrentStateOptions(filterStateEvents)"
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
          <q-select v-model="scope.value" :options="currentStateOptions" option-value="_stateIndex" option-label="_title"
            dense autofocus @update:model-value="setFlowState(Index, EventData._id, scope.value)" />
        </q-popup-edit>
        <!-- 刪除 -->
        <div class="absolute-right del-card">
          <q-btn size="sm" class="" color="negative" round dense icon="clear"
            @click="delStateEvent(EventData._id, Index, EventIndex)" />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'
const props = defineProps(['eventData', 'Index'])
const filterStateEvents = ref(null)
const popEdit = ref(true)
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
const currentEvent = computed(() => eventStore.GetCurrentEvent)
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
  return function (EventData) {
    const differentIdElements = currentStateOptions.value.filter(
      option => !EventData.some(event => event._stateId === option._id)
    )
    return differentIdElements
  }
})

watch(
  () => props.eventData,
  newVal => {
    const eventData = newVal

    const seenStates = {}
    const resultEventData = []

    for (let i = 0; i < eventData.length; i++) {
      const event = eventData[i]
      if (!event._next_state_id && event._next_state_id !== 0) {
        // 将 _next_state_id 为空的 Event 直接加入结果中
        event.sameNextStateIdCount = 1
        resultEventData.push(event)
      } else {
        if (seenStates[event._next_state_id] !== undefined) {
          // 如果已经出现过相同 _next_state_id 的 Event，仅更新数量
          eventData[seenStates[event._next_state_id]].sameNextStateIdCount += 1
        } else {
          // 否则将当前 Event 加入结果中，并记录下标和数量
          seenStates[event._next_state_id] = i
          event.sameNextStateIdCount = 1
          resultEventData.push(event)
        }
      }
    }
    filterStateEvents.value = resultEventData
    console.log('filterStateEvents.value', filterStateEvents.value)
  },
  { immediate: true, deep: true }
)

// const filterStateEvents = computed(() => {
//   return function (stateData) {
//     const eventData = stateData.Event
//     const seenStates = {}
//     let nextIndex = 0

//     return eventData
//       // eslint-disable-next-line array-callback-return
//       .map(event => {
//         if (!event._next_state_id && event._next_state_id !== 0) {
//           // 将 _next_state_id 为空的 Event 直接加入结果中
//           event.sameNextStateIdCount = 1
//           return event
//         } else {
//           // 检查是否已经出现过相同 _next_state_id 的 Event
//           const index = seenStates[event._next_state_id]
//           if (index !== undefined) {
//             // 如果已经出现过相同 _next_state_id 的 Event，仅更新数量
//             eventData[index].sameNextStateIdCount += 1
//           } else {
//             // 否则将当前 Event 加入结果中，并记录下标和数量
//             seenStates[event._next_state_id] = nextIndex++
//             event.sameNextStateIdCount = 1
//             return event
//           }
//         }
//       })
//       .filter(event => !!event) // 过滤掉空的 Event
//   }
// })

</script>
<style lang="scss"></style>

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
              <div v-if="renderList">
                <StoreFlowChild :eventData="stateData.Event" :Index="Index" />
              </div>
              <div v-else>
                <q-spinner-hourglass color="primary" size="2em"></q-spinner-hourglass>
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
import { computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
// import { useEventListStore } from 'src/stores/event'
import StoreFlowChild from './StoreFlowChild.vue'

// const popEdit = ref(true)
// const sectionData = ref([
//   { x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }
// ])
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
// const eventStore = useEventListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
// const currentState = computed(() => widgetStore.GetCurrentState)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
// const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
// const currentEvent = computed(() => eventStore.GetCurrentEvent)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
// const setCurrentState = (Index) => {
//   widgetStore.SetCurrentState(Index)
// }
const addStateEvent = (Index) => {
  widgetStore.AddStateEvent(Index)
}
const delState = (ID) => {
  widgetStore.DelState(ID)
}
const renderList = computed(() => widgetStore.GetRenderList)
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

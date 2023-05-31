<template>
  <div class="col-6">
    <div v-if="widgetListData[currentSection].Content.State">
      <div v-for="(stateData, Index) in calcDiff(widgetListData[currentSection].Content.State)" :key="stateData._uuid"
        class="flowBoxWrap border-w">
        <div class="row justify-center items-top q-py-md">
          <!-- Flow Labels -->
          <div class="flex text-center" style="min-height: 139px;">
            <q-chip class="q-mr-md theme-chip" text-color="white" color="grey-5" style="margin-left: -20px;">{{
              stateData._flowName }}</q-chip>
            <q-popup-edit ref="popFlowEdit" v-model="stateData._flowName" v-slot="scope"
              class="theme-border q-pt-none pop-edit">
              <q-input class="" rows="2" type="textarea" v-model="scope.value" autofocus>
                <template v-slot:after>
                  <q-btn class="q-mt-md" flat dense color="primary" icon="check_circle"
                    @click.stop.prevent="setVal(Index, scope.value)"
                    :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                </template>
              </q-input>
            </q-popup-edit>
            <q-card bordered class="flowBox">
              <img src="~assets/icon/mark.svg" class="q-mt-xs flag" />
              <q-card-section v-if="stateData._name !== ''" class="q-pa-xs">
                <div class="text-subtitle2 ellipsis-2-lines maxW">{{ stateData._name }}</div>
              </q-card-section>
              <q-card-section v-else class="q-pa-xs">
                <div class="text-subtitle2 ellipsis-2-lines maxW">State {{ Number(Index + 1) }}</div>
              </q-card-section>
              <!-- 刪除 -->
              <div v-if="currentStateLength > 1" class="absolute-right del-card">
                <q-btn size="sm" class="" color="negative" round dense icon="clear"
                  @click="delState(stateData._uuid, stateData._id)" />
              </div>
            </q-card>
          </div>
          <!-- Flow Events -->
          <div class="no-wrap">
            <div class="flex items-center">
              <div>
                <!-- 有Event -->
                <div v-if="stateData">
                  <div v-for="(EventData, EventIndex) in transformEventData(stateData.Event)" :key="EventData._id"
                    class="flex items-center q-mb-md">
                    <div class="q-mr-md q-ml-lg">
                      <!-- link -->
                      <q-btn v-if="currentEvent === EventData._id" :disable="EventData._next_state_id === ''"
                        @click="setCurrentEvent(Index, EventData._next_state_id, EventData._id)" unelevated
                        class="border-round-select" text-color="white" color="primary" round><img
                          src="~assets/icon/link.svg" />
                        <q-badge color="primary" class="link-badge" floating>{{ EventData._sameNextStateIdCount ?
                          EventData._sameNextStateIdCount : 0
                        }}</q-badge>
                      </q-btn>
                      <q-btn v-else :disable="EventData._next_state_id === ''"
                        @click="setCurrentEvent(Index, EventData._next_state_id, EventData._id)" unelevated
                        class="border-round-select" text-color="white" color="grey-6" round><img
                          src="~assets/icon/link.svg" />
                        <q-badge color="primary" class="link-badge" floating>{{ EventData._sameNextStateIdCount ?
                          EventData._sameNextStateIdCount : 0
                        }}</q-badge>
                      </q-btn>
                    </div>
                    <!-- state -->
                    <q-card v-if="EventData._next_state_id !== undefined" bordered class="flowBox q-ml-md select">
                      <img v-if="EventData._next_state_id !== ''" src="~assets/icon/mark.svg" class="q-mt-xs flag" />
                      <div v-if="EventData._next_state_id !== ''"
                        class="cursor-pointer text-subtitle2 ellipsis-2-lines maxW">{{
                          mapCurrentStateOptions(EventData._next_state_id) }}</div>
                      <q-btn v-else flat class="full-width full-heigth theme-border" color=" grey-6" icon="add" />
                      <q-popup-edit v-model="EventData._next_state_id" v-slot="scope" class="theme-border">
                        <q-select v-model="scope.value" :options="filterCurrentStateOptions(stateData)" option-value="_id"
                          option-label="_name" dense autofocus
                          @update:model-value="setFlowState(Index, EventData._id, scope.value)" />
                      </q-popup-edit>
                      <!-- 刪除 -->
                      <div class="absolute-right del-card">
                        <q-btn size="sm" class="" color="negative" round dense icon="clear"
                          @click.stop="delAllStateEvent(EventData._next_state_id, Index, EventIndex)" />
                      </div>
                    </q-card>
                    <q-card v-else bordered class="flowBox q-ml-md select">
                      <q-btn flat size="16px" class="full-width full-heigth theme-border ellipsis-2-lines maxW"
                        color="grey-5" icon="add" />
                      <q-popup-edit v-model="EventData._next_state_id" v-slot="scope" class="theme-border">
                        <q-select v-model="scope.value" :options="currentStateOptions" option-value="_id"
                          option-label="_name" dense autofocus
                          @update:model-value="setFlowState(Index, EventIndex, scope.value)" />
                      </q-popup-edit>
                      <!-- 刪除 -->
                      <div class="absolute-right del-card" style="pointer-events: none;">
                        <q-btn size="sm" class="" color="negative" round dense icon="clear"
                          @click.stop="delAllStateEvent(EventData._next_state_id, Index, EventIndex)" />
                      </div>
                    </q-card>
                  </div>
                </div>
                <div class="empty">
                  <q-card class="flowBox select"
                    v-if="stateData._emptyNextStateCount < 1 && stateData._uniqueNextStateIdsCount + 1 <= stateData._totalStateDataLength">
                    <q-btn flat size="20px" class="full-width full-heigth theme-border add" color="primary"
                      label="Define the next state" icon="add" @click="addStateEvent(Index)" />
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 刪除 state -->
        <!-- <div v-if="currentStateLength > 1" class="absolute-right q-ma-xs">
          <q-btn class="" color="grey" round flat dense icon="clear" @click="delState(stateData._uuid)" />
        </div> -->
      </div>
    </div>
  </div>
  <DelDialog />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'
import DelDialog from './dialog/DelDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()

const popEdit = ref(null)
// const sectionData = ref([
//   { x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }
// ])
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
const currentEvent = computed(() => eventStore.GetCurrentEvent)
const widgetListData = computed(() => widgetStore.GetWidgetListData)

const popFlowEdit = ref(false)
const setFlowState = (Index, EventIndex = 0, selectStateData) => {
  widgetStore.SetFlowState(Index, EventIndex, selectStateData)
  popEdit.value = false
}
const setCurrentEvent = (stateIndex, next_state_id, eventId) => {
  widgetStore.SetCurrentState(stateIndex)
  widgetStore.SetCurrentStateId(next_state_id)
  widgetStore.SetCurrentEventData(stateIndex, next_state_id, eventId)
  eventStore.SetCurrentEvent(eventId)
}
const addStateEvent = (Index) => {
  widgetStore.AddStateEvent(Index)
}
const delState = (UUID, _id) => {
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this flow?',
      message: 'This means whole events, actions and states, Including orignal source, will be removed from this playlist.  ',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelState(UUID, _id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
const setVal = (stateIndex, val) => {
  console.log('val', val)
  widgetStore.SetStateFlowName(stateIndex, val)
  console.log('popFlowEdit.value', popFlowEdit.value)
}
const delAllStateEvent = (next_state_id, Index, EventIndex) => {
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this Event?',
      message: 'This means whole events and actions, will be removed from this playlist.',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelAllStateEvent(next_state_id, Index, EventIndex)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
const mapCurrentStateOptions = computed(() => {
  return function (next_state_id) {
    const Data = currentStateOptions.value.filter(e => e._id === next_state_id)
    console.log('Data', Data)
    if (Data && Data.length) {
      return Data[0]._name
    } else {
      return ''
    }
  }
})
const filterCurrentStateOptions = computed(() => {
  return function (stateData) {
    console.log('stateData', stateData)
    const differentIdElements = currentStateOptions.value.filter(
      option => !stateData.Event.some(event => event._next_state_id === option._id)
    )
    return differentIdElements
  }
})
function calcDiff(stateData = null) {
  if (!stateData || stateData.length === 0) {
    console.log('Error: stateData is not defined or empty')
    return null
  }

  const totalLength = stateData.length

  stateData = stateData.map(item => {
    const nextStateIds = new Set()
    let emptyNextStateCount = 0
    let eventCount = 0

    if (Array.isArray(item.Event)) {
      item.Event.forEach(event => {
        if (event._next_state_id !== '') {
          nextStateIds.add(event._next_state_id)
        } else {
          emptyNextStateCount++
        }
        eventCount++
      })
    }

    return {
      ...item,
      _totalStateDataLength: totalLength,
      _uniqueNextStateIdsCount: nextStateIds.size,
      _emptyNextStateCount: emptyNextStateCount,
      _eventCount: eventCount
    }
  })

  console.log('stateData', stateData)
  return stateData
}
function transformEventData(EventData = {}) {
  console.log('transformEventData', EventData)

  if (!Array.isArray(EventData) || EventData.length === 0) {
    console.log('Error: EventData is not an array or is empty')
    return []
  }

  const result = EventData.reduce((acc, obj) => {
    if (obj._next_state_id === '') {
      acc.push({ ...obj, _sameNextStateIdCount: 1 })
    } else if (!acc.some(item => item._next_state_id === obj._next_state_id)) {
      const _sameNextStateIdCount = EventData.filter(item => item._next_state_id === obj._next_state_id).length
      acc.push({ ...obj, _sameNextStateIdCount })
    }
    return acc
  }, [])

  console.log('result', result)
  return result
}

</script>
<style lang="scss"></style>

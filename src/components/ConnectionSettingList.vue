<template>
  <div v-if="!loading" class="q-pa-md" style="height: 100vh;">
    <q-scroll-area style="height: calc(100% - 80px);">
      <q-item-label class="border-b text-dark text-bold relative-position" header>Connection setting (State {{
        currentState
        + 1 }})
        <q-btn v-if="stateEventData.length" label="Add New Event" @click="addStateEventSame(currentState)" flat
          class="theme-tab-btn" color="primary">
          <q-icon name="add" class="q-ml-xs"></q-icon>
        </q-btn>
      </q-item-label>
      <div v-if="stateEventData.length">
        <div class="row col-12 q-pb-md"
          v-for="(EventData, EventIndex) in transformEventData(stateEventData, currentStateId)" :key="EventData._id">
          <div v-if="EventData._stateId === currentStateId" class="row border-b col-12 q-pb-md">
            <div class="row col-12 items-top q-pt-md">
              <div class="col-6 q-pt-sm">
                <div class="col-12">
                  <q-item-label class="relative-position" header>{{ EventIndex + 1 }} Event
                  </q-item-label>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-9">
                      <q-item-label class="">
                        <q-select :disable="EventData._next_state_id === ''" filled dense v-model="EventData._gpio_number"
                          :options="eventOptions" label="Event" />
                      </q-item-label>
                    </div>
                    <div class="col-3 text-center">
                      <q-btn label="" size="md" @click="delEvent(EventData._id)" round flat class="" color="red"
                        icon="delete_outline" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 q-pt-sm">
                <div class="col-12">
                  <q-item-label class="relative-position" header>Action
                    <q-btn label="" @click="addAction(EventData._id)" flat class="theme-tab-btn" color="grey-6">
                      <q-icon name="add" class="q-ml-xs"></q-icon>
                    </q-btn>
                  </q-item-label>
                </div>
                <div v-if="EventData.Action.length" class="col-12 items-center">
                  <div v-for="(actionData) in EventData.Action" :key="actionData._id" class="row q-mb-md">
                    <div class="col-8">
                      <q-item-label class="q-pl-md">
                        <q-select :disable="EventData._next_state_id === ''" filled dense v-model="actionData._type"
                          :options="actionOptions" label="Action 1" />
                      </q-item-label>
                    </div>
                    <div class="col-4 flex justify-center items-center">
                      <q-btn label="" size="md" @click="delAction(EventData._id, actionData._id)" round flat class=""
                        color="red" icon="delete_outline" />
                    </div>
                  </div>
                  <!-- <q-btn label="" size="md" @click="addAction(EventData._id)" round flat class="" color="primary"
                    icon="add" /> -->
                </div>
                <div v-else class="col-12 flex justify-center">
                  <!-- <q-btn :disable="EventData._next_state_id === ''" label="" size="md" @click="addAction(EventData._id)"
                    round flat class="" color="primary" icon="add" /> -->
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="justify-center flex items-center" style="height: 200px;">
        <div class="text-grey">
          Please add state{{ currentState + 1 }} event first
        </div>
      </div>
    </q-scroll-area>
  </div>
  <div v-else>
    <div class="my-3 d-flex justify-center align-items-center">
      <q-spinner color="grey-2" size="3em" :thickness="2" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'
// import { useLayoutStore } from 'src/stores/layout'
// const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
// const currentSection = computed(() => layoutStore.GetCurrentSection)
const loading = computed(() => widgetStore.GetLoading)
const currentState = computed(() => widgetStore.GetCurrentState)
const currentStateId = computed(() => widgetStore.GetCurrentStateId)
// const widgetListData = computed(() => widgetStore.GetWidgetListData)
const stateEventData = computed(() => widgetStore.GetStateEventData)

// const currentEvent = computed(() => eventStore.GetCurrentEvent)
// const currentEventIndex = computed(() => eventStore.currentEventIndex)
const eventOptions = computed(() => eventStore.GetEventOptions)
const actionOptions = computed(() => eventStore.GetActionOptions)

// const addEvent = (currentEvent, Index) => {
//   widgetStore.AddEvent(currentEvent, Index)
// }
// const delEvent = (currentEvent, Index) => {
//   widgetStore.DelEvent(currentEvent, Index)
// }

const addStateEventSame = async (currentState) => {
  widgetStore.SetLoading(true)
  widgetStore.AddStateEventSame(currentState)
  await nextTick()
  widgetStore.SetLoading(false)
}
const addAction = (EventId) => {
  widgetStore.AddAction(EventId)
}
const delAction = (EventId, ActionId) => {
  widgetStore.DelAction(EventId, ActionId)
}
const delEvent = (EventId) => {
  widgetStore.DelEvent(EventId)
}
function transformEventData(eventData, currentStateId) {
  console.log('eventData', eventData)
  console.log('currentStateId', currentStateId)
  const resultEvent = eventData.filter(obj => obj._stateId === currentStateId)

  console.log('resultEvent', resultEvent)
  return resultEvent
}

</script>

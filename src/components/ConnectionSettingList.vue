<template>
  <div class="q-pa-md" style="height: 100vh;">
    <q-item-label class="border-b text-dark text-bold" header>Connection setting (State {{ currentState + 1 }})
      <!-- <q-btn label="New event" v-on:click="selectFile()" flat class="theme-tab-btn" color="primary" icon="add"
        style="height: 49.8px;margin-top: -16px;" /> -->
    </q-item-label>
    <div v-if="widgetListData[currentSection].Content.State[currentState].Event.length">
      <div class="row border-b q-pb-md"
        v-for="(EventData, EventIndex) in widgetListData[currentSection].Content.State[currentState].Event"
        :key="EventData._id">
        <div class="row col-12 items-top q-pt-md">
          <div class="col-1 q-pt-sm">
            {{ EventIndex + 1 }}
          </div>
          <div class="col-4">
            <q-item-label class="">
              <q-select :disable="EventData._next_state_id === ''" filled dense v-model="EventData._gpio_number"
                :options="eventOptions" label="Event" />
            </q-item-label>
          </div>
          <div v-if="EventData.Action.length" class="col-7 items-center">
            <div v-for="(actionData) in EventData.Action" :key="actionData._id" class="row q-mb-md">
              <div class="col-8">
                <q-item-label class="q-pl-md">
                  <q-select :disable="EventData._next_state_id === ''" filled dense v-model="actionData._type"
                    :options="actionOptions" label="Action 1" />
                </q-item-label>
              </div>
              <div class="col-4 flex justify-center items-center">
                <q-btn label="" size="md" @click="delAction(EventIndex, actionData._id)" round flat class="" color="red"
                  icon="delete_outline" />
              </div>
            </div>
            <q-btn label="" size="md" @click="addAction(EventIndex)" round flat class="" color="primary" icon="add" />
          </div>
          <div v-else class="col-7 flex justify-center">
            <q-btn :disable="EventData._next_state_id === ''" label="" size="md" @click="addAction(EventIndex)" round flat
              class="" color="primary" icon="add" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="justify-center flex items-center" style="height: 200px;">
      <div class="text-grey">
        Please add state{{ currentState + 1 }} event first
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'
import { useLayoutStore } from 'src/stores/layout'
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const currentState = computed(() => widgetStore.GetCurrentState)
const widgetListData = computed(() => widgetStore.GetWidgetListData)

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
const addAction = (EventIndex) => {
  widgetStore.AddAction(EventIndex)
}
const delAction = (EventIndex, id) => {
  widgetStore.DelAction(EventIndex, id)
}
</script>

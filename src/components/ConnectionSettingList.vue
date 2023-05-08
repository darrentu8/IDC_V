<template>
  <div v-if="!loading" class="q-pa-md" style="height: 100vh;">
    <q-scroll-area style="height: calc(100% - 80px);">
      <q-item-label class="border-b text-dark text-bold relative-position" header>State Transitions
        <q-btn v-if="stateEventData.length" icon="add" label="Add New Event" @click="addStateEventSame(currentState)" flat
          class="theme-tab-btn" color="primary">
        </q-btn>
      </q-item-label>
      <div v-if="stateEventData.length">
        <div class="row col-12" v-for="(EventData, EventIndex) in transformEventData(stateEventData, currentStateId)"
          :key="EventData._id">
          <div v-if="EventData._stateId === currentStateId" class="row border-b col-12 q-pl-sm q-pb-md">
            <div class="row col-12 items-top">
              <div class="col-6">
                <div class="col-12">
                  <q-item-label class="q-pl-none q-pb-sm" header>{{ EventIndex + 1 }}. Event
                  </q-item-label>
                </div>
                <div class="col-12">
                  <!-- Event 選單 -->
                  <q-select class="theme brand-round-m  q-mb-md" bg-color="white" rounded label="Select Type"
                    :disable="EventData._next_state_id === ''" outlined dense v-model="EventData._type" emit-value
                    map-options :options="eventTypeOptions['type']" option-value="value" option-label="text">
                    <template v-slot:after>
                      <q-btn class="q-mr-sm" label="" size="md" @click="delEvent(EventData._id)" round flat color="red"
                        icon="img:/icon/delete.svg" />
                    </template>
                  </q-select>
                  <!-- Event 子選單 -->
                  <q-select v-if="EventData._type == 'gpio'" label="Select Hardware"
                    class="theme brand-round-m sub q-mt-sm" bg-color="white" rounded
                    :disable="EventData._next_state_id === ''" emit-value map-options outlined dense
                    v-model="EventData._gpio_number" :options="eventTypeOptions[EventData._type].hardwareOptions"
                    option-value="value" option-label="text">
                  </q-select>
                  <q-select v-if="EventData._type == 'gpio'" label="Select Key" class="theme brand-round-m sub q-mt-sm"
                    bg-color="white" rounded :disable="EventData._next_state_id === ''" emit-value map-options outlined
                    dense v-model="EventData._key_action" :options="eventTypeOptions[EventData._type].subOptions"
                    option-value="value" option-label="text">
                  </q-select>
                  <q-select v-if="EventData._type == 'rs232'" label="Select Type" class="theme brand-round-m sub q-mt-sm"
                    bg-color="white" rounded :disable="EventData._next_state_id === ''" emit-value map-options outlined
                    dense v-model="EventData._rs232_id" :options="eventTypeOptions[EventData._type].subOptions"
                    option-value="value" option-label="text">
                  </q-select>
                  <q-input v-if="EventData._type == 'rs232'" label="Type command" class="theme brand-round-m sub q-mt-sm"
                    bg-color="white" rounded dense outlined v-model="EventData._input_value" type="text" prefix=""
                    suffix="" />
                  <q-input v-if="EventData._type == 'tcp/ip'" label="Type command" class="theme brand-round-m sub q-mt-sm"
                    bg-color="white" rounded dense outlined v-model="EventData._input_value" type="text" prefix=""
                    suffix="" />
                  <q-input v-if="EventData._type == 'timeout'" label="Duration" class="theme brand-round-m sub q-mt-sm"
                    bg-color="white" rounded dense outlined v-model="EventData._duration" type="number" maxlength="4"
                    min="0" prefix="" suffix="sec" />
                </div>
              </div>
              <div class="col-6">
                <div class="col-12 items-center">
                  <div class="col-12">
                    <q-item-label class="relative-position q-pl-none q-pb-sm" header>Action 1
                      <q-btn label="" @click="addAction(EventData._id)" flat class="theme-tab-btn" color="grey-6">
                        <q-icon name="add" class="q-ml-xs"></q-icon>
                      </q-btn>
                    </q-item-label>
                  </div>
                  <div v-for="(actionData, actionIndex) in EventData.Action" :key="actionData._id" class="row q-mb-md">
                    <div v-if="actionIndex !== 0" class="col-12">
                      <q-item-label class="relative-position q-pt-none q-pl-none q-pb-sm" header>Action {{ actionIndex + 1
                      }}
                      </q-item-label>
                    </div>
                    <div class="col-12">
                      <!-- Action 選單 -->
                      <q-select class="theme brand-round-m" :disable="EventData._next_state_id === ''" label="Select Type"
                        bg-color="white" rounded outlined dense v-model="actionData._type" emit-value map-options
                        :options="actionTypeOptions['type']" option-value="value" option-label="text">
                        <template v-slot:after>
                          <q-btn class="q-mr-sm" label="" size="md" @click="delAction(EventData._id, actionData._id)"
                            round flat color="red" icon="img:/icon/delete.svg" />
                        </template>
                      </q-select>

                      <!-- Action 子選單 -->
                      <q-input v-if="actionData._type" label="Type command" class="theme brand-round-m sub q-mt-sm"
                        bg-color="white" rounded dense outlined v-model="actionData._input_value" type="text" prefix=""
                        suffix="" />
                    </div>
                  </div>
                  <!-- <q-btn label="" size="md" @click="addAction(EventData._id)" round flat class="" color="primary"
                    icon="add" /> -->
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="justify-center flex items-center" style="height: 200px;">
        <div class="text-grey">
          Event has not been selected, or state has not been set.
        </div>
      </div>
    </q-scroll-area>
  </div>
  <div v-else>
    <div class="my-3 d-flex justify-center align-items-center">
      <q-spinner color="grey-2" size="3em" :thickness="2" />
    </div>
  </div>
  <DelDialog />
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { useEventListStore } from 'src/stores/event'
import DelDialog from './dialog/DelDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()
const widgetStore = useWidgetListStore()
const eventStore = useEventListStore()
const loading = computed(() => widgetStore.GetLoading)
const currentState = computed(() => widgetStore.GetCurrentState)
const currentStateId = computed(() => widgetStore.GetCurrentStateId)
const stateEventData = computed(() => widgetStore.GetStateEventData)

const eventTypeOptions = computed(() => eventStore.GetEventTypeOptions)
const actionTypeOptions = computed(() => eventStore.GetActionTypeOptions)

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
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this action?',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelAction(EventId, ActionId)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
const delEvent = (EventId) => {
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this event?',
      message: 'This means whole actions will be removed from this playlist.',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelEvent(EventId)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
function transformEventData(eventData, currentStateId) {
  console.log('eventData', eventData)
  console.log('currentStateId', currentStateId)
  const resultEvent = eventData.filter(obj => obj._stateId === currentStateId)

  console.log('resultEvent', resultEvent)
  return resultEvent
}

</script>

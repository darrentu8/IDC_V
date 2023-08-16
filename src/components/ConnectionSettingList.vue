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
          <div v-if="EventData._next_state_id === currentStateId" class="row border-b col-12 q-pl-sm q-pb-md">
            <div class="row col-12 items-top">
              <div class="col-6">
                <div class="col-12">
                  <q-item-label class="q-pl-none q-pb-sm" header>{{ EventIndex + 1 }}. Event
                  </q-item-label>
                </div>
                <div class="col-12">
                  <!-- Event 選單 -->
                  <q-select @update:model-value="(val) => setEvent(EventData, val)" @filter="filterEventTypeOptions"
                    emit-value map-options class="theme brand-round-m" options-selected-class="text-black"
                    bg-color="white" rounded :disable="EventData._next_state_id === ''" outlined dense options-dense
                    v-model="EventData._conId"
                    :options="eventTypeOptionsData !== null ? eventTypeOptionsData : eventTypeOptions"
                    option-value="_uuid" option-label="_name">
                    <!-- <template v-slot:selected>
                      <div v-if="EventData._type._isEnabled" class="ellipsis">
                        {{ EventData._type._name }}
                      </div>
                      <div v-else>
                        <span class="text-grey ellipsis">{{ EventData._type._name }}</span>
                      </div>
                    </template> -->
                    <!-- <template v-slot:before-options>
                      <q-item dense>
                        <q-item-section class="text-italic text-grey">
                          Please select an event
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:no-option>
                      <q-item dense>
                        <q-item-section class="text-italic text-grey">
                          All events are selected.
                        </q-item-section>
                      </q-item>
                    </template> -->
                    <template v-slot:option="scope">
                      <q-item v-if="scope.opt.hidden" class="q-pt-sm hidden" v-bind="scope.itemProps">
                        <q-item-label>{{ scope.opt._name }}</q-item-label>
                      </q-item>
                      <q-item v-else-if="scope.opt.disable" class="q-pt-sm text-italic text-grey"
                        v-bind="scope.itemProps">
                        <q-item-label>{{ scope.opt._name }}</q-item-label>
                      </q-item>
                      <q-item v-else v-bind="scope.itemProps" class="q-pt-sm">
                        <q-item-label class="">{{ scope.opt._name }}</q-item-label>
                      </q-item>
                    </template>
                    <template v-slot:after>
                      <img class="q-mr-sm q-mt-sm cursor-pointer" label="" size="md" @click="delEvent(EventData._id)"
                        round flat color="red" src="~assets/icon/delete.svg" />
                    </template>
                  </q-select>
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
                      <q-select @click="setCurentEventID(EventData._id)"
                        @update:model-value="(val) => setAction(EventData._id, actionData, val)"
                        @filter="filterActionTypeOptions" emit-value map-options class="theme brand-round-m"
                        options-selected-class="text-black" :disable="EventData._next_state_id === ''" bg-color="white"
                        rounded outlined dense options-dense v-model="actionData._conId"
                        :options="actionTypeOptionsData !== null ? actionTypeOptionsData : actionTypeOptions"
                        option-value="_uuid" option-label="_name">
                        <!-- <template v-slot:selected>
                          <div v-if="actionData._type._isEnabled" class="ellipsis">
                            {{ actionData._type._name }}
                          </div>
                          <div v-else>
                            <span class="text-grey ellipsis">{{ actionData._type._name }}</span>
                          </div>
                        </template> -->
                        <!-- <template v-slot:before-options>
                          <q-item dense>
                            <q-item-section class="text-italic text-grey">
                              Please select an action
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:no-option>
                          <q-item dense>
                            <q-item-section class="text-italic text-grey">
                              All actions are selected.
                            </q-item-section>
                          </q-item>
                        </template> -->
                        <template v-slot:option="scope">
                          <q-item v-if="scope.opt.hidden" class="q-pt-sm hidden" v-bind="scope.itemProps">
                            <q-item-label>{{ scope.opt._name }}</q-item-label>
                          </q-item>
                          <q-item v-else-if="scope.opt.disable" class="q-pt-sm text-italic text-grey"
                            v-bind="scope.itemProps">
                            <q-item-label>{{ scope.opt._name }}</q-item-label>
                          </q-item>
                          <q-item v-else v-bind="scope.itemProps" class="q-pt-sm">
                            <q-item-label class="">{{ scope.opt._name }}</q-item-label>
                          </q-item>
                        </template>
                        <template v-slot:after>
                          <img class="q-mr-sm q-mt-sm cursor-pointer" label="" size="md"
                            @click="delAction(EventData._id, actionData._id)" round flat color="red"
                            src="~assets/icon/delete.svg" />
                        </template>
                      </q-select>
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
import { ref, computed, nextTick } from 'vue'
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
const currentStateSelectedEvent = computed(() => widgetStore.GetCurrentStateSelectedEvent)
const currentStateSelectedAction = computed(() => widgetStore.GetCurrentStateSelectedAction)

const eventTypeOptions = computed(() => eventStore.GetEventTypeOptions)
const actionTypeOptions = computed(() => eventStore.GetActionTypeOptions)
const eventTypeOptionsData = ref(null)
const actionTypeOptionsData = ref(null)
const loadingFilter = ref(false)
const addStateEventSame = async (currentState) => {
  try {
    widgetStore.SetLoading(true)
    widgetStore.AddStateEventSame(currentState)
    await nextTick()
  } catch (error) {
    console.error(`Error in addStateEventSame: ${error}`)
  } finally {
    widgetStore.SetLoading(false)
  }
}
const addAction = (EventId) => {
  widgetStore.AddAction(EventId)
}
const setCurentEventID = (_uuid) => {
  eventStore.SetCurentEventID(_uuid)
}
const setEvent = (EventData, _conId) => {
  widgetStore.SetEvent(EventData, _conId)
}
const setAction = async (EventId, actionData, _conId) => {
  try {
    loadingFilter.value = true
    await widgetStore.SetAction(EventId, actionData, _conId)
  } catch (error) {
    console.error(error)
  } finally {
    loadingFilter.value = false
  }
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
  // console.log('eventData', eventData)
  // console.log('currentStateId', currentStateId)
  const resultEvent = eventData.filter(obj => obj._next_state_id === currentStateId)

  // console.log('resultEvent', resultEvent)
  return resultEvent
}
function filterEventTypeOptions(val, update) {
  // console.log('val', val)
  // console.log('update', update)
  // 確保 currentStateSelectedEvent 不為空陣列
  if (currentStateSelectedEvent.value.length === 0) {
    eventTypeOptionsData.value = eventTypeOptions.value
    return
  }

  try {
    if (update) {
      update(() => {
        eventTypeOptionsData.value = eventTypeOptions.value
          .filter(option => option._isEnabled)
          .map(option => {
            if (!currentStateSelectedEvent.value.includes(option._uuid)) {
              return option
            } else {
              return {
                ...option,
                hidden: true
              }
            }
          })

        // 檢查是否需要加入新的選項
        const allDisabled = eventTypeOptionsData.value.every(option => option.hidden)
        if (allDisabled) {
          eventTypeOptionsData.value.push(
            {
              _name: 'All events are selected.',
              _uuid: 0,
              disable: true
            })
        } else {
          eventTypeOptionsData.value.unshift(
            {
              _name: 'Please select an event',
              _uuid: -1,
              disable: true
            })
        }
        console.log('Flow events options', eventTypeOptionsData.value)
      })
    }
  } catch (error) {
    // Handle any errors here
    console.error('An error occurred:', error)
  }
}

function filterActionTypeOptions(val, update) {
  // console.log('val', val)
  // console.log('update', update)
  if (currentStateSelectedAction.value.length === 0) {
    actionTypeOptionsData.value = actionTypeOptions.value
    return
  }

  try {
    if (update) {
      console.log('currentEventSelectedAction', currentStateSelectedAction.value)
      update(() => {
        actionTypeOptionsData.value = actionTypeOptions.value
          .filter(option => option._isEnabled)
          .map(option => {
            if (!currentStateSelectedAction.value.includes(option._uuid)) {
              return option
            } else {
              return {
                ...option,
                hidden: true
              }
            }
          })

        // 檢查是否需要加入新的選項
        const allDisabled = actionTypeOptionsData.value.every(option => option.hidden)
        if (allDisabled) {
          actionTypeOptionsData.value.push(
            {
              _name: 'All actions are selected.',
              _uuid: 0,
              disable: true
            })
        } else {
          actionTypeOptionsData.value.unshift(
            {
              _name: 'Please select an action',
              _uuid: -1,
              disable: true
            })
        }

        console.log('Flow Actions Options', actionTypeOptionsData.value)
      })
    }
  } catch (error) {
    // Handle any errors here
    console.error('An error occurred:', error)
  }
}

</script>

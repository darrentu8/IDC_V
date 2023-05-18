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
                  <q-select @update:model-value="(val) => setEvent(EventData, val)" @filter="filterEventTypeOptions"
                    emit-value map-options class="theme brand-round-m" options-selected-class="text-black"
                    bg-color="white" rounded label="Select Type" :disable="EventData._next_state_id === ''" outlined dense
                    options-dense v-model="EventData._conId"
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
                    <template v-slot:option="scope">
                      <q-item v-if="scope.opt.disable" class="q-pt-sm hidden" v-bind="scope.itemProps">
                        <q-item-label>{{ scope.opt._name }}</q-item-label>
                      </q-item>
                      <q-item v-else-if="scope.opt._isEnabled" class="q-pt-sm" v-bind="scope.itemProps">
                        <q-item-label>{{ scope.opt._name }}</q-item-label>
                      </q-item>
                      <q-item v-else v-bind="scope.itemProps" class="q-pt-sm">
                        <q-item-label class="text-grey">{{ scope.opt._name }}</q-item-label>
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
                      <q-select @click="setCurentEventID(EventData._id)" :loading="loadingFilter"
                        @update:model-value="(val) => setAction(EventIndex, actionData, val)"
                        @filter="filterActionTypeOptions" emit-value map-options class="theme brand-round-m"
                        options-selected-class="text-black" :disable="EventData._next_state_id === ''" label="Select Type"
                        bg-color="white" rounded outlined dense options-dense v-model="actionData._conId"
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
                        <template v-slot:option="scope">
                          <q-item v-if="scope.opt._isEnabled" class="q-pt-sm" v-bind="scope.itemProps">
                            <q-item-label>{{ scope.opt._name }}</q-item-label>
                          </q-item>
                          <q-item v-else v-bind="scope.itemProps" class="q-pt-sm">
                            <q-item-label class="text-grey">{{ scope.opt._name }}</q-item-label>
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
  widgetStore.SetLoading(true)
  widgetStore.AddStateEventSame(currentState)
  await nextTick()
  widgetStore.SetLoading(false)
}
const addAction = (EventId) => {
  widgetStore.AddAction(EventId)
}
const setCurentEventID = (_uuid) => {
  console.log('_uuid', _uuid)
  eventStore.SetCurentEventID(_uuid)
}
const setEvent = (EventData, _conId) => {
  console.log('EventData', EventData)
  console.log('_conId', _conId)
  widgetStore.SetEvent(EventData, _conId)
}
const setAction = (EventIndex, actionData, _conId) => {
  console.log('EventIndex', EventIndex)
  console.log('actionData', actionData)
  console.log('_conId', _conId)
  loadingFilter.value = true
  widgetStore.SetAction(EventIndex, actionData, _conId)
  loadingFilter.value = false
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
function filterEventTypeOptions(val, update) {
  console.log('val', val)
  console.log('update', update)
  // 確保 currentStateSelectedEvent 不為空陣列
  if (currentStateSelectedEvent.value.length === 0) {
    eventTypeOptionsData.value = eventTypeOptions.value
    return
  }

  if (update) {
    console.log('currentStateSelectedEvent.value', currentStateSelectedEvent.value)
    update(() => {
      eventTypeOptionsData.value = eventTypeOptions.value.map(option => {
        if (!currentStateSelectedEvent.value.includes(option._uuid)) {
          return option
        } else {
          return {
            ...option,
            disable: true
          }
        }
      })
      console.log('eventTypeOptionsData.value', eventTypeOptionsData.value)
    })
  }
}
function filterActionTypeOptions(val, update) {
  console.log('val', val)
  console.log('update', update)
  if (currentStateSelectedAction.value.length === 0) {
    actionTypeOptionsData.value = actionTypeOptions.value
    return
  }

  if (update) {
    console.log('currentStateSelectedAction.value', currentStateSelectedAction.value)
    update(() => {
      actionTypeOptionsData.value = actionTypeOptions.value.map(option => {
        if (!currentStateSelectedAction.value.includes(option._uuid)) {
          return option
        } else {
          return {
            ...option,
            disable: true
          }
        }
      })
      console.log('actionTypeOptionsData.value', actionTypeOptionsData.value)
    })
  }
}

</script>

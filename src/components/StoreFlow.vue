<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center head-title">
        <div class="col-12">
          Story Flow
        </div>
        <q-btn color="grey" round flat dense :icon="expandedFlow ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedFlow = !expandedFlow" />
      </q-item-label>

      <q-slide-transition class="col-12">
        <div v-show="expandedFlow">
          <div v-for="(stateData, Index) in widgetListData[currentSection].Content.State" :key="stateData.id"
            class="flowBoxWrap">
            <div class="row justify-center items-top q-py-md q-pr-xl">
              <!-- Flow Labels -->
              <div class="flex text-center" style="min-height: 139px;">
                <q-chip v-if="Index == 0" class="q-mx-lg" style="margin-top:50px;">Default</q-chip>
                <q-chip v-else class="q-mx-lg" style="margin-top:50px;">Flow {{ Index }}</q-chip>
                <q-card flat square bordered horizontal class="flowBox">
                  <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  </q-img>
                  <q-card-section v-if="stateData.title !== ''" horizontal class="q-pa-xs">
                    <div class="text-subtitle2">{{ stateData.title }}</div>
                  </q-card-section>
                  <q-card-section v-else horizontal class="q-pa-xs">
                    <div class="text-subtitle2">State {{ Number(Index + 1) }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <!-- Flow Events -->
              <div class="no-wrap" style="min-height: 139px;">
                <div class="flex items-center">
                  <div>
                    <!-- 有Event -->
                    <div>
                      <div v-for="(EventData, EventIndex) in stateData.Event" :key="EventData.id"
                        class="flex items-center q-mb-md">
                        <div class="q-mr-md q-ml-lg">
                          <q-btn unelevated class="" text-color="grey-7" color="grey-4" round icon="link" />
                        </div>
                        <q-card v-if="EventData.next_state_id !== undefined" flat square bordered horizontal
                          class="flowBox q-ml-md" style="height: 130.69px;">
                          <q-btn v-if="EventData.next_state_id !== ''" flat size="16px" class="full-width full-height"
                            color="grey-5">{{
                              mapCurrentStateOptions(EventData.next_state_id) }}</q-btn>
                          <q-btn v-else flat size="16px" class="full-width full-height" color="grey-5" icon="add" />
                          <q-popup-edit v-model="EventData.next_state_id" v-slot="scope">
                            <q-select v-model="scope.value" :options="currentStateOptions" option-value="stateIndex"
                              option-label="title" dense autofocus
                              @update:model-value="setFlowState(Index, EventIndex, scope.value)" />
                          </q-popup-edit>
                          <!-- 刪除 -->
                          <div class="absolute-right del-card">
                            <q-btn size="sm" class="" color="negative" round dense icon="clear"
                              @click="delStateEvent(EventData.id, Index, EventIndex)" />
                          </div>
                        </q-card>
                        <q-card v-else flat square bordered horizontal class="flowBox q-ml-md" style="height: 130.69px;">
                          <q-btn flat size="16px" class="full-width full-height" color="grey-5" icon="add" />
                          <q-popup-edit v-model="EventData.next_state_id" v-slot="scope">
                            <q-select v-model="scope.value" :options="currentStateOptions" option-value="stateIndex"
                              option-label="title" dense autofocus
                              @update:model-value="setFlowState(Index, EventIndex, scope.value)" />
                          </q-popup-edit>
                          <!-- 刪除 -->
                          <div class="absolute-right del-card">
                            <q-btn size="sm" class="" color="negative" round dense icon="clear"
                              @click="delStateEvent(EventData.id, Index, EventIndex)" />
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
              <q-btn class="" color="grey" round flat dense icon="clear" @click="expandedFlow = !expandedFlow" />
            </div> -->
            <!-- Add Flow Btn -->
            <div flat square class="text-center q-mb-md">
              <q-btn :disable="currentStateLength <= 1" @click="addStateEvent(Index)" unelevated round dense
                color="grey-2" text-color="positive" icon="add" />
            </div>
          </div>
        </div>

      </q-slide-transition>
    </q-list>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'

const expandedFlow = ref(true)
const popEdit = ref(true)
// const sectionData = ref([
//   { x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }
// ])
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const currentSection = computed(() => layoutStore.GetCurrentSection)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentStateOptions = computed(() => widgetStore.GetCurrentStateOptions)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
const setFlowState = (Index, EventIndex = 0, currentStateData) => {
  widgetStore.SetFlowState(Index, EventIndex, currentStateData)
  popEdit.value = false
}
const addStateEvent = (Index) => {
  widgetStore.AddStateEvent(Index)
}
const delStateEvent = (ID, Index, EventIndex) => {
  widgetStore.DelStateEvent(ID, Index, EventIndex)
}
const mapCurrentStateOptions = computed(() => {
  return function (stateIndex) {
    const Data = currentStateOptions.value.filter(e => e.stateIndex === stateIndex)
    return Data[0].title
  }
})
</script>
<style lang="scss">
.flowRow {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.12);

  &:last-of-type {
    border-top: 0 solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}

.flowBoxWrap {
  min-width: 220px;
  border-bottom: 1px dotted #E5E5E5;
}

.flowBox {
  min-width: 150px;
  max-height: 128.69px;
}

.flowBoxAction {
  height: 138px;
}
</style>

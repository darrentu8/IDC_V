<template>
  <div class="row">
    <div v-if="widgetListData[currentSection].Content.State" class="col-12">
      <div class="row flex items-center q-pb-lg q-mb-md border-w"
        v-for="(state, Index) in widgetListData[currentSection].Content.State" :key="state._uuid">
        <div :class="[widgetListData[currentSection]._ContentType ? 'col-4' : 'col-4']">
          <div class="row flex items-center justify-end">
            <q-badge class="theme-badge q-mr-md" v-if="Index === 0" color="white" text-color="primary">Default</q-badge>
            <q-card bordered class="cursor-pointer q-mr-md flowBox">
              <img size="lg" src="~assets/icon/mark.svg" class="q-mt-xs flag" />
              <q-card-section v-if="state._name !== ''" class="q-pa-xs">
                <div class="text-subtitle2 ellipsis-2-lines maxW">{{ state._name }}</div>
                <q-popup-edit v-if="Index == 0" ref="popEdit" v-model="state._name" v-slot="scope"
                  class="theme-border q-pt-none pop-edit">
                  <q-input class="" counter maxlength="20" rows="2" type="textarea" v-model="scope.value" autofocus>
                    <template v-slot:append>
                      <q-icon v-if="scope.value !== ''" name="close" @click="scope.value = ''" class="cursor-pointer" />
                    </template>
                    <template v-slot:after>
                      <q-btn class="q-mt-md" flat dense color="primary" icon="check_circle" @click="scope.set"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>
                  </q-input>
                </q-popup-edit>
                <q-popup-edit v-else ref="popEdit" v-model="state._name" v-slot="scope"
                  class="theme-border q-pt-none pop-edit toggle">
                  <q-input class="" counter maxlength="20" rows="2" type="textarea" v-model="scope.value" autofocus>
                    <template v-slot:append>
                      <q-icon v-if="scope.value !== ''" name="close" @click="scope.value = ''" class="cursor-pointer" />
                    </template>
                    <template v-slot:after>
                      <q-btn class="q-mt-md" flat dense color="primary" icon="check_circle" @click="scope.set"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>
                  </q-input>
                  <q-toggle :val="state._uuid" :true-value="state._uuid" :false-value="defaultStateModel"
                    @update:model-value="setDefaultState" v-model="defaultStateModel" dense color="primary"
                    label="Set as default state" />
                </q-popup-edit>
              </q-card-section>
              <q-card-section v-else class="q-pa-xs">
                <div class="text-subtitle2 ellipsis-2-lines maxW">State {{ Number(Index + 1) }}</div>
                <q-popup-edit v-model="state._name" v-slot="scope" class="theme-border q-pt-none pop-edit">
                  <q-input class="" counter maxlength="20" rows="2" type="textarea" v-model="scope.value" autofocus>
                    <template v-slot:append>
                      <q-icon v-if="scope.value !== ''" name="close" @click="scope.value = ''" class="cursor-pointer" />
                    </template>
                    <template v-slot:after>
                      <q-btn class="q-mt-md" flat dense color="primary" icon="check_circle" @click="scope.set"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-card-section>
              <!-- 刪除 -->
              <div v-if="currentStateLength > 1" class="absolute-right del-card">
                <q-btn size="sm" class="" color="negative" round dense icon="clear"
                  @click="delState(state._uuid, state._id)" />
              </div>
            </q-card>
          </div>
        </div>
        <div class="col-8 q-px-md">
          <SourceManager :File="state.File" :currentStateIndex='Index' />
        </div>
      </div>
    </div>
    <div v-if="lockState && !widgetListData[currentSection].Content.State"
      class="justify-center flex items-center full-width" style="height: 200px;">
      <div class="text-grey-6 flex flex-center items-center full-height" style="margin-top: -30px;">
        <q-icon size="md" name="info" />
        <span class="q-ml-md" style="font-size: 16px;">
          Please add a state first.
        </span>
      </div>
    </div>
  </div>
  <DelDialog />
</template>

<script setup>
import SourceManager from './SourceManager.vue'
import { ref, computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import DelDialog from './dialog/DelDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const lockState = computed(() => widgetStore.GetLockState)
const widgetListData = computed(() => widgetStore.GetWidgetListData)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentSection = computed(() => layoutStore.GetCurrentSection)

const defaultStateModel = ref(false)

const delState = (stateUUID, stateID) => {
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this state?',
      message: 'This means whole events, actions and states, Including orignal source, will be removed from this playlist.',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelState(stateUUID, stateID)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

const setDefaultState = async (stateID) => {
  console.log('stateID', stateID)
  if (stateID !== null && stateID !== undefined) {
    const result = widgetStore.SetStateDefault(stateID)
    if (result) {
      try {
        const setIndexResult = await widgetStore.SetStateFirstIndex()
        if (setIndexResult) {
          defaultStateModel.value = false
        }
      } catch (error) {
        console.error('setDefaultState', error)
      }
    }
  }
}
</script>

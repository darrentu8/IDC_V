<template>
  <div class="row">
    <div class="col-12">
      <div class="row flex q-pb-lg q-mb-md border-w"
        v-for="(state, Index) in widgetListData[currentSection].Content.State" :key="state._id">
        <div :class="[widgetListData[currentSection]._ContentType ? 'col-3' : 'col-3']">
          <q-card bordered class="q-mt-lg q-mx-auto cursor-pointer flowBox">
            <img size="lg" src="~assets/icon/mark.svg" class="q-mt-xs flag" />
            <q-card-section v-if="state._title !== ''" class="q-pa-xs">
              <div class="text-subtitle2 ellipsis-2-lines maxW">{{ state._title }}</div>
              <q-popup-edit v-model="state._title" v-slot="scope" class="theme-border q-pt-none" buttons>
                <q-input class="" rows="2" type="textarea" v-model="scope.value" autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-card-section>
            <q-card-section v-else class="q-pa-xs">
              <div class="text-subtitle2 ellipsis-2-lines maxW">State {{ Number(Index + 1) }}</div>
              <q-popup-edit v-model="state._title" v-slot="scope" class="theme-border q-pt-none" buttons>
                <q-input class="" rows="2" type="textarea" v-model="scope.value" autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-card-section>
            <!-- 刪除 -->
            <div v-if="currentStateLength > 1" class="absolute-right del-card">
              <q-btn size="sm" class="" color="negative" round dense icon="clear" @click="delState(state._id)" />
            </div>
          </q-card>
        </div>
        <div class="col-9 q-px-md">
          <SourceManager :File="state.File" :currentStateIndex='Index' />
        </div>
      </div>
    </div>
  </div>
  <DelDialog />
</template>

<script setup>
import SourceManager from './SourceManager.vue'
import { computed } from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import DelDialog from './dialog/DelDialog.vue'
import useQuasar from 'quasar/src/composables/use-quasar.js'
const $q = useQuasar()
const layoutStore = useLayoutStore()
const widgetStore = useWidgetListStore()
const widgetListData = computed(() => widgetStore.GetWidgetListData)
const currentStateLength = computed(() => widgetStore.GetCurrentStateLength)
const currentSection = computed(() => layoutStore.GetCurrentSection)
const delState = (id) => {
  $q.dialog({
    component: DelDialog,
    componentProps: {
      title: 'Are you sure you want to delete this state?',
      message: 'This means whole events, actions and states, Including orignal source, will be removed from this playlist.',
      okBtn: 'Delete',
      cancelBtn: 'cancel'
    }
  }).onOk(() => {
    widgetStore.DelState(id)
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
</script>

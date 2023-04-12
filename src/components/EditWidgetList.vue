<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-item v-if="renderComponent" clickable :active="currentSection == Index" @click="setIndex(Index)"
    active-class="active">
    <q-item-section avatar>
      <q-item-label>{{ Index + 1 }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select dense outlined v-model="ContentType" :options="options"
        @update:model-value="selectWidget(Index, ContentType)" label="Select a widget" emit-value>
        <template v-slot:append>
          <q-icon v-if="ContentType == 'TEXT'" name="img:/icon/text.png" />
          <q-icon v-if="ContentType == 'MEDIA'" name="img:/icon/media.png" />
          <q-icon v-if="ContentType == 'TWITTER'" name="img:/icon/twitter.png" />
          <q-icon v-if="ContentType == 'WEBPAGE'" name="img:/icon/webpage.png" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No Widget
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon"></q-icon>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { ref, nextTick, computed, toRef } from 'vue'
const layoutStore = useLayoutStore()
const widgetListStore = useWidgetListStore()
const currentSection = computed(() => layoutStore.currentSection)
const props = defineProps({
  Index: {
    type: Number,
    required: true
  },
  ContentType: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})
const { ContentType } = toRef(props)
const setIndex = (Index) => {
  // console.log('Index', Index)
  layoutStore.SetCurrentSection(Index)
}
const selectWidget = (Index, ContentType) => {
  // console.log('Index', Index)
  // console.log('ContentType', ContentType)
  widgetListStore.SetCurrentState(Index)
  widgetListStore.SetWidget(Index, ContentType)
  updateList(false)
}
const renderComponent = ref(true)
const updateList = async (val) => {
  renderComponent.value = val
  await nextTick()
  renderComponent.value = true
}
</script>
<style lang="scss">
.active {
  background: #E5E5E5;
  color: #000;
}
</style>

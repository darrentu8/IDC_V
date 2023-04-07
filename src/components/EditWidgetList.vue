<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-item v-if="renderComponent" clickable :active="currentGridIndex === id" @click="setIndex(id)" active-class="active">
    <q-item-section avatar>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select dense outlined v-model="type" :id="id" :options="options" @update:model-value="selectWidget(id, type)"
        label="Select a widget" emit-value>
        <template v-slot:append>
          <q-icon v-if="type == 'TEXT'" name="img:/icon/text.png" />
          <q-icon v-if="type == 'MEDIA'" name="img:/icon/media.png" />
          <q-icon v-if="type == 'TWITTER'" name="img:/icon/twitter.png" />
          <q-icon v-if="type == 'WEBPAGE'" name="img:/icon/webpage.png" />
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
const currentGridIndex = computed(() => layoutStore.currentGridIndex)
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})
const { type } = toRef(props)
const setIndex = (id) => {
  console.log('id', id)
  widgetListStore.SetCurrentListIndex(id)
  layoutStore.SetCurrentGrid(id)
}
const selectWidget = (id, type) => {
  // console.log('id', id)
  // console.log('type', type)
  widgetListStore.SetCurrentListIndex(id)
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

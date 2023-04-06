<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-item clickable tag="a" target="_blank">
    <q-item-section avatar>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select dense outlined v-model="type" :options="options" @update:model-value="selectWidget(type)" emit-value>
      <!-- <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon"></q-icon>
            </q-item-section>
          </q-item>
              </template> -->
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script setup>

import { toRef } from 'vue'
const props = defineProps({
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
function selectWidget(type) {
  console.log('type', type)
}
</script>

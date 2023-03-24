<template>
  <q-item clickable tag="a" target="_blank">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>

import { toRefs } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: ''
  }
})
const { title, icon } = toRefs(props)
</script>

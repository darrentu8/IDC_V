<template>
  <q-item-label v-if="interactives" header>Interactive</q-item-label>
  <q-item-label v-for="(interactive, index) in interactives" :key="index" class="q-mx-md">
    <q-select filled dense v-model="interactive.model" :options="interactive.options" :label="interactive.label" />
  </q-item-label>
  <q-item-label v-if="outputs" header>Output</q-item-label>
  <q-item-label v-for="(output, index) in outputs" :key="index" class="q-mx-md">
    <q-select filled dense v-model="output.model" :options="output.options" :label="output.label" />
  </q-item-label>
</template>

<script setup>
import { computed } from 'vue'
import { useConnectionListStore } from 'src/stores/connection'
const connectionStore = useConnectionListStore()
const interactives = computed(() => connectionStore.interactives)
const outputs = computed(() => connectionStore.outputs)
</script>

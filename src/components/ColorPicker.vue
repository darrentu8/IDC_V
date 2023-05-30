<template>
  <div class="row q-gutter-md">
    <div class="color-rect cursor-pointer" v-for="(color, index) in colors" :key="index"
      @click="changeSelectedColor(color)" :class="{ 'selected': selectedColor === color }"
      :style="{ 'background-color': color, 'background-image': isColorTransparent(color) ? `url('transparent.png')` : '' }" />
    <q-icon class="cursor-pointer" name="edit" color="primary" size="25px">
      <q-popup-proxy>
        <q-color @update:model-value="changePickColor" :model-value="selectedColor" no-footer style="width: 200px;" />
      </q-popup-proxy>
    </q-icon>
  </div>
</template>

<script setup>
import { colors } from 'quasar'
import { onMounted, ref } from 'vue'

const props = defineProps(['colors', 'selectedColor'])

const emit = defineEmits(['update:selectedColor', 'update:colors', 'changeColor'])

const colorOptions = ref(props.colors)

onMounted(() => {
  if (!props.colors.includes(props.selectedColor)) {
    colorOptions.value.push(props.selectedColor)
  }
})
const isColorTransparent = (colorHex) => {
  console.log('colorHex', colorHex)
  const { hexToRgb } = colors
  const colorRgb = hexToRgb(colorHex)

  return colorRgb.a === 0
}
const changeSelectedColor = selectedColor => {
  emit('update:selectedColor', selectedColor)
  emit('changeColor', selectedColor)
}

const changePickColor = newColor => {
  const index = props.colors.findIndex(color => color === props.selectedColor)
  if (index >= 0) {
    colorOptions.value[index] = newColor
    emit('update:selectedColor', newColor)
    emit('changeColor', newColor)
  }
}
</script>
<style lang="scss" scoped>
.color-rect {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid lightgrey;
}

.selected {
  outline: 2px solid $primary;
}
</style>

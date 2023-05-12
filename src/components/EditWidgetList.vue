<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-item v-if="renderComponent" clickable :active="currentSection == Index" @click="setIndex(Index)"
    active-class="active">
    <q-item-section avatar>
      <q-item-label>{{ Index + 1 }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select dense outlined :value="ContentType" :options="options" class="brand-round-m rounded-borders"
        bg-color="white" @update:model-value="selectWidget(Index, ContentType)" option-disable="disable"
        label="Select a widget" option-value="value" option-label="label" emit-value
        @update:ContentType="(val) => $emit('update:ContentType', val)">
        <template v-slot:append>
          <img v-if="ContentType == 'TEXT'" src="~assets/icon/text.png" />
          <img v-if="ContentType == 'GPIO_Media'" src="~assets/icon/photograph.svg" />
          <img v-if="ContentType == 'TWITTER'" src="~assets/icon/twitter.png" />
          <img v-if="ContentType == 'WEBPAGE'" src="~assets/icon/webpage.png" />
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
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <img src="~assets/icon/photograph.svg" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script>
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { nextTick } from 'vue'
const layoutStore = useLayoutStore()
const widgetListStore = useWidgetListStore()
export default {
  name: 'EditWidgetList',
  props: {
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
  },
  data() {
    return {
      renderComponent: true
    }
  },
  computed: {
    currentSection() {
      return layoutStore.currentSection
    }
  },
  methods: {
    async updateList(val) {
      this.renderComponent = val
      await nextTick()
      this.renderComponent = true
    },
    setIndex(Index) {
      // console.log('Index', Index)
      layoutStore.SetCurrentSection(Index)
      widgetListStore.ResetWidgetListData()
    },
    selectWidget(Index, ContentType) {
      // console.log('Index', Index)
      // console.log('ContentType', ContentType)
      this.setIndex(Index)
      widgetListStore.SetWidget(Index, ContentType)
      widgetListStore.ResetWidgetListData()
      this.updateList(false)
    }
  }
}
</script>
<style lang="scss">
.active {
  background: #E5E5E5;
  color: #000;
}
</style>

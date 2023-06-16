<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <q-item v-if="renderComponent" clickable :active="currentSection == Index" @click="setIndex(Index)"
    active-class="active">
    <q-item-section avatar>
      <q-item-label>{{ Index + 1 }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-select dense outlined :model-value="ContentType" map-options :options="options"
        class="brand-round-m rounded-borders" bg-color="white" option-disable="disable" label="Select widget"
        option-value="value" option-label="label" emit-value
        @update:model-value="(val) => $emit('updateContentType', { Index, val })">
        <template v-slot:append>
          <img v-if="ContentType === ContentTypeEnum.Media" src="~assets/icons/GPIO_Media.svg"
            style="max-height: 30px;" />
          <img v-if="ContentType === ContentTypeEnum.Text" src="~assets/icons/Text.svg" style="max-height: 30px;" />
          <img v-if="ContentType === ContentTypeEnum.Twitter" src="~assets/icons/Twitter.svg" style="max-height: 30px;" />
          <img v-if="ContentType === ContentTypeEnum.Web_Page" src="~assets/icons/Web Page.svg"
            style="max-height: 30px;" />
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
              <img v-if="scope.opt.value === ContentTypeEnum.Media" src="~assets/icons/GPIO_Media.svg"
                style="max-height: 30px;" />
              <img v-if="scope.opt.value === ContentTypeEnum.Text" src="~assets/icons/Text.svg"
                style="max-height: 30px;" />
              <img v-if="scope.opt.value === ContentTypeEnum.Twitter" src="~assets/icons/Twitter.svg"
                style="max-height: 30px;" />
              <img v-if="scope.opt.value === ContentTypeEnum.Web_Page" src="~assets/icons/Web Page.svg"
                style="max-height: 30px;" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  computed,
  ref, defineComponent
} from 'vue'
import { useLayoutStore } from 'src/stores/layout'
import { useWidgetListStore } from 'src/stores/widget'
import { ContentTypeEnum } from 'src/js/constant'

export default defineComponent({
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
  setup(props) {
    const layoutStore = useLayoutStore()
    const widgetStore = useWidgetListStore()

    const currentSection = computed(() => {
      return layoutStore.currentSection
    })

    function setIndex(Index) {
      layoutStore.SetCurrentSection(Index)
      widgetStore.ResetWidgetListData()
    }

    return {
      ContentTypeEnum,
      renderComponent: ref(true),
      currentSection,
      setIndex
    }
  }
})

</script>
<style lang="scss">
.active {
  background: #E5E5E5;
  color: #000;
}
</style>

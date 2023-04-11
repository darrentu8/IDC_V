<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center head-title">
        <div class="col-12">
          Souce library
        </div>
        <q-btn color="grey" round flat dense :icon="expandedContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedContent = !expandedContent" />
      </q-item-label>

      <div class="col-5">
        <q-slide-transition>
          <div v-show="expandedContent" class="row q-pa-md">
            <q-card @mouseover="showEdit = true" @mouseleave="showEdit = false" flat square bordered horizontal
              class="cursor-pointer flowBox">
              <q-img src="">
                <div class="absolute-full flex flex-center bg-gery text-white">
                </div>
                <div v-if="showEdit" class="absolute-full text-subtitle2 flex flex-center">
                  <q-icon size="22px" name="edit" />
                </div>
              </q-img>
              <q-card-section horizontal class="q-pa-sm">
                <div class="text-subtitle2">State 1</div>
              </q-card-section>
            </q-card>
            <q-card flat square bordered horizontal class="flowBox q-ml-md">
              <q-btn flat size="22px" class="q-px-xl q-py-xs full-width full-height" color="light-blue" icon="add" />
            </q-card>
          </div>
        </q-slide-transition>
      </div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'ContentSetting',
  components: {
  },
  setup() {
    return {
      expandedContent: ref(true),
      showEdit: ref(false),
      contentData: {
        media: {
          source: '',
          viewType: '',
          fileUpload: '',
          scaleType: '',
          palyEnd: '',
          audio: '',
          duration: '',
          detectOrientation: false,
          repeatVideo: false
        }
      }

    }
  }

})
</script>

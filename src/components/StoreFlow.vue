<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center bg-grey-4">
        <div class="col-12">
          Story Flow
        </div>
        <q-btn color="grey" round flat dense :icon="expandedFlow ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedFlow = !expandedFlow" />
      </q-item-label>

      <q-slide-transition class="col-12 bordered">
        <div v-show="expandedFlow">
          <q-card flat square bordered class="">
            <div class="flowRow flex items-center q-py-md">
              <div class="col-2 q-px-md">
                <q-chip>Default</q-chip>
              </div>
              <div class="col-10">
                <q-card flat square bordered class="flowBox">
                  <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  </q-img>
                  <q-card-section class="q-pa-sm">
                    <div class="text-subtitle2">State 1</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div flat square class="flowRow text-center q-pa-md">
              <q-btn unelevated rounded color="grey-2" text-color="black" label="New flow" />
            </div>
          </q-card>

        </div>
      </q-slide-transition>
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
      expandedFlow: ref(true),
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
<style lang="scss">
.flowRow {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.12);

  &:last-of-type {
    border-top: 0 solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}

.flowBox {
  min-width: 150px;
}
</style>

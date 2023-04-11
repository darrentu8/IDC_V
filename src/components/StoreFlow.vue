<template>
  <div class="row">
    <q-list class="col-12">
      <q-item-label class="flex justify-between q-pa-sm items-center head-title">
        <div class="col-12">
          Story Flow
        </div>
        <q-btn color="grey" round flat dense :icon="expandedFlow ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expandedFlow = !expandedFlow" />
      </q-item-label>

      <q-slide-transition class="col-12">
        <div v-show="expandedFlow">
          <q-card flat square class="">
            <div class="row items-center q-py-md q-pr-xl">
              <div class="col-2 text-center">
                <q-chip>Default</q-chip>
              </div>
              <div class="col-10 row inline no-wrap scroll" style="max-height: 139px;">
                <div class="flowBoxWrap flex items-center">
                  <q-card flat square bordered horizontal class="flowBox">
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                    </q-img>
                    <q-card-section horizontal class="q-pa-sm">
                      <div class="text-subtitle2">State 1</div>
                    </q-card-section>
                  </q-card>
                  <div class="flowBoxAction">
                    <q-btn flat class="" text-color="grey-7" color="grey-4" round dense icon="file_copy" />
                  </div>
                  <div class="q-ma-sx">
                    <q-btn unelevated class="" text-color="grey-7" color="grey-4" round dense icon="link" />
                  </div>
                </div>
                <!-- 刪除 -->
                <!-- <div class="absolute-right q-ma-xs">
                  <q-btn class="" color="grey" round flat dense icon="clear" @click="expandedFlow = !expandedFlow" />
                </div> -->
              </div>
            </div>
            <div flat square class="text-center q-pa-md">
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
      sectionData: [
        { x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }
      ]
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

.flowBoxWrap {
  min-width: 220px;
}

.flowBox {
  min-width: 150px;
}

.flowBoxAction {
  height: 138px;
}
</style>

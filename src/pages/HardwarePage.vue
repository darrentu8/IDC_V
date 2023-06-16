<template>
  <q-page class="flex flex-center overflow-hidden">
    <div class="column">
      <div class="flex flex-center">
        <q-stepper :model-value="3" :bordered="false" flat alternative-labels color="primary"
          style="background-color: transparent;width: 800px;">
          <q-step :name="1" prefix="1" title="Enter playlist name" :done="true" />
          <q-step :name="2" prefix="2" title="Select layout" :done="true" />
          <q-step :name="3" prefix="3" title="Configure Events / Actions" />
        </q-stepper>
      </div>
      <div class="col flex flex-center">
        <q-card class="bg-white text-black brand-round-l q-pa-lg q-mb-lg"
          style="width:1100px;margin-top: -50px;height: 550px;">
          <HardWareComponent />
          <q-card-actions class="q-pb-lg absolute-bottom">
            <q-btn class="brand-round-l text-capitalize" @click="toGrid" style="width:116px;margin:auto 20px" color="grey"
              label="Back" outline="" icon="arrow_back" />
            <q-space />
            <q-btn :loading="loading" @click="toFlow" color="primary" label="Apply" class="brand-round-l text-capitalize"
              style="width:116px;margin:auto 20px" icon="check" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useWidgetListStore } from 'src/stores/widget'
import HardWareComponent from 'src/components/HardWareComponent.vue'
const widgetStore = useWidgetListStore()

export default {
  name: 'HardwareConfiguration',
  components: {
    HardWareComponent
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    GPIO() {
      return widgetStore.NovoDS.Hardware.GPIOSettings.GPIO
    },
    RS232() {
      return widgetStore.NovoDS.Hardware.Rs232Settings.Rs232
    },
    TCPIP() {
      return widgetStore.NovoDS.Hardware.TcpIpSettings
    },
    TimerSettings() {
      return widgetStore.NovoDS.Hardware.TimerSettings
    },
    gpioRoleOption() {
      return widgetStore.gpioRoleOption
    },
    computedGPIOVal() {
      return function (state) {
        switch (state) {
          case '0':
            return '0'
          case '1':
            return '1'
          case 'down':
            return 'Low'
          case 'up':
            return 'high'
          default:
            return ''
        }
      }
    }
  },
  methods: {
    changeCurrentPIN(index) {
      this.currentPIN = index
      const refName = `GPIOItem${index}`
      this.$refs[refName][0].show()
    },
    showGPIOItem(index) {
      this.currentPIN = index
    },
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    async toFlow() {
      try {
        this.loading = true
        const result = await this.$router.push({ path: '/flow' })
        // console.log('result', result)
        if (result === undefined) {
          this.loading = false
        }
      } catch (error) {
        console.error(`Error in toFlow: ${error}`)
      }
    },
    SetPin(index, role, childValue) {
      this.GPIO[index]._role = role
      if (role === 'output') {
        this.GPIO[index]._output_value = childValue
        if (this.GPIO[index]._key_action) {
          delete this.GPIO[index]._key_action // 刪除_output_value屬性
        }
      } else {
        this.GPIO[index]._key_action = childValue
        if (this.GPIO[index]._output_value) {
          delete this.GPIO[index]._output_value // 刪除_output_value屬性
        }
      }
    }
  }
}
</script>
<style lang="scss">
.pin-rect {
  height: 50px;
  width: 50px;
  border: 1px solid #C0C0C0;
  margin: 0 -1px -1px 0;
  cursor: pointer;
  background-color: #F1F1F1;
}

.pin-in-use {
  border-radius: 50%;
  background-color: $primary;
  width: 5px;
  height: 5px;
}

.is-pin-selected {
  z-index: 1;
  border: 1px solid $primary;
  background-color: white;
}
</style>

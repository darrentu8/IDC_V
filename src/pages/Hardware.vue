<template>
    <q-page class="flex overflow-hidden">
        <div class="row fit" @dblclick="toGrid">
            <div class="col-4 q-pa-md">
                <span class="q-pa-xs">GPOI</span>
                <q-separator color="black" />
                <div class="col-4 q-pa-sm q-mt-sm">
                    <div class="column q-ma-md">
                        <div class="row">
                            <div class="pin-rect flex flex-center">
                                6
                            </div>
                            <div class="pin-rect flex flex-center">
                                5
                            </div>
                            <div class="pin-rect flex flex-center">
                                4
                            </div>
                            <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                                3V3
                            </div>
                        </div>
                        <div class="row">
                            <div class="pin-rect flex flex-center">
                                1
                            </div>
                            <div class="pin-rect flex flex-center">
                                2
                            </div>
                            <div class="pin-rect flex flex-center">
                                3
                            </div>
                            <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                                GND
                            </div>
                        </div>
                    </div>
                    <div class="column q-mt-md q-pa-xs">
                        <div v-for="(pin, index) in GPIO" :key="index">
                            <span class="q-pa-xs">{{ index + 1 }}</span>
                            <q-select outlined dense v-model="pin.input" :options="['Sensor']" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 q-pa-md">
                <span class="q-pa-xs">RS232</span>
                <q-separator color="black" />
                <div class="col-4 q-pa-sm q-mt-sm">
                    <span class="q-pa-xs">USB-RS232 dongle</span>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col-5">
                            <span class="q-pa-xs">BaudRate</span>
                            <q-select outlined dense v-model="RS232.usb.baudRate" :options="[4800, 9600, 14400]" />
                        </div>
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Parity</span>
                            <q-select outlined dense v-model="RS232.usb.parity" :options="['None', 'Odd', 'Even']" />
                        </div>
                    </div>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col-5">
                            <span class="q-pa-xs">Data Bits</span>
                            <q-select outlined dense v-model="RS232.usb.dataBits" :options="[6]" />
                        </div>
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Stop Bits</span>
                            <q-select outlined dense v-model="RS232.usb.stopBits" :options="[1]" />
                        </div>
                    </div>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Flow Control</span>
                            <q-select outlined dense v-model="RS232.usb.flowControl" :options="['None']" />
                        </div>
                    </div>
                    <q-separator class="q-mt-md q-mb-md" />
                    <span class="q-pa-xs">On-board RS232 port</span>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col-5">
                            <span class="q-pa-xs">BaudRate</span>
                            <q-select outlined dense v-model="RS232.onBoard.baudRate" :options="[4800, 9600, 14400]" />
                        </div>
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Parity</span>
                            <q-select outlined dense v-model="RS232.onBoard.parity" :options="['None', 'Odd', 'Even']" />
                        </div>
                    </div>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col-5">
                            <span class="q-pa-xs">Data Bits</span>
                            <q-select outlined dense v-model="RS232.onBoard.dataBits" :options="[6]" />
                        </div>
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Stop Bits</span>
                            <q-select outlined dense v-model="RS232.onBoard.stopBits" :options="[1]" />
                        </div>
                    </div>
                    <div class="row q-mt-md q-pa-xs">
                        <div class="col" />
                        <div class="col-5">
                            <span class="q-pa-xs">Flow Control</span>
                            <q-select outlined dense v-model="RS232.onBoard.flowControl" :options="['None']" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 q-pa-md">
                <span class="q-pa-xs">TCP/IP</span>
                <q-separator color="black" />
                <div class="col-4 q-pa-sm q-mt-sm">
                    <span class="q-pa-xs">TODO</span>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'HardwareConfiguration',
    data() {
        return {
            GPIO: [
                { input: 'Sensor' },
                { input: 'Sensor' },
                { input: 'Sensor' },
                { input: 'Sensor' },
                { input: 'Sensor' },
                { input: 'Sensor' }
            ],
            RS232: {
                usb: {
                    baudRate: 9600,
                    parity: 'None',
                    dataBits: 6,
                    stopBits: 1,
                    flowControl: 'None'
                },
                onBoard: {
                    baudRate: 9600,
                    parity: 'None',
                    dataBits: 6,
                    stopBits: 1,
                    flowControl: 'None'
                }
            }
        }
    },
    methods: {
        toGrid() {
            this.$router.push({ path: '/grid' })
        }
    }
}
</script>
<style lang="scss">
.pin-rect {
    height: 50px;
    width: 50px;
    border: 2px solid black;
    margin: 0 -2px -2px 0;
    cursor: pointer;
    background-color: #F1F1F1;
}
</style>

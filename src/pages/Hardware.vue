<template>
    <q-page class="flex flex-center overflow-hidden">
        <div class="column" style="width:1000px;height:700px">
            <div style="height:50px">
                <q-option-group v-model="panel" inline :options="[
                    { label: 'GPIO', value: 0 },
                    { label: 'RS232', value: 1 },
                    { label: 'TCP/IP', value: 2 }
                ]" />
            </div>
            <q-separator color="black" />
            <div class="col">
                <q-tab-panels v-model="panel">
                    <q-tab-panel :name="0">
                        <div class="q-pa-sm">
                            <div class="row">
                                <div class="column q-ma-md">
                                    <div class="row">
                                        <div @click="changeCurrentPIN(5)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 5 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            6
                                        </div>
                                        <div @click="changeCurrentPIN(4)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 4 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            5
                                        </div>
                                        <div @click="changeCurrentPIN(3)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 3 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            4
                                        </div>
                                        <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                                            3V3
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div @click="changeCurrentPIN(0)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 0 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            1
                                        </div>
                                        <div @click="changeCurrentPIN(1)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 1 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            2
                                        </div>
                                        <div @click="changeCurrentPIN(2)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 2 }">
                                            <div class="pin-in-use absolute-top-right q-ma-sm"></div>
                                            3
                                        </div>
                                        <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                                            GND
                                        </div>
                                    </div>
                                </div>
                                <q-separator class="q-ma-md" inset vertical />
                                <div class="col column q-pa-xs">
                                    <q-list bordered class="rounded-borders">
                                        <q-expansion-item @before-show="showGPIOItem(index)" group="gpio"
                                            :ref="`GPIOItem${index}`" v-for="(pin, index) in GPIO" :key="index"
                                            expand-icon-toggle expand-separator>
                                            <template v-slot:header>
                                                <q-item-section>
                                                    <div class="text-body1"> {{ `${index + 1} . ${pin.name ||
                                                        'No Name'}(${pin.input})` }}
                                                    </div>
                                                </q-item-section>
                                                <q-item-section side>
                                                    <div class="row items-center">
                                                        <q-toggle v-model="pin.enable" dense color="primary" />
                                                    </div>
                                                </q-item-section>
                                            </template>
                                            <q-card>
                                                <q-card-section>
                                                    <q-input clearable placeholder="name" v-model="pin.name" dense
                                                        outlined />
                                                    <q-select clearable class="q-mt-sm" placeholder="input"
                                                        v-model="pin.input" dense outlined :options="['sensor', 'input']" />
                                                </q-card-section>
                                            </q-card>
                                        </q-expansion-item>

                                    </q-list>
                                </div>
                            </div>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel :name="1">
                        <div class="q-pa-sm q-mt-sm">
                            <span class="q-pa-xs">USB-RS232 dongle</span>
                            <div class="row q-mt-md q-pa-xs">
                                <div class="col-5">
                                    <span class="q-pa-xs">BaudRate</span>
                                    <q-select outlined dense v-model="RS232.usb.baudRate" :options="[4800, 9600, 14400]" />
                                </div>
                                <div class="col" />
                                <div class="col-5">
                                    <span class="q-pa-xs">Parity</span>
                                    <q-select outlined dense v-model="RS232.usb.parity"
                                        :options="['None', 'Odd', 'Even']" />
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
                                    <q-select outlined dense v-model="RS232.onBoard.baudRate"
                                        :options="[4800, 9600, 14400]" />
                                </div>
                                <div class="col" />
                                <div class="col-5">
                                    <span class="q-pa-xs">Parity</span>
                                    <q-select outlined dense v-model="RS232.onBoard.parity"
                                        :options="['None', 'Odd', 'Even']" />
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
                    </q-tab-panel>
                    <q-tab-panel :name="2">
                        <div class="q-pa-sm q-mt-sm">
                            <span class="q-pa-xs">TODO</span>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            <div class="row q-pa-sm">
                <q-btn @click="toGrid" color="primary" label="Back" />
                <q-space />
                <q-btn @click="toFlow" color="primary" label="Submit" />
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'HardwareConfiguration',
    data() {
        return {
            panel: 0,
            GPIO: [
                { name: '', input: 'sensor', enable: true },
                { name: '', input: 'sensor', enable: true },
                { name: '', input: 'sensor', enable: true },
                { name: '', input: 'sensor', enable: true },
                { name: '', input: 'sensor', enable: true },
                { name: '', input: 'sensor', enable: true }
            ],
            currentPIN: 0,
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
        toFlow() {
            this.$router.push({ path: '/flow' })
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

.pin-in-use {
    border-radius: 50%;
    background-color: #AAAAAA;
    width: 5px;
    height: 5px;
}

.is-pin-selected {
    background-color: white;
}
</style>

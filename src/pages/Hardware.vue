<template>
    <q-page class="flex flex-center overflow-hidden">
        <div class="column">
            <div class="flex flex-center">
                <q-stepper :model-value="3" :bordered="false" flat alternative-labels color="primary"
                    style="background-color: transparent;width: 800px;">
                    <q-step :name="1" prefix="1" title="Define the name" :done="true" />
                    <q-step :name="2" prefix="2" title="Select layout" :done="true" />
                    <q-step :name="3" prefix="3" title="Hardware configuration" />
                </q-stepper>
            </div>
            <div class="col flex flex-center">
                <q-card class="bg-white text-black brand-round q-pa-lg"
                    style="width:1100px;margin-top: -50px;height: 550px;">
                    <div class="row" style="height:30px">
                        <div class="text-body1 text-bold" style="margin:auto 20px">Hardware Configurator</div>
                        <q-space />
                        <div class="text-caption" style="margin:auto 20px">
                            Help & Resouce
                            <q-btn round size="sm" color="grey" flat icon="help_outline" />
                        </div>
                    </div>
                    <div style="height:60px;margin-top: -20px ;">
                        <q-tabs v-model="panel" class="text-grey-8" active-color="primary">
                            <q-tab :name="0" label="GPIO" />
                            <q-tab :name="1" label="RS232" />
                            <q-tab :name="2" label="TCP/IP" />
                        </q-tabs>
                    </div>
                    <div class="col">
                        <q-tab-panels style="background-color: #F9F9F9;" v-model="panel">
                            <q-tab-panel :name="0">
                                <div class="q-pa-sm">
                                    <div class="row" style="height: 320px;">
                                        <div class="column q-ma-md flex flex-center">
                                            <div class="row">
                                                <div @click="changeCurrentPIN(5)"
                                                    class="pin-rect flex flex-center relative-position"
                                                    :class="{ 'is-pin-selected': currentPIN === 5 }">
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[5].$.role }"></div>
                                                    6
                                                </div>
                                                <div @click="changeCurrentPIN(4)"
                                                    class="pin-rect flex flex-center relative-position"
                                                    :class="{ 'is-pin-selected': currentPIN === 4 }">
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[4].$.role }"></div>
                                                    5
                                                </div>
                                                <div @click="changeCurrentPIN(3)"
                                                    class="pin-rect flex flex-center relative-position"
                                                    :class="{ 'is-pin-selected': currentPIN === 3 }">
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[3].$.role }"></div>
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
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[0].$.role }"></div>
                                                    1
                                                </div>
                                                <div @click="changeCurrentPIN(1)"
                                                    class="pin-rect flex flex-center relative-position"
                                                    :class="{ 'is-pin-selected': currentPIN === 1 }">
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[1].$.role }"></div>
                                                    2
                                                </div>
                                                <div @click="changeCurrentPIN(2)"
                                                    class="pin-rect flex flex-center relative-position"
                                                    :class="{ 'is-pin-selected': currentPIN === 2 }">
                                                    <div class="absolute-top-right q-ma-sm"
                                                        :class="{ 'pin-in-use': !!GPIO[2].$.role }"></div>
                                                    3
                                                </div>
                                                <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                                                    GND
                                                </div>
                                            </div>
                                            <div class="text-caption q-mt-sm">(Scheme of GPIO port)</div>
                                        </div>
                                        <q-separator class="q-ma-md" inset vertical />
                                        <div class="col q-pa-xs row">
                                            <q-expansion-item class="brand-round bg-white q-mr-md q-mb-md"
                                                style="width:350px;height: fit-content;" @before-show="showGPIOItem(index)"
                                                group="gpio" :ref="`GPIOItem${index}`" v-for="(pin, index) in GPIO"
                                                :key="index" expand-icon-toggle>
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <div class="text-body1">
                                                            {{ `${index + 1} . ${pin.$.name || 'No Name'}` }}
                                                            {{ `(${pin.$.role || `Not Set`})` }}
                                                        </div>
                                                    </q-item-section>
                                                    <q-item-section side>
                                                        <div class="row items-center">
                                                            <q-toggle v-model="pin.$.isEnabled" dense color="primary" />
                                                        </div>
                                                    </q-item-section>
                                                </template>
                                                <q-card>
                                                    <q-card-section>
                                                        <q-input clearable placeholder="name" v-model="pin.$.name" dense
                                                            outlined />
                                                        <q-select clearable class="q-mt-sm" placeholder="input"
                                                            v-model="pin.$.role" dense outlined
                                                            :options="['output', 'keyevent']" />
                                                    </q-card-section>
                                                </q-card>
                                            </q-expansion-item>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>
                            <q-tab-panel :name="1">
                                <div class="row" style="height: 340px;">
                                    <div class="col q-pa-xs">
                                        <div class="text-body1 text-bold row">
                                            <div>On-board RS232 port</div>
                                            <q-space />
                                            <q-toggle v-model="RS232[0].$.isEnabled" dense color="primary" />
                                        </div>
                                        <q-separator class="q-mt-md q-mb-md" />
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">BaudRate</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.baudRate"
                                                    :disable="!RS232[0].$.isEnabled"
                                                    :options="[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Parity</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.parity"
                                                    :disable="!RS232[0].$.isEnabled"
                                                    :options="['None', 'Even', 'Odd', 'Mark', 'Space']" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">Data Bits</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.dataBits"
                                                    :disable="!RS232[0].$.isEnabled" :options="[5, 6, 7, 8]" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Stop Bits</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.stopBits"
                                                    :disable="!RS232[0].$.isEnabled" :options="[1, 2]" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">Flow Control</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.flowControl"
                                                    :disable="!RS232[0].$.isEnabled" :options="['None', 'CTX', 'XOFF']" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Rs232 Type</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[0].$.rs232_type"
                                                    :disable="!RS232[0].$.isEnabled" :options="['hex', 'string']" />
                                            </div>
                                        </div>
                                    </div>
                                    <q-separator vertical class="q-ma-lg" />
                                    <div class="col q-pa-xs">
                                        <div class="text-body1 text-bold row">
                                            <div>USB-RS232 dongle</div>
                                            <q-space />
                                            <q-toggle v-model="RS232[1].$.isEnabled" dense color="primary" />
                                        </div>
                                        <q-separator class="q-mt-md q-mb-md" />
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">BaudRate</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.baudRate"
                                                    :disable="!RS232[1].$.isEnabled"
                                                    :options="[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Parity</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.parity"
                                                    :disable="!RS232[1].$.isEnabled"
                                                    :options="['None', 'Even', 'Odd', 'Mark', 'Space']" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">Data Bits</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.dataBits"
                                                    :disable="!RS232[1].$.isEnabled" :options="[5, 6, 7, 8]" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Stop Bits</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.stopBits"
                                                    :disable="!RS232[1].$.isEnabled" :options="[1, 2]" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-md">
                                            <div class="col">
                                                <span class="q-pa-xs">Flow Control</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.flowControl"
                                                    :disable="!RS232[1].$.isEnabled" :options="['None', 'CTX', 'XOFF']" />
                                            </div>
                                            <div style="width:20px" />
                                            <div class="col">
                                                <span class="q-pa-xs">Rs232 Type</span>
                                                <q-select bg-color="white" outlined dense v-model="RS232[1].$.rs232_type"
                                                    :disable="!RS232[1].$.isEnabled" :options="['hex', 'string']" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>
                            <q-tab-panel :name="2">
                                <div class="row">
                                    <div class="col">
                                        <div class="text-body1 row">
                                            <div>RX ( Receive )</div>
                                            <q-space />
                                            <q-toggle v-model="TCPIP.$.isEnabled" dense color="primary" />
                                        </div>
                                        <div class="row q-mt-sm">
                                            <div style="margin: auto 2px; width:100px">Port Number : </div>
                                            <div class="col" style="margin: auto 10px">
                                                <q-input dense outlined type="number" :disable="!TCPIP.$.isEnabled"
                                                    :min="3000" :max="4000" v-model.number="TCPIP.$.local_port" />
                                            </div>
                                        </div>
                                        <q-separator class="q-mt-md q-mb-md" color="black" />
                                        <div class="text-body1">tx ( Send )</div>
                                        <div class="row q-mt-sm">
                                            <div style="margin: auto 2px; width:100px">Name : </div>
                                            <div class="col" style="margin: auto 10px">
                                                <q-input dense outlined v-model="tx.name" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-sm">
                                            <div style="margin: auto 2px; width:100px">Port Number : </div>
                                            <div class="col" style="margin: auto 10px">
                                                <q-input dense outlined type="number" :min="3000" :max="4000"
                                                    v-model.number="tx.destination_port" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-sm">
                                            <div style="margin: auto 2px; width:100px">IP Address : </div>
                                            <div class="col" style="margin: auto 10px">
                                                <q-input dense outlined v-model="tx.destination_ip" />
                                            </div>
                                        </div>
                                        <div class="row q-mt-lg">
                                            <div style="margin: auto">
                                                <q-btn color="primary" @click="addTx" label="Add" />
                                            </div>
                                        </div>
                                    </div>
                                    <q-separator vertical class="q-ma-lg" />
                                    <div class="col">
                                        <q-list bordered class="rounded-borders" v-if="TCPIP.TcpIp.length > 0"
                                            style="max-height: 500px;overflow: auto;">
                                            <q-expansion-item group="tcp-tx" v-for="(tx, index) in TCPIP.TcpIp" :key="index"
                                                expand-separator>
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <div class="text-body1">
                                                            {{ tx.$.name }}
                                                        </div>
                                                    </q-item-section>
                                                </template>
                                                <q-card>
                                                    <q-card-section>
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="text-body1">
                                                                    Port Number : {{ tx.$.destination_port }}
                                                                </div>
                                                                <div class="text-body1">
                                                                    IP Address : {{ tx.$.destination_ip }}
                                                                </div>
                                                            </div>
                                                            <div class="col" />
                                                            <div class="flex flex-center">
                                                                <q-btn size="sm" round outline icon="remove" color="red"
                                                                    @click="removeTx(index)" />
                                                            </div>
                                                        </div>
                                                    </q-card-section>
                                                </q-card>
                                            </q-expansion-item>
                                        </q-list>
                                    </div>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </div>
                    <q-card-actions class="q-pb-lg absolute-bottom">
                        <q-btn class="brand-round" @click="toGrid" style="width:116px;margin:auto 20px" color="grey"
                            label="Back" outline="" icon="arrow_back" />
                        <q-space />
                        <q-btn @click="toFlow" color="primary" label="Submit" class="brand-round"
                            style="width:116px;margin:auto 20px" icon="check" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import { useNovoDSStore } from 'src/stores/NovoDS'
const NovoDSStore = useNovoDSStore()

export default {
    name: 'HardwareConfiguration',
    data() {
        return {
            panel: 0,
            currentPIN: 0,
            tx: {
                id: 0,
                destination_ip: '',
                destination_port: '',
                name: ''
            }
        }
    },
    computed: {
        GPIO() {
            return NovoDSStore.NovoDS.Hardware[0].GPIOSettings[0].GPIO
        },
        RS232() {
            return NovoDSStore.NovoDS.Hardware[0].Rs232Settings[0].Rs232
        },
        TCPIP() {
            return NovoDSStore.NovoDS.Hardware[0].TcpIpSettings[0]
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
        addTx() {
            const tx = {
                id: 0,
                destination_ip: this.tx.destination_ip,
                destination_port: this.tx.destination_port,
                name: this.tx.name
            }

            this.TCPIP.TcpIp.push({ $: tx })

            tx.id = this.TCPIP.TcpIp.length
        },
        removeTx(index) {
            this.TCPIP.TcpIp.splice(index, 1)
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

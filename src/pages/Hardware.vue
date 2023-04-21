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
                                            <div class="absolute-top-right q-ma-sm"
                                                :class="{ 'pin-in-use': !!GPIO[5].input }"></div>
                                            6
                                        </div>
                                        <div @click="changeCurrentPIN(4)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 4 }">
                                            <div class="absolute-top-right q-ma-sm"
                                                :class="{ 'pin-in-use': !!GPIO[4].input }"></div>
                                            5
                                        </div>
                                        <div @click="changeCurrentPIN(3)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 3 }">
                                            <div class="absolute-top-right q-ma-sm"
                                                :class="{ 'pin-in-use': !!GPIO[3].input }"></div>
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
                                                :class="{ 'pin-in-use': !!GPIO[0].input }"></div>
                                            1
                                        </div>
                                        <div @click="changeCurrentPIN(1)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 1 }">
                                            <div class="absolute-top-right q-ma-sm"
                                                :class="{ 'pin-in-use': !!GPIO[1].input }"></div>
                                            2
                                        </div>
                                        <div @click="changeCurrentPIN(2)"
                                            class="pin-rect flex flex-center relative-position"
                                            :class="{ 'is-pin-selected': currentPIN === 2 }">
                                            <div class="absolute-top-right q-ma-sm"
                                                :class="{ 'pin-in-use': !!GPIO[2].input }"></div>
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
                                                    <div class="text-body1">
                                                        {{ `${index + 1} . ${pin.name || 'No Name'}` }}
                                                        {{ `(${pin.input || `Not Set`})` }}
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
                        <div class="row">
                            <div class="col">
                                <div class="text-body1 row">
                                    <div>USB-RS232 dongle</div>
                                    <q-space />
                                    <q-toggle v-model="RS232.usb.enable" dense color="primary" />
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">BaudRate</span>
                                        <q-select outlined dense v-model="RS232.usb.baudRate" :disable="!RS232.usb.enable"
                                            :options="[4800, 9600, 14400]" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col">
                                        <span class="q-pa-xs">Parity</span>
                                        <q-select outlined dense v-model="RS232.usb.parity" :disable="!RS232.usb.enable"
                                            :options="['None', 'Odd', 'Even']" />
                                    </div>
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">Data Bits</span>
                                        <q-select outlined dense v-model="RS232.usb.dataBits" :disable="!RS232.usb.enable"
                                            :options="[6]" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col">
                                        <span class="q-pa-xs">Stop Bits</span>
                                        <q-select outlined dense v-model="RS232.usb.stopBits" :disable="!RS232.usb.enable"
                                            :options="[1]" />
                                    </div>
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">Flow Control</span>
                                        <q-select outlined dense v-model="RS232.usb.flowControl"
                                            :disable="!RS232.usb.enable" :options="['None']" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col" />
                                </div>
                            </div>
                            <q-separator vertical class="q-ma-lg" />
                            <div class="col">
                                <div class="text-body1 row">
                                    <div>On-board RS232 port</div>
                                    <q-space />
                                    <q-toggle v-model="RS232.onBoard.enable" dense color="primary" />
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">BaudRate</span>
                                        <q-select outlined dense v-model="RS232.onBoard.baudRate"
                                            :disable="!RS232.onBoard.enable" :options="[4800, 9600, 14400]" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col">
                                        <span class="q-pa-xs">Parity</span>
                                        <q-select outlined dense v-model="RS232.onBoard.parity"
                                            :disable="!RS232.onBoard.enable" :options="['None', 'Odd', 'Even']" />
                                    </div>
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">Data Bits</span>
                                        <q-select outlined dense v-model="RS232.onBoard.dataBits"
                                            :disable="!RS232.onBoard.enable" :options="[6]" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col">
                                        <span class="q-pa-xs">Stop Bits</span>
                                        <q-select outlined dense v-model="RS232.onBoard.stopBits"
                                            :disable="!RS232.onBoard.enable" :options="[1]" />
                                    </div>
                                </div>
                                <div class="row q-mt-md">
                                    <div class="col">
                                        <span class="q-pa-xs">Flow Control</span>
                                        <q-select outlined dense v-model="RS232.onBoard.flowControl"
                                            :disable="!RS232.onBoard.enable" :options="['None']" />
                                    </div>
                                    <div style="width:20px" />
                                    <div class="col" />
                                </div>
                            </div>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel :name="2">
                        <div class="row">
                            <div class="col">
                                <div class="text-body1">RX ( Receive )</div>
                                <div class="row q-mt-sm">
                                    <div style="margin: auto 2px; width:100px">Port Number : </div>
                                    <div class="col" style="margin: auto 10px">
                                        <q-input dense outlined type="number" :min="1" :max="10"
                                            v-model.number="TCP.RX.portNumber" />
                                    </div>
                                </div>
                                <q-separator class="q-mt-md q-mb-md" color="black" />
                                <div class="text-body1">TX ( Send )</div>
                                <div class="row q-mt-sm">
                                    <div style="margin: auto 2px; width:100px">Name : </div>
                                    <div class="col" style="margin: auto 10px">
                                        <q-input dense outlined v-model="TCP.TX.name" />
                                    </div>
                                </div>
                                <div class="row q-mt-sm">
                                    <div style="margin: auto 2px; width:100px">Port Number : </div>
                                    <div class="col" style="margin: auto 10px">
                                        <q-input dense outlined type="number" :min="1" :max="10"
                                            v-model.number="TCP.TX.portNumber" />
                                    </div>
                                </div>
                                <div class="row q-mt-sm">
                                    <div style="margin: auto 2px; width:100px">IP Address : </div>
                                    <div class="col" style="margin: auto 10px">
                                        <q-input dense outlined v-model="TCP.TX.IPAddress" />
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
                                <q-list bordered class="rounded-borders" v-if="TCP.TXList.length > 0"
                                    style="max-height: 500px;overflow: auto;">
                                    <q-expansion-item v-for="(tx, index) in TCP.TXList" :key="index" expand-separator>
                                        <template v-slot:header>
                                            <q-item-section>
                                                <div class="text-body1">
                                                    {{ tx.name }}
                                                </div>
                                            </q-item-section>
                                        </template>
                                        <q-card>
                                            <q-card-section>
                                                <div class="row">
                                                    <div class="col">
                                                        <div class="text-body1">
                                                            Port Number : {{ tx.portNumber }}
                                                        </div>
                                                        <div class="text-body1">
                                                            IP Address : {{ tx.IPAddress }}
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
                    enable: true,
                    baudRate: 9600,
                    parity: 'None',
                    dataBits: 6,
                    stopBits: 1,
                    flowControl: 'None'
                },
                onBoard: {
                    enable: true,
                    baudRate: 9600,
                    parity: 'None',
                    dataBits: 6,
                    stopBits: 1,
                    flowControl: 'None'
                }
            },
            TCP: {
                RX: {
                    portNumber: 1
                },
                TX: {
                    name: '',
                    IPAddress: '',
                    portNumber: 1
                },
                TXList: []
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
        addTx() {
            const tx = {
                name: this.TCP.TX.name,
                IPAddress: this.TCP.TX.IPAddress,
                portNumber: this.TCP.TX.portNumber
            }

            this.TCP.TXList.push(tx)
        },
        removeTx(index) {
            this.TCP.TXList.splice(index, 1)
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

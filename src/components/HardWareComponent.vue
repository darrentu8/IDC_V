<template>
  <div class="row" style="height:30px">
    <div class="text-bold" style="margin:auto 20px">Configure Event/Action</div>
    <q-space />
    <div class="text-caption" style="margin:auto 20px">
      Help & resources
      <q-btn round size="sm" color="grey" flat icon="help_outline" />
    </div>
  </div>
  <div style="height:60px;margin-top: -20px ;">
    <q-tabs v-model="panel" class="text-grey-8" active-color="primary">
      <q-tab :name="0" label="GPIO" />
      <q-tab :name="1" label="RS232" />
      <q-tab :name="2" label="TCP/IP" />
      <q-tab :name="3" label="Software Timer" />
    </q-tabs>
  </div>
  <div class="col">
    <q-tab-panels style="background-color: #F9F9F9;" v-model="panel">
      <!-- GPIO -->
      <q-tab-panel :name="0">
        <div class="">
          <div class="row" style="height: 320px;">
            <div class="column q-ma-md flex flex-center">
              <div class="row">
                <div @click="changeCurrentPIN(5)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 5 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[5]._role }"></div>
                  6
                </div>
                <div @click="changeCurrentPIN(4)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 4 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[4]._role }"></div>
                  5
                </div>
                <div @click="changeCurrentPIN(3)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 3 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[3]._role }"></div>
                  4
                </div>
                <div class="pin-rect flex flex-center text-grey-5 cursor-not-allowed">
                  3V3
                </div>
              </div>
              <div class="row">
                <div @click="changeCurrentPIN(0)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 0 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[0]._role }"></div>
                  1
                </div>
                <div @click="changeCurrentPIN(1)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 1 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[1]._role }"></div>
                  2
                </div>
                <div @click="changeCurrentPIN(2)" class="pin-rect flex flex-center relative-position"
                  :class="{ 'is-pin-selected': currentPIN === 2 }">
                  <div class="absolute-top-right q-ma-sm" :class="{ 'pin-in-use': !!GPIO[2]._role }"></div>
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
              <q-expansion-item class="brand-round-m bg-white q-mr-md q-mb-md" style="width:350px;height: fit-content;"
                @before-show="showGPIOItem(index)" group="gpio" :ref="`GPIOItem${index}`" v-for="(pin, index) in GPIO"
                :key="index" expand-icon-toggle>
                <template v-slot:header>
                  <q-item-section>
                    <div class="text-body1">
                      {{ `${index + 1} . ${pin._name || 'No Name'}` }}
                      {{ `(${pin._role || `Not Set`}` }}
                      <span v-if="pin._output_value">
                        /{{ computedGPIOVal(pin._output_value) }}
                      </span>
                      <span v-if="pin._key_action">
                        /{{ computedGPIOVal(pin._key_action) }}
                      </span>
                      <span>)
                      </span>
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row items-center">
                      <q-toggle v-model="pin._isEnabled" dense color="primary" />
                    </div>
                  </q-item-section>
                </template>
                <q-card class="brand-round-l">
                  <q-card-section>
                    <q-input clearable placeholder="name" class="brand-round-m" v-model="pin._name" dense outlined />
                    <q-select clearable class="q-mt-sm brand-round-m" emit-value option-value="value" option-label="text"
                      placeholder="input" v-model="pin._role" dense outlined :options="gpioRoleOption">

                      <template v-slot:option="scope">
                        <q-expansion-item dense expand-separator group="somegroup" :default-opened="hasChild(scope)"
                          header-class="text-weight-bold" :label="scope.opt.title" @click="model = scope.opt.value">
                          <template v-for="child in scope.opt.children" :key="child.value">
                            <q-item dense clickable v-ripple v-close-popup
                              @click="SetPin(index, scope.opt.value, child.value)"
                              :class="{ 'bg-light-blue-1': pin._role === child.value }">
                              <q-item-section>
                                <q-item-label>{{ child.text }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-expansion-item>
                      </template>
                    </q-select>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <!-- RS232 -->
      <q-tab-panel :name="1" style="height: 380px;">
        <div class="row">
          <q-tabs vertical v-model="subPanel" class="text-grey-8 q-mr-md" active-color="primary">
            <q-tab name="on" label="On-board RS232 port" />
            <q-tab name="usb" label="USB-RS232 dongle" />
          </q-tabs>
          <q-tab-panels class="col" style="background-color: #F9F9F9;" v-model="subPanel">
            <q-tab-panel class="flex" name="on">
              <div class="col">
                <div class="text-body1 text-bold row">
                  <div>On-board RS232 port</div>
                  <q-space />
                  <q-toggle v-model="RS232[0]._isEnabled" dense color="primary" />
                </div>
                <q-separator class="q-mt-md q-mb-md" />
                <q-form ref="Form" class="q-mt-md" @submit.stop="addRs0">
                  <div class="row q-mt-md">
                    <div class="col">
                      <q-select label="BaudRate" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[0]._baudRate" :disable="!RS232[0]._isEnabled"
                        :options="[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:20px" />
                    <div class="col">
                      <q-select label="Parity" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[0]._parity" :disable="!RS232[0]._isEnabled"
                        :options="['None', 'Even', 'Odd', 'Mark', 'Space']" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col">
                      <q-select label="Data Bits" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[0]._dataBits" :disable="!RS232[0]._isEnabled" :options="[5, 6, 7, 8]" lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-select label="Stop Bits" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[0]._stopBits" :disable="!RS232[0]._isEnabled" :options="[1, 2]" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-select label="Flow Control" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[0]._flowControl" :disable="!RS232[0]._isEnabled" :options="['None', 'CTX', 'XOFF']"
                        lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <q-separator class="q-mb-md" />
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input :disable="!RS232[0]._isEnabled" label="Name" class="brand-round-m" bg-color="white" dense
                        outlined v-model="rs0._name" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-select :disable="!RS232[0]._isEnabled" label="Type" class="brand-round-m" bg-color="white"
                        outlined dense v-model="rs0._data_type" :options="['hex', 'string']" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-input :disable="!RS232[0]._isEnabled" label="Command" class="brand-round-m" bg-color="white"
                        dense outlined v-model="rs0._value" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row">
                    <div style="margin: auto">
                      <q-btn :disable="!RS232[0]._isEnabled" unelevated rounded color="primary"
                        class="text-capitalize q-px-lg" @click="addRs0" label="Add" />
                    </div>
                  </div>
                </q-form>
              </div>
              <q-separator vertical class="q-ma-lg" />
              <div class="col">
                <q-list bordered class="rounded-borders" v-if="RS232[0].Command.length > 0"
                  style="max-height: 500px;overflow: auto;">
                  <q-expansion-item group="tcp-tx" v-for="(rs0, index) in RS232[0].Command" :key="index" expand-separator>
                    <template v-slot:header>
                      <q-item-section>
                        <div class="text-body1">
                          {{ index + 1 }}. {{ rs0._name }}
                        </div>
                      </q-item-section>
                    </template>
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col-10">
                            <div class="text-body1 text-grey-7">
                              Type : {{ rs0._data_type }}
                            </div>
                            <div class="text-body1 text-grey-7">
                              Command : {{ rs0._value }}
                            </div>
                          </div>
                          <div class="col-2 flex flex-center">
                            <q-btn flat size="md" round @click="removeRs0(index)">
                              <img src="~assets/icon/delete.svg" />
                            </q-btn>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
                <div v-else class="flex flex-center q-mt-xl">
                  <q-chip square class="q-pa-md" text-color="grey-7" color="grey-3">
                    (No item in the list.)
                  </q-chip>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel class="flex" name="usb">
              <div class="col">
                <div class="text-body1 text-bold row">
                  <div>USB-RS232 dongle</div>
                  <q-space />
                  <q-toggle v-model="RS232[1]._isEnabled" dense color="primary" />
                </div>
                <q-separator class="q-mt-md q-mb-md" />
                <q-form ref="Form" class="" @submit.stop="addRs1">
                  <div class="row q-mt-md">
                    <div class="col">
                      <q-select label="BaudRate" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[1]._baudRate" :disable="!RS232[1]._isEnabled"
                        :options="[1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:20px" />
                    <div class="col">
                      <q-select label="Parity" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[1]._parity" :disable="!RS232[1]._isEnabled"
                        :options="['None', 'Even', 'Odd', 'Mark', 'Space']" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col">
                      <q-select label="Data Bits" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[1]._dataBits" :disable="!RS232[1]._isEnabled" :options="[5, 6, 7, 8]" lazy-rules
                        :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-select label="Stop Bits" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[1]._stopBits" :disable="!RS232[1]._isEnabled" :options="[1, 2]" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-select label="Flow Control" class="brand-round-m" bg-color="white" outlined dense
                        v-model="RS232[1]._flowControl" :disable="!RS232[1]._isEnabled" :options="['None', 'CTX', 'XOFF']"
                        lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <q-separator class="q-mb-md" />
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-input :disable="!RS232[1]._isEnabled" label="Name" class="brand-round-m" bg-color="white" dense
                        outlined v-model="rs1._name" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row q-mt-sm">
                    <div class="col">
                      <q-select :disable="!RS232[1]._isEnabled" label="Type" class="brand-round-m" bg-color="white"
                        outlined dense v-model="rs1._data_type" :options="['hex', 'string']" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                    <div style="width:10px" />
                    <div class="col">
                      <q-input :disable="!RS232[1]._isEnabled" label="Command" class="brand-round-m" bg-color="white"
                        dense outlined v-model="rs1._value" lazy-rules :rules="[
                          (val) =>
                            (val !== null && val !== '') || 'Need filled']" />
                    </div>
                  </div>
                  <div class="row">
                    <div style="margin: auto">
                      <q-btn :disable="!RS232[1]._isEnabled" unelevated rounded color="primary"
                        class="text-capitalize q-px-lg" @click="addRs1" label="Add" />
                    </div>
                  </div>
                </q-form>
              </div>
              <q-separator vertical class="q-ma-lg" />
              <div class="col">
                <q-list bordered class="rounded-borders" v-if="RS232[1].Command.length > 0"
                  style="max-height: 500px;overflow: auto;">
                  <q-expansion-item group="tcp-tx" v-for="(rs1, index) in RS232[1].Command" :key="index" expand-separator>
                    <template v-slot:header>
                      <q-item-section>
                        <div class="text-body1">
                          {{ index + 1 }}. {{ rs1._name }}
                        </div>
                      </q-item-section>
                    </template>
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col-10">
                            <div class="text-body1 text-grey-7">
                              Type : {{ rs1._data_type }}
                            </div>
                            <div class="text-body1 text-grey-7">
                              Command : {{ rs1._value }}
                            </div>
                          </div>
                          <div class="col-2 flex flex-center">
                            <q-btn flat size="md" round @click="removeRs1(index)">
                              <img src="~assets/icon/delete.svg" />
                            </q-btn>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
                <div v-else class="flex flex-center q-mt-xl">
                  <q-chip square class="q-pa-md" text-color="grey-7" color="grey-3">
                    (No item in the list.)
                  </q-chip>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-tab-panel>
      <!-- TCP/IP -->
      <q-tab-panel :name="2" style="height: 380px;">
        <div class="row">
          <div class="col">
            <!-- TCPIP Receive -->
            <div class="text-body1 row">
              <div class="q-mb-sm">RX ( Receive )</div>
              <q-space />
              <q-toggle v-model="TCPIP._isEnabled" dense color="primary" />
            </div>
            <q-form ref="FormTrx" class="" @submit.stop="addTrx">
              <div class="row q-mt-sm items-top">
                <div style="margin-top: 10px; width:100px">Port Number : </div>
                <div class="col" style="margin: auto 10px">
                  <q-input :disable="!TCPIP._isEnabled" class="brand-round-m" bg-color="white" dense outlined
                    type="number" :min="3000" :max="4000" v-model.number="TCPIP._local_port" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val >= 3000 && val <= 4000) || 'Please enter 3000 ~ 4000']" />
                </div>
                <div class="text-grey" style="margin-top: 10px; width:180px">Range 3000 ~ 4000</div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input :disable="!TCPIP._isEnabled" label="Name" class="brand-round-m" bg-color="white" dense outlined
                    type="text" v-model="trx._name" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
                <div class="" style="width:10px"></div>
                <div class="col">
                  <q-input :disable="!TCPIP._isEnabled" label="Command" class="brand-round-m" bg-color="white" dense
                    outlined type="text" v-model="trx._value" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
                <div class="" style="width:10px"></div>
                <div>
                  <q-btn :disable="!TCPIP._isEnabled" unelevated rounded color="primary" class="text-capitalize"
                    @click="addTrx" label="Add" />
                </div>
              </div>
            </q-form>
            <q-separator class="q-mb-md" color="gery-7" />
            <!-- TCPIP Send -->
            <div class="text-body1">tx ( Send )</div>
            <q-form ref="FormTx" class="" @submit.stop="addTx">
              <div class="row q-mt-sm">
                <div class="" style="margin-top: 10px; width:100px">IP Address : </div>
                <div class="col">
                  <q-input class="brand-round-m" bg-color="white" dense outlined v-model="tx._destination_ip" lazy-rules
                    :rules="[checkIP]" />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="" style="margin-top: 10px; width:100px">Port Number : </div>
                <div class="col">
                  <q-input class="brand-round-m" bg-color="white" dense outlined type="number"
                    v-model.number="tx._destination_port" :min="1" :max="9999" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input label="Name" class="brand-round-m" bg-color="white" dense outlined v-model="tx._name"
                    lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
                <div class="" style="width:10px"></div>
                <div class="col">
                  <q-input label="Command" class="brand-round-m" bg-color="white" dense outlined v-model="tx._value"
                    lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
                <div class="" style="width:10px"></div>
                <div>
                  <q-btn unelevated rounded color="primary" class="text-capitalize" @click="addTx" label="Add" />
                </div>
              </div>
            </q-form>
          </div>
          <q-separator vertical class="q-ma-lg" />
          <div class="col">
            <q-tabs v-model="subTcpPanel" class="text-grey-8 q-mr-md" active-color="primary">
              <q-tab name="rx" label="RX ( Receive )" />
              <q-tab name="tx" label="TX ( Send )" />
            </q-tabs>
            <div class="col">
              <q-tab-panels class="col" style="background-color: #F9F9F9;" v-model="subTcpPanel">
                <!-- RX ( Receive ) -->
                <q-tab-panel class="flex" name="rx">
                  <div class="col">
                    <q-list bordered class="rounded-borders" v-if="TCPIP.ReceivedCommands.Command.length > 0"
                      style="max-height: 500px;overflow: auto;">
                      <q-expansion-item group="tcp-rc" v-for="(trx, Index) in TCPIP.ReceivedCommands.Command" :key="Index"
                        expand-separator>
                        <template v-slot:header>
                          <q-item-section>
                            <div class="text-body1">
                              {{ Index + 1 }}. {{ trx._name }}
                            </div>
                          </q-item-section>
                        </template>
                        <q-card>
                          <q-card-section>
                            <div class="row">
                              <div class="col flex items-center">
                                <div class="text-body2 text-grey-7">
                                  Command : {{ trx._value }}
                                </div>
                              </div>
                              <div class="flex flex-center">
                                <q-btn flat size="md" round @click="removeTrx(Index)">
                                  <img src="~assets/icon/delete.svg" />
                                </q-btn>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                    <div v-else class="flex flex-center q-mt-xl">
                      <q-chip square class="q-pa-md" text-color="grey-7" color="grey-3">
                        (No item in the list.)
                      </q-chip>
                    </div>
                  </div>
                </q-tab-panel>
                <!-- TX ( Send ) -->
                <q-tab-panel class="flex" name="tx">
                  <div class="col">
                    <q-list bordered class="rounded-borders" v-if="TCPIP.TcpIp.length > 0"
                      style="max-height: 500px;overflow: auto;">
                      <q-expansion-item group="tcp-tx" v-for="(tx, Index) in TCPIP.TcpIp" :key="Index" expand-separator>
                        <template v-slot:header>
                          <q-item-section>
                            <div class="text-body2">
                              <span><span class="q-mr-md">IP address</span>{{ tx._destination_ip }}</span>
                              <span class="q-ml-lg"><span class="q-mr-md">Port number</span> {{
                                tx._destination_port }}</span>
                            </div>
                          </q-item-section>
                        </template>
                        <q-card>
                          <q-card-section>
                            <div class="row" v-for="(tx, index) in tx.Command" :key="index">
                              <div class="col">
                                <div class="text-body2 text-grey-7 border-b q-mb-sm">
                                  <div>
                                    {{ index + 1 }}. {{ tx._name }}
                                  </div>
                                  <div class="q-ml-md">
                                    Command : {{ tx._value }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex flex-center">
                              <q-btn flat size="md" round @click="removeTx(Index)">
                                <img src="~assets/icon/delete.svg" />
                              </q-btn>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                    <div v-else class="flex flex-center q-mt-xl">
                      <q-chip square class="q-pa-md" text-color="grey-7" color="grey-3">
                        (No item in the list.)
                      </q-chip>
                    </div>
                  </div>

                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
      </q-tab-panel>
      <!-- Timer -->
      <q-tab-panel :name="3">
        <div class="row" style="height: 340px;">
          <div class="col q-pa-xs">
            <div class="text-body1 row">
              <div>Software Timer</div>
            </div>
            <q-form ref="Form" class="" @submit.stop="addTimer">
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input label="Name" class="brand-round-m" bg-color="white" dense outlined type="text"
                    v-model="timer._name" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
              </div>
              <div class="row q-mt-sm">
                <div class="col">
                  <q-input label="Time" class="brand-round-m" bg-color="white" dense outlined type="number" maxlength="4"
                    min="0" prefix="" suffix="sec" v-model.number="timer._duration" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Need filled']" />
                </div>
              </div>
              <div class="row q-mt-md">
                <div style="margin: auto">
                  <q-btn unelevated rounded color="primary" class="text-capitalize q-px-lg" @click="addTimer"
                    label="Add" />
                </div>
              </div>
            </q-form>
          </div>
          <q-separator vertical class="q-ma-lg" />
          <div class="col">
            <q-list bordered class="rounded-borders" v-if="TimerSettings.Timer.length > 0"
              style="max-height: 500px;overflow: auto;">
              <q-expansion-item group="timer" v-for="(timer, Index) in TimerSettings.Timer" :key="Index" expand-separator>
                <template v-slot:header>
                  <q-item-section>
                    <div class="text-body1">
                      {{ Index + 1 }}. {{ timer._name }}
                    </div>
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <div class="row">
                      <div class="col flex items-center">
                        <div class="text-body2 text-grey-7">
                          Time : {{ timer._duration }} Sec
                        </div>
                      </div>
                      <div class="flex flex-center">
                        <q-btn flat size="md" round @click="removeTimer(Index)">
                          <img src="~assets/icon/delete.svg" />
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
            <div v-else class="flex flex-center q-mt-xl">
              <q-chip square class="q-pa-md" text-color="grey-7" color="grey-3">
                (No item in the list.)
              </q-chip>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { uid } from 'quasar'
import inputRules from 'src/mixins/inputRules.js'
import { useWidgetListStore } from 'src/stores/widget'
const widgetStore = useWidgetListStore()

export default {
  name: 'HardWareComponent',
  mixins: [inputRules],
  data() {
    return {
      loading: false,
      panel: 0,
      subPanel: 'on',
      subTcpPanel: 'rx',
      currentPIN: 0,
      rs0: {
        _id: 0,
        _name: '',
        _data_type: '',
        _value: ''
      },
      rs1: {
        _id: 0,
        _name: '',
        _data_type: '',
        _value: ''
      },
      trx: {
        _id: 0,
        _name: '',
        _value: ''
      },
      tx: {
        _id: 0,
        _destination_ip: '',
        _destination_port: '',
        _name: '',
        _value: '',
        Command: [
          {
            _id: 0,
            _name: '',
            _value: ''
          }
        ]
      },
      timer: {
        _id: 0,
        _name: '',
        _duration: ''
      }
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
  setup() {
    function hasChild(scope) {
      return scope.opt.children.some(c => c.value === this.model)
    }
    return { hasChild }
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
    resetData() {
      this.rs0 = {
        _id: 0,
        _name: '',
        _data_type: '',
        _value: ''
      }
      this.rs1 = {
        _id: 0,
        _name: '',
        _data_type: '',
        _value: ''
      }
      this.trx = {
        _id: 0,
        _name: '',
        _value: ''
      }
      this.tx = {
        _id: 0,
        _destination_ip: '',
        _destination_port: '',
        _name: '',
        _value: '',
        Command: [
          {
            _id: 0,
            _name: '',
            _value: ''
          }
        ]
      }
      this.timer = {
        _id: 0,
        _name: '',
        _duration: ''
      }
    },
    addRs0() {
      this.$refs.Form.validate().then(success => {
        // console.log('this.userData', this.userData)
        if (success) {
          const rs = {
            _id: 0,
            _uuid: uid(),
            _name: this.rs0._name,
            _data_type: this.rs0._data_type,
            _value: this.rs0._value
          }

          this.RS232[0].Command.push(rs)

          rs._id = this.RS232[0].Command.length
          this.resetData()
          this.$refs.Form.resetValidation()
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Need filled'
          })
        }
      })
    },
    addRs1() {
      this.$refs.Form.validate().then(success => {
        // console.log('this.userData', this.userData)
        if (success) {
          const rs = {
            _id: 0,
            _uuid: uid(),
            _name: this.rs1._name,
            _data_type: this.rs1._data_type,
            _value: this.rs1._value
          }

          this.RS232[1].Command.push(rs)

          rs._id = this.RS232[1].Command.length
          this.resetData()
          this.$refs.Form.resetValidation()
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Need filled'
          })
        }
      })
    },
    addTrx() {
      this.$refs.FormTrx.validate().then(success => {
        // console.log('this.userData', this.userData)
        if (success) {
          const trx = {
            _id: 0,
            _uuid: uid(),
            _name: this.trx._name,
            _value: this.trx._value
          }

          this.TCPIP.ReceivedCommands.Command.push(trx)

          trx._id = this.TCPIP.ReceivedCommands.Command.length
          this.resetData()
          this.$refs.FormTrx.resetValidation()
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Need filled'
          })
        }
      })
    },
    addTx() {
      this.$refs.FormTx.validate().then(success => {
        // console.log('this.userData', this.userData)
        if (success) {
          let isAlreadyExists = false
          for (let i = 0; i < this.TCPIP.TcpIp.length; i++) {
            if (this.TCPIP.TcpIp[i]._destination_ip === this.tx._destination_ip &&
              this.TCPIP.TcpIp[i]._destination_port === this.tx._destination_port) {
              const tx = {
                _id: 0,
                _uuid: uid(),
                _name: this.tx._name,
                _value: this.tx._value
              }
              this.TCPIP.TcpIp[i].Command.push(tx)
              tx._id = this.TCPIP.TcpIp[i].Command.length
              isAlreadyExists = true
              break
            }
          }

          if (!isAlreadyExists) {
            const tx = {
              _id: 0,
              _destination_ip: this.tx._destination_ip,
              _destination_port: this.tx._destination_port,
              Command: [{
                _id: 0,
                _uuid: uid(),
                _name: this.tx._name,
                _value: this.tx._value
              }]
            }

            this.TCPIP.TcpIp.push(tx)
            tx._id = this.TCPIP.TcpIp.length
          }
          this.resetData()
          this.$refs.FormTx.resetValidation()
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Need filled'
          })
        }
      })
    },
    addTimer() {
      this.$refs.Form.validate().then(success => {
        // console.log('this.userData', this.userData)
        if (success) {
          const timer = {
            _id: 0,
            _uuid: uid(),
            _name: this.timer._name,
            _duration: this.timer._duration
          }

          this.TimerSettings.Timer.push(timer)

          timer._id = this.TimerSettings.Timer.length
          this.resetData()
          this.$refs.Form.resetValidation()
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Need filled'
          })
        }
      })
    },
    removeRs0(index) {
      this.RS232[0].Command.splice(index, 1)
    },
    removeRs1(index) {
      this.RS232[1].Command.splice(index, 1)
    },
    removeTrx(index) {
      this.TCPIP.ReceivedCommands.Command.splice(index, 1)
    },
    removeTx(Index) {
      this.TCPIP.TcpIp.splice(Index, 1)
    },
    removeTimer(Index) {
      this.TimerSettings.Timer.splice(Index, 1)
    },
    toGrid() {
      this.$router.push({ path: '/grid' })
    },
    async toFlow() {
      this.loading = true
      const result = await this.$router.push({ path: '/flow' })
      // console.log('result', result)
      if (result === undefined) {
        this.loading = false
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

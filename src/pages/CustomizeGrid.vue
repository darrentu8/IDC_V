<template>
    <q-page class="flex flex-center overflow-hidden">
        <div class="column">
            <div class="row q-gutter-md">
                <q-input style="width:150px" outlined type="number" :min="1" :max="10" v-model.number="rowCount"
                    label="row count" />
                <q-input style="width:150px" outlined type="number" :min="1" :max="20" v-model.number="colCount"
                    label="column count" />
                <q-btn outline @click="addGrid" color="primary" icon="add" label="Add Grid" />
            </div>
            <div class="row q-mt-lg relative-position" :style="{ width: `${width}px`, height: `${width * 1080 / 1920}px` }">
                <div class="absolute fit column">
                    <div class="col row" v-for="i in rowCount" :key="i">
                        <div class="col" style="border: 1px solid lightgray;padding: 5px;" v-for="k in colCount" :key="k" />
                    </div>
                </div>
                <grid-layout class="fit" v-model:layout="layout" :col-num="colCount" :maxRows="rowCount"
                    :prevent-collision="true" :responsive="false" :vertical-compact="false"
                    :row-height="((width * 1080 / 1920) / rowCount)" :margin="[0, 0]">
                    <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                        :key="item.i">
                        <div class="fit flex flex-center">
                            <div class="bg-grey-3 rounded-borders shadow-2"
                                style="width: calc(100% - 10px); height: calc(100% - 10px);">
                                <!-- <div class="text-subtitle1"> {{ item.i }}</div> -->
                                <q-btn @click="removeGrid(item.i)" size="sm" class="float-right" flat round icon="close" />
                            </div>
                        </div>
                    </grid-item>
                </grid-layout>
            </div>
        </div>
    </q-page>
</template>

<script>
import { uid } from 'quasar'

export default {
    name: 'CustomizeGrid',
    data() {
        return {
            layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 5, y: 0, w: 1, h: 1, i: '2' }],
            rowCount: 4,
            colCount: 10,
            width: 800
        }
    },
    methods: {
        addGrid() {
            this.layout.push({
                x: 0,
                y: 0, // puts it at the bottom
                w: 1,
                h: 1,
                i: uid()
            })
        },
        removeGrid(i) {
            const index = this.layout.findIndex(o => o.i === i)
            this.layout.splice(index, 1)
        }
    }
}
</script>
<style lang="scss"></style>

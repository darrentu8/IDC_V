<template>
    <q-page class="flex flex-center">
        <div class="column">
            <div class="row q-gutter-md">
                <q-input standout v-model.number="rowCount" label="row count" />
                <q-input standout v-model.number="colCount" label="column count" />
            </div>
            <div class="row q-mt-lg relative-position" :style="{ width: `${width}px`, height: `${width * 1400 / 1920}px` }">
                <div class="absolute fit column">
                    <div class="col row" v-for="i in rowCount" :key="i">
                        <div class="col" style="border: 1px solid lightgray;padding: 5px;" v-for="k in colCount" :key="k" />
                    </div>
                </div>
                <grid-layout class="fit" v-model:layout="layout" :col-num="colCount" :maxRows="rowCount"
                    :prevent-collision="true" :responsive="false" :vertical-compact="false"
                    :row-height="((width * 1400 / 1920) / rowCount)" :margin="[0, 0]">
                    <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                        :key="item.i">
                        <div class="fit flex flex-center bg-grey-3 rounded-borders">
                            {{ item.i }}
                        </div>
                    </grid-item>
                </grid-layout>
            </div>
        </div>
    </q-page>
</template>

<script>
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

    }
}
</script>
<style lang="scss">
.grid::before {
    content: '';
    background-size: calc(calc(100% - 5px) / 12) 40px;
    background-image: linear-gradient(to right,
            lightgrey 1px,
            transparent 1px),
        linear-gradient(to bottom, lightgrey 1px, transparent 1px);
    height: calc(100% - 5px);
    width: calc(100% - 5px);
    position: absolute;
    background-repeat: repeat;
    margin: 5px;
}
</style>

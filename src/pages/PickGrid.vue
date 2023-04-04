<template>
    <q-page class="flex flex-center" style="min-width: 1366px;">
        <div class="q-pt-md row fit overflow-hidden">
            <div class="q-pa-sm" style="width:250px">
                <div class="text-body1 q-pl-xs">New Interactive Play List</div>
                <div class="q-pa-sm">
                    <div class="q-pa-sm text-subtitle2 text-bold">Screen Orientation</div>
                    <div>
                        <q-option-group :options="options" type="radio" v-model="radio" />
                    </div>
                </div>
            </div>
            <div class="q-pa-sm" style="width:680px">
                <div class="row q-gutter-sm">
                    <div class="flex flex-center q-pa-xs cursor-pointer" @click="toCustomize">
                        <div class="flex flex-center bg-grey-3" style="border: 1px solid #2B2B2B; border-radius: 10px;"
                            :style="{ width: `${200}px`, height: `${200 * 1080 / 1920}px` }">
                            <div class="column">
                                <div class="row flex-center"> <q-icon name="edit" size="2.4em" /></div>
                                <div class="row flex-center">
                                    <div class="text-subtitle1">Customize</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GridViewStatic @click="chooseGrid(grid)" v-for="(grid, index) in grids" :key="index"
                        :view-layout="grid.layout" :view-row-count="grid.rowCount" :view-col-count="grid.colCount"
                        :view-width="200" />
                </div>
            </div>
            <div class="col q-pa-sm">
                <div>
                    <div class="text-body1">Play List Name</div>
                    <q-input filled dense square />
                </div>
                <div class="q-pt-sm">
                    <div class="text-body1">Play List Name</div>
                    <q-input type="textarea" filled dense square />
                </div>
                <div class="q-pt-sm">
                    <div class="text-body1">Select layout</div>
                    <div class="text-body2">Grids:</div>
                    <div class="text-body2">Region size:</div>
                    <div class="text-body2">Region location :</div>
                    <div class="text-body2">Dimension :</div>
                    <div class="text-body2">Ratio :</div>
                </div>
                <div v-if="currentGrid" class="q-pt-sm flex flex-center">
                    <div style="width:100%">
                        <grid-layout :layout="currentGrid.layout" :col-num="currentGrid.colCount"
                            :maxRows="currentGrid.rowCount" :row-height="265 / currentGrid.rowCount" :is-draggable="false"
                            :is-resizable="false" :vertical-compact="true" :margin="[0, 0]">
                            <grid-item static v-for="(item, index) in currentGrid.layout" :x="item.x" :y="item.y"
                                :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                                <div class="fit cursor-pointer" @click="chooseCube(item.i)">
                                    <div class="Frounded-borders  flex flex-center grid-cube"
                                        :class="{ 'bg-grey-3': currentCube !== item.i, 'bg-cyan-13': currentCube === item.i }"
                                        style="width: calc(100% - 3px); height: calc(100% - 3px);">
                                        {{ index + 1 }}
                                    </div>
                                </div>
                            </grid-item>
                        </grid-layout>
                    </div>
                </div>
                <div v-if="currentGrid" class="q-pt-md q-gutter-md row reverse flex flex-center">
                    <q-btn outline color="primary" label="Cancel" />
                    <q-btn outline @click="toFlow" color="primary" label="Create" />
                </div>
            </div>
        </div>

    </q-page>
</template>

<script>
import GridViewStatic from 'src/components/GridViewStatic.vue'

export default {
    name: 'PickGrid',
    components: {
        GridViewStatic
    },
    data() {
        return {
            drawerLeft: true,
            drawerRight: true,
            radio: 0,
            options: [
                { label: 'Landscape', value: 0 },
                { label: 'Landscape(flipped)', value: 1 },
                { label: 'Portrait', value: 2 },
                { label: 'Portrait(flipped)', value: 3 }
            ],
            grids: [
                {
                    rowCount: 1,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 0, y: 1, w: 3, h: 1, i: '4' }]
                },
                {
                    rowCount: 1,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 3, h: 1, i: '1' }, { x: 3, y: 0, w: 1, h: 1, i: '2' }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 0, y: 1, w: 1, h: 1, i: '2' }, { x: 1, y: 0, w: 1, h: 2, i: '3' }]
                },
                {
                    rowCount: 1,
                    colCount: 1,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 2, h: 1, i: '2' }, { x: 1, y: 1, w: 3, h: 1, i: '3' }]
                },
                {
                    rowCount: 4,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 3, h: 2, i: '1' }, { x: 0, y: 2, w: 3, h: 2, i: '2' }, { x: 3, y: 0, w: 1, h: 4, i: '3' }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 0, y: 1, w: 1, h: 1, i: '3' }, { x: 1, y: 1, w: 1, h: 1, i: '4' }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 1, y: 1, w: 1, h: 1, i: '4' }, { x: 2, y: 1, w: 1, h: 1, i: '5' }]
                },
                {
                    rowCount: 2,
                    colCount: 7,
                    layout: [{ x: 0, y: 0, w: 7, h: 1, i: '1' }, { x: 0, y: 1, w: 2, h: 1, i: '2' }, { x: 2, y: 1, w: 3, h: 1, i: '3' }, { x: 5, y: 1, w: 2, h: 1, i: '4' }]
                },
                {
                    rowCount: 3,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 3, h: 2, i: '2' }, { x: 0, y: 2, w: 1, h: 1, i: '3' }, { x: 1, y: 0, w: 3, h: 1, i: '4' }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 0, y: 1, w: 1, h: 1, i: '4' }, { x: 1, y: 1, w: 1, h: 1, i: '5' }, { x: 2, y: 1, w: 1, h: 1, i: '6' }]
                },
                {
                    rowCount: 10,
                    colCount: 10,
                    layout: [{ x: 0, y: 0, w: 10, h: 3, i: '1' }, { x: 0, y: 3, w: 6, h: 7, i: '2' }, { x: 6, y: 3, w: 2, h: 2, i: '3' }, { x: 8, y: 3, w: 2, h: 2, i: '4' }, { x: 6, y: 5, w: 4, h: 3, i: '5' }, { x: 6, y: 8, w: 4, h: 2, i: '6' }]
                }
            ],
            currentGrid: null,
            currentCube: null
        }
    },
    methods: {
        chooseGrid(grid) {
            this.currentGrid = grid
        },
        chooseCube(id) {
            this.currentCube = id
        },
        toFlow() {
            this.$router.push({ path: '/flow' })
        },
        toCustomize() {
            this.$router.push({ path: '/customize' })
        }
    }
}
</script>
<style lang="scss" scoped>
.grid-cube:hover {
    filter: brightness(0.9)
}
</style>

<template>
    <q-page class="flex flex-center" style="min-width: 1200px;">
        <div class="column">
            <div class="col flex flex-center">
                <q-stepper :model-value="2" :bordered="false" flat alternative-labels color="primary"
                    style="background-color: transparent;width: 800px;">
                    <q-step :name="1" prefix="1" title="Define the name" :done="true" />
                    <q-step :name="2" prefix="2" title="Select layout" caption="Optional" />
                    <q-step :name="3" prefix="3" title="Hardware configuration" caption="Optional" />
                </q-stepper>
            </div>
            <div class="col">
                <q-card class="bg-white text-black brand-round q-pa-lg" style="width:1100px;margin-top: -50px;">
                    <div class="column">
                        <div class="row" style="height:30px">
                            <div class="text-body1 text-bold" style="margin:auto 20px">Select layout </div>
                        </div>
                        <div class="col row overflow-hidden">
                            <div class="q-pa-sm" style="width:550px">
                                <q-scroll-area style="height: 400px; width: 100%;">
                                    <div class="row q-gutter-sm">
                                        <div class="flex flex-center q-pa-xs cursor-pointer" @click="toCustomize">
                                            <div class="flex flex-center bg-grey-3"
                                                style="border: 1px solid #2B2B2B; border-radius: 10px;"
                                                :style="{ width: `${gridWidth}px`, height: `${gridWidth * 1080 / 1920}px` }">
                                                <div class="column">
                                                    <div class="row flex-center"> <q-icon name="edit" size="2.4em" /></div>
                                                    <div class="row flex-center">
                                                        <div class="text-subtitle1">Customize</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <GridViewStatic @click="chooseGrid(grid)" v-for="(grid, index) in grids"
                                            :key="index" :view-layout="grid.layout" :view-row-count="grid.rowCount"
                                            :view-col-count="grid.colCount" :view-width="gridWidth" />
                                    </div>
                                </q-scroll-area>
                            </div>
                            <div class="col q-pa-sm" style="width:500px">
                                <div class="q-pt-sm" v-if="currentGrid">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="text-body2 q-pa-sm">
                                                Grids :
                                                {{ `(${currentGrid.rowCount} x ${currentGrid.colCount})` }}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-body2 q-pa-sm">Region size :
                                                <span v-if="currentCube">
                                                    {{ `(${currentCube.w} x ${currentCube.h})` }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-body2 q-pa-sm">Region location :
                                                <span v-if="currentCube">
                                                    {{ `(${currentCube.x} , ${currentCube.y})` }} -
                                                    {{ `(${currentCube.x + currentCube.w} , ${currentCube.y +
                                                        currentCube.h})` }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-body2 q-pa-sm">Dimension :
                                                <span v-if="currentCube">
                                                    {{ `(${(currentCube.w / currentGrid.colCount * 1920).toFixed(0)}` }} x
                                                    {{ `${(currentCube.h / currentGrid.rowCount * 1080).toFixed(0)})` }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-body2 q-pa-sm">Ratio :
                                                <span v-if="currentCube">
                                                    {{ `(${(currentCube.w / currentGrid.colCount * 1920).toFixed(0) /
                                                        getMaxCommonDivisor((currentCube.w / currentGrid.colCount *
                                                            1920).toFixed(0),
                                                            (currentCube.h
                                                                /
                                                                currentGrid.rowCount * 1080).toFixed(0))}` }} /
                                                    {{ `${(currentCube.h / currentGrid.rowCount * 1080).toFixed(0) /
                                                        getMaxCommonDivisor((currentCube.w / currentGrid.colCount *
                                                            1920).toFixed(0),
                                                            (currentCube.h
                                                                /
                                                                currentGrid.rowCount * 1080).toFixed(0))})` }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="currentGrid" class="q-pt-md flex flex-center">
                                    <div style="width:100%">
                                        <grid-layout :layout="currentGrid.layout" :col-num="currentGrid.colCount"
                                            :maxRows="currentGrid.rowCount" :row-height="265 / currentGrid.rowCount"
                                            :is-draggable="false" :is-resizable="false" :vertical-compact="true"
                                            :margin="[0, 0]">
                                            <grid-item static v-for="(item, index) in currentGrid.layout" :x="item.x"
                                                :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                                                <div class="fit cursor-pointer" @click="chooseCube(item.i)">
                                                    <div class="Frounded-borders  flex flex-center grid-cube"
                                                        :class="{ 'bg-grey-3': currentCubeId !== item.i, 'bg-cyan-13': currentCubeId === item.i }"
                                                        style="width: calc(100% - 3px); height: calc(100% - 3px);">
                                                        {{ index + 1 }}
                                                    </div>
                                                </div>
                                            </grid-item>
                                        </grid-layout>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row flex" style="height:50px">
                            <q-btn class="brand-round" @click="toNew" style="width:116px;margin:auto 20px" color="grey"
                                label="Back" outline="" icon="arrow_back" />
                            <q-space />
                            <q-btn class="brand-round" @click="toHardware" style="width:116px;margin:auto 20px"
                                color="primary" label="Next" icon="arrow_forward" />
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import { uid } from 'quasar'
import GridViewStatic from 'src/components/GridViewStatic.vue'
import { useLayoutStore } from 'src/stores/layout'
import { getMaxCommonDivisor } from 'src/helper/math'

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
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 3, h: 1, i: uid() }]
                },
                {
                    rowCount: 1,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 3, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 2, i: uid() }]
                },
                {
                    rowCount: 1,
                    colCount: 1,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 1, i: uid() }, { x: 1, y: 1, w: 3, h: 1, i: uid() }]
                },
                {
                    rowCount: 4,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 3, h: 2, i: uid() }, { x: 0, y: 2, w: 3, h: 2, i: uid() }, { x: 3, y: 0, w: 1, h: 4, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 2,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 7,
                    layout: [{ x: 0, y: 0, w: 7, h: 1, i: uid() }, { x: 0, y: 1, w: 2, h: 1, i: uid() }, { x: 2, y: 1, w: 3, h: 1, i: uid() }, { x: 5, y: 1, w: 2, h: 1, i: uid() }]
                },
                {
                    rowCount: 3,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 1, y: 0, w: 3, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 3, h: 1, i: uid() }]
                },
                {
                    rowCount: 2,
                    colCount: 3,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }]
                },
                {
                    rowCount: 10,
                    colCount: 10,
                    layout: [{ x: 0, y: 0, w: 10, h: 3, i: uid() }, { x: 0, y: 3, w: 6, h: 7, i: uid() }, { x: 6, y: 3, w: 2, h: 2, i: uid() }, { x: 8, y: 3, w: 2, h: 2, i: uid() }, { x: 6, y: 5, w: 4, h: 3, i: uid() }, { x: 6, y: 8, w: 4, h: 2, i: uid() }]
                },
                {
                    rowCount: 3,
                    colCount: 4,
                    layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 4, h: 2, i: uid() }]
                }
            ],
            gridWidth: 160,
            currentGrid: null,
            currentCubeId: null
        }
    },
    computed: {
        currentCube() {
            return this.currentGrid.layout.find(o => o.i === this.currentCubeId)
        }
    },
    methods: {
        chooseGrid(grid) {
            this.currentGrid = grid
        },
        chooseCube(id) {
            this.currentCubeId = id
        },
        toNew() {
            this.$router.push({ path: '/new' })
        },
        toFlow() {
            const layoutStore = useLayoutStore()
            layoutStore.SetLayout(this.currentGrid)

            this.$router.push({ path: '/flow' })
        },
        toHardware() {
            const layoutStore = useLayoutStore()
            layoutStore.SetLayout(this.currentGrid)

            this.$router.push({ path: '/hardware' })
        },
        toCustomize() {
            this.$router.push({ path: '/customize' })
        },
        getMaxCommonDivisor(n1, n2) {
            return getMaxCommonDivisor(n1, n2)
        }
    }
}
</script>
<style lang="scss" scoped>
.grid-cube:hover {
    filter: brightness(0.9)
}
</style>

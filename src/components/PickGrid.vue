<template>
    <q-page class="flex flex-center">
        <div class="row q-gutter-md" style="min-width: 800px; max-width: 1400px;">
            <div class="flex flex-center" style="width:192px;height:145px;cursor: pointer;" @click="toCustomize">
                <div class="flex flex-center"
                    style="border: 1px solid #2B2B2B; border-radius: 10px; width: 95%; height: 95%">
                    <div class="column">
                        <div class="row flex-center"> <q-icon name="edit" size="2.4em" /></div>
                        <div class="row flex-center">
                            <div class="text-subtitle1">Customize</div>
                        </div>
                    </div>
                </div>
            </div>
            <GridViewStatic @click="toFlow" v-for="(grid, index) in grids" :key="index" :view-layout="grid.layout"
                :view-row-count="grid.rowCount" :view-col-count="grid.colCount" :view-width="200" />
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
            ]
        }
    },
    methods: {
        toFlow() {
            this.$router.push({ path: '/flow' })
        },
        toCustomize() {
            this.$router.push({ path: '/customize' })
        }
    }
}
</script>
<style lang="scss" scoped></style>

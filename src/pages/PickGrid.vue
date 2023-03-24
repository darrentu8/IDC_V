<template>
    <q-page class="flex flex-center">
        <div class="row q-gutter-md" style="min-width: 800px; max-width: 1400px;" @click="toCustomize">
            <div class="flex flex-center" style="width:192px;height:145px;cursor: pointer;">
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
            <GridViewStatic :view-layout="layouts[0]" :view-row-count="1" :view-col-count="2" :view-width="192" />
            <GridViewStatic :view-layout="layouts[1]" :view-row-count="2" :view-col-count="2" :view-width="192" />
            <GridViewStatic :view-layout="layouts[2]" :view-row-count="2" :view-col-count="3" :view-width="192" />
            <GridViewStatic :view-layout="layouts[3]" :view-row-count="1" :view-col-count="4" :view-width="192" />
            <GridViewStatic :view-layout="layouts[4]" :view-row-count="2" :view-col-count="2" :view-width="192" />
            <GridViewStatic :view-layout="layouts[5]" :view-row-count="1" :view-col-count="1" :view-width="192" />
            <GridViewStatic :view-layout="layouts[6]" :view-row-count="2" :view-col-count="3" :view-width="192" />
            <GridViewStatic :view-layout="layouts[7]" :view-row-count="4" :view-col-count="4" :view-width="192" />
            <GridViewStatic :view-layout="layouts[8]" :view-row-count="2" :view-col-count="2" :view-width="192" />
            <GridViewStatic :view-layout="layouts[9]" :view-row-count="2" :view-col-count="3" :view-width="192" />
            <GridViewStatic :view-layout="layouts[10]" :view-row-count="2" :view-col-count="7" :view-width="192" />
            <GridViewStatic :view-layout="layouts[11]" :view-row-count="3" :view-col-count="4" :view-width="192" />
            <GridViewStatic :view-layout="layouts[12]" :view-row-count="2" :view-col-count="3" :view-width="192" />
            <GridViewStatic :view-layout="layouts[13]" :view-row-count="10" :view-col-count="10" :view-width="192" />
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
            layouts: [
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }],
                [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 1, y: 1, w: 1, h: 1, i: '3' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 0, y: 1, w: 3, h: 1, i: '4' }],
                [{ x: 0, y: 0, w: 3, h: 1, i: '1' }, { x: 3, y: 0, w: 1, h: 1, i: '2' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 0, y: 1, w: 1, h: 1, i: '2' }, { x: 1, y: 0, w: 1, h: 2, i: '3' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 2, h: 1, i: '2' }, { x: 1, y: 1, w: 3, h: 1, i: '3' }],
                [{ x: 0, y: 0, w: 3, h: 2, i: '1' }, { x: 0, y: 2, w: 3, h: 2, i: '2' }, { x: 3, y: 0, w: 1, h: 4, i: '3' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 0, y: 1, w: 1, h: 1, i: '3' }, { x: 1, y: 1, w: 1, h: 1, i: '4' }],
                [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 1, y: 1, w: 1, h: 1, i: '4' }, { x: 2, y: 1, w: 1, h: 1, i: '5' }],
                [{ x: 0, y: 0, w: 7, h: 1, i: '1' }, { x: 0, y: 1, w: 2, h: 1, i: '2' }, { x: 2, y: 1, w: 3, h: 1, i: '3' }, { x: 5, y: 1, w: 2, h: 1, i: '4' }],
                [{ x: 0, y: 0, w: 1, h: 2, i: '1' }, { x: 1, y: 0, w: 3, h: 2, i: '2' }, { x: 0, y: 2, w: 1, h: 1, i: '3' }, { x: 1, y: 0, w: 3, h: 1, i: '4' }],
                [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }, { x: 2, y: 0, w: 1, h: 1, i: '3' }, { x: 0, y: 1, w: 1, h: 1, i: '4' }, { x: 1, y: 1, w: 1, h: 1, i: '5' }, { x: 2, y: 1, w: 1, h: 1, i: '6' }],
                [{ x: 0, y: 0, w: 10, h: 3, i: '1' }, { x: 0, y: 3, w: 6, h: 7, i: '2' }, { x: 6, y: 3, w: 2, h: 2, i: '3' }, { x: 8, y: 3, w: 2, h: 2, i: '4' }, { x: 6, y: 5, w: 4, h: 3, i: '5' }, { x: 6, y: 8, w: 4, h: 2, i: '6' }]
            ]
        }
    },
    methods: {
        toCustomize() {
            this.$router.push({ path: '/customize' })
        }
    }
}
</script>
<style lang="scss" scoped></style>

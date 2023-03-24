<template>
    <div class="static-grid-view-wrapper" :style="{ width: `${viewWidth}px` }">
        <grid-layout :layout="viewLayout" :col-num="viewColCount" :maxRows="viewRowCount"
            :row-height="((viewWidth * 1400 / 1920) / viewRowCount) - 5" :is-draggable="false" :is-resizable="false"
            :vertical-compact="true" :margin="[5, 5]">
            <grid-item static v-for="item in viewLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                :key="item.i">
                <div class="fit flex flex-center bg-grey-3 rounded-borders">
                    {{ item.i }}
                </div>
            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
export default {
    name: 'GridViewComponent',
    props: ['viewRowCount', 'viewColCount', 'viewLayout', 'viewWidth'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.static-grid-view-wrapper:hover {
    cursor: pointer;
    outline: 1px solid #2B2B2B;
    border-radius: 10px;
}
</style>

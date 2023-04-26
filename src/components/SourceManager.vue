<template>
    <q-page class="flex flex-center overflow-hidden">
        <div class="col">Source</div>
        <q-btn icon="add" flat @click="add" />
        <div v-for="(sourceFile, index) in sourceList" :key="sourceFile">
            {{ sourceFile }}
            <q-btn icon="delete" flat @click="deleteFile(sourceFile, index)" />
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'SourceManager',
    data() {
        return {
            sourceList: []
        }
    },
    methods: {
        add() {
            const filePath = window.myAPI.chooseSource()
            this.sourceList.push(filePath)
        },
        deleteFile(sourceFile, index) {
            window.myAPI.deleteFile(sourceFile)
            this.sourceList.splice(index, 1)
        }
    }
}
</script>
<style lang="scss"></style>

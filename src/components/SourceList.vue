<template>
  <q-item-label header class="border-b">Source
    <q-btn label="" v-on:click="selectFile()" flat class="theme-tab-btn" color="green" icon="add"
      style="height: 49.8px;margin-top: -16px;" />
    <q-file ref="fileRef" v-model="files" multiple style="display: none" v-bind:max-files="10" accept="image/*, video/*"
      @input="startUpload()" />
  </q-item-label>
  <div class="q-mt-md">
    <div v-if="files.length">
      <div v-for="(file, i) in files" :key="i" class="row flex items-center">
        <div class="col-1">
          {{ i + 1 }}
        </div>
        <div class="col-9">
          <div class="full-width">
            <div>{{ file.filename }}</div>
            <!-- <q-file filled bottom-slots label="Pick File" counter v-model="files">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
              </template>
            </q-file> -->
            <!-- <q-uploader ref="uploader" :url="uploadUrl" :additional-fields="{ token: 'myToken' }" :auto-upload="false"
              @added="startUpload">
            </q-uploader> -->
          </div>
        </div>
        <div class="col-2">
          <q-btn label="" @click="delFile()" round flat class="" color="green" icon="delete_outline" />
        </div>
      </div>
    </div>
    <div v-else>
      none file
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SourceList',
  data() {
    return {
      files: []
    }
  },
  methods: {
    selectFile() {
      this.$refs.fileRef.pickFiles()
    },
    async startUpload(file) {
      console.log('file', file)
      try {
        // if (file) {
        //   this.files.push(file)
        // }
        for (const file of this.files) {
          const filePath = file.url // 或許需要根據實際情況修改這裡
          await window.myAPI?.copyFile(filePath)
        }

        alert('Files saved successfully!')
      } catch (err) {
        console.error(err)
        alert('Error occurred while saving files.')
      } finally {
        this.files = [] // 清空檔案列表
      }
    }
  },
  setup() {
    return {
    }
  }
})
</script>

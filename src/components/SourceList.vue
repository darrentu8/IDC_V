<template>
  <q-item-label header class="border-b">Source
    <q-btn label="" v-on:click="selectFile()" flat class="theme-tab-btn" color="green" icon="add"
      style="height: 49.8px;margin-top: -16px;" />
    <q-file ref="fileRef" v-model="files" multiple style="display: none" v-bind:max-files="10" accept="image/*, video/*"
      @update:model-value="startUpload" />
  </q-item-label>
  <div class="q-mt-md">
    <div v-if="files.length">
      <div v-for="(file, i) in files" :key="i" class="row flex items-center">
        <div class="col-1">
          {{ i + 1 }}
        </div>
        <div class="col-9">
          <div class="full-width">
            <div>{{ file.name }}</div>
            <small class="text-grey">{{ humanFileSize(file.size) }}</small>
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
          <q-btn label="" @click="delFile(i)" round flat class="" color="green" icon="delete_outline" />
        </div>
      </div>
    </div>
    <div v-else class="col-12 q-mx-lg">
      <q-file filled label="None Select file" disable>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
      </q-file>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SourceList',
  data() {
    return {
      fileList: [],
      files: []
    }
  },
  methods: {
    humanFileSize(size) {
      const i = (size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024)))
      return ((size / Math.pow(1024, i)).toFixed(2) * 1) + ' ' + (['B', 'kB', 'MB', 'GB', 'TB'][i])
    },
    selectFile() {
      this.$refs.fileRef.pickFiles()
    },
    delFile(i) {
      this.files.splice(i, 1)
    },
    async startUpload() {
      const uploadedFiles = Array.from(this.files)
      // 將每個檔案加入到 files 陣列中
      try {
        for (const file of uploadedFiles) {
          console.log('uploadedFiles', uploadedFiles)
          const filePath = file.url // 或許需要根據實際情況修改這裡
          await window.myAPI?.copyFile(filePath)
        }
        console.log('this.files', this.files)
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

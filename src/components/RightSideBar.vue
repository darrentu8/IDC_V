<template>
  <q-toolbar class="text-primary bg-grey-4 justify-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn class="" color="grey-2" text-color="grey-9" size="sx" stack @click="exportFile()"
        style="line-height: 1.615em;">
        <!-- <q-icon name="img:/icon/export.svg" color="white" size="xs" /> -->
        Hardware
        <br>configuration
      </q-btn>
      <q-btn class="q-pt-sm" color="grey-2" text-color="grey-9" size="sx" stack @click="exportFile()">
        <q-icon name="img:/icon/export.svg" color="white" size="xs" />
        Export
      </q-btn>
      <!-- <q-btn class="q-pt-sm" color="grey-2" text-color="grey-9" size="sx" stack>
          <q-icon name="img:/icon/preview.svg" color="white" size="xs" />
          Preview
        </q-btn> -->
    </div>
  </q-toolbar>
  <q-scroll-area style="height: calc(100% - 86px);">
    <q-item-label header>
      Connection settings
    </q-item-label>
    <ConnectionSettingList />
  </q-scroll-area>
</template>
<script>
import ConnectionSettingList from './ConnectionSettingList.vue'
import { defineComponent } from 'vue'
import X2js from 'x2js'
export default defineComponent({
  name: 'FlowPage',
  components: {
    ConnectionSettingList
  },
  mounted() {
  },
  methods: {
    exportFile() {
      const x2js = new X2js({ attributePrefix: '-' })
      const novoObj = {
        NovoDS: {
          '-Description': '',
          '-Playlist_UUID': '',
          '-Layout_Type': '0',
          '-Version': '1.1',
          '-Model_Type': 'ds200',
          Pages: {
            Page: {
              '-Description': '',
              '-BackgroundMusic': '',
              '-SerialNumber': 'Page 1',
              '-AudioSource': '',
              '-BgMusicApplyToAll': 'false',
              '-ID': 'Page 1',
              '-FreeDesignerMode': 'false',
              '-BackgroundImageSize': '160',
              '-BackgroundImage': '',
              '-Layout': 'Portrait 14',
              '-Row': '6',
              '-BackgroundMusicSize': '160',
              '-BackgroundMusicUrl': '',
              '-Column': '2',
              '-Orientation': '1'
            }
          },
          Timeline: {
            '-Looping': 'true',
            Item: {
              '-Page': 'Page 1',
              '-Duration': '1800',
              '-self-closing': 'true'
            }
          }
        }
      }
      const xmlData = x2js.js2xml(novoObj)
      console.log(xmlData)
      const blob = new Blob([xmlData], { type: 'application/xml,' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'index'
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
})
</script>

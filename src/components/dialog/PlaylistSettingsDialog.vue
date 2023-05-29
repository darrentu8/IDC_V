<template>
  <q-dialog ref="dialog" persistent>
    <q-card class="bg-white text-black brand-round-l q-pa-lg" style="min-width: 600px;height:700px;">
      <q-bar class="row bg-white text-bold" style="font-size:24px;height:30px">
        Playlist Settings
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-card-section>

        <div class="row q-mt-md">
          <div class="col-12">
            <q-radio v-model="BackgroundImageType" val="BackgroundImage" label="Background Image" class="q-mb-sx"
              color="" />
            <q-btn :disable="BackgroundImageType !== 'BackgroundImage'" flat class="q-mr-xs" style="float: right;"
              color="primary" round @click="$refs.BackgroundUpload.pickFiles()">
              <img src="~assets/icon/folder-add.svg" />
            </q-btn>
            <q-input @click="addBG" ref="BackgroundUpload" :disable="BackgroundImageType !== 'BackgroundImage'"
              label="Upload background file" class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundImage" dense
              outlined>
              <template v-if="BackgroundImage" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearBG" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-radio v-model="BackgroundImageType" val="BackgroundColor" label="Background Color" class="q-mb-sx"
              color="" />
            <q-btn :disable="BackgroundImageType !== 'BackgroundColor'" flat class="q-mr-xs" style="float: right;"
              color="primary" round>
              <img src="~assets/icon/edit-o.svg" />
            </q-btn>
            <div class="col-12 q-mx-lg q-mt-sm">
              <div :disable="BackgroundImageType !== 'BackgroundColor'" class="flex theme-bg-select cursor-pointer"
                @click="SetBGC(index)">
                <img class="" src="~assets/icon/bg/bg-01.svg" />
                <img class="" src="~assets/icon/bg/bg-02.svg" />
                <img class="" src="~assets/icon/bg/bg-03.svg" />
                <img class="" src="~assets/icon/bg/bg-04.svg" />
                <img class="" src="~assets/icon/bg/bg-05.svg" />
                <img class="" src="~assets/icon/bg/bg-06.svg" />
                <img class="" src="~assets/icon/bg/bg-07.svg" />
                <img class="" src="~assets/icon/bg/bg-08.svg" />
                <img class="" src="~assets/icon/bg/bg-09.svg" />
                <img class="" src="~assets/icon/bg/bg-10.svg" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator class="q-my-sx" />
      <q-card-section>
        <div class="row ">
          <div class="col-12 q-mb-md">
            <span class="q-pa-xs">Audio source</span>
          </div>
          <div class="col-12">
            <q-radio @update:model-value="(val) => setAudioSource(val)" v-model="BackgroundMusicType" val="Mute"
              label="Mute" class="" color="" />
          </div>
          <div class="col-12">
            <q-radio @update:model-value="(val) => setAudioSource(val)" v-model="BackgroundMusicType"
              val="BackgroundMusic" label="Background music" class="" color="" />
            <q-input :disable="BackgroundMusicType !== 'BackgroundMusic'" label="Upload audio file"
              placeholder="File name" @click="addAudio()" class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundMusic"
              dense outlined>
              <template v-if="BackgroundMusic" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearAudio" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-radio @update:model-value="(val) => setAudioSource(val)" v-model="BackgroundMusicType" val="Widget"
              label="Widget" class="" color="" />
            <q-select v-if="BackgroundMusicType == 'Widget'" class="brand-round-m q-mx-lg q-mb-md"
              label="Select audio source" bg-color="white" outlined dense v-model="AudioSource"
              :disable="BackgroundMusicType !== 'Widget'" :options="sectionOptions" option-value="_ID"
              option-label="_name" emit-value map-options>
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pb-lg absolute-bottom">
        <q-space />
        <q-btn v-close-popup color="primary" label="Save" class="brand-round-l text-capitalize"
          style="width:116px;margin:auto 20px" icon="check" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
const widgetStore = useWidgetListStore()
export default {
  name: 'PlaylistSettingsDialog',
  setup() {
    const sectionOptions = computed(() => widgetStore.GetSectionOptions)
    return { sectionOptions }
  },
  created() {
  },
  data() {
    return {
      BackgroundImageType: '',
      BackgroundMusicType: 'Widget'
    }
  },
  computed: {
    BackgroundImage: {
      get() {
        return widgetStore.NovoDS.Pages.Page._BackgroundImage
      },
      set(newValue) {
        widgetStore.NovoDS.Pages.Page._BackgroundImage = newValue
      }
    },
    BackgroundMusic: {
      get() {
        return widgetStore.NovoDS.Pages.Page._BackgroundMusic
      },
      set(newValue) {
        widgetStore.NovoDS.Pages.Page._BackgroundMusic = newValue
      }
    },
    BackgroundMusicUrl: {
      get() {
        return widgetStore.NovoDS.Pages.Page._BackgroundMusicUrl
      },
      set(newValue) {
        widgetStore.NovoDS.Pages.Page._BackgroundMusicUrl = newValue
      }
    },
    AudioSource: {
      get() {
        let val = widgetStore.NovoDS.Pages.Page._AudioSource
        if (typeof val === 'string' && val !== 'mute' && val !== 'background_music' && val !== 'background_design') {
          val = parseInt(val)
          val = this.sectionOptions.find(
            (o) => o._ID === val
          )
        }
        return val
      },
      set(newValue) {
        widgetStore.NovoDS.Pages.Page._AudioSource = newValue
      }
    }
  },
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    async addAudio() {
      const fileData = await window.myAPI.chooseAudioSource(widgetStore.nowPlayListPath)
      console.log('fileData', fileData)
      const fileDatas = await window.myAPI.getSingleFileData(fileData)
      widgetStore.AddAudioSourceList(fileDatas)
    },
    setAudioSource(val) {
      console.log('val', val)
      widgetStore.SetAudioSource(val)
    },
    clearAudio() {
      widgetStore.DelAudioSource()
    },
    async addBG() {
      const fileData = await window.myAPI.chooseBGSource(widgetStore.nowPlayListPath)
      console.log('fileData', fileData)
      const fileDatas = await window.myAPI.getSingleFileData(fileData)
      widgetStore.AddBGSourceList(fileDatas)
    },
    clearBG() {
      widgetStore.DelBGSource()
    },
    SetBGC(index) {
      console.log('SetBGC')
    }
  }
}
</script>
<style lang="scss"></style>

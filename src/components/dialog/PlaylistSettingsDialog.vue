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
              icon="img:/icon/folder-add.svg" color="primary" round @click="$refs.BackgroundUpload.pickFiles()" />
            <q-file ref="BackgroundUpload" :disable="BackgroundImageType !== 'BackgroundImage'" clearable
              label="Upload background file" class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundImageData" dense
              outlined />
          </div>
          <div class="col-12">
            <q-radio v-model="BackgroundImageType" val="BackgroundColor" label="Background Color" class="q-mb-sx"
              color="" />
            <q-btn :disable="BackgroundImageType !== 'BackgroundColor'" flat class="q-mr-xs" style="float: right;"
              icon="img:/icon/edit-o.svg" color="primary" round />
            <div class="col-12 q-mx-lg q-mt-sm">
              <q-icon v-for="index in 10" :key="index" :disable="BackgroundImageType !== 'BackgroundColor'"
                v-model="BackgroundImage" class="theme-bg-select cursor-pointer" label=""
                :name="'img:/icon/bg/bg-' + `${(index < 10 ? '0' + (index) : (index))}` + '.svg'" color="primary"
                @click="SetBGC(index)" />
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
            <q-radio v-model="BackgroundMusicType" val="Mute" label="Mute" class="" color="" />
          </div>
          <div class="col-12">
            <q-radio v-model="BackgroundMusicType" val="BackgroundMusic" label="Background music" class="" color="" />
            <q-file :disable="BackgroundMusicType !== 'BackgroundMusic'" label="Upload audio file" clearable
              placeholder="File name" class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundMusicData" dense
              outlined />
          </div>
          <div class="col-12">
            <q-radio v-model="BackgroundMusicType" val="Widget" label="Widget" class="" color="" />
            <q-select class="brand-round-m q-mx-lg q-mb-md" label="Select audio source" bg-color="white" outlined dense
              v-model="AudioSource" :disable="BackgroundMusicType !== 'Widget'" :options="['Mute']" />
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
import { useLayoutStore } from 'src/stores/layout'
const layoutStore = useLayoutStore()

export default {
  name: 'PlaylistSettingsDialog',
  data() {
    return {
      BackgroundImageType: '',
      BackgroundMusicType: '',
      BackgroundImageData: null,
      BackgroundMusicData: null
    }
  },
  computed: {
    BackgroundImage: {
      get() {
        return layoutStore.NovoDS.Pages.Page._BackgroundImage
      },
      set(newValue) {
        layoutStore.NovoDS.Pages.Page._BackgroundImage = newValue
      }
    },
    BackgroundMusic: {
      get() {
        return layoutStore.NovoDS.Pages.Page._BackgroundMusic
      },
      set(newValue) {
        layoutStore.NovoDS.Pages.Page._BackgroundMusic = newValue
      }
    },
    BackgroundMusicUrl: {
      get() {
        return layoutStore.NovoDS.Pages.Page._BackgroundMusicUrl
      },
      set(newValue) {
        layoutStore.NovoDS.Pages.Page._BackgroundMusicUrl = newValue
      }
    },
    AudioSource: {
      get() {
        return layoutStore.NovoDS.Pages.Page._AudioSource
      },
      set(newValue) {
        layoutStore.NovoDS.Pages.Page._AudioSource = newValue
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
    SetBGC(index) {

    }
  }
}
</script>
<style lang="scss"></style>

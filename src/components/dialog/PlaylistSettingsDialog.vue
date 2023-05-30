<template>
  <q-dialog ref="dialog" persistent @before-show="initSettings">
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
              <ColorPicker @changeColor="changeBackgroundColor" v-model:selectedColor="background.color.selectedColor"
                v-model:colors="background.color.options" />
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

<script setup>
import { colors } from 'quasar'
import { ref, reactive, computed } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import ColorPicker from 'src/components/ColorPicker.vue'
const sectionOptions = computed(() => widgetStore.GetSectionOptions)
const BackgroundImageType = ref('')
const BackgroundMusicType = ref('Widget')
const widgetStore = useWidgetListStore()

const BackgroundImage = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundImage)
const BackgroundImageSize = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundImageSize)
const BackgroundMusic = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundMusic)
// const dialogRef = ref(null)

// const show = () => {
//   dialogRef.value.show()
// }

// const hide = () => {
//   dialogRef.value.hide()
// }
const backgroundType = {
  Image: 0,
  Color: 1
}
const background = reactive({
  type: backgroundType.Image,
  image: {
    file: null,
    name: '',
    size: 0
  },
  color: {
    selectedColor: '#00000000',
    options: ['#00000000', '#FFFFFFFF', '#2A303DFF', '#27393FFF', '#185945FF', '#514E4CFF',
      '#5C636DFF', '#51748EFF', '#C99797FF', '#9E9893FF', '#86AEB7FF'],
    file: null,
    name: '',
    size: 0
  }
})
// const audioType = {
//   Mute: 'mute',
//   BackgroundMusic: 'background_music',
//   Widget: 'widget'
// }
// const audio = reactive({
//   type: audioType.Mute,
//   bgm: {
//     file: null,
//     name: '',
//     size: 0
//   },
//   widget: {
//     selected: '',
//     options: []
//   }
// })

const initSettings = () => {
  initBackgroundSettings()
  // initAudioSettings()
}
const initBackgroundSettings = () => {
  if (BackgroundImage.value.startsWith('background_color')) {
    background.type = backgroundType.Color

    const fileName = `#${BackgroundImage.value.split('_')[2]}`
    const colorHex = fileName.split('.')[0].toUpperCase()
    background.color.selectedColor = colorHex

    background.color.name = BackgroundImage
    background.color.size = BackgroundImageSize
  } else {
    background.type = backgroundType.Image
    console.log('backgroundType.Image', backgroundType.Image)
    background.image.name = BackgroundImage
    background.image.size = BackgroundImageSize
  }
}

// const initAudioSettings = () => {
//     if (AudioSource === '') {
//         audio.type = audioType.BackgroundMusic
//     } else if (+AudioSource >= 0) { // section index
//         audio.type = audioType.Widget
//         audio.widget.selected = +AudioSource
//     } else {
//         audio.type = AudioSource
//     }

//     audio.bgm.name = BackgroundMusic
//     audio.bgm.size = BackgroundMusicSize
//     audio.bgm.file = null
// }
const getColorFile = colorHex => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colorHex
  ctx.fillRect(0, 0, 800, 800)
  const dataurl = canvas.toDataURL()

  const colorString = colorHex.slice(1).toLowerCase()
  const fileName = `background_color_${colorString}.png`

  const file = dataURLtoFile(dataurl, fileName)

  return file
}

const dataURLtoFile = (dataUrl, fileName) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}
const isColorTransparent = (colorHex) => {
  const { hexToRgb } = colors
  const colorRgb = hexToRgb(colorHex)

  return colorRgb.a === 0
}

const addBG = async () => {
  const fileData = await window.myAPI.chooseBGSource(widgetStore.nowPlayListPath)
  if (fileData === null) {
    return
  }
  console.log('fileData', fileData)
  const fileDatas = await window.myAPI.getSingleFileData(fileData)
  widgetStore.AddBGSourceList(fileDatas)
}
const changeBackgroundColor = (color) => {
  if (isColorTransparent(color)) {
    background.color.file = null
    background.color.name = 'null'
    background.color.size = 0
  } else {
    const file = getColorFile(color)
    background.color.file = file
    background.color.name = file.name
    background.color.size = file.size
  }
}
const clearBG = () => {
  widgetStore.DelBGSource()
}

const AudioSource = computed({
  get() {
    let val = widgetStore.NovoDS.Pages.Page._AudioSource
    if (typeof val === 'string' && val !== 'mute' && val !== 'background_music' && val !== 'background_design') {
      val = parseInt(val)
      val = this.sectionOptions.find((o) => o._ID === val)
    }
    return val
  },
  set(newValue) {
    widgetStore.NovoDS.Pages.Page._AudioSource = newValue
  }
})

const addAudio = async () => {
  const fileData = await window.myAPI.chooseAudioSource(widgetStore.nowPlayListPath)
  if (fileData === null) {
    return
  }
  console.log('fileData', fileData)
  const fileDatas = await window.myAPI.getSingleFileData(fileData)
  widgetStore.AddAudioSourceList(fileDatas)
}

const setAudioSource = (val) => {
  console.log('val', val)
  widgetStore.SetAudioSource(val)
}

const clearAudio = () => {
  widgetStore.DelAudioSource()
}
</script>
<style lang="scss"></style>

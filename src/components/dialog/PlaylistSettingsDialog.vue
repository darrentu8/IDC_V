<template>
  <q-dialog ref="dialog" persistent @before-show="initSettings">
    <q-card class="bg-white text-black brand-round-l q-pa-lg" style="min-width: 650px;height:700px;">
      <q-bar class="row bg-white text-bold" style="font-size:24px;height:30px">
        Playlist Settings
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-bar>
      <q-card-section>

        <div class="row q-mt-md">
          <div class="col-12">
            <q-radio v-model="background.type" label="Background Image" class="q-mb-sx" :val="0" />
            <q-input :disable="background.type !== 0" @click="addBG" ref="BackgroundUpload" label="Upload background file"
              class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundImage" dense outlined>
              <template v-if="BackgroundImage" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearBG" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-radio v-model="background.type" label="Background Color" class="q-mb-sx" :val="1" />
            <div class="col-12 q-mx-lg q-mt-sm">
              <ColorPicker v-if="background.type === 1" @changeColor="changeBackgroundColor"
                v-model:selectedColor="background.color.selectedColor" v-model:colors="background.color.options" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator class="q-mb-sx q-mt-md" />
      <q-card-section>
        <div class="row ">
          <div class="col-12 q-mb-md">
            <span class="q-pa-xs">Audio source</span>
          </div>
          <div class="col-12">
            <q-radio v-model="audio.type" label="Mute" class="" color="" :val="audioType.Mute" />
          </div>
          <div class="col-12">
            <q-radio v-model="audio.type" :val="audioType.BackgroundMusic" label="Background music" class="" color="" />
            <q-input :disable="audio.type !== audioType.BackgroundMusic" label="Upload audio file" placeholder="File name"
              @click="addAudio()" class="brand-round-m q-mx-lg q-mb-md" v-model="BackgroundMusic" dense outlined>
              <template v-if="BackgroundMusic" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="clearAudio" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-radio v-model="audio.type" :val="audioType.Widget" label="Widget" class="" color="" />
            <q-select class="brand-round-m q-mx-lg q-mb-md" label="Select audio source" bg-color="white" outlined dense
              v-model="audio.widget.selected" :options="audio.widget.options" emit-value map-options>
            </q-select>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pb-lg absolute-bottom">
        <q-space />
        <q-btn v-close-popup color="primary" label="Save" @click="save()" class="brand-round-l text-capitalize"
          style="width:116px;margin:auto 20px" icon="check" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { toRef, reactive, computed } from 'vue'
import { useWidgetListStore } from 'src/stores/widget'
import { getColorFile, isColorTransparent } from 'src/js/helper'
import ColorPicker from 'src/components/ColorPicker.vue'

defineProps(['isShow'])
const emit = defineEmits(['update:isShow'])

const hideDialog = () => {
  emit('update:isShow', false)
}
const widgetStore = useWidgetListStore()

const BackgroundImage = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundImage)
const BackgroundImageSize = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundImageSize)
const BackgroundMusic = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundMusic)
const AudioSource = computed(() => widgetStore.NovoDS.Pages.Page._AudioSource)
const BackgroundMusicSize = computed(() => widgetStore.NovoDS.Pages.Page._BackgroundMusicSize)

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
const audioType = {
  Mute: 'mute',
  BackgroundMusic: 'background_music',
  Widget: 'widget'
}
const audio = reactive({
  type: audioType.Mute,
  bgm: {
    file: null,
    name: '',
    size: 0
  },
  widget: {
    selected: '',
    options: []
  }
})
const initSettings = () => {
  initBackgroundSettings()
  initAudioSettings()
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

const initAudioSettings = () => {
  if (AudioSource.value === '') {
    audio.type = audioType.BackgroundMusic
  } else if (+AudioSource.value >= 0) { // section index
    audio.type = audioType.Widget
    audio.widget.selected = +AudioSource.value
  } else {
    audio.type = AudioSource.value
  }

  audio.bgm.name = BackgroundMusic
  audio.bgm.size = BackgroundMusicSize.value
  audio.bgm.file = null

  audio.widget.options = []
  widgetStore.NovoDS.Pages.Page.Section.forEach(section => {
    if (section._ContentType !== '') {
      audio.widget.options.push({
        value: +section._ID,
        label: `Zone ${+section._ID + 1}`
      })
    }
  })

  if (audio.type === audioType.widget) {
    audio.widget.selected = +AudioSource.value
  } else {
    if (audio.widget.options.length > 0) {
      audio.widget.selected = audio.widget.options[0].value
    } else {
      audio.widget.selected = ''
    }
  }
}

const addBG = async () => {
  const fileData = await window.myAPI.chooseBGSource(widgetStore.nowPlayListPath)
  if (fileData === null) {
    return
  }
  console.log('fileData', fileData)
  const fileDatas = await window.myAPI.getSingleFileData(fileData)
  if (fileDatas) {
    background.image.file = toRef(fileDatas._src)
    background.image.name = toRef(fileDatas._src)
    background.image.size = toRef(fileDatas._fileSize)
    widgetStore.AddBGSourceList(fileDatas)
  }
}
const changeBackgroundColor = async (color) => {
  console.log('color', color)
  try {
    if (isColorTransparent(color)) {
      background.color.file = ''
      background.color.name = ''
      background.color.size = 0
    } else {
      const file = getColorFile(color)
      if (file) {
        console.log('file', file)
        const result = await window.myAPI.writeBGFile(widgetStore.nowPlayListPath, file)
        if (result) {
          console.log('result', result)
          background.color.file = file.name
          background.color.name = file.name
          background.color.size = file.size
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const clearBG = () => {
  background.image.file = toRef(null)
  background.image.name = toRef('')
  background.image.size = toRef(0)
  widgetStore.DelBGSource()
}
const addAudio = async () => {
  try {
    const fileData = await window.myAPI.chooseAudioSource(widgetStore.nowPlayListPath)
    if (fileData === null) {
      return
    }
    console.log('fileData', fileData)
    const fileDatas = await window.myAPI.getSingleFileData(fileData)
    if (fileDatas) {
      console.log('fileDatas', fileDatas)
      audio.bgm.file = toRef(fileDatas._src)
      audio.bgm.name = toRef(fileDatas._src)
      audio.bgm.size = toRef(fileDatas._fileSize)
      widgetStore.AddAudioSourceList(fileDatas)
    }
  } catch (error) {
    console.error('Error while adding audio:', error)
  }
}

// const setAudioSource = (val) => {
//   console.log('val', val)
//   widgetStore.SetAudioSource(val)
// }

const clearAudio = () => {
  audio.bgm.file = toRef(null)
  audio.bgm.name = toRef('')
  audio.bgm.size = toRef(0)
  widgetStore.DelAudioSource()
}

const save = () => {
  if (background.type === backgroundType.Image) {
    widgetStore.NovoDS.Pages.Page._BackgroundImage = background.image.name
    widgetStore.NovoDS.Pages.Page._BackgroundImageSize = background.image.size
  } else if (background.type === backgroundType.Color) {
    widgetStore.NovoDS.Pages.Page._BackgroundImage = background.color.name
    widgetStore.NovoDS.Pages.Page._BackgroundImageSize = background.color.size
  }

  if (audio.type === audioType.Mute) {
    widgetStore.NovoDS.Pages.Page._AudioSource = audioType.Mute
  } else if (audio.type === audioType.BackgroundMusic) {
    widgetStore.NovoDS.Pages.Page._AudioSource = audioType.BackgroundMusic
  } else if (audio.type === audioType.Widget) {
    widgetStore.NovoDS.Pages.Page._AudioSource = audio.widget.selected
  }
  widgetStore.NovoDS.Pages.Page._BackgroundMusic = audio.bgm.name
  widgetStore.NovoDS.Pages.Page._BackgroundMusicSize = audio.bgm.size

  hideDialog()
}
</script>
<style lang="scss"></style>

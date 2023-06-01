import { ContentTypeEnum } from './constant'
import iconMedia from 'src/assets/icons/Media.svg'
import iconText from 'src/assets/icons/Text.svg'
import iconWebpage from 'src/assets/icons/Webpage.svg'
import iconYoutube from 'src/assets/icons/Youtube.svg'
import iconWeather from 'src/assets/icons/Weather.svg'
import iconTwitter from 'src/assets/icons/Twitter.svg'
import iconClock from 'src/assets/icons/Clock.svg'
import iconSocialMedia from 'src/assets/icons/Social Media.svg'
import iconNA from 'src/assets/icons/NA.svg'
import { Notify, colors } from 'quasar'

export const isXmlValTrue = val => {
  if (typeof val === 'string') {
    return val === 'true'
  } else {
    return val
  }
}

export const getIconPathWithContentType = (contentType, widgetType) => {
  if (contentType === ContentTypeEnum.Media) {
    return iconMedia
  } else if (contentType === ContentTypeEnum.Text) {
    return iconText
  } else if (contentType === ContentTypeEnum.Web_Page) {
    return iconWebpage
  } else if (contentType === ContentTypeEnum.Youtube) {
    return iconYoutube
  } else if (contentType === ContentTypeEnum.Weather) {
    return iconWeather
  } else if (contentType === ContentTypeEnum.Twitter) {
    return iconTwitter
  } else if (contentType === ContentTypeEnum.Clock) {
    return iconClock
  } else if (contentType === ContentTypeEnum.Social_Media) {
    return iconSocialMedia
  } else if (contentType === 'Misc' && widgetType === ContentTypeEnum.Clock) {
    return iconClock
  } else if (contentType === 'Misc' && widgetType === ContentTypeEnum.Weather) {
    return iconWeather
  } else if (contentType === 'Misc' && widgetType === ContentTypeEnum.Twitter) {
    return iconTwitter
  } else if (contentType === 'Misc 2' && (widgetType === 'Instagram' || widgetType === 'Facebook')) {
    return iconNA
  }

  return iconNA
}

export const getColorFile = colorHex => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colorHex
  ctx.fillRect(0, 0, 800, 800)
  const dataUrl = canvas.toDataURL('image/png')

  const colorString = colorHex.slice(1).toLowerCase()
  const fileName = `background_color_${colorString}.png`

  const file = dataURLtoFile(dataUrl, fileName)

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

export const generatePlaylistName = () => {
  const data = new Date()
  const yyyy = data.getFullYear()
  const mm = data.getMonth() + 1
  const dd = data.getDate() + 1
  const hh = data.getHours()
  const min = data.getMinutes()
  const ss = data.getSeconds()

  return `Playlist_${yyyy}${mm}${dd}${hh}${min}${ss}`
}

export const isVideoFile = filename => {
  const suffix = filename.match(/.[^.]+$/)[0]

  if (['.mp4', '.wmv', '.3gp', '.avi', '.mov'].includes(suffix)) {
    return true
  }

  return false
}

export const isAudioFile = filename => {
  const suffix = filename.match(/.[^.]+$/)[0]

  if (['.mp3'].includes(suffix)) {
    return true
  }

  return false
}

export const isColorTransparent = (colorHex) => {
  const { hexToRgb } = colors
  const colorRgb = hexToRgb(colorHex)

  return colorRgb.a === 0
}

export const deleteNotify = (text = 'Are you sure to delete?') => {
  return new Promise((resolve, reject) => {
    Notify.create({
      message: text,
      color: 'red',
      position: 'center',
      multiLine: true,
      icon: 'warning',
      actions: [{
        label: 'Dismiss',
        color: 'white'
      }, {
        label: 'Yes',
        color: 'white',
        handler: () => {
          resolve()
        }
      }]
    })
  })
}

export const getMarginCssByPositionArg = (arg) => {
  if (arg === 'Left-Top') {
    return '0 auto auto 0'
  } else if (arg === 'Left-Center') {
    return 'auto auto auto 0'
  } else if (arg === 'Left-Bottom') {
    return 'auto auto 0 0'
  } else if (arg === 'Center-Top') {
    return '0 auto auto auto'
  } else if (arg === 'Center-Center') {
    return 'auto'
  } else if (arg === 'Center-Bottom') {
    return 'auto auto 0 auto'
  } else if (arg === 'Right-Top') {
    return '0 0 auto auto'
  } else if (arg === 'Right-Center') {
    return 'auto 0 auto auto'
  } else if (arg === 'Right-Bottom') {
    return 'auto 0 0 auto'
  }

  return 'auto'
}

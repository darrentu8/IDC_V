import { ContentTypeEnum, DeviceScreenOrientationEnum } from './constant'
import iconMedia from 'src/assets/icons/Media.svg'
import iconText from 'src/assets/icons/Text.svg'
import iconWebpage from 'src/assets/icons/Webpage.svg'
import iconYoutube from 'src/assets/icons/Youtube.svg'
import iconWeather from 'src/assets/icons/Weather.svg'
import iconTwitter from 'src/assets/icons/Twitter.svg'
import iconClock from 'src/assets/icons/Clock.svg'
import iconSocialMedia from 'src/assets/icons/Social Media.svg'
import iconNA from 'src/assets/icons/NA.svg'
import { Dialog, colors } from 'quasar'

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
  canvas.width = 3840
  canvas.height = 2160
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colorHex
  ctx.fillRect(0, 0, 3840, 2160)
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
  const mm = formatZero(data.getMonth() + 1, 2)
  const dd = formatZero(data.getDate(), 2)
  const hh = formatZero(data.getHours(), 2)
  const min = formatZero(data.getMinutes(), 2)
  const ss = formatZero(data.getSeconds(), 2)

  return `Playlist_${yyyy}${mm}${dd}${hh}${min}${ss}`
}

const formatZero = (num, len) => {
  if (String(num).length > len) {
    return num
  }
  return (Array(len).join(0) + num).slice(-len)
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

export const showActionDialog = (title = 'Confirm', message = 'Are you sure to delete?') => {
  return new Promise((resolve, reject) => {
    Dialog.create({
      class: 'brand-round q-pa-md',
      message,
      title,
      icon: 'warning',
      ok: {
        unelevated: true,
        color: 'primary',
        rounded: true
      },
      cancel: {
        flat: true,
        color: 'grey',
        rounded: true
      },
      persistent: true
    }).onOk(() => {
      resolve()
    })
  })
}

export const getMarginCssByPositionArg = (arg, fontSize, textColor) => {
  let marginTop = ''
  let marginBottom = ''
  let textAlign = ''

  if (arg === 'Left-Top') {
    textAlign = 'left'
    marginBottom = 'auto'
  } else if (arg === 'Left-Center') {
    textAlign = 'left'
  } else if (arg === 'Left-Bottom') {
    textAlign = 'left'
    marginTop = 'auto'
  } else if (arg === 'Center-Top') {
    textAlign = 'center'
    marginBottom = 'auto'
  } else if (arg === 'Center-Center') {
    textAlign = 'center'
  } else if (arg === 'Center-Bottom') {
    textAlign = 'center'
    marginTop = 'auto'
  } else if (arg === 'Right-Top') {
    textAlign = 'right'
    marginBottom = 'auto'
  } else if (arg === 'Right-Center') {
    textAlign = 'right'
  } else if (arg === 'Right-Bottom') {
    textAlign = 'right'
    marginTop = 'auto'
  }

  return {
    'margin-top': marginTop,
    'margin-bottom': marginBottom,
    'text-align': textAlign,
    'font-size': `${fontSize}px`,
    'line-height': `${fontSize}px`,
    color: `${textColor}`
  }
}

export const saveFile = (data, fileName) => {
  const blob = new Blob([data], {
    type: 'application/zip'
  })
  const objectURL = URL.createObjectURL(blob)
  const aTag = document.createElement('a')
  aTag.href = objectURL
  aTag.download = fileName
  aTag.click()
  URL.revokeObjectURL(objectURL)
}

export const isPortrait = orientation => {
  return orientation === DeviceScreenOrientationEnum.portrait ||
    orientation === DeviceScreenOrientationEnum.portrait_flipped
}

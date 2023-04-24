import {
  Const_Media_ShowType,
  Const_Media_ScaleType
} from './OnLineEditor'

const showTypeChoice = [
  {
    value: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
    text: 'default'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_KenBurnsEffect,
    text: 'kenBurnsEffect'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_CARD_FLIP,
    text: 'cardFlip'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_ZOOM_ANIMATION,
    text: 'zoomIn'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FADE_IN,
    text: 'fadeIn'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLY_IN,
    text: 'flyIn'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLOAT_IN,
    text: 'floatIn'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLY_OUT,
    text: 'flyOut'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_ROTATE,
    text: 'rotate'
  }
]
const scaleTypeChoice = [
  {
    value: Const_Media_ScaleType.SHOW_TYPE_FIT_XY,
    text: 'stretchToFillRegion'
  },
  {
    value: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
    text: 'fitRegion'
  },
  {
    value: Const_Media_ScaleType.SHOW_TYPE_CENTER_CROP,
    text: 'scaleToFillRegion'
  }
]
export default {
  showTypeChoice,
  scaleTypeChoice
}

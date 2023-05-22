import {
  Const_Media_ShowType,
  Const_Media_ScaleType
} from './OnLineEditor'

const showTypeChoice = [
  {
    value: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
    text: 'Default'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_KenBurnsEffect,
    text: 'Ken Burns Effect'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_CARD_FLIP,
    text: 'Card Flip'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_ZOOM_ANIMATION,
    text: 'Zoom In'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FADE_IN,
    text: 'Fade In'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLY_IN,
    text: 'Fly In'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLOAT_IN,
    text: 'Float In'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_FLY_OUT,
    text: 'Fly Out'
  },
  {
    value: Const_Media_ShowType.SHOW_TYPE_ROTATE,
    text: 'Rotate'
  }
]
const scaleTypeChoice = [
  {
    value: Const_Media_ScaleType.SHOW_TYPE_FIT_XY,
    text: 'Stretch to fill region'
  },
  {
    value: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
    text: 'Fit region'
  },
  {
    value: Const_Media_ScaleType.SHOW_TYPE_CENTER_CROP,
    text: 'Scale to fill region'
  }
]
export default {
  showTypeChoice,
  scaleTypeChoice
}

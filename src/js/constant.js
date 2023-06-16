import { uid } from 'quasar'

export const DeviceScreenOrientationEnum = {
  landscape: 0,
  portrait: 1,
  landscape_flipped: 2,
  portrait_flipped: 3
}

export const ContentTypeEnum = {
  Media: 'GPIO_Media',
  Text: 'Text',
  Web_Page: 'Web Page',
  Youtube: 'Youtube',
  Weather: 'Weather',
  Twitter: 'Twitter',
  Clock: 'Clock',
  Social_Media: 'Social Media'
}

export const layoutTemplates = [{
  rowCount: 1,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 1,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 1,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 2, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 1,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 1, i: uid() }]
}, {
  rowCount: 2,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 1,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 2,
  columnCount: 6,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 5, h: 2, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 1, h: 3, i: uid() }, { x: 1, y: 0, w: 3, h: 3, i: uid() }, { x: 0, y: 2, w: 4, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 3, i: uid() }, { x: 0, y: 2, w: 4, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 3, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 2,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 4, h: 3, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 4, h: 3, i: uid() }]
}, {
  rowCount: 2,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 3, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 2, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 2, h: 2, i: uid() }, { x: 2, y: 0, w: 2, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 3, h: 3, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 1, i: uid() }, { x: 3, y: 2, w: 1, h: 1, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }]
}
  // , {
  //   rowCount: 3,
  //   columnCount: 3,
  //   layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }]
  // }
]

export const layoutTemplatesPortrait = [{
  rowCount: 1,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 2,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 2, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 1,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 2, h: 2, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 2, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 2, h: 2, i: uid() }]
}, {
  rowCount: 6,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 2, h: 5, i: uid() }, { x: 0, y: 5, w: 1, h: 1, i: uid() }, { x: 1, y: 5, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 6,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 2, h: 5, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 1, h: 4, i: uid() }, { x: 1, y: 0, w: 3, h: 1, i: uid() }, { x: 1, y: 1, w: 3, h: 3, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 2, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 3, h: 2, i: uid() }]
}, {
  rowCount: 3,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 2, h: 1, i: uid() }, { x: 0, y: 1, w: 3, h: 2, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 3, h: 3, i: uid() }]
}, {
  rowCount: 6,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 2, h: 4, i: uid() }, { x: 0, y: 4, w: 1, h: 1, i: uid() }, { x: 1, y: 4, w: 1, h: 1, i: uid() }, { x: 0, y: 5, w: 1, h: 1, i: uid() }, { x: 1, y: 5, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 6,
  columnCount: 2,
  layout: [{ x: 0, y: 0, w: 1, h: 1, i: uid() }, { x: 1, y: 0, w: 1, h: 1, i: uid() }, { x: 0, y: 1, w: 1, h: 1, i: uid() }, { x: 1, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 2, h: 4, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 2, h: 3, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 0, y: 3, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 2, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 3,
  layout: [{ x: 0, y: 0, w: 2, h: 2, i: uid() }, { x: 2, y: 0, w: 1, h: 1, i: uid() }, { x: 2, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 2, h: 2, i: uid() }, { x: 2, y: 2, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }]
}, {
  rowCount: 4,
  columnCount: 4,
  layout: [{ x: 0, y: 0, w: 3, h: 3, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 0, w: 1, h: 1, i: uid() }, { x: 3, y: 1, w: 1, h: 1, i: uid() }, { x: 0, y: 2, w: 1, h: 1, i: uid() }, { x: 1, y: 3, w: 1, h: 1, i: uid() }, { x: 2, y: 3, w: 1, h: 1, i: uid() }, { x: 3, y: 3, w: 1, h: 1, i: uid() }]
}]

export const playListTemplate = {
  NovoDS: {
    Pages: {
      Page: []
    },
    Timeline: {
      Item: [],
      _Looping: true
    },
    BottomPage: {
      Section: {
        Content: {
          MediaItem: {
            _duration: 10,
            _src: '',
            _fileSize: 0,
            _videoDuration: 0,
            _note: ''
          },
          _duration: 10,
          _isVideoFillArea: true,
          _showType: 'Default',
          _scaleType: 'FIT_CENTER'
        },
        _X: 0,
        _Height: 1,
        _ContentType: 'Media',
        _Width: 1,
        _Y: 0,
        _Index: 0
      },
      _Row: 1,
      _Orientation: 0,
      _Column: 1
    },
    _Model_Type: 'x700',
    _Description: '',
    _Version: 1.1,
    _Layout_Type: 0,
    _Playlist_UUID: ''
  }
}

export const timelineItemTemplate = {
  _Duration: 1800,
  _Page: ''
}

export const pageTemplate = {
  Section: [],
  _FreeDesignerMode: false,
  _BackgroundImage: 'background_color_00000000.png',
  _Row: 1,
  _SerialNumber: '',
  _ID: '',
  _Description: '',
  _BackgroundMusicSize: 0,
  _BackgroundMusic: '',
  _BackgroundMusicUrl: '',
  _BgMusicApplyToAll: false,
  _BackgroundImageSize: 0,
  _Orientation: 0,
  _Column: 1,
  _Layout: '',
  _AudioSource: 'mute'
}

export const sectionTemplate = {
  Content: null,
  _X: 0,
  _ContentType: '',
  _Index: 0,
  _Z: 0,
  _ID: '',
  _Height: 1,
  _isFixedRatio: false,
  _Y: 0,
  _Width: 1,
  _SectionValid: 1,
  _is169: false
}

export const mediaContentTemplate = {
  MediaItem: [],
  _Live_Update_Access_Way: 0,
  _Live_Update_port: 21,
  _showType: 'Default',
  _Live_Update_userName: '',
  _FloatIn_Direction: 1,
  _isVideoFillArea: false,
  _scaleType: 'FIT_CENTER',
  _MuteVideo: false,
  _Detect_Picture_Orientation: false,
  _Live_Update_password: '',
  _Live_Update_type: 0,
  _Live_Update_Frequency: 15,
  _duration: 10,
  _Live_Update_path: '',
  _Live_Update_ID: '',
  _Live_Update_Show_Status: true,
  _Live_Update_type_storage: 1
}

export const mediaContentItemTemplate = {
  _note: '',
  _videoDuration: 0,
  _src: '',
  _fileSize: 0,
  _duration: 10
}

export const textContentTemplate = {
  AttachmentFiles: '',
  _Live_Update_password: '',
  _backgroundColor: '#00000000',
  _showType: 'Horizontal Scrolling',
  _contentType: 'Text',
  _Live_Update_Frequency: 15,
  _Live_Update_ID: '',
  _Text: '',
  _Live_Update_port: 21,
  _Live_Update_Access_Way: 0,
  _textColor: '#ffffffff',
  _Live_Update_type: 0,
  _Live_Update_Show_Status: true,
  _speed: 'Medium',
  _backgroundImage: '',
  _direction: 'Right to Left',
  _arg1: 'Center-Center',
  _fontSize: 32,
  _font: 'Roboto-Light',
  _Live_Update_path: '',
  _Live_Update_userName: ''
}

export const webpageContentTemplate = {
  AttachmentFiles: '',
  _showBack: false,
  _isDesktopView: true,
  _Live_Update_ID: '',
  _displayMode: 0,
  _fontScaleRatio: 100,
  _root: '',
  _autoRefresh: 5400,
  _clearCache: 0,
  _block_pop_ups: false,
  _URL: '',
  _Enhanced_Rendering: true,
  _showType: 'Online',
  _showAfterLoadFinished: true
}

export const youtubeContentTemplate = {
  AttachmentFiles: '',
  _Live_Update_ID: '',
  _displayMode: 0,
  _param: '',
  _showType: 'Videos'
}

export const twitterContentTemplate = {
  AttachmentFiles: '',
  _fontSize: 28,
  _font: 'Roboto-Light',
  _Twitter_Account: '',
  _Live_Update_ID: '',
  _Twitter_UpdateFrequency: 30,
  _Twitter_Display_Widget: 'Listview',
  _Twitter_Speed: 'Medium',
  _Twitter_DisplayType: 'Twitter_Account',
  _textColor: '#ffffffff',
  _backgroundColor: '#00000000',
  _Twitter_ShowItems: 0,
  _widgetType: 'Twitter',
  _Twitter_Hashtag: '',
  _Twitter_Transparent: false,
  _Twitter_Text_Scaling: 100,
  _Twitter_Theme: 'light'
}

export const weatherContentTemplate = {
  AttachmentFiles: '',
  _Weather_Type: 'Location',
  _Weather_Country: '',
  _font: 'Roboto-Light',
  _Weather_Units_of_Temperature: 'Celsius',
  _Live_Update_ID: '',
  _Weather_main_area_style: 0,
  _Weather_backgroundImage: '',
  _Weather_Forecast_Day: 5,
  _Weather_Lang: 'zh_cn',
  _textColor: '#ffffffff',
  _backgroundColor: '#00000000',
  _Weather_theme: 'Dark',
  _widgetType: 'Weather',
  _Weather_UpdateFrequency: 30,
  _theme_type: 'Contemporary',
  _Weather_City: '',
  _theme_style: 'Square'
}

export const clockContentTemplate = {
  AttachmentFiles: '',
  _Clock_Type: 'digital',
  _Live_Update_ID: '',
  _Clock_Alignment_Horizontal: 1,
  _Clock_dys: 1,
  _Clock_Date_Format: 'yyyy.MM.dd EEEE',
  _Clock_dds: 1,
  _font: 'Roboto-Light',
  _Clock_Show_Type: 0,
  _Clock_dsep: 1,
  _widgetType: 'Clock',
  _Clock_dos: 0,
  _textColor: '#ffffffff',
  _Clock_dms: 1,
  _fontSize: 28,
  _Clock_Alignment_Vertical: 1,
  _backgroundColor: '#00000000',
  _Clock_Format: 0,
  _Clock_dws: 0,
  _Analog_Clock_Style: 'white'
}

export const socialMediaContentTemplate = {
  AttachmentFiles: '',
  _Instagram_Display_Format: 'grid',
  _Instagram_Transition_Effect: 'Scrolling Up',
  _Instagram_ShowItems: 25,
  _Instagram_UpdateFrequency: 30,
  _Instagram_Show_Author: true,
  _Instagram_Show_Likes: false,
  _Instagram_Authentication: true,
  _widgetType: 'Instagram',
  _Instagram_Account: '',
  _Instagram_Duration: 10,
  _Instagram_EnableVideo: false
}

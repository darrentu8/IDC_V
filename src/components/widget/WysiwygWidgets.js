import {
  // audioExtArray,
  // Const_Calendar_Header_BG_Color,
  // Const_Calendar_Header_Text_Color,
  // Const_Calendar_Item_BG_Color,
  // Const_Calendar_Item_Text_Color,
  // Const_Clock_Type,
  // Const_CountingCamera_CalculateMethod,
  Const_Default_BG,
  Const_Default_Color,
  // Const_Default_Counting_Camera_BG_Color,
  // Const_Default_Counting_Camera_Color,
  // Const_Default_Counting_Camera_Default_Valuet,
  // Const_Default_Counting_Camera_Entry_Text,
  // Const_Default_Counting_Camera_Max_Count,
  // Const_Default_Counting_Camera_No_Entry_Text,
  // Const_Default_Counting_Camera_ResetTime,
  // Const_Default_Counting_Camera_StartTimeOfQueryCamera,
  // Const_Default_Counting_Max_Capacity_Text,
  // Const_Default_Counting_textOfFull,
  // Const_Default_Date_Format,
  Const_Default_Font,
  Const_Default_Font_Size,
  // Const_Default_Lang,
  // Const_Default_Weather_Color,
  Const_Media_ScaleType,
  Const_Media_ShowType,
  Const_MRSS_Theme,
  Const_Pattern_Shape,
  Const_RSS_Default_Font_Size,
  Const_RSS_displayType,
  // Const_Social_Facebook_Display_ON_THE_SURFACE,
  Const_Speed,
  Const_Text_Align,
  Const_Text_Dirction,
  Const_Text_ShowType,
  // Const_Weather_Theme,
  // Const_Weather_theme_style,
  // Const_Weather_theme_type,
  // Const_Weather_Type,
  // Const_Weather_UOT,
  Const_Webpage_ClearCache,
  Const_Webpage_ShowType,
  Const_Web_Displaymode
  // Const_Youtube_ShowType,
  // COVID_19_Lists,
  // videoExtArray
} from './onLineEditor'

const contMedia = {
  AttachmentFiles: {},
  _isVideoFillArea: 'false',
  _Detect_Picture_Orientation: 'false',
  _MuteVideo: 'false',
  _showType: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
  _scaleType: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
  _duration: 10,
  _showArrow: 'false',
  _doubleClickToFullScreen: 'true',
  _resumeSignagePlaybackAfterIdle: '-1',
  _isKioskMode: 'true',
  _FloatIn_Direction: 0,
  _Live_Update_type: 0,
  _Live_Update_type_storage: 0,
  _Live_Update_path: '',
  _Live_Update_port: 21,
  _Live_Update_ID: '',
  _Live_Update_userName: '',
  _Live_Update_password: '',
  _Live_Update_Frequency: 15,
  _Live_Update_Access_Way: 0,
  _Live_Update_Show_Status: 'true',
  _keepOriginalSize: 'false'
}
const contPattern = {
  AttachmentFiles: {},
  _isVideoFillArea: 'false',
  _Detect_Picture_Orientation: 'false',
  _MuteVideo: 'false',
  _showType: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
  _scaleType: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
  _duration: 10,
  _FloatIn_Direction: 0,
  _Live_Update_type: 0,
  _Live_Update_type_storage: 0,
  _Live_Update_path: '',
  _Live_Update_port: 21,
  _Live_Update_ID: '',
  _Live_Update_userName: '',
  _Live_Update_password: '',
  _Live_Update_Frequency: 15,
  _Live_Update_Access_Way: 0,
  _Live_Update_Show_Status: 'false',
  _keepOriginalSize: 'false',
  _shape: Const_Pattern_Shape.SHAPE_RECT,
  _polygon_count: '5',
  _angle: '0',
  _inner_radius: '45',
  _outter_radius: '100',
  _fill: '#FF0B8FD8',
  _strokeWidth: '0',
  _stroke: '#FF000000'
}
const contText = {
  AttachmentFiles: {},
  _showType: Const_Text_ShowType.static,
  _arg1: Const_Text_Align.ALIGN_LT,
  _Text: '',
  _textColor: Const_Default_Color,
  _backgroundColor: Const_Default_BG,
  // _speed: Const_Speed.SPEED_MEDIUM,
  _font: Const_Default_Font,
  _fontSize: Const_RSS_Default_Font_Size,
  _backgroundImage: '',
  // _direction: Const_Text_Dirction.DIRECTION_RTL,
  _contentType: 'Text',
  _Live_Update_type: 0,
  _Live_Update_path: '',
  _Live_Update_port: 21,
  _Live_Update_userName: '',
  _Live_Update_password: '',
  _Live_Update_Frequency: 15,
  _Live_Update_Access_Way: 0,
  _Live_Update_ID: '',
  _Live_Update_Show_Status: 'true'
}
const contRss = {
  AttachmentFiles: {},
  _rssURL: '',
  _rssFrequency: 30,
  _rssDisplayCount: 3,
  _item_symbol: '•',
  _displayType: Const_RSS_displayType.rss.value,
  _showType: Const_Text_ShowType.HorizontalScrolling,
  _duration: 10,
  _theme: Const_MRSS_Theme.dark.value,
  _arg1: '',
  _Text: '',
  _textColor: Const_Default_Color,
  _backgroundColor: Const_Default_BG,
  _speed: Const_Speed.SPEED_MEDIUM,
  _font: Const_Default_Font,
  _direction: Const_Text_Dirction.DIRECTION_LTR,
  _fontSize: Const_RSS_Default_Font_Size,
  _backgroundImage: '',
  _contentType: 'RSS',
  _Live_Update_type: 0,
  _Live_Update_path: '',
  _Live_Update_port: 21,
  _Live_Update_userName: '',
  _Live_Update_password: '',
  _Live_Update_Frequency: 15,
  _Live_Update_Access_Way: 0,
  _Live_Update_ID: '',
  _Live_Update_Show_Status: 'true',
  _Item_Update_Frequency: 10
}
const contWebpage = {
  AttachmentFiles: {},
  _displayMode: Const_Web_Displaymode.default,
  _showType: Const_Webpage_ShowType.online,
  _URL: '',
  _clearCache: Const_Webpage_ClearCache.disabled,
  _autoRefresh: 90 * 60,
  _isDesktopView: 'true',
  _Enhanced_Rendering: 'true',
  _Live_Update_ID: '',
  _showAfterLoadFinished: 'true',
  _block_pop_ups: 'false',
  _showBack: 'false',
  _backPosition: Const_Text_Align.ALIGN_RT,
  _fontScaleRatio: 100,
  _root: '',
  _doubleClickToFullScreen: 'true',
  _resumeSignagePlaybackAfterIdle: '-1',
  _isKioskMode: 'true'
}
const contTwitter = {
  AttachmentFiles: {},
  _Twitter_DisplayType: 'Twitter_Account',
  _Twitter_Account: '',
  _Twitter_Hashtag: '',
  _Twitter_Speed: Const_Speed.SPEED_MEDIUM,
  _Twitter_UpdateFrequency: 30,
  _Twitter_ShowItems: 0,
  _textColor: Const_Default_Color,
  _backgroundColor: Const_Default_BG,
  _font: Const_Default_Font,
  _fontSize: Const_Default_Font_Size
}
const contVideoIn = {
  AttachmentFiles: {},
  _widgetType: 'Camera',
  _Camera_isFillArea: 'false'
}

// // import {
// //   audioExtArray,
// //   Const_Calendar_Header_BG_Color,
// //   Const_Calendar_Header_Text_Color,
// //   Const_Calendar_Item_BG_Color,
// //   Const_Calendar_Item_Text_Color,
// //   Const_Clock_Type,
// //   Const_CountingCamera_CalculateMethod,
// //   Const_Default_BG,
// //   Const_Default_Color,
// //   Const_Default_Counting_Camera_BG_Color,
// //   Const_Default_Counting_Camera_Color,
// //   Const_Default_Counting_Camera_Default_Valuet,
// //   Const_Default_Counting_Camera_Entry_Text,
// //   Const_Default_Counting_Camera_Max_Count,
// //   Const_Default_Counting_Camera_No_Entry_Text,
// //   Const_Default_Counting_Camera_ResetTime,
// //   Const_Default_Counting_Camera_StartTimeOfQueryCamera,
// //   Const_Default_Counting_Max_Capacity_Text,
// //   Const_Default_Counting_textOfFull,
// //   Const_Default_Date_Format,
// //   Const_Default_Font,
// //   Const_Default_Font_Size,
// //   Const_Default_Lang,
// //   Const_Default_Weather_Color,
// //   Const_Media_ScaleType,
// //   Const_Media_ShowType,
// //   Const_MRSS_Theme,
// //   Const_Pattern_Shape,
// //   Const_RSS_Default_Font_Size,
// //   Const_RSS_displayType,
// //   Const_Social_Facebook_Display_ON_THE_SURFACE,
// //   Const_Speed,
// //   Const_Text_Align,
// //   Const_Text_Dirction,
// //   Const_Text_ShowType,
// //   Const_Weather_Theme,
// //   Const_Weather_theme_style,
// //   Const_Weather_theme_type,
// //   Const_Weather_Type,
// //   Const_Weather_UOT,
// //   Const_Webpage_ClearCache,
// //   Const_Webpage_ShowType,
// //   Const_Web_Displaymode,
// //   Const_Youtube_ShowType,
// //   COVID_19_Lists,
// //   videoExtArray
// // } from './onLineEditor'

// import { isModelSupportHdmiInAndHdmiAsVideoSource } from '../../Data/General'
// import { intlMessages } from '../../Data/language'
// import WidgetCalendar from './Widgets/WidgetCalendar'
// import WidgetClock from './Widgets/WidgetClock'
// import WidgetCountingCamera from './Widgets/WidgetCountingCamera'
// import WidgetMedia from './Widgets/WidgetMedia'
// import WidgetRss from './Widgets/WidgetRss'
// import WidgetRTSP from './Widgets/WidgetRTSP'
// import WidgetShape from './Widgets/WidgetShape'
// import WidgetSocial from './Widgets/WidgetSocial'
// import WidgetText from './Widgets/WidgetText'
// import WidgetTwitter from './Widgets/WidgetTwitter'
// import WidgetVideoIn from './Widgets/WidgetVideoIn'
// import WidgetWeather from './Widgets/WidgetWeather'
// import WidgetWebpage from './Widgets/WidgetWebpage'
// import WidgetYouTube from './Widgets/WidgetYouTube'

// const contMedia = {
//   AttachmentFiles: {},
//   _isVideoFillArea: 'false',
//   _Detect_Picture_Orientation: 'false',
//   _MuteVideo: 'false',
//   _showType: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
//   _scaleType: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
//   _duration: 10,
//   _showArrow: 'false',
//   _doubleClickToFullScreen: 'true',
//   _resumeSignagePlaybackAfterIdle: '-1',
//   _isKioskMode: 'true',
//   _FloatIn_Direction: 0,
//   _Live_Update_type: 0,
//   _Live_Update_type_storage: 0,
//   _Live_Update_path: '',
//   _Live_Update_port: 21,
//   _Live_Update_ID: '',
//   _Live_Update_userName: '',
//   _Live_Update_password: '',
//   _Live_Update_Frequency: 15,
//   _Live_Update_Access_Way: 0,
//   _Live_Update_Show_Status: 'true',
//   _keepOriginalSize: 'false'
// }
// const contPattern = {
//   AttachmentFiles: {},
//   _isVideoFillArea: 'false',
//   _Detect_Picture_Orientation: 'false',
//   _MuteVideo: 'false',
//   _showType: Const_Media_ShowType.SHOW_TYPE_DEFAULT,
//   _scaleType: Const_Media_ScaleType.SHOW_TYPE_FIT_CENTER,
//   _duration: 10,
//   _FloatIn_Direction: 0,
//   _Live_Update_type: 0,
//   _Live_Update_type_storage: 0,
//   _Live_Update_path: '',
//   _Live_Update_port: 21,
//   _Live_Update_ID: '',
//   _Live_Update_userName: '',
//   _Live_Update_password: '',
//   _Live_Update_Frequency: 15,
//   _Live_Update_Access_Way: 0,
//   _Live_Update_Show_Status: 'false',
//   _keepOriginalSize: 'false',
//   _shape: Const_Pattern_Shape.SHAPE_RECT,
//   _polygon_count: '5',
//   _angle: '0',
//   _inner_radius: '45',
//   _outter_radius: '100',
//   _fill: '#FF0B8FD8',
//   _strokeWidth: '0',
//   _stroke: '#FF000000'
// }
// const contText = {
//   AttachmentFiles: {},
//   _showType: Const_Text_ShowType.static,
//   _arg1: Const_Text_Align.ALIGN_LT,
//   _Text: '',
//   _textColor: Const_Default_Color,
//   _backgroundColor: Const_Default_BG,
//   // _speed: Const_Speed.SPEED_MEDIUM,
//   _font: Const_Default_Font,
//   _fontSize: Const_RSS_Default_Font_Size,
//   _backgroundImage: '',
//   // _direction: Const_Text_Dirction.DIRECTION_RTL,
//   _contentType: 'Text',
//   _Live_Update_type: 0,
//   _Live_Update_path: '',
//   _Live_Update_port: 21,
//   _Live_Update_userName: '',
//   _Live_Update_password: '',
//   _Live_Update_Frequency: 15,
//   _Live_Update_Access_Way: 0,
//   _Live_Update_ID: '',
//   _Live_Update_Show_Status: 'true'
// }
// const contRss = {
//   AttachmentFiles: {},
//   _rssURL: '',
//   _rssFrequency: 30,
//   _rssDisplayCount: 3,
//   _item_symbol: '•',
//   _displayType: Const_RSS_displayType.rss.value,
//   _showType: Const_Text_ShowType.HorizontalScrolling,
//   _duration: 10,
//   _theme: Const_MRSS_Theme.dark.value,
//   _arg1: '',
//   _Text: '',
//   _textColor: Const_Default_Color,
//   _backgroundColor: Const_Default_BG,
//   _speed: Const_Speed.SPEED_MEDIUM,
//   _font: Const_Default_Font,
//   _direction: Const_Text_Dirction.DIRECTION_LTR,
//   _fontSize: Const_RSS_Default_Font_Size,
//   _backgroundImage: '',
//   _contentType: 'RSS',
//   _Live_Update_type: 0,
//   _Live_Update_path: '',
//   _Live_Update_port: 21,
//   _Live_Update_userName: '',
//   _Live_Update_password: '',
//   _Live_Update_Frequency: 15,
//   _Live_Update_Access_Way: 0,
//   _Live_Update_ID: '',
//   _Live_Update_Show_Status: 'true',
//   _Item_Update_Frequency: 10
// }
// const contWebpage = {
//   AttachmentFiles: {},
//   _displayMode: Const_Web_Displaymode.default,
//   _showType: Const_Webpage_ShowType.online,
//   _URL: '',
//   _clearCache: Const_Webpage_ClearCache.disabled,
//   _autoRefresh: 90 * 60,
//   _isDesktopView: 'true',
//   _Enhanced_Rendering: 'true',
//   _Live_Update_ID: '',
//   _showAfterLoadFinished: 'true',
//   _block_pop_ups: 'false',
//   _showBack: 'false',
//   _backPosition: Const_Text_Align.ALIGN_RT,
//   _fontScaleRatio: 100,
//   _root: '',
//   _doubleClickToFullScreen: 'true',
//   _resumeSignagePlaybackAfterIdle: '-1',
//   _isKioskMode: 'true'
// }
// const contCovid19 = {
//   AttachmentFiles: {},
//   _displayMode: Const_Web_Displaymode.default,
//   _showType: Const_Webpage_ShowType.online,
//   _URL: COVID_19_Lists[0].url,
//   _clearCache: Const_Webpage_ClearCache.disabled,
//   _autoRefresh: 90 * 60,
//   _isDesktopView: 'true',
//   _Enhanced_Rendering: 'true',
//   _Live_Update_ID: '',
//   _showAfterLoadFinished: 'true',
//   _block_pop_ups: 'false',
//   _showBack: 'false',
//   _backPosition: Const_Text_Align.ALIGN_RT
// }
// const constClockDigitalInit = {
//   _Clock_Format: 0,
//   _textColor: Const_Default_Color,
//   _backgroundColor: Const_Default_BG,
//   _font: Const_Default_Font,
//   _fontSize: Const_Default_Font_Size,
//   _Clock_Date_Format: Const_Default_Date_Format,
//   _Clock_Show_Type: '0',
//   _Clock_dos: 0,
//   _Clock_dys: 1,
//   _Clock_dms: 1,
//   _Clock_dds: 1,
//   _Clock_dws: 0,
//   _Clock_dsep: 1,
//   _Clock_Alignment_Vertical: 1,
//   _Clock_Alignment_Horizontal: 1
// }
// const constClockCountdownInit = {
//   _textColor: Const_Default_Color,
//   _backgroundColor: Const_Default_BG,
//   _font: Const_Default_Font,
//   _fontSize: Const_Default_Font_Size,
//   _Countdown_StartTime: -1,
//   _Countdown_EndTime: 1,
//   _Countdown_EndingText: '',
//   _Countdown_ShowSeconds: 'true',
//   _Countdown_Label: '',
//   _Clock_Alignment_Vertical: 1,
//   _Clock_Alignment_Horizontal: 1
// }
// const contClock = {
//   AttachmentFiles: {},
//   _Clock_Type: Const_Clock_Type.digital,
//   ...constClockDigitalInit
// }
// const contRTSP = {
//   AttachmentFiles: {},
//   _RTSP_URL: ''
// }
// const contTwitter = {
//   AttachmentFiles: {},
//   _Twitter_DisplayType: 'Twitter_Account',
//   _Twitter_Account: '',
//   _Twitter_Hashtag: '',
//   _Twitter_Speed: Const_Speed.SPEED_MEDIUM,
//   _Twitter_UpdateFrequency: 30,
//   _Twitter_ShowItems: 0,
//   _textColor: Const_Default_Color,
//   _backgroundColor: Const_Default_BG,
//   _font: Const_Default_Font,
//   _fontSize: Const_Default_Font_Size
// }
// const contVideoIn = {
//   AttachmentFiles: {},
//   _widgetType: 'Camera',
//   _Camera_isFillArea: 'false'
// }

// // TODO unfinished due i18n text will broken
// const countingCamera = {
//   AttachmentFiles: {},
//   CameraSetting: [],
//   _backgroundColor: Const_Default_Counting_Camera_BG_Color,
//   _backgroundImage: '',
//   _subContentType: 'CountingCamera',
//   _textColor: Const_Default_Counting_Camera_Color,
//   _font: Const_Default_Font,
//   _maximumCapacity: Const_Default_Counting_Max_Capacity_Text,
//   _textOfFull: Const_Default_Counting_textOfFull,
//   _textOfCanEnter: Const_Default_Counting_Camera_Entry_Text,
//   _textOfCanNotEnter: Const_Default_Counting_Camera_No_Entry_Text,
//   _maxCount: Const_Default_Counting_Camera_Max_Count,
//   _calculateMethod: Const_CountingCamera_CalculateMethod.query_db,
//   _startTimeOfQueryCamera: Const_Default_Counting_Camera_StartTimeOfQueryCamera,
//   _resetTime: Const_Default_Counting_Camera_ResetTime,
//   _defaultValue: Const_Default_Counting_Camera_Default_Valuet
// }
// const contWeather = {
//   AttachmentFiles: {},
//   _Weather_Type: Const_Weather_Type.location,
//   _textColor: Const_Default_Weather_Color,
//   _backgroundColor: Const_Default_BG,
//   _theme_type: Const_Weather_theme_type.Classic.value,
//   _font: Const_Default_Font,
//   _fontSize: Const_Default_Font_Size,
//   _Weather_Units_of_Temperature: Const_Weather_UOT.c,
//   _Weather_Lang: Const_Default_Lang,
//   _Weather_backgroundImage: '',
//   _Weather_theme: Const_Weather_Theme.customize,
//   _Weather_main_area_style: 0,
//   _Weather_Forecast_Day: 5,
//   _Weather_UpdateFrequency: 30,
//   _Weather_Country: '',
//   _theme_style: Const_Weather_theme_style.Square.value,
//   _Weather_City: ''
// }
// const contCalendar = {
//   AttachmentFiles: {},
//   _Calendar_Type: 0,
//   _iCal_Address: '',
//   _GoogleCalendar_Account: '',
//   _GoogleCalendar_Item_Show_Location: 'true',
//   _GoogleCalendar_Item_Show_Description: 'true',
//   _GoogleCalendar_DisplayCount: 2,
//   _GoogleCalendar_Header_BackgroundImage: '',
//   _GoogleCalendar_Header_BackgroundColor: Const_Calendar_Header_BG_Color,
//   _GoogleCalendar_Header_TextColor: Const_Calendar_Header_Text_Color,
//   _GoogleCalendar_Item_BackgroundImage: '',
//   _GoogleCalendar_Item_BackgroundColor: Const_Calendar_Item_BG_Color,
//   _GoogleCalendar_Item_TextColor: Const_Calendar_Item_Text_Color,
//   _ThemeStyle: 'Theme 1',
//   _Live_Update_ID: ''
// }
// const constSocialInstagramInit = {
//   _widgetType: 'Instagram',
//   _Instagram_Account: '',
//   _Instagram_Show_Author: 'true',
//   _Instagram_Show_Likes: 'true',
//   _Instagram_Duration: 10,
//   _Instagram_Display_Format: 'grid',
//   _Instagram_Transition_Effect: 'Scrolling Up',
//   _Instagram_EnableVideo: 'false',
//   _Instagram_UpdateFrequency: 30,
//   _Instagram_ShowItems: 25,
//   _Instagram_Authentication: 'true'
// }
// const constSocialFacebookInit = {
//   _widgetType: 'Facebook',
//   _Facebook_Account: '',
//   _Facebook_Service_Id: '',
//   _Facebook_Page_Account: '',
//   _Facebook_Show_Author: 'true',
//   _Facebook_Show_Likes: 'true',
//   _Facebook_Duration: 10,
//   _Facebook_Display_Format: 'grid',
//   _Facebook_Display_Content: Const_Social_Facebook_Display_ON_THE_SURFACE,
//   _Facebook_Transition_Effect: 'Scrolling Up',
//   _Facebook_EnableVideo: 'false',
//   _Facebook_UpdateFrequency: 30,
//   _Facebook_ShowItems: 25,
//   _Facebook_Authentication: 'true',
//   _Speed: Const_Speed.SPEED_MEDIUM
// }
// const contSocial = {
//   AttachmentFiles: {},
//   ...constSocialInstagramInit
// }
// const contYoutube = {
//   AttachmentFiles: {},
//   _param: '',
//   _displayMode: Const_Web_Displaymode.default,
//   _showType: Const_Youtube_ShowType.videos,
//   _setToMajorAudioSource: 'true',
//   _Live_Update_ID: '-',
//   _showYouTubeControlBar: 'true',
//   _isKioskMode: 'true'
// }

// export const defaultBgPage = {
//   _Description: '',
//   _Row: '1',
//   // _Layout: "Landscape 1",
//   _Column: '1',
//   _ID: 'Background',
//   // _Orientation: "0",
//   _SerialNumber: 'Background',
//   _BackgroundColor: '#00000000',
//   Section: [
//     {
//       _Width: '1',
//       _Index: '0',
//       _Height: '1',
//       _X: '0',
//       _ContentType: '',
//       _Y: '0',
//       Content: {}
//     }
//   ]
// }

// export const MEDIA_WIDGET_INDEX = 0

export const VisualWidgetsSettings = [
  {
    Text: 'media',
    preview: 'Media',
    Content: contMedia,
    kiosk: true,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: true,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Media',
    SVGIcon: 'MediaIcon',
    Img3: 'mediaLight.png',
    Img2: 'media.png',
    Img: 'online_edit_media.png',
    kioskImg: 'online_edit_media.png',
    cursor: 'cursor_media_2.png',
    widgetType: null,
    contentType: null
  },
  {
    Text: 'webPage',
    preview: 'Webpage',
    Content: contWebpage,
    kiosk: true,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Web Page',
    SVGIcon: 'WebIcon',
    Img3: 'webpageLight.png',
    Img2: 'webpage.png',
    Img: 'online_edit_web.png',
    kioskImg: 'online_edit_web.png',
    cursor: 'cursor_web_2.png',
    widgetType: null,
    contentType: null
  },
  {
    Text: 'youtube',
    preview: 'Youtube',
    Content: 'contYoutube',
    kiosk: true,
    onlyFlexible: false,
    alwaysHaveAudio: true,
    bgPage: false,
    checkOneYoutube: true,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: true,
    ContentType: 'Youtube',
    SVGIcon: 'YoutubeIcon',
    Img3: 'youtubeLight.png',
    Img2: 'youtube.png',
    Img: 'online_edit_youtube.png',
    kioskImg: 'online_edit_youtube.png',
    cursor: 'cursor_youtube_2.png',
    widgetType: null,
    contentType: null
  },
  {
    Text: 'RTSP',
    preview: 'IPStreaming',
    Content: 'contRTSP',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: true,
    bgPage: true,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: true,
    ContentType: 'Misc',
    SVGIcon: 'IpStreamingIcon',
    Img3: 'ipstreamingLight.png',
    Img2: 'ipstreaming.png',
    Img: 'online_edit_ipstreaming.png',
    kioskcImg: 'online_edit_ipstreaming_kiosk.png',
    cursor: 'cursor_ipstreaming_2.png',
    widgetType: 'RTSP',
    contentType: null
  },
  {
    Text: 'text',
    preview: 'Text',
    Content: contText,
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Text',
    SVGIcon: 'TextIcon',
    Img3: 'textLight.png',
    Img2: 'text.png',
    Img: 'online_edit_text.png',
    kioskImg: 'online_edit_text_kiosk.png',
    cursor: 'cursor_text_2.png',
    widgetType: null,
    contentType: 'Text'
  },
  {
    Text: 'twitter',
    preview: 'Twitter',
    Content: contTwitter,
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Misc',
    SVGIcon: 'TwitterIcon',
    Img3: 'twitterLight.png',
    Img2: 'twitter.png',
    Img: 'online_edit_twitter.png',
    kioskImg: 'online_edit_twitter_kiosk.png',
    cursor: 'cursor_twitter_2.png',
    widgetType: 'Twitter',
    contentType: null
  },
  {
    Text: 'socialMedia',
    preview: 'socialMedia',
    Content: 'contSocial',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Misc 2',
    SVGIcon: 'CommunityIcon',
    Img3: 'socialLight.png',
    Img2: 'social.png',
    Img: 'online_edit_social.png',
    kioskImg: 'online_edit_social_kiosk.png',
    cursor: 'cursor_social_2.png',
    widgetType: ['Instagram', 'Facebook'],
    contentType: null
  },
  {
    Text: 'RSS',
    preview: 'RSS',
    Content: contRss,
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Text',
    SVGIcon: 'RssIcon',
    Img3: 'rssLight.png',
    Img2: 'rss.png',
    Img: 'online_edit_rss.png',
    kioskImg: 'online_edit_rss_kiosk.png',
    cursor: 'cursor_rss_2.png',
    widgetType: null,
    contentType: 'RSS'
  },
  {
    Text: 'weather',
    preview: 'Weather',
    Content: 'contWeather',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Misc',
    SVGIcon: 'WeatherIcon',
    Img3: 'weatherLight.png',
    Img2: 'weather.png',
    Img: 'online_edit_weather.png',
    kioskImg: 'online_edit_weather_kiosk.png',
    cursor: 'cursor_weather_2.png',
    widgetType: 'Weather',
    contentType: null
  },
  {
    Text: 'clock',
    preview: 'Clock',
    Content: 'contClock',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Misc',
    SVGIcon: 'ClockIcon',
    Img3: 'clockLight.png',
    Img2: 'clock.png',
    Img: 'online_edit_clock.png',
    kioskImg: 'online_edit_clock_kiosk.png',
    cursor: 'cursor_clock_2.png',
    widgetType: 'Clock',
    contentType: null
  },
  {
    Text: 'calendar',
    preview: 'Calendar',
    Content: 'contCalendar',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Misc 2',
    SVGIcon: 'CalendarIcon',
    Img3: 'calendarLight.png',
    Img2: 'calendar.png',
    Img: 'online_edit_calendar.png',
    kioskImg: 'online_edit_calendar_kiosk.png',
    cursor: 'cursor_calendar_2.png',
    widgetType: 'Calendar',
    contentType: null
  },
  {
    Text: 'videoIn',
    preview: 'VideoIn',
    Content: contVideoIn,
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: true,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: true,
    checkVideo: false,
    ContentType: 'Misc',
    SVGIcon: 'VideoInIcon',
    Img3: 'videoinLight.png',
    Img2: 'videoin.png',
    Img: 'online_edit_videoin.png',
    kioskImg: 'online_edit_videoin_kiosk.png',
    cursor: 'cursor_video_in_2.png',
    widgetType: ['Camera', 'Hdmi'],
    contentType: null
  },
  {
    Text: 'countingCamera',
    preview: 'CountingCamera',
    Content: 'countingCamera',
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: true,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'CountingCamera',
    SVGIcon: 'CountingCameraIcon',
    Img3: 'counterLight.png',
    Img2: 'counter.png',
    Img: 'online_edit_counter.png',
    kioskImg: 'online_edit_counter_kiosk.png',
    cursor: 'cursor_counter_2.png',
    widgetType: null,
    contentType: null,
    translateTransfer: [
      '_textOfCanEnter',
      '_textOfCanNotEnter',
      '_maximumCapacity',
      '_textOfFull'
    ]
  },
  {
    Text: 'shape',
    preview: 'Shape',
    Content: contPattern,
    kiosk: false,
    onlyFlexible: false,
    alwaysHaveAudio: false,
    bgPage: false,
    checkOneYoutube: false,
    checkCameraDup: false,
    checkMulti: false,
    checkVideo: false,
    ContentType: 'Media',
    SVGIcon: 'PatternIcon',
    Img3: 'patternLight.png',
    Img2: 'pattern.png',
    Img: 'online_edit_pattern.png',
    kioskImg: 'online_edit_pattern_kiosk.png',
    cursor: 'cursor_pattern_2.png',
    widgetType: 'Shape',
    contentType: null
  }
]
// const VisualWidgetsComps = [
//   // WidgetCOVID_19,
//   WidgetMedia,
//   WidgetWebpage,
//   WidgetYouTube,
//   WidgetRTSP,
//   WidgetText,
//   WidgetTwitter,
//   WidgetSocial,
//   WidgetRss,
//   WidgetWeather,
//   WidgetClock,
//   WidgetCalendar,
//   WidgetVideoIn,
//   WidgetCountingCamera,
//   WidgetShape
// ]

// const imgs = []
// if (process.env.BROWSER) {
//   for (let i = 0; i < VisualWidgetsSettings.length; i++) {
//     const img = new Image()
//     img.src = '/images/' + VisualWidgetsSettings[i].cursor
//     imgs.push(img)
//   }
// }
// export function getDraggingImg(id) {
//   return imgs[id]
// }
// export const VisualWidgets = VisualWidgetsSettings.map((item, id) => ({
//   ...item,
//   widgetComp: VisualWidgetsComps[id]
// }))
// export function getVisualWidgetsId(section) {
//   const vv = VisualWidgets
//   if (!section) {
//     return -1
//   }
//   for (let i = 0; i < vv.length; i++) {
//     const v = vv[i]
//     if (v.ContentType == section._ContentType) {
//       if (
//         !v.widgetType &&
//         !v.contentType &&
//         section.Content &&
//         (!section.Content._widgetType || section.Content._widgetType === 'null')
//       ) {
//         return i
//       }

//       if (
//         v.contentType &&
//         section.Content &&
//         v.contentType == section.Content._contentType
//       ) {
//         return i
//       }

//       if (section.Content && v.widgetType) {
//         const wT = section.Content._widgetType
//         let w = v.widgetType
//         !Array.isArray(w) && (w = [w])
//         for (let j = 0; j < w.length; j++) {
//           if (wT == w[j]) {
//             return i
//           }
//         }
//       }
//       if (
//         v.ContentType == 'Text' &&
//         section.Content &&
//         !section.Content._contentType
//       ) {
//         // Text - RichText
//         return i
//       }
//     }
//   }
//   return -1
// }
// export function videosRouteCheck(section, _Model_Type, dontCheckAudio) {
//   const wi = getVisualWidgetsId(section)
//   const exist = false
//   if (!section || !section.Content) {
//     return exist
//   }

//   if (
//     section.Content._widgetType &&
//     section.Content._widgetType == 'Instagram' &&
//     section.Content._Instagram_EnableVideo == 'true'
//   ) {
//     return true
//   } else if (
//     section.Content._widgetType &&
//     section.Content._widgetType == 'Facebook' &&
//     section.Content._Facebook_EnableVideo == 'true'
//   ) {
//     return true
//   } else if (wi != -1 && VisualWidgets[wi].checkVideo) {
//     return true
//   } else if (
//     section._ContentType == 'Media' &&
//     section.Content &&
//     section.Content.MediaItem &&
//     section.Content.MediaItem.length > 0
//   ) {
//     const m = section.Content.MediaItem
//     for (let i = 0; i < m.length; i++) {
//       let fileExt = m[i]._src.toLowerCase()
//       fileExt = fileExt.substring(fileExt.lastIndexOf('.'))
//       if (dontCheckAudio && videoExtArray.toString().indexOf(fileExt) != -1) {
//         return true
//       }
//       if (
//         !dontCheckAudio &&
//         (videoExtArray.toString().indexOf(fileExt) != -1 ||
//           audioExtArray.toString().indexOf(fileExt) != -1)
//       ) {
//         return true
//       }
//     }
//   }
//   if (_Model_Type && isModelSupportHdmiInAndHdmiAsVideoSource(_Model_Type)) {
//     if (vidoeInCheck(section)) {
//       return true
//     }
//   }
//   return exist
// }
// export function youtubeCheck(section) {
//   const wi = getVisualWidgetsId(section)
//   const exist = false
//   if (wi != -1 && VisualWidgets[wi].checkOneYoutube) {
//     return true
//   }
//   return exist
// }
// export function vidoeInCheck(section) {
//   const wi = getVisualWidgetsId(section)
//   const exist = false
//   if (wi != -1 && VisualWidgets[wi].checkMulti) {
//     return true
//   }
//   return exist
// }
// export function peopleCountingCheck(section) {
//   const wi = getVisualWidgetsId(section)
//   const exist = false
//   if (wi != -1 && VisualWidgets[wi].checkCameraDup) {
//     return true
//   }
//   return exist
// }

/* eslint-disable no-array-constructor */

// export const fb_app_id = '1614507265359534' // prod
// // export const fb_app_id = '2317274045209733';
// export const pinterest_app_id = '5070166224908888366'
// export const dropbox_app_id = '80rmklig9iit15x'
// export const dropbox_preview_cb = `https://${dns}/dropbox/user/callback`
// export const dropbox_auth_url = `https://www.dropbox.com/oauth2/authorize?client_id=${dropbox_app_id}&response_type=code&redirect_uri=${dropbox_preview_cb}`
// export const google_drive_app_id =
//   '393745915469-34gq8mjh7m8drtos8s8k8ncocdjrdkpr.apps.googleusercontent.com'
// export const google_drive_preview_cb = `https://${dns}/googledrive/user/callback`
// export const google_drive_auth_url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=online&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=${google_drive_app_id}&redirect_uri=${google_drive_preview_cb}`
// export const one_drive_app_id = '58620e5b-5031-4ce8-b359-3794bb9af0f7'
// export const one_drive_preview_cb = `https://${dns}/onedrive/user/callback`
// export const one_drive_auth_url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=${one_drive_app_id}&scope= openid%20profile%20offline_access%20User.Read%20Calendars.Read%20Files.Read&redirect_uri=${one_drive_preview_cb}`
// export const ig_auth_url = `https://api.instagram.com/oauth/authorize?app_id=598481513890167&redirect_uri=https://${dns}/instagram/auth/callback&scope=user_profile,user_media&response_type=code`
// export const fb_auth_url = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${fb_app_id}&redirect_uri=https://${dns}/facebook/auth/callback&state="{st=state123abc,ds=123456789}"&scope=user_posts,user_videos,user_photos&auth_type=rerequest`
// export const ig_preview_cb = `https://${dns}/instagram/auth/callback`
// export const fb_preview_cb = `https://${dns}/facebook/auth/callback`
// export const ig_auth_user_url = `https://api.instagram.com/oauth/authorize?app_id=598481513890167&redirect_uri=https://${dns}/instagram/user/callback&scope=user_profile,user_media&response_type=code`
// export const fb_auth_user_url = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${fb_app_id}&redirect_uri=https://${dns}/facebook/user/callback&state="{st=state123abc,ds=123456789}"&scope=user_posts,user_videos,user_photos&auth_type=rerequest`
// export const fb_auth_service_id_page = 'https://www.novods.com/helper/facebook'
// export const pinterest_auth_user_url = `https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://${dns}/pinterest/user/callback&client_id=${pinterest_app_id}&scope=read_public,write_public`
// export const ig_user_preview_cb = `https://${dns}/instagram/user/callback`
// export const fb_user_preview_cb = `https://${dns}/facebook/user/callback`
// export const pinterest_user_preview_cb = `https://${dns}/pinterest/user/callback`
// export const ig_logout_url = 'https://instagram.com/accounts/logout/'
// export const youtubeUrlRegx =
//   /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
export const videoExtArray = new Array(
  '.avi',
  '.mp4',
  '.wmv',
  '.mp4',
  '.mov',
  '.3gp'
)
export const imageExtArray = new Array('.png', '.jpg', '.jpeg', '.gif', '.bmp')
export const audioExtArray = new Array('.mp3')
export const defaultBbWhiteFile = 'background_color_ffffff.png'
export const MediaLibValidExts = new Array(
  '.mp3',
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.bmp',
  '.mp4',
  '.wmv',
  '.3gp',
  '.avi',
  '.mov',
  '.ttf'
)
export const MediaLibMediaValidExts = new Array(
  '.mp3',
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.bmp',
  '.mp4',
  '.wmv',
  '.3gp',
  '.avi',
  '.mov'
)
export const systemFont = [
  {
    serifType: 'sans-serif',
    name: 'Roboto-Regular',
    webName: 'Roboto',
    style: 'normal',
    weight: '400'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-Bold',
    webName: 'Roboto',
    style: 'normal',
    weight: '700'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-Italic',
    webName: 'Roboto',
    style: 'italic',
    weight: '400'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-BoldItalic',
    webName: 'Roboto',
    style: 'italic',
    weight: '700'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-Light',
    webName: 'Roboto',
    style: 'normal',
    weight: '300'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-LightItalic',
    webName: 'Roboto',
    style: 'italic',
    weight: '300'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-Thin',
    webName: 'Roboto',
    style: 'normal',
    weight: '100'
  },
  {
    serifType: 'sans-serif',
    name: 'Roboto-ThinItalic',
    webName: 'Roboto',
    style: 'italic',
    weight: '100'
  },
  {
    serifType: 'sans-serif',
    name: 'RobotoCondensed-Regular',
    webName: 'Roboto Condensed',
    style: 'normal',
    weight: '400'
  },
  {
    serifType: 'sans-serif',
    name: 'RobotoCondensed-Bold',
    webName: 'Roboto Condensed',
    style: 'normal',
    weight: '700'
  },
  {
    serifType: 'sans-serif',
    name: 'RobotoCondensed-Italic',
    webName: 'Roboto Condensed',
    style: 'italic',
    weight: '400'
  },
  {
    serifType: 'sans-serif',
    name: 'RobotoCondensed-BoldItalic',
    webName: 'Roboto Condensed',
    style: 'italic',
    weight: '700'
  },
  {
    serifType: 'serif',
    name: 'DroidSerif-Regular',
    webName: 'DroidSerif',
    style: 'normal',
    weight: 'normal'
  },
  {
    serifType: 'serif',
    name: 'DroidSerif-Bold',
    webName: 'DroidSerif',
    style: 'normal',
    weight: 'bold'
  },
  {
    serifType: 'serif',
    name: 'DroidSerif-Italic',
    webName: 'DroidSerif',
    style: 'italic',
    weight: 'normal'
  },
  {
    serifType: 'serif',
    name: 'DroidSerif-BoldItalic',
    webName: 'DroidSerif',
    style: 'italic',
    weight: 'bold'
  },
  {
    serifType: 'sans-serif',
    name: 'DroidSans',
    webName: 'DroidSans',
    style: 'normal',
    weight: 'normal'
  },
  {
    serifType: 'sans-serif',
    name: 'DroidSans-Bold',
    webName: 'DroidSans',
    style: 'normal',
    weight: 'bold'
  },
  {
    serifType: 'sans-serif',
    name: 'DroidSansMono',
    webName: 'DroidSansMono',
    style: 'normal',
    weight: 'normal'
  }
]

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
export const max_videos_Route_Object = {
  ds100: 1,
  ds200: 1,
  c2000: 1,
  ds300: 1,
  k1000: 2,
  nt1000: 4,
  x700: 2,
  x900: 4
}
export const max_hdmi_in_Object = {
  ds100: 0,
  ds200: 0,
  c2000: 0,
  ds300: 1,
  k1000: 0,
  nt1000: 0,
  x700: 0,
  x900: 1
}
export const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
export const weekdaysNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export const weekdaysNamesShort = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

export const weather_img = [
  '/images/w0_n.png',
  '/images/w1_n.png',
  '/images/w2_n.png',
  '/images/w3_n.png',
  '/images/w4_n.png',
  '/images/w5_n.png',
  '/images/w6_n.png',
  '/images/w7_n.png',
  '/images/w8_n.png',
  '/images/w9_n.png',
  '/images/w10_n.png',
  '/images/w11_n.png',
  '/images/w12_n.png',
  '/images/w13_n.png',
  '/images/w14_n.png',
  '/images/w15_n.png',
  '/images/w16_n.png',
  '/images/w17_n.png',
  '/images/w18_n.png',
  '/images/w19_n.png',
  '/images/w20_n.png',
  '/images/w21_n.png',
  '/images/w22_n.png',
  '/images/w23_n.png',
  '/images/w24_n.png',
  '/images/w25_n.png',
  '/images/w26_n.png',
  '/images/w27_n.png',
  '/images/w28_n.png',
  '/images/w29_n.png',
  '/images/w30_n.png',
  '/images/w31_n.png',
  '/images/w32_n.png',
  '/images/w33_n.png',
  '/images/w34_n.png',
  '/images/w35_n.png',
  '/images/w36_n.png',
  '/images/w37_n.png',
  '/images/w38_n.png',
  '/images/w39_n.png',
  '/images/w40_n.png',
  '/images/w41_n.png',
  '/images/w42_n.png',
  '/images/w43_n.png',
  '/images/w44_n.png',
  '/images/w45_n.png',
  '/images/w46_n.png',
  '/images/w47_n.png'
]
export const weather_img_classic = [
  '/images/w0.png',
  '/images/w1.png',
  '/images/w2.png',
  '/images/w3.png',
  '/images/w4.png',
  '/images/w5.png',
  '/images/w6.png',
  '/images/w7.png',
  '/images/w8.png',
  '/images/w9.png',
  '/images/w10.png',
  '/images/w11.png',
  '/images/w12.png',
  '/images/w13.png',
  '/images/w14.png',
  '/images/w15.png',
  '/images/w16.png',
  '/images/w17.png',
  '/images/w18.png',
  '/images/w19.png',
  '/images/w20.png',
  '/images/w21.png',
  '/images/w22.png',
  '/images/w23.png',
  '/images/w24.png',
  '/images/w25.png',
  '/images/w26.png',
  '/images/w27.png',
  '/images/w28.png',
  '/images/w29.png',
  '/images/w30.png',
  '/images/w31.png',
  '/images/w32.png',
  '/images/w33.png',
  '/images/w34.png',
  '/images/w35.png',
  '/images/w36.png',
  '/images/w37.png',
  '/images/w38.png',
  '/images/w39.png',
  '/images/w40.png',
  '/images/w41.png',
  '/images/w42.png',
  '/images/w43.png',
  '/images/w44.png',
  '/images/w45.png',
  '/images/w46.png',
  '/images/w47.png'
]

export const weather_str = [
  'tornado',
  'tropical storm',
  'hurricane',
  'severe thunderstorms',
  'thunderstorms',
  'mixed rain and snow',
  'mixed rain and sleet',
  'mixed snow and sleet',
  'freezing drizzle',
  'drizzle',
  'freezing rain',
  'showers',
  'showers',
  'snow flurries',
  'light snow showers',
  'blowing snow',
  'snow',
  'hail',
  'sleet',
  'dust',
  'foggy',
  'haze',
  'smoky',
  'blustery',
  'windy',
  'cold',
  'cloudy',
  'mostly cloudy\n (night)',
  'mostly cloudy\n (day)',
  'partly cloudy\n (night)',
  'partly cloudy\n (day)',
  'clear (night)',
  'sunny',
  'fair (night)',
  'fair (day)',
  'mixed rain and hail',
  'hot',
  'isolated thunderstorms',
  'scattered thunderstorms',
  'scattered thunderstorms',
  'scattered showers',
  'heavy snow',
  'scattered snow showers',
  'heavy snow',
  'partly cloudy',
  'thundershowers',
  'snow showers',
  'isolated thundershowers'
]
export const FACEBOOK_CALLBACK_OBJECT = 'facebookCallbackObject'
export const INSTAGRAM_CALLBACK_OBJECT = 'instagramCallbackObject'
export const PINTEREST_CALLBACK_OBJECT = 'pinterestCallbackObject'
export const GOOGLE_DRIVE_CALLBACK_OBJECT = 'googleDriveCallbackObject'
export const DROPBOX_CALLBACK_OBJECT = 'dropboxCallbackObject'
export const ONE_DRIVE_CALLBACK_OBJECT = 'onedriveCallbackObject'

export const MAX_FONT_SIZE = 1024
export const MIN_FONT_SIZE = 1
// export const Const_Weather_theme_style = {
//   Square: { value: 'Square', text: intlMessages.square },
//   Rectangle_Horizontal: {
//     value: 'Rectangle(Horizontal)',
//     text: intlMessages.horizontal
//   },
//   Rectangle_Vertical: {
//     value: 'Rectangle(Vertical)',
//     text: intlMessages.vertical
//   }
// }
// export const Const_Weather_theme_type = {
//   Classic: { value: 'Classic', text: intlMessages.classic },
//   Contemporary: { value: 'Contemporary', text: intlMessages.contemporary }
// }
export const Const_Contemparary_Default_BG = '#DA1F2B3C'
export const Const_Classic_Dark_Default_textColor = '#FFFFFFFF'
export const Const_Classic_Dark_Default_BG = '#FF132128'
export const Const_Classic_Light_Default_textColor = '#FF232323'
export const Const_Classic_Light_Default_BG = '#FFEDB254'

export const Const_Youtube_ShowType = {
  videos: 'Videos',
  playlist: 'Playlist'
}
export const Const_Webpage_ShowType = {
  online: 'Online',
  offline: 'Offline'
}
export const Const_Webpage_ClearCache = {
  disabled: '0',
  enabled: '1'
}
export const Const_Web_Displaymode = {
  default: 0,
  wideView: 1
}
export const Const_Clock_Type = {
  analog: 'analog',
  digital: 'digital',
  countdown: 'countdown'
}
export const Const_Weather_Type = {
  location: 'Location',
  geo: 'GeographicCoordinates'
}

export const Const_Weather_UOT = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
export const Const_Weather_Theme = {
  default: 'Default',
  dark: 'Dark',
  light: 'Light',
  customize: 'Customize'
}
export const Const_Clock_Theme = {
  light: 'white',
  dark: 'black'
}
export const Const_Weather_VideoType = {
  hdmi: 1,
  camera: 2
}
// export const Const_Live_Update_type = {
//   local: { value: 0, text: intlMessages.local },
//   ftp: { value: 1, text: intlMessages.ftp },
//   samba: { value: 2, text: intlMessages.samba },
//   dropbox: { value: 3, text: intlMessages.dropbox },
//   oneDrive: { value: 4, text: intlMessages.oneDrive },
//   googleDrive: { value: 5, text: intlMessages.googleDrive },
//   usb: { value: 6, text: intlMessages.usb },
//   microSD: { value: 7, text: intlMessages.microSD }
// }
// export const Const_Live_Update_type_storage = {
//   disabled: { value: 0, text: intlMessages.disabled },
//   usb: { value: 1, text: intlMessages.usb },
//   microSD: { value: 2, text: intlMessages.microSD }
// }
// export const Const_Live_Update_type_Text = {
//   local: { value: 0, text: intlMessages.local },
//   ftp: { value: 1, text: intlMessages.ftp },
//   samba: { value: 2, text: intlMessages.samba },
//   dropbox: { value: 3, text: intlMessages.dropbox },
//   oneDrive: { value: 4, text: intlMessages.oneDrive },
//   googleDrive: { value: 5, text: intlMessages.googleDrive },
//   url: { value: 6, text: intlMessages.url }
// }
export const Const_Twitter_Text_Scaling = {
  _100: { value: 100, text: '100%' },
  _125: { value: 125, text: '125%' },
  _150: { value: 150, text: '150%' },
  _175: { value: 175, text: '175%' },
  _200: { value: 200, text: '200%' }
}
export const Const_Twitter_Widget_Type = {
  custom: { value: 'Listview', text: 'custom' },
  classic: { value: 'Webview', text: 'classic' }
}
export const Const_Twitter_Theme = {
  dark: { value: 'dark', text: 'dark' },
  light: { value: 'light', text: 'light' }
}
export const Const_RSS_displayType = {
  rss: { value: 'RSS', text: 'newsTracker_RSS' },
  mrss: { value: 'MRSS', text: 'mediaContent_MRSS' }
}
export const Const_MRSS_Theme = {
  dark: { value: 'Dark', text: 'dark' },
  light: { value: 'Light', text: 'light' }
}
export const Const_MRSS_Dark_Theme_BG_Color = '#FF292F33'
export const Const_MRSS_Light_Theme_BG_Color = '#FFFFFFFF'

// export const ITEM_SYMBOL_OPTION = {
//   dots: { value: '•', text: intlMessages.itemSymbol_dots },
//   square: { value: '■', text: intlMessages.itemSymbol_square },
//   diamond: { value: '◆', text: intlMessages.itemSymbol_diamond },
//   hyphen: { value: '-', text: intlMessages.itemSymbol_hyphen },
//   number: {
//     value: '1',
//     text: intlMessages.itemSymbol_number
//   },
//   capital: {
//     value: 'A',
//     text: intlMessages.itemSymbol_capital
//   },
//   lowerCase: {
//     value: 'a',
//     text: intlMessages.itemSymbol_lowerCase
//   }
// }

export const Const_Text_ShowType = {
  static: 'Static',
  HorizontalScrolling: 'Horizontal Scrolling',
  VerticalScrolling: 'Vertical Scrolling',
  RichText: 'Rich Text',
  qr: 'QR Code'
}
export const Const_Text_Align = {
  ALIGN_LT: 'Left-Top',
  ALIGN_LC: 'Left-Center',
  ALIGN_LB: 'Left-Bottom',
  ALIGN_CT: 'Center-Top',
  ALIGN_CC: 'Center-Center',
  ALIGN_CB: 'Center-Bottom',
  ALIGN_RT: 'Right-Top',
  ALIGN_RC: 'Right-Center',
  ALIGN_RB: 'Right-Bottom'
}

export const Const_Text_Dirction = {
  DIRECTION_RTL: 'Right to Left',
  DIRECTION_LTR: 'Left to Right',
  DIRECTION_BTT: 'Bottom to Top',
  DIRECTION_TTB: 'Top to Bottom'
}

export const Const_Calendar_Header_BG_Color = '#FF5F8272'
export const Const_Calendar_Header_Text_Color = '#FFFFFFFF'
export const Const_Calendar_Item_BG_Color = '#FFF6F7F9'
export const Const_Calendar_Item_Text_Color = '#FF4F565E'
export const Const_Social_Facebook_Display_ON_THE_SURFACE = 'on the surface'
export const Const_Social_Facebook_Display_IN_TURN = 'in turn'

export const Const_Speed = {
  SPEED_VERY_SLOW: 'Very Slow',
  SPEED_SLOWER: 'Slower',
  SPEED_SLOW: 'Slow',
  SPEED_MEDIUM: 'Medium',
  SPEED_FAST: 'Fast',
  SPEED_FASTER: 'Faster',
  SPEED_VERY_FAST: 'Very Fast',
  SPEED_SUPER_FAST: 'Super Fast',
  SPEED_ULTRA_FAST: 'Ultra Fast',
  SPEED_LOW: 'Low',
  SPEED_HIGH: 'High'
}
export const Const_Color = {
  COLOR_TRANSPARENT: '#00000000',
  COLOR_BLACK: '#FF000000',
  COLOR_WHITE: '#FFFFFFFF'
}
export const Const_Pattern_Shape = {
  SHAPE_RECT: 'rect',
  SHAPE_CIRCLE: 'circle',
  SHAPE_ELLIPSE: 'ellipse',
  SHAPE_POLYGON: 'polygon',
  SHAPE_STAR: 'star'
}
export const Const_Media_ShowType = {
  SHOW_TYPE_DEFAULT: 'Default',
  SHOW_TYPE_KenBurnsEffect: 'Ken Burns Effect',
  SHOW_TYPE_CARD_FLIP: 'Card Flip',
  SHOW_TYPE_ZOOM_ANIMATION: 'Zoom In',
  SHOW_TYPE_FADE_IN: 'Fade In',
  SHOW_TYPE_FLY_IN: 'Fly In',
  SHOW_TYPE_FLOAT_IN: 'Float In',
  SHOW_TYPE_FLY_OUT: 'Fly Out',
  SHOW_TYPE_ROTATE: 'Rotate'
}
export const Const_Media_ScaleType = {
  SHOW_TYPE_FIT_XY: 'FIT_XY',
  SHOW_TYPE_FIT_CENTER: 'FIT_CENTER',
  SHOW_TYPE_CENTER_CROP: 'CENTER_CROP'
}
export const Const_CountingCamera_CalculateMethod = {
  default_value: 'default_value',
  reset_time: 'reset_time_with_default_value',
  query_db: 'query_camera_start_time'
}
// export const Const_CountingCamera_BusinessHours = {
//   _24_hours: { text: intlMessages._24_hours, key: '_24_hours' },
//   open_daily: { text: intlMessages.open_daily, key: 'open_daily' }
// }
// export const Const_CountingCamera_CameraType = {
//   vivotek: { text: intlMessages.vivotek, value: 'CountingCamera' },
//   hikvision: { text: intlMessages.hikvision, value: 'HikvisionCamera' }
// }
export const Const_True = 'true'
export const Const_False = 'false'
export const Const_Default_Font = 'Roboto-Light'
export const Const_Default_Font_Weather_Modern = 'Roboto-Light'
export const Const_Default_Font_Size = '28'
export const Const_RSS_Default_Font_Size = 32
export const Const_Default_Date_Format = 'yyyy.MM.dd EEEE'
export const Const_Default_Color = Const_Color.COLOR_BLACK
export const Const_Default_Weather_Color = Const_Color.COLOR_WHITE
export const Const_Default_BG = Const_Color.COLOR_TRANSPARENT
export const Const_Default_Lang = 'en-US'
export const Const_Default_Counting_Camera_BG_Color = '#ffEAEEF4'
export const Const_Default_Counting_Camera_Color = '#ff060001'
// export const Const_Default_Counting_Camera_Entry_Text = intlMessages.welcome
// export const Const_Default_Counting_Camera_No_Entry_Text = intlMessages.noEntry
// export const Const_Default_Counting_Max_Capacity_Text =
//   intlMessages.maxCapacity
// export const Const_Default_Counting_textOfFull = intlMessages.full
export const Const_Default_Counting_Camera_StartTimeOfQueryCamera = '08:00:00'
export const Const_Default_Counting_Camera_ResetTime = '00:00:00'
export const Const_Default_Counting_Camera_Max_Count = 100
export const Const_Default_Counting_Camera_Default_Valuet = 0

export const Const_Counting_Camera_Data_Input_LocalStorage_Name =
  'CountingCamerasDataInputs'

export const COVID_19_Lists = [
  {
    locaion: 'Austria',
    brief: 'AU',
    url: 'https://content.seenspire.com/gFn0-pqL0-0jmE',
    bg_l: '/images/covid_19_AU_l.png',
    bg_r: '/images/covid_19_AU_r.png'
  },
  {
    locaion: 'Belgium (FR)',
    brief: 'BE (FR)',
    url: 'https://content.seenspire.com/PRsA-kyUW-hByC',
    bg_l: '/images/covid_19_BRFR_l.png',
    bg_r: '/images/covid_19_BRFR_r.png'
  },
  {
    locaion: 'Belgium (NL)',
    brief: 'BE (NL)',
    url: 'https://content.seenspire.com/V2Gv-K4Pz-Zxgq',
    bg_l: '/images/covid_19_BRFR_l.png',
    bg_r: '/images/covid_19_BRFR_r.png'
  },
  {
    locaion: 'Canada',
    brief: 'CA',
    url: 'https://content.seenspire.com/SPqh-cH0Y-sZHB',
    bg_l: '/images/covid_19_CA_l.png',
    bg_r: '/images/covid_19_CA_r.png'
  },
  {
    locaion: 'France',
    brief: 'FR',
    url: 'https://content.seenspire.com/5Cwu-M7Up-c9qN',
    bg_l: '/images/covid_19_FR_l.png',
    bg_r: '/images/covid_19_FR_r.png'
  },
  {
    locaion: 'Germany',
    brief: 'DE',
    url: 'https://content.seenspire.com/WMqs-RixS-RhS3',
    bg_l: '/images/covid_19_DE_l.png',
    bg_r: '/images/covid_19_DE_r.png'
  },
  {
    locaion: 'Italy',
    brief: 'IT',
    url: 'https://content.seenspire.com/z4rQ-ptxc-Qk3C',
    bg_l: '/images/covid_19_IT_l.png',
    bg_r: '/images/covid_19_IT_r.png'
  },
  {
    locaion: 'Netherlands',
    brief: 'NL',
    url: 'https://content.seenspire.com/Ge2U-EF6S-aPlY',
    bg_l: '/images/covid_19_NL_l.png',
    bg_r: '/images/covid_19_NL_r.png'
  },
  {
    locaion: 'United Arab Emirates',
    brief: 'UAE',
    url: 'https://content.seenspire.com/XJ1W-GlVm-JL5L',
    bg_l: '/images/covid_19_UAE_l.png',
    bg_r: '/images/covid_19_UAE_r.png'
  },
  {
    locaion: 'United States',
    brief: 'US',
    url: 'https://content.seenspire.com/eZqd-GaTy-MXZH',
    bg_l: '/images/covid_19_US_l.png',
    bg_r: '/images/covid_19_US_r.png'
  },
  {
    locaion: 'United Kingdom',
    brief: 'UK',
    url: 'https://content.seenspire.com/fh6y-GP0h-px96',
    bg_l: '/images/covid_19_UK_l.png',
    bg_r: '/images/covid_19_UK_r.png'
  }
]

// export function getCovid19_info_bg(url) {
//   const c = {
//     bg_l: '/images/covid_19_US_l.png',
//     bg_r: '/images/covid_19_US_r.png'
//   }
//   // let array = COVID_19_Lists.filter((item)=>(item.url == url));
//   // if(array && array.length ){
//   // c = array[0];
//   // }
//   return c
// }

export const bgColorsFormat = [
  {
    color: 'transparent',
    name: '',
    bgImage: '',
    iconImage: '/images/transparent.png'
  },
  {
    color: '#ffffff',
    name: 'background_color_ffffff.png',
    bgImage: '/images/background_color_ffffff.png'
  },
  {
    color: '#2a303d',
    name: 'background_color_2a303d.png',
    bgImage: '/images/background_color_2a303d.png'
  },
  {
    color: '#27393f',
    name: 'background_color_27393f.png',
    bgImage: '/images/background_color_27393f.png'
  },
  {
    color: '#13301a',
    name: 'background_color_13301a.png',
    bgImage: '/images/background_color_13301a.png'
  },
  {
    color: '#185945',
    name: 'background_color_185945.png',
    bgImage: '/images/background_color_185945.png'
  },
  {
    color: '#514e4c',
    name: 'background_color_514e4c.png',
    bgImage: '/images/background_color_514e4c.png'
  },
  {
    color: '#5c636d',
    name: 'background_color_5c636d.png',
    bgImage: '/images/background_color_5c636d.png'
  },
  {
    color: '#51748e',
    name: 'background_color_51748e.png',
    bgImage: '/images/background_color_51748e.png'
  },
  {
    color: '#c99797',
    name: 'background_color_c99797.png',
    bgImage: '/images/background_color_c99797.png'
  },
  {
    color: '#9e9893',
    name: 'background_color_9e9893.png',
    bgImage: '/images/background_color_9e9893.png'
  },
  {
    color: '#86aeb7',
    name: 'background_color_86aeb7.png',
    bgImage: '/images/background_color_86aeb7.png'
  }
]

export const SECTION_MIN_X = -3000
export const SECTION_MIN_Y = -3000
export const SECTION_MAX_X = 6000
export const SECTION_MAX_Y = 6000
export const SECTION_MIN_WIDTH = 40
export const SECTION_MIN_HEIGHT = 40
export const SECTION_MAX_WIDTH = 6000
export const SECTION_MAX_HEIGHT = 6000
export const Const_Orientation = {
  Landscape: 0,
  Portrait: 1,
  Landscape_flipped: 2,
  Portrait_flipped: 3
}

export const Const_Playlist_Layout = {
  Grid: 0,
  Flexible: 1,
  MyTemplates: 2
}
export const Const_Playlist_Kiosk_Mode = {
  Default: 'default',
  Kiosk: 'kiosk'
}

export const virtualTemplatesLandscape = []
export const virtualTemplatesPortrait = []
export const defTemplatePortrait = [
  {
    _Row: 1,
    _Column: 1,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 1',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 2,
    _Column: 1,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 2',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 1,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 3',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 1,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 4',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 1,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 5',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 6',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 4,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 4,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 4,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 7',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 2,
        _Height: 4,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 8',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 5,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 5,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 5,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 9',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 2,
        _Height: 5,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 10',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 4,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 3,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 1,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 3,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 11',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 3,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 3,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 12',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 2,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 3,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 3,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 13',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 14',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 4,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 4,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 5,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 4,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 5,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 6,
    _Column: 2,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 15',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 2,
        _Height: 4,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 3,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 16',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 3,
        _Width: 2,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 3,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 17',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 2,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Portrait,
    _Layout: 'Portrait 18',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 6,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 7,
        _Z: 0,
        Content: {}
      }
    ]
  }
]
export const defTemplateLandscape = [
  {
    _Row: 1,
    _Column: 1,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 1',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 1,
    _Column: 2,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 2',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 1,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 3',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 1,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 4',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 2,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 2,
    _Column: 1,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 5',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 1,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 6',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 2,
    _Column: 6,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 7',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 5,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 8',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 4,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 9',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 4,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 10',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 2,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 11',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 2,
    _Column: 2,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 12',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 13',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 4,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 14',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 4,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 2,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 15',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 16',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 3,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 1,
        _Width: 1,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 17',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 2,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 2,
        _Height: 2,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 18',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 6,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 7,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 4,
    _Column: 4,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 19',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 3,
        _Height: 3,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 3,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 6,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 3,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 7,
        _Z: 0,
        Content: {}
      }
    ]
  },
  {
    _Row: 3,
    _Column: 3,
    _Orientation: Const_Orientation.Landscape,
    _Layout: 'Landscape 20',
    _BackgroundMusic: '',
    _BackgroundMusicUrl: '',
    _BackgroundImage: '',
    _Description: '',
    _BackgroundMusicSize: '0',
    _BgMusicApplyToAll: 'false',
    _FreeDesignerMode: 'false',
    _AudioSource: '',
    Section: [
      {
        _X: 0,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 0,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 1,
        _Z: 0,
        Content: {}
      },
      {
        _X: 0,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 2,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 3,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 4,
        _Z: 0,
        Content: {}
      },
      {
        _X: 1,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 5,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 0,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 6,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 1,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 7,
        _Z: 0,
        Content: {}
      },
      {
        _X: 2,
        _Y: 2,
        _Width: 1,
        _Height: 1,
        _ContentType: '',
        _SectionValid: '1',
        _Index: 8,
        _Z: 0,
        Content: {}
      }
    ]
  }
]

// export const Orientation = [
//   {
//     angle: '0',
//     text: intlMessages.landscape,
//     value: Const_Orientation.Landscape
//   },
//   {
//     angle: '270',
//     text: intlMessages.portrait,
//     value: Const_Orientation.Portrait
//   }
// ]
// export const PlaylistOrientation = [
//   {
//     angle: '0',
//     text: intlMessages.landscape,
//     value: Const_Orientation.Landscape
//   },
//   {
//     angle: '270',
//     text: intlMessages.portrait,
//     value: Const_Orientation.Portrait
//   },
//   {
//     angle: '180',
//     text: intlMessages.landscapeFlipped,
//     value: Const_Orientation.Landscape_flipped
//   },
//   {
//     angle: '90',
//     text: intlMessages.portraitFlipped,
//     value: Const_Orientation.Portrait_flipped
//   }
// ]
// export const OrientationLandscape = [
//   {
//     angle: '0',
//     text: intlMessages.landscape,
//     value: Const_Orientation.Landscape
//   },
//   {
//     angle: '180',
//     text: intlMessages.landscapeFlipped,
//     value: Const_Orientation.Landscape_flipped
//   }
// ]
// export const OrientationPortrait = [
//   {
//     angle: '270',
//     text: intlMessages.portrait,
//     value: Const_Orientation.Portrait
//   },
//   {
//     angle: '90',
//     text: intlMessages.portraitFlipped,
//     value: Const_Orientation.Portrait_flipped
//   }
// ]
// export const Playlist_Layout = [
//   { value: Const_Playlist_Layout.Grid, text: intlMessages.grid },
//   { value: Const_Playlist_Layout.Flexible, text: intlMessages.visualDesigns }
// ]

// export function getWeatherIconSet(_theme_type) {
//   let weather_img_final = weather_img_classic
//   switch (_theme_type) {
//     case Const_Weather_theme_type.Classic.value:
//       weather_img_final = weather_img_classic
//       break
//     case Const_Weather_theme_type.Contemporary.value:
//       weather_img_final = weather_img
//       break
//   }
//   return weather_img_final
// }
// export function getWeatherBG(
//   type = Const_Weather_theme_type.Classic.value,
//   main_area_style,
//   Weather_theme = Const_Weather_theme_style.Square.value,
//   Forecast_Day,
//   withoutCloud
// ) {
//   if (type == Const_Weather_theme_type.Contemporary.value) {
//     let wBG = '/images/weather_BG_square_1_days.png'
//     switch (Weather_theme) {
//       case Const_Weather_theme_style.Square.value:
//         wBG = `/images/weather_BG_square${Forecast_Day == 1 ? '' : '_5_days'}${withoutCloud ? '_withoutCloud' : ''
//           }.png`
//         break
//       case Const_Weather_theme_style.Rectangle_Horizontal.value:
//         wBG = `/images/weather_BG_horizontal${Forecast_Day == 1 ? '' : '_5_days'
//           }${withoutCloud ? '_withoutCloud' : ''}.png`
//         break
//       case Const_Weather_theme_style.Rectangle_Vertical.value:
//         wBG = `/images/weather_BG_vertical${Forecast_Day == 1 ? '' : '_3_days'
//           }${withoutCloud ? '_withoutCloud' : ''}.png`
//         break
//     }
//     return wBG
//   }
//   let wBG = '/images/weather_square_bg_blue.png'
//   switch (main_area_style) {
//     case '0':
//     case 0:
//       wBG = `/images/weather_square_bg_blue${Forecast_Day == 1 ? '_one' : ''
//         }.png`
//       break
//     case '1':
//     case 1:
//       wBG = `/images/weather_square_bg_white${Forecast_Day == 1 ? '_one' : ''
//         }.png`
//       break
//     case '2':
//     case 2:
//       wBG = `/images/weather_square_bg${Forecast_Day == 1 ? '_one' : ''}.png`
//       break
//     case '3':
//     case 3:
//       wBG = '/images/transparent_dot.png'
//       break
//   }
//   return wBG
// }

import { defineStore } from 'pinia'
import { useWidgetListStore } from './widget'
import { uid, extend } from 'quasar'
const widgetStore = useWidgetListStore()

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    NovoDS: {
      _Description: '',
      _MagicIndex: '1',
      _Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      _Version: '1.1',
      _Playlist_Name: '',
      _Playlist_UUID: '',
      _Model_Type: '',
      _Rs232: {
        _baudRate: '',
        _dataBits: '',
        _stopBits: '',
        _parity: '',
        _flowControl: '',
        _rs232_type: 'hex'
      },
      Hardware: {
        GPIOSettings: {
          GPIO: [
            {
              _gpio_number: 1,
              _name: 'GPIO1',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 2,
              _name: 'GPIO2',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 3,
              _name: 'GPIO3',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 4,
              _name: 'GPIO4',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 5,
              _name: 'GPIO5',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 6,
              _name: 'GPIO6',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            }
          ]
        },
        Rs232Settings: {
          Rs232: [
            {
              _id: 1,
              _dataBits: 8,
              _flowControl: 'None',
              _stopBits: 1,
              _baudRate: 9600,
              _parity: 'None',
              _rs232_type: 'string',
              _interface: 'on_board',
              _isEnabled: true
            },
            {
              _id: 2,
              _dataBits: 8,
              _flowControl: 'None',
              _stopBits: 1,
              _baudRate: 9600,
              _parity: 'None',
              _rs232_type: 'hex',
              _interface: 'usb',
              _isEnabled: false
            }
          ]
        },
        TcpIpSettings: {
          _local_port: 1234,
          _isEnabled: false,
          TcpIp: [
            {
              _id: 1,
              _destination_ip: '192.168.1.1',
              _destination_port: 1234,
              _name: 'TCP Output1'
            },
            {
              _id: 2,
              _destination_ip: '192.168.1.1',
              _destination_port: 2223,
              _name: 'TCP Output2'
            },
            {
              _id: 3,
              _destination_ip: '192.168.1.1',
              _destination_port: 4456,
              _name: 'TCP Output3'
            }
          ]
        }
      },
      Pages: {
        Page: {
          _Layout: '',
          _Column: '',
          _Row: '',
          _Orientation: '', // 0 -> Landscape 1-> Portrait 2-> Landscape (flipped), 3-> Portrait(flipped)
          _FreeDesignerMode: 'false', // Grid -> false, Flexi -> true
          _ID: 'Page 1',
          _Description: '',
          _SerialNumber: '', // 流水號 Page 1, Page 2 …沒用到
          _AudioSource: '',
          _BackgroundImageSize: '',
          _BackgroundImage: '_BackgroundImage',
          _BgMusicApplyToAll: '',
          _BackgroundMusicUrl: '',
          _BackgroundMusicSize: '',
          _Script: '',
          _BackgroundMusic: '',
          Section: []
        }
      },
      Timeline: {
        _Looping: 'true',
        Item: {
          _Page: 'Page 1',
          _Duration: '1800'
        }
      }
    },
    SectionData: {
      _Index: '',
      _X: '',
      _Y: '',
      _Z: '',
      _Height: '',
      _Width: '',
      _is169: '',
      _SectionValid: '1',
      _isFixedRatio: '',
      _Script: '',
      _ContentType: '',
      Content: {
        _scaleType: '', // (View Type: Default), Stretch to fill region -> FIT_XY, Fit region -> FIT_CENTER, Scale to fill region -> CENTER_CROP
        _showType: '', // Default, Ken Burns Effect, Card Flip, Zoom In, Fade In, Fly In, Float In, Fly Out, Rotate
        _Live_Update_Frequency: '',
        _MuteVideo: '',
        _Live_Update_type: '',
        _Live_Update_type_storage: '',
        _Live_Update_userName: '',
        _Live_Update_path: '',
        _Live_Update_ID: '',
        _Detect_Picture_Orientation: 'false',
        _FloatIn_Direction: '',
        _isVideoFillArea: '',
        _Live_Update_Access_Way: '',
        _Live_Update_password: '',
        _duration: '',
        _Live_Update_port: '',
        _Live_Update_Show_Status: '',
        AttachmentFiles: [],
        MediaItem: [],
        State: []
      }
    },
    StateData: [
      {
        _id: uid(),
        _title: '',
        File: [],
        Event: []
      }
    ],
    layout: {
      rowCount: 1,
      colCount: 2,
      layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }]
    },
    gpioRoleOption: [
      {
        title: 'Output',
        value: 'output',
        children: [
          {
            text: '0',
            value: '0'
          },
          {
            text: '1',
            value: '1'
          }
        ]
      },
      {
        title: 'Key event',
        value: 'keyevent',
        children: [
          {
            text: 'Up',
            value: 'up'
          },
          {
            text: 'Down',
            value: 'down'
          }
        ]
      }
    ],
    currentSection: 0
  }
  ),
  getters: {
    GetCurrentSection() {
      return this.currentSection
    }
  },
  actions: {
    SetLayout(layout) {
      const defaultData = layout.layout.map((e, Index) => ({
        x: e.x,
        y: e.y,
        w: e.w,
        h: e.h,
        i: Index
      }))
      this.layout = layout
      this.layout.layout = defaultData
      this.SetWidgetList()
    },
    SetWidgetList() {
      const Data = this.layout.layout
      // Section
      const Section = Data.map((e, i) => ({
        _Index: e.i,
        _X: e.x,
        _Y: e.y,
        _Z: 0,
        _Height: e.h,
        _Width: e.w,
        _is169: '',
        _SectionValid: 1,
        _isFixedRatio: '',
        _Script: '',
        _ContentType: '',
        Content: {
          _scaleType: '', // (View Type: Default), Stretch to fill region -> FIT_XY, Fit region -> FIT_CENTER, Scale to fill region -> CENTER_CROP
          _showType: '', // Default, Ken Burns Effect, Card Flip, Zoom In, Fade In, Fly In, Float In, Fly Out, Rotate
          _Live_Update_Frequency: '',
          _MuteVideo: '',
          _Live_Update_type: '',
          _Live_Update_type_storage: '',
          _Live_Update_userName: '',
          _Live_Update_path: '',
          _Live_Update_ID: '',
          _Detect_Picture_Orientation: 'false',
          _FloatIn_Direction: '',
          _isVideoFillArea: '',
          _Live_Update_Access_Way: '',
          _Live_Update_password: '',
          _duration: '',
          _Live_Update_port: '',
          _Live_Update_Show_Status: '',
          AttachmentFiles: [],
          MediaItem: [],
          State: [
            {
              _id: uid(),
              _title: '',
              File: [],
              Event: []
            }
          ]
        }
      }))
      console.log('Section', Section)
      widgetStore.SetWidgetListData(Section)
    },
    SetCurrentSection(i) {
      console.log('currentSection', i)
      this.currentSection = i
    },
    WriteToXml() {
      const NovoDSData = extend(true, {}, this.NovoDS)
      window.myAPI.storeToXML({ NovoDS: NovoDSData })
    }
  }
})

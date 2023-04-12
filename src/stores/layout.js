import { defineStore } from 'pinia'
import { useWidgetListStore } from './widget'
const widgetStore = useWidgetListStore()

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    NovoDS: {
      Description: '',
      MagicIndex: '1',
      Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      Version: '1.1',
      Playlist_UUID: '',
      Model_Type: '',
      Rs232: {
        baudRate: '',
        dataBits: '',
        stopBits: '',
        parity: '',
        flowControl: '',
        rs232_type: 'hex'
      },
      Pages: {
        Page: {
          Layout: '',
          Column: '',
          Row: '',
          Orientation: '', // 0 -> Landscape 1-> Portrait 2-> Landscape (flipped), 3-> Portrait(flipped)
          FreeDesignerMode: 'false', // Grid -> false, Flexi -> true
          ID: 'Page 1',
          Description: '',
          SerialNumber: '', // 流水號 Page 1, Page 2 …沒用到
          AudioSource: '',
          BackgroundImageSize: '',
          BackgroundImage: '',
          BgMusicApplyToAll: '',
          BackgroundMusicUrl: '',
          BackgroundMusicSize: '',
          Script: '',
          BackgroundMusic: '',
          Section: null
        }
      },
      Timeline: {
        Looping: 'true',
        Item: {
          Page: 'Page 1',
          Duration: '1800'
        }
      }
    },
    SectionData: {
      Index: '',
      X: '',
      Y: '',
      Z: '',
      Height: '',
      Width: '',
      is169: '',
      SectionValid: '1',
      isFixedRatio: '',
      Script: '',
      ContentType: '',
      Content: {
        scaleType: '', // (View Type: Default), Stretch to fill region -> FIT_XY, Fit region -> FIT_CENTER, Scale to fill region -> CENTER_CROP
        showType: '', // Default, Ken Burns Effect, Card Flip, Zoom In, Fade In, Fly In, Float In, Fly Out, Rotate
        Live_Update_Frequency: '',
        MuteVideo: '',
        Live_Update_type: '',
        Live_Update_type_storage: '',
        Live_Update_userName: '',
        Live_Update_path: '',
        Live_Update_ID: '',
        Detect_Picture_Orientation: '',
        FloatIn_Direction: '',
        isVideoFillArea: '',
        Live_Update_Access_Way: '',
        Live_Update_password: '',
        duration: '',
        Live_Update_port: '',
        Live_Update_Show_Status: '',
        AttachmentFiles: null,
        MediaItem: null,
        State: null
      }
    },
    StateData: [
      {
        id: '',
        File: null,
        Event: null
      }
    ],
    layout: {
      rowCount: 1,
      colCount: 2,
      layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }]
    },
    currentSection: 0
  }),
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
        Index: e.i,
        X: e.x,
        Y: e.y,
        Z: 0,
        Height: e.h,
        Width: e.w,
        is169: '',
        SectionValid: 1,
        isFixedRatio: '',
        Script: '',
        ContentType: '',
        Content: {
          scaleType: '', // (View Type: Default), Stretch to fill region -> FIT_XY, Fit region -> FIT_CENTER, Scale to fill region -> CENTER_CROP
          showType: '', // Default, Ken Burns Effect, Card Flip, Zoom In, Fade In, Fly In, Float In, Fly Out, Rotate
          Live_Update_Frequency: '',
          MuteVideo: '',
          Live_Update_type: '',
          Live_Update_type_storage: '',
          Live_Update_userName: '',
          Live_Update_path: '',
          Live_Update_ID: '',
          Detect_Picture_Orientation: '',
          FloatIn_Direction: '',
          isVideoFillArea: '',
          Live_Update_Access_Way: '',
          Live_Update_password: '',
          duration: '',
          Live_Update_port: '',
          Live_Update_Show_Status: '',
          AttachmentFiles: {
            File: null
          },
          MediaItem: null,
          State: [
            {
              id: 0,
              File: null,
              Event: null
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
    }
  }
})

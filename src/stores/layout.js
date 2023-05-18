import { defineStore } from 'pinia'
import { useWidgetListStore } from './widget'
import { uid } from 'quasar'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: {
      rowCount: '',
      colCount: '',
      layout: []
    },
    currentSection: 0
  }
  ),
  getters: {
    GetCurrentSection() {
      return this.currentSection
    }
  },
  actions: {
    SetLayout(chooseLayout, layout) {
      const widgetStore = useWidgetListStore()
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
      widgetStore.SetRowCol(chooseLayout, layout)
    },
    SetWidgetList() {
      const widgetStore = useWidgetListStore()
      const Data = this.layout.layout
      // Section
      const Section = Data.map((e, i) => ({
        _ID: i++,
        _uuid: uid(),
        _Index: e.i,
        _X: e.x,
        _Y: e.y,
        _Z: 0,
        _Height: e.h,
        _Width: e.w,
        _isFixedRatio: 'false',
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
          _isVideoFillArea: 'false',
          _Live_Update_Access_Way: '',
          _Live_Update_password: '',
          _duration: '10',
          _Live_Update_port: '',
          _Live_Update_Show_Status: '',
          AttachmentFiles: [],
          MediaItem: [],
          State: [
            {
              _id: i++,
              _uuid: uid(),
              _name: '',
              File: [],
              Event: []
            }
          ]
        }
      }))
      widgetStore.SetWidgetListData(Section)
    },
    SetCurrentSection(i) {
      this.currentSection = i
    }
  }
})

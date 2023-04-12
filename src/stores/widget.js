import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
import { uid } from 'quasar'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    widgetOption: [
      {
        label: 'TEXT',
        value: 'TEXT',
        icon: 'img:/icon/text.png'
      },
      {
        label: 'MEDIA',
        value: 'MEDIA',
        icon: 'img:/icon/media.png'
      },
      {
        label: 'TWITTER',
        value: 'TWITTER',
        icon: 'img:/icon/twitter.png'
      },
      {
        label: 'WEBPAGE',
        value: 'WEBPAGE',
        icon: 'img:/icon/webpage.png'
      }
    ],
    widgetListData: [
      {
        Index: 0,
        X: 0,
        Y: 0,
        Z: 0,
        Height: '',
        Width: '',
        is169: '',
        SectionValid: 1,
        isFixedRatio: '',
        Script: '',
        ContentType: '',
        Content: {
          scaleType: '',
          showType: '',
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
      },
      {
        Index: 1,
        X: 0,
        Y: 0,
        Z: 0,
        Height: '',
        Width: '',
        is169: '',
        SectionValid: 1,
        isFixedRatio: '',
        Script: '',
        ContentType: '',
        Content: {
          scaleType: '',
          showType: '',
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
      }
    ],
    currentState: 0,
    currentWidget: {}
  }),
  getters: {
    GetWidgetListData() {
      return this.widgetListData
    },
    GetCurrentStateLength() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      return this.widgetListData[currentSection].Content.State.length
    }
  },
  actions: {
    // Section
    SetWidgetListData(data) {
      if (data) {
        this.widgetListData = data
      }
    },
    SetWidget(Index, ContentType) {
      this.widgetListData[Index].ContentType = ContentType
    },
    AddState() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State.push({
        id: uid(),
        File: null,
        Event: null
      })
    },
    DelState(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e.id !== ID)
      this.widgetListData[currentSection].Content.State = Data
    }
  }
})

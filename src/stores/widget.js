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
              id: uid(),
              title: '',
              File: [],
              Event: []
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
              id: uid(),
              title: 'State',
              File: [],
              Event: []
            }
          ]
        }
      }
    ],
    StateData: {
      id: '',
      title: 'State',
      File: [],
      Event: []
    },
    EventData: {
      type: '',
      gpio_number: '',
      next_state_id: '',
      Action: []
    },
    currentState: 0,
    currentWidget: {}
  }),
  getters: {
    GetWidgetListData() {
      return this.widgetListData
    },
    GetCurrentState() {
      return this.currentState
    },
    GetCurrentStateLength() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      return this.widgetListData[currentSection].Content.State.length
    },
    GetCurrentStateOptions() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const oData = this.widgetListData[currentSection].Content.State.map((e, i) => {
        if (e.title === '') {
          return {
            id: e.id,
            stateIndex: i,
            title: 'State' + ' ' + (i + 1)
          }
        } else {
          return {
            id: e.id,
            stateIndex: i,
            title: e.title
          }
        }
      })
      return oData
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
    SetCurrentState(Index) {
      this.currentState = Index
    },
    AddState() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const arr = this.widgetListData[currentSection].Content.State
      let getLastNumber = Math.max(...arr.map(p => p.id))
      if (getLastNumber === 0) {
        getLastNumber = 1
      }
      this.widgetListData[currentSection].Content.State.push({
        id: uid(),
        File: [],
        Event: [],
        title: ''
      })
    },
    AddStateEvent(Index) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State[Index].Event.push({
        id: uid(),
        type: '',
        gpio_number: '',
        next_state_id: '',
        Action: []
      })
    },
    SetFlowState(Index, EventIndex, currentStateData) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State[Index].Event[EventIndex] = {
        ...this.EventData,
        id: currentStateData.id,
        next_state_id: currentStateData.stateIndex,
        title: currentStateData.title
      }
    },
    DelState(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e.id !== ID)
      this.widgetListData[currentSection].Content.State = Data
    },
    DelStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[Index].Event.filter((e, i) => i !== EventIndex)
      this.widgetListData[currentSection].Content.State[Index].Event = Data
    }
  }
})

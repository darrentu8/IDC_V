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
        _Index: 0,
        _X: 0,
        _Y: 0,
        _Z: 0,
        _Height: '',
        _Width: '',
        _is169: '',
        _SectionValid: 1,
        _isFixedRatio: '',
        _Script: '',
        _ContentType: '',
        Content: {
          _scaleType: '',
          _showType: '',
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
          AttachmentFiles: {
            File: null
          },
          MediaItem: null,
          State: [
            {
              _id: uid(),
              _title: '',
              File: [],
              Event: []
            }
          ]
        }
      }
    ],
    StateData: {
      _id: '',
      _title: 'State',
      File: [],
      Event: []
    },
    EventData: {
      _type: '',
      _gpio_number: '',
      _next_state_id: '',
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
        if (e._title === '') {
          return {
            _id: e.id,
            _stateIndex: i,
            _title: 'State' + ' ' + (i + 1)
          }
        } else {
          return {
            _id: e.id,
            _stateIndex: i,
            _title: e.title
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
      let getLastNumber = Math.max(...arr.map(p => p._id))
      if (getLastNumber === 0) {
        getLastNumber = 1
      }
      this.widgetListData[currentSection].Content.State.push({
        _id: uid(),
        File: [],
        Event: [],
        _title: ''
      })
    },
    AddStateEvent(Index) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State[Index].Event.push({
        _id: uid(),
        _type: '',
        _gpio_number: '',
        _next_state_id: '',
        Action: []
      })
    },
    SetFlowState(Index, EventIndex, currentStateData) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State[Index].Event[EventIndex] = {
        ...this.EventData,
        _id: currentStateData.id,
        _next_state_id: currentStateData.stateIndex,
        _title: currentStateData.title
      }
    },
    DelState(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e._id !== ID)
      this.widgetListData[currentSection].Content.State = Data
    },
    DelFlow(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e._id !== ID)
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

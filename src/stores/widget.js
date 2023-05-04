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
    ActionData: {
      _type: '',
      _gpio_number: '',
      _next_state_id: '',
      _rs232_id: '',
      _tcpip_id: '',
      _role: '',
      _output_value: ''
    },
    currentState: 0,
    currentWidget: {},
    eventActionData: []
  }),
  getters: {
    GetWidgetListData() {
      return this.widgetListData
    },
    GetEventActionData() {
      return this.eventActionData
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
            _id: e._id,
            _stateIndex: i,
            _title: 'State' + ' ' + (i + 1)
          }
        } else {
          return {
            _id: e._id,
            _stateIndex: i,
            _title: e._title
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
      this.widgetListData[Index]._ContentType = ContentType
    },
    SetCurrentState(Index) {
      this.currentState = Index
    },
    SetFlowState(Index, EventId, currentStateData) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.widgetListData[currentSection].Content.State[Index].Event.findIndex((event) => {
        return event._id === EventId
      })
      if (eventIndex !== -1) {
        this.widgetListData[currentSection].Content.State[Index].Event[eventIndex] = {
          ...this.EventData,
          _id: this.widgetListData[currentSection].Content.State[Index].Event[eventIndex]._id,
          _stateId: currentStateData._id,
          _next_state_id: currentStateData._stateIndex
        }
      }
    },
    SetCurrentEventData(stateIndex, eventId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[stateIndex].Event.filter(e => e._id === eventId)
      this.eventActionData = Data
      console.log('eventActionData', Data)
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
      console.log('this.widgetListData[currentSection].Content', this.widgetListData[currentSection].Content)
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
    AddStateEventSame(currentState) {
      const id = this.eventActionData[0]._next_state_id
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.eventActionData.push({
        _id: uid(),
        _type: '',
        _gpio_number: '',
        _next_state_id: id,
        Action: []
      })
      this.widgetListData[currentSection].Content.State[currentState].Event = this.eventActionData
    },
    AddAction(EventId, EventIndex) {
      console.log('EventId', EventId)
      console.log('EventIndex', EventIndex)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.widgetListData[currentSection].Content.State[this.currentState].Event[EventIndex].Action.push({
        _id: uid(),
        _type: '',
        _gpio_number: '',
        _next_state_id: '',
        _rs232_id: '',
        _tcpip_id: '',
        _role: '',
        _output_value: ''
      })
    },
    AddSourceList(currentStateIndex, fileDatas) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      console.log('fileDatas', fileDatas)
      // Filter out files that already exist in the MediaItem array
      const newContentArray = fileDatas.filter((e) => {
        const existingFile = this.widgetListData[currentSection].Content.MediaItem.find((item) => item._src === e._src)
        return !existingFile
      }).map((e) => ({
        _note: '',
        _type: e._type,
        _duration: e._duration,
        _videoDuration: '0',
        _fileSize: e._fileSize,
        _src: e._src,
        _targetPath: e._targetPath
      }))

      // Filter out files that already exist in the File array
      const newFileArray = fileDatas.filter((e) => {
        const existingFile = this.widgetListData[currentSection].Content.State[currentStateIndex].File.find((item) => item._src === e._src)
        return !existingFile
      }).map((e) => ({
        _src: e._src,
        _type: e._type,
        _duration: e._duration,
        _videoDuration: '0',
        _fileSize: e._fileSize,
        _targetPath: e._targetPath
      }))

      // Concatenate the new content and file arrays with the existing ones
      this.widgetListData[currentSection].Content.MediaItem = this.widgetListData[currentSection].Content.MediaItem.concat(newContentArray)
      this.widgetListData[currentSection].Content.State[currentStateIndex].File = this.widgetListData[currentSection].Content.State[currentStateIndex].File.concat(newFileArray)

      console.log('this.widgetListData[currentSection].Content', this.widgetListData[currentSection].Content)
    },
    DelSourceList(currentStateIndex, fileName, sourceFile) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      console.log('fileName', fileName)
      console.log('sourceFile', sourceFile)
      console.log('currentStateIndex', currentStateIndex)

      // Remove file from State File array
      const filteredStateFileArray = this.widgetListData[currentSection].Content.State[currentStateIndex].File.filter(e => e._src !== fileName)
      this.widgetListData[currentSection].Content.State[currentStateIndex].File = filteredStateFileArray

      let existingFileInState = false

      for (let i = 0; i < this.widgetListData[currentSection].Content.State.length; i++) {
        const existingFile = this.widgetListData[currentSection].Content.State[i].File.find((item) => item._src === fileName)
        if (existingFile) {
          existingFileInState = true
          break
        }
      }

      if (!existingFileInState) {
        // Remove file from MediaItem array
        const filteredMediaItemArray = this.widgetListData[currentSection].Content.MediaItem.filter(e => e._src !== fileName)
        this.widgetListData[currentSection].Content.MediaItem = filteredMediaItemArray
        // Remove file from folder
        window.myAPI.deleteFile(sourceFile)
        existingFileInState = false
      }
    },
    CheckDelStateObj(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e._id !== ID)
      this.widgetListData[currentSection].Content.State = Data
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
      const Data = this.widgetListData[currentSection].Content.State[Index].Event.filter(e => e._id !== ID)
      this.widgetListData[currentSection].Content.State[Index].Event = Data
    },
    DelAction(EventIndex, ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[this.currentState].Event[EventIndex].Action.filter((e) => e._id !== ID)
      this.widgetListData[currentSection].Content.State[this.currentState].Event[EventIndex].Action = Data
    }
  }
})

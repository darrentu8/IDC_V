import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
import { useEventListStore } from './event'
import { uid } from 'quasar'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    widgetOption: [
      {
        label: 'MEDIA',
        value: 'GPIO_Media',
        icon: 'img:/icon/photograph.svg',
        disable: false
      }
      // {
      //   label: 'TEXT',
      //   value: 'TEXT',
      //   icon: 'img:/icon/text.png',
      // disable: false
      // },
      // {
      //   label: 'TWITTER',
      //   value: 'TWITTER',
      //   icon: 'img:/icon/twitter.png',
      // disable: false
      // },
      // {
      //   label: 'WEBPAGE',
      //   value: 'WEBPAGE',
      //   icon: 'img:/icon/webpage.png',
      // disable: false
      // }
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
          _isVideoFillArea: 'false',
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
    currentStateId: '',
    currentWidget: {},
    stateEventData: [],
    loading: false
  }),
  getters: {
    GetLoading() {
      return this.loading
    },
    GetWidgetListData() {
      return this.widgetListData
    },
    GetStateEventData() {
      return this.stateEventData
    },
    GetCurrentState() {
      return this.currentState
    },
    GetCurrentStateId() {
      return this.currentStateId
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
    ResetWidgetListData() {
      console.log('ResetWidgetListData')
      const eventStore = useEventListStore()
      this.stateEventData = []
      console.log('this.stateEventData', this.stateEventData)
      this.currentStateId = ''
      eventStore.SetCurrentEvent('')
    },
    // Section
    SetWidgetListData(data) {
      if (data) {
        this.widgetListData = data
      }
    },
    SetLoading(val) {
      this.loading = val
      console.log('this.loading', this.loading)
    },
    SetWidget(Index, ContentType) {
      this.widgetListData[Index]._ContentType = ContentType
    },
    SetCurrentState(Index) {
      this.currentState = Index
    },
    SetCurrentStateId(ID) {
      this.currentStateId = ID
    },
    SetFlowState(Index, EventId, currentStateData) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.widgetListData[currentSection].Content.State[Index].Event.findIndex((event) => {
        return event._id === EventId
      })
      if (eventIndex !== -1) {
        this.widgetListData[currentSection].Content.State[Index].Event[eventIndex] = {
          Action: [],
          _type: '',
          _gpio_number: '',
          _id: this.widgetListData[currentSection].Content.State[Index].Event[eventIndex]._id,
          _stateId: currentStateData._id,
          _next_state_id: currentStateData._stateIndex
        }
      }
    },
    SetCurrentEventData(stateIndex, stateId, eventId) {
      console.log('stateId', stateId)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[stateIndex].Event.filter(e => e._stateId === stateId)
      this.stateEventData = Data
      console.log('stateEventData', Data)
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
      const id = this.stateEventData[0]._next_state_id
      const stateId = this.stateEventData[0]._stateId
      console.log('id', id)
      console.log('stateId', stateId)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const pushData = {
        _id: uid(),
        _type: '',
        _gpio_number: '',
        _stateId: stateId,
        _next_state_id: id,
        Action: []
      }
      this.stateEventData.push(pushData)
      this.widgetListData[currentSection].Content.State[currentState].Event.push(pushData)
    },
    AddAction(EventId) {
      console.log('EventId', EventId)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.widgetListData[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        this.widgetListData[currentSection].Content.State[this.currentState].Event[eventIndex].Action.push({
          _id: uid(),
          _type: '',
          _gpio_number: '',
          _next_state_id: '',
          _rs232_id: '',
          _tcpip_id: '',
          _role: '',
          _output_value: ''
        })
      } else {
        console.error(`Could not find an event with id ${EventId}`)
      }
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
      // 刪除 ID 對應的物件
      this.widgetListData[currentSection].Content.State = this.widgetListData[currentSection].Content.State.filter((state) => state._id !== ID)

      // 過濾掉 Event 的 _stateId 與 ID 相同的物件
      this.widgetListData[currentSection].Content.State.forEach((state) => {
        if (state.Event && state.Event.length > 0) {
          const events = state.Event.filter((event) => event._stateId !== ID)
          state.Event = events
        }
      })
      this.ResetWidgetListData()
    },
    DelFlow(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State.filter(e => e._id !== ID)
      this.widgetListData[currentSection].Content.State = Data
    },
    DelAllStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[Index].Event.filter(e => e._stateId !== ID)
      this.widgetListData[currentSection].Content.State[Index].Event = Data
      this.ResetWidgetListData()
    },
    DelStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.widgetListData[currentSection].Content.State[Index].Event.filter(e => e._id !== ID)
      this.widgetListData[currentSection].Content.State[Index].Event = Data
    },
    DelEvent(EventId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.widgetListData[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        this.widgetListData[currentSection].Content.State[this.currentState].Event.splice(eventIndex, 1)
        const Data = this.stateEventData.filter(event => event._id !== EventId)
        this.stateEventData = Data
        if (!this.stateEventData.length) {
          this.ResetWidgetListData()
        }
      } else {
        console.error(`Could not find an event with id ${EventId}`)
      }
    },
    DelAction(EventId, ActionId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.widgetListData[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        const actionIndex = this.widgetListData[currentSection].Content.State[this.currentState].Event[eventIndex].Action.findIndex(action => action._id === ActionId)
        if (actionIndex !== -1) { // If the action with specified id was found
          this.widgetListData[currentSection].Content.State[this.currentState].Event[eventIndex].Action.splice(actionIndex, 1) // Remove the action from the array
        } else {
          console.error(`Could not find an action with id ${ActionId} in event with id ${EventId}`)
        }
      } else {
        console.error(`Could not find an event with id ${EventId}`)
      }
    }
  }
})

import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
import { useEventListStore } from './event'
import { uid } from 'quasar'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    nowPlayListName: '',
    nowPlayListFolder: '',
    NovoDS: {
      _Description: '',
      _Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      _Playlist_Name: '',
      _Playlist_UUID: '',
      _Model_Type: 'DS310',
      _Interactive: true,
      Hardware: {
        GPIOSettings: {
          GPIO: [
            {
              _gpio_number: 1,
              _uuid: uid(),
              _name: 'GPIO1',
              _isEnabled: true,
              _role: 'keyevent',
              _key_action: 'up'
            },
            {
              _gpio_number: 2,
              _uuid: uid(),
              _name: 'GPIO2',
              _isEnabled: true,
              _role: 'keyevent',
              _key_action: 'down'
            },
            {
              _gpio_number: 3,
              _uuid: uid(),
              _name: 'GPIO3',
              _isEnabled: false,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 4,
              _uuid: uid(),
              _name: 'GPIO4',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 5,
              _uuid: uid(),
              _name: 'GPIO5',
              _isEnabled: true,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 6,
              _uuid: uid(),
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
              _interface: 'on_board',
              _isEnabled: true,
              Command: [
                {
                  _id: 0,
                  _uuid: uid(),
                  _name: 'Default',
                  _data_type: 'hex',
                  _value: '1A 3B 4D'
                }
              ]
            },
            {
              _id: 2,
              _dataBits: 8,
              _flowControl: 'None',
              _stopBits: 1,
              _baudRate: 9600,
              _parity: 'None',
              _interface: 'usb',
              _isEnabled: true,
              Command: [
                {
                  _id: 0,
                  _uuid: uid(),
                  _name: 'Default',
                  _data_type: 'string',
                  _value: 'ccaaa'
                }
              ]
            }
          ]
        },
        TcpIpSettings: {
          _local_port: 1234,
          _isEnabled: false,
          ReceivedCommands: {
            Command: [
              {
                _id: 11,
                _uuid: uid(),
                _name: 'play video',
                _value: 'play video'
              },
              {
                _id: 12,
                _uuid: uid(),
                _name: 'play image',
                _value: 'play image'
              }
            ]
          },
          TcpIp: [
            {
              _id: 1,
              _destination_ip: '10.136.7.7',
              _destination_port: 1234,
              Command: [
                {
                  _id: 21,
                  _uuid: uid(),
                  _name: 'door open',
                  _value: 'door open'
                },
                {
                  _id: 22,
                  _uuid: uid(),
                  _name: 'door close',
                  _value: 'door close'
                }
              ]
            },
            {
              _id: 2,
              _destination_ip: '10.136.7.7',
              _destination_port: 5678,
              Command: [
                {
                  _id: 23,
                  _uuid: uid(),
                  _name: 'Add 1',
                  _value: '+1'
                },
                {
                  _id: 24,
                  _uuid: uid(),
                  _name: 'Add 2',
                  _value: '+2'
                }
              ]
            }
          ]
        },
        TimerSettings: {
          Timer: [
            {
              _id: 1,
              _uuid: uid(),
              _name: '10 seconds event',
              _duration: '10'
            },
            {
              _id: 2,
              _uuid: uid(),
              _name: '20 seconds event',
              _duration: '20'
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
          _BackgroundImageSize: '0',
          _BackgroundImage: '',
          _BgMusicApplyToAll: '',
          _BackgroundMusicUrl: '',
          _BackgroundMusicSize: '',
          _BackgroundMusic: '',
          Section: [
            {
              _Index: 0,
              _X: 0,
              _Y: 0,
              _Z: 0,
              _Height: '',
              _Width: '',
              _isFixedRatio: '',
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
                    _name: '',
                    File: [],
                    Event: []
                  }
                ]
              }
            }
          ]
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
    widgetOption: [
      {
        label: 'MEDIA',
        value: 'GPIO_Media',
        icon: '~assets/icon/photograph.svg',
        disable: false
      }
      // {
      //   label: 'TEXT',
      //   value: 'TEXT',
      //   icon: '~assets/icon/text.png',
      // disable: false
      // },
      // {
      //   label: 'TWITTER',
      //   value: 'TWITTER',
      //   icon: '~assets/icon/twitter.png',
      // disable: false
      // },
      // {
      //   label: 'WEBPAGE',
      //   value: 'WEBPAGE',
      //   icon: '~assets/icon/webpage.png',
      // disable: false
      // }
    ],
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
            text: 'Low',
            value: 'down'
          },
          {
            text: 'High',
            value: 'up'
          }
        ]
      }
    ],
    StateData: {
      _id: '',
      _name: 'State',
      File: [],
      Event: []
    },
    EventData: {
      _type: '',
      _next_state_id: '',
      Action: []
    },
    ActionData: {
      _type: ''
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
      return this.NovoDS.Pages.Page.Section
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
      return this.NovoDS.Pages.Page.Section[currentSection].Content.State.length
    },
    GetCurrentStateOptions() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      console.log('currentSection', currentSection)
      console.log('this.NovoDS.Pages.Page.Section[currentSection].Content.State', this.NovoDS.Pages.Page.Section[currentSection].Content.State)
      if (currentSection !== null) {
        const oData = this.NovoDS.Pages.Page.Section[currentSection].Content.State.map((e, i) => {
          if (e._name === '') {
            return {
              _id: e._id,
              _stateIndex: i,
              _name: 'State' + ' ' + (i + 1)
            }
          } else {
            return {
              _id: e._id,
              _stateIndex: i,
              _name: e._name
            }
          }
        })
        return oData
      }
    },
    GetCurrentStateSelectedEvent() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      if (currentSection !== null) {
        const events = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event
        const selectedEvents = [].concat(...events).filter(Boolean).map(event => event._conId)
        return selectedEvents
      }

      return []
    },
    GetCurrentStateSelectedAction() {
      const layoutStore = useLayoutStore()
      const eventStore = useEventListStore()
      const currentSection = layoutStore.currentSection
      const curentEventID = eventStore.GetCurrentEventID

      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.findIndex((event) => {
        return event._id === curentEventID
      })

      console.log('eventIndex', eventIndex)
      if (eventIndex !== -1 && currentSection !== null) {
        const actions = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event[eventIndex].Action
        const selectedActions = [].concat(...actions).filter(Boolean).map(action => action._conId)
        console.log('selectedActions', selectedActions)
        return selectedActions
      }

      return []
    }
  },
  actions: {
    // 設置xml產生的單一物件改成陣列
    SetNovoDS(data) {
      const RawData = JSON.parse(JSON.stringify(data))

      if (!RawData.NovoDS) {
        return false
      }
      if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.Rs232Settings && Array.isArray(RawData.NovoDS.Hardware.Rs232Settings.Rs232)) {
        RawData.NovoDS.Hardware.Rs232Settings.Rs232.forEach(rs232 => {
          if (rs232.Command && !Array.isArray(rs232.Command)) {
            rs232.Command = [rs232.Command]
          }
        })
      }
      if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.TcpIpSettings) {
        const tcpip = RawData.NovoDS.Hardware.TcpIpSettings
        if (tcpip.ReceivedCommands && tcpip.ReceivedCommands.Command && !Array.isArray(tcpip.ReceivedCommands.Command)) {
          tcpip.ReceivedCommands.Command = [tcpip.ReceivedCommands.Command]
        }
        if (tcpip.Command && !Array.isArray(tcpip.Command)) {
          tcpip.Command = [tcpip.Command]
        }
      }
      if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.TimerSettings && !Array.isArray(RawData.NovoDS.Hardware.TimerSettings)) {
        RawData.NovoDS.Hardware.TimerSettings = [RawData.NovoDS.Hardware.TimerSettings]
      }

      const sections = RawData.NovoDS.Pages.Page.Section
      if (!Array.isArray(sections)) {
        RawData.NovoDS.Pages.Page.Section = [sections]
      }
      RawData.NovoDS.Pages.Page.Section.forEach(section => {
        const content = section.Content
        if (!content.State) {
          content.State = []
        } else if (!Array.isArray(content.State)) {
          content.State = [content.State]
        }

        content.State.forEach(state => {
          if (state.File && !Array.isArray(state.File)) {
            state.File = [state.File]
          } else if (!state.File) {
            state.File = []
          }
          if (state.Event && !Array.isArray(state.Event)) {
            state.Event = [state.Event]
          } else if (state.Event) {
            state.Event.forEach(event => {
              if (event.Action && !Array.isArray(event.Action)) {
                event.Action = [event.Action]
              } else if (!event.Action) {
                event.Action = []
              }
            })
          } else {
            state.Event = []
          }
        })
      })

      this.NovoDS = this.parseObject(RawData.NovoDS)
      console.log('this.NovoDS', this.NovoDS)

      return true
    },
    parseObject(obj) {
      obj = JSON.parse(JSON.stringify(obj))

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          obj[key] = this.parseObject(obj[key])
        } else if (typeof obj[key] === 'string') {
          try {
            obj[key] = JSON.parse(obj[key])
          } catch (e) {
          }
        }
      })

      return obj
    },
    SetFilePath() {
      const NowPlayListFolder = window.myAPI.setPlayListFolder()
      console.log('NowPlayListFolder', NowPlayListFolder)
      this.nowPlayListName = NowPlayListFolder.newPlayListName
      this.nowPlayListFolder = NowPlayListFolder.PlayListFolder
    },
    // Section
    ResetWidgetListData() {
      console.log('ResetWidgetListData')
      const eventStore = useEventListStore()
      this.stateEventData = []
      console.log('this.stateEventData', this.stateEventData)
      this.currentStateId = ''
      eventStore.SetCurrentEvent('')
    },
    SetRowCol(layoutNumber, data) {
      this.NovoDS.Pages.Page._Row = data.rowCount
      this.NovoDS.Pages.Page._Column = data.colCount
      this.NovoDS.Pages.Page._Layout = layoutNumber
    },
    // Section
    SetWidgetListData(data) {
      if (data) {
        this.NovoDS.Pages.Page.Section = data
      }
    },
    SetLoading(val) {
      this.loading = val
      console.log('this.loading', this.loading)
    },
    SetWidget(Index, ContentType) {
      console.log('Index', Index)
      console.log('ContentType', ContentType)
      this.NovoDS.Pages.Page.Section[Index]._ContentType = ContentType
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
      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.findIndex((event) => {
        return event._id === EventId
      })
      if (eventIndex !== -1) {
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event[eventIndex] = {
          _id: this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event[eventIndex]._id,
          _type: '',
          _conId: '',
          _stateId: currentStateData._id,
          _next_state_id: currentStateData._stateIndex,
          Action: []
        }
      }
    },
    SetCurrentEventData(stateIndex, stateId, eventId) {
      console.log('stateId', stateId)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[stateIndex].Event.filter(e => e._stateId === stateId)
      this.stateEventData = Data
      console.log('stateEventData', Data)
    },
    SetEvent(EventData, _conId) {
      const layoutStore = useLayoutStore()
      const eventStore = useEventListStore()
      const eventOpionData = eventStore.GetEventTypeOptions
      const currentSection = layoutStore.currentSection
      const selectOptionDataIndex = eventOpionData.findIndex(eventOption => eventOption._uuid === _conId)
      const eventArr = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event
      console.log('selectOptionDataIndex', selectOptionDataIndex)
      if (selectOptionDataIndex === undefined) {
        return
      }

      for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i]._id === EventData._id) {
          for (const [key, value] of Object.entries(eventOpionData[selectOptionDataIndex])) { // iterate over key-value pairs in eventOpionData
            if (!['_conId', '_uuid', '_isEnabled', '_name', '_id'].includes(key)) { // check if key is not excluded
              eventArr[i][key] = value // update corresponding value in eventArr
            }
          }
          break
        }
      }
    },
    SetAction(EventIndex, actionData, _conId) {
      const layoutStore = useLayoutStore()
      const eventStore = useEventListStore()
      const actionOptions = eventStore.GetActionTypeOptions
      const currentSection = layoutStore.currentSection
      const selectOptionDataIndex = actionOptions.findIndex(actionOption => actionOption._uuid === _conId)
      const actionArr = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event[EventIndex].Action
      console.log('EventIndex', EventIndex)
      console.log('actionData', actionData)
      console.log('_conId', _conId)
      console.log('selectOptionDataIndex', selectOptionDataIndex)
      if (EventIndex === undefined || selectOptionDataIndex === undefined) {
        return
      }

      for (let i = 0; i < actionArr.length; i++) {
        if (actionArr[i]._id === actionData._id) {
          for (const [key, value] of Object.entries(actionOptions[selectOptionDataIndex])) { // iterate over key-value pairs in eventOpionData
            if (!['_conId', '_uuid', '_isEnabled', '_name', '_id'].includes(key)) { // check if key is not excluded
              actionArr[i][key] = value // update corresponding value in actionArr
            }
          }
          break
        }
      }
    },
    AddState() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const arr = this.NovoDS.Pages.Page.Section[currentSection].Content.State
      let getLastNumber = Math.max(...arr.map(p => p._id))
      if (getLastNumber === 0) {
        getLastNumber = 1
      }
      this.NovoDS.Pages.Page.Section[currentSection].Content.State.push({
        _id: uid(),
        File: [],
        Event: [],
        _name: ''
      })
      console.log('this.NovoDS.Pages.Page.Section[currentSection].Content', this.NovoDS.Pages.Page.Section[currentSection].Content)
    },
    AddStateEvent(Index) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.push({
        _id: uid(),
        _type: '',
        _conId: '',
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
        _conId: '',
        _stateId: stateId,
        _next_state_id: id,
        Action: []
      }
      this.stateEventData.push(pushData)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event.push(pushData)
    },
    AddAction(EventId) {
      console.log('EventId', EventId)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event[eventIndex].Action.push({
          _id: uid(),
          _type: '',
          _conId: ''
        })
      } else {
        console.error(`Could not find an event with id ${EventId}`)
      }
    },
    AddSourceList(currentStateIndex, fileDatas) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      console.log('fileDatas', fileDatas)

      // Check if MediaItem and File arrays are already populated
      const mediaItemsExist = this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem && this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem.length > 0
      const filesExist = this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File && this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File.length > 0

      // If the arrays exist, get their src values for comparison
      const mediaItemSrcs = mediaItemsExist ? this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem.map(item => item._src) : []
      const fileSrcs = filesExist ? this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File.map(item => item._src) : []

      // Filter out files that already exist in the MediaItem array or File array
      const newContentArray = fileDatas.filter((e) => !mediaItemSrcs.includes(e._src))
        .map((e) => ({
          _note: '',
          _type: e._type,
          _duration: e._duration,
          _videoDuration: '0',
          _fileSize: e._fileSize,
          _src: e._src,
          _targetPath: e._targetPath
        }))

      const newFileArray = fileDatas.filter((e) => !fileSrcs.includes(e._src))
        .map((e) => ({
          _src: e._src,
          _type: e._type,
          _duration: e._duration,
          _videoDuration: '0',
          _fileSize: e._fileSize,
          _targetPath: e._targetPath
        }))

      // Concatenate the new content and file arrays with the existing ones
      if (mediaItemsExist) {
        this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem.push(...newContentArray)
      } else {
        this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem = [...newContentArray]
      }

      if (filesExist) {
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File.push(...newFileArray)
      } else {
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File = [...newFileArray]
      }

      console.log('this.NovoDS.Pages.Page.Section[currentSection].Content', this.NovoDS.Pages.Page.Section[currentSection].Content)
    },
    DelSourceList(currentStateIndex, fileName, sourceFile) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      // Remove file from State File array
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File =
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File.filter(e => e._src !== fileName)

      const existingFileInState = this.NovoDS.Pages.Page.Section.some(section =>
        section.Content?.State?.some(state =>
          state.File?.some(file => file._src === fileName)))

      if (!existingFileInState) {
        // Remove file from MediaItem array
        this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem =
          this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem.filter(e => e._src !== fileName)
        // Remove file from folder
        window.myAPI.deleteFile(sourceFile)
      }
    },
    CheckDelStateObj(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State.filter(e => e._id !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State = Data
    },
    DelState(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      // 刪除 ID 對應的物件
      this.NovoDS.Pages.Page.Section[currentSection].Content.State = this.NovoDS.Pages.Page.Section[currentSection].Content.State.filter((state) => state._id !== ID)

      // 過濾掉 Event 的 _stateId 與 ID 相同的物件
      this.NovoDS.Pages.Page.Section[currentSection].Content.State.forEach((state) => {
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
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State.filter(e => e._id !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State = Data
    },
    DelAllStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.filter(e => e._stateId !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event = Data
      this.ResetWidgetListData()
    },
    DelStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.filter(e => e._id !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event = Data
    },
    DelEvent(EventId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.splice(eventIndex, 1)
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
      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        const actionIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event[eventIndex].Action.findIndex(action => action._id === ActionId)
        if (actionIndex !== -1) { // If the action with specified id was found
          this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event[eventIndex].Action.splice(actionIndex, 1) // Remove the action from the array
        } else {
          console.error(`Could not find an action with id ${ActionId} in event with id ${EventId}`)
        }
      } else {
        console.error(`Could not find an event with id ${EventId}`)
      }
    }
  }
})

import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
import { useEventListStore } from './event'
import { uid } from 'quasar'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    fileData: null,
    nowPlayListName: '',
    nowPlayListFolder: '',
    nowPlayListPath: '',
    NovoDS: {
      _Version: '1.1',
      _Description: '',
      _Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      _Playlist_Name: '',
      _Model_Type: 'DS310',
      _Interactive: true,
      Hardware: {
        GPIOSettings: {
          GPIO: [
            {
              _gpio_number: 1,
              _uuid: uid(),
              _name: 'GPIO1',
              _isEnabled: false,
              _role: 'keyevent',
              _key_action: 'up'
            },
            {
              _gpio_number: 2,
              _uuid: uid(),
              _name: 'GPIO2',
              _isEnabled: false,
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
              _isEnabled: false,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 5,
              _uuid: uid(),
              _name: 'GPIO5',
              _isEnabled: false,
              _role: 'output',
              _output_value: '0'
            },
            {
              _gpio_number: 6,
              _uuid: uid(),
              _name: 'GPIO6',
              _isEnabled: false,
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
              _isEnabled: false,
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
              _isEnabled: false,
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
          _ID: 'Page 1',
          _Description: '',
          _SerialNumber: 'Page 1', // 流水號 Page 1, Page 2 …沒用到
          _Layout: '',
          _Column: '',
          _Row: '',
          _Orientation: '0', // 0 -> Landscape 1-> Portrait 2-> Landscape (flipped), 3-> Portrait(flipped)
          _FreeDesignerMode: false, // Grid -> false, Flexi -> true
          _AudioSource: '',
          _BackgroundImage: '',
          _BackgroundImageSize: '0',
          _BgMusicApplyToAll: false,
          _BackgroundMusic: '',
          _BackgroundMusicUrl: '',
          _BackgroundMusicSize: '0',
          Section: [
            {
              _Index: 0,
              _X: 0,
              _Y: 0,
              _Z: 0,
              _Height: '',
              _Width: '',
              _isFixedRatio: false,
              _ContentType: '',
              Content: {
                _duration: '10',
                _showType: 'Default',
                _scaleType: 'FIT_XY',
                _MuteVideo: false,
                _isVideoFillArea: false,
                _Detect_Picture_Orientation: false,
                _FloatIn_Direction: '1',
                _Live_Update_type: '0',
                _Live_Update_password: '',
                _Live_Update_Access_Way: '0',
                _Live_Update_path: '',
                _Live_Update_Show_Status: true,
                _Live_Update_userName: '',
                _Live_Update_Frequency: '15',
                _Live_Update_port: '21',
                _Live_Update_ID: '',
                _Live_Update_type_storage: '1',
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
    GetLockState() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      return this.NovoDS.Pages.Page.Section[currentSection]._ContentType
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
      const content = this.NovoDS.Pages.Page.Section[currentSection].Content
      if (content.State) {
        return content.State.length
      } else {
        return 0
      }
    },
    GetCurrentStateOptions() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      if (!Array.isArray(this.NovoDS.Pages.Page.Section[currentSection].Content.State) || this.NovoDS.Pages.Page.Section[currentSection].Content.State.length === 0) {
        return []
      }

      const stateOptionData = this.NovoDS.Pages.Page.Section[currentSection].Content.State.map((e, i) => {
        if (e._name === '') {
          return {
            _id: e._id,
            _name: 'State' + ' ' + (i + 1)
          }
        } else {
          return {
            _id: e._id,
            _name: e._name
          }
        }
      })

      return stateOptionData
    },
    GetCurrentStateSelectedEvent() {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      if (currentSection !== null) {
        const content = this.NovoDS.Pages.Page.Section[currentSection].Content
        const state = content.State

        if (!Array.isArray(state) || state.length === 0 || state[this.currentState] === undefined) {
          return []
        }

        const events = state[this.currentState].Event || []
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

      if (currentSection !== undefined && curentEventID !== undefined) {
        const state = this.NovoDS.Pages.Page.Section[currentSection].Content.State

        if (!Array.isArray(state) || state.length === 0 || state[this.currentState] === undefined) {
          return []
        }

        const events = state[this.currentState].Event || []
        const eventIndex = events.findIndex((event) => {
          return event._id === curentEventID
        })

        if (eventIndex !== -1) {
          const actions = events[eventIndex].Action
          const selectedActions = [].concat(...actions).filter(Boolean).map(action => action._conId)
          return selectedActions
        }
      }

      return []
    }

  },
  actions: {
    // 開新檔案
    async SetOpenNewFileData(fileData) {
      this.fileData = fileData
      if (fileData.FileName === '') {
        const NowPlayListFolder = await window.myAPI.setPlayListFolder()
        console.log('NowPlayListFolder', NowPlayListFolder)
        this.nowPlayListName = NowPlayListFolder.nowPlayListName
        this.nowPlayListFolder = NowPlayListFolder.NovoFolder
        this.nowPlayListPath = NowPlayListFolder.NovoFolder + '/' + NowPlayListFolder.nowPlayListName
      } else {
        this.nowPlayListName = fileData.FileName
        this.nowPlayListFolder = fileData.FilePath
        this.nowPlayListPath = fileData.FilePath + '/' + fileData.FileName
      }
      this._Layout_Type = fileData.LayoutType
      this._Model_Type = fileData.ModelType
      this.NovoDS.Pages.Page._Orientation = fileData.Orientation
      this.NovoDS.Pages.Page._FreeDesignerMode = 'false'
    },
    // 讀檔
    SetLoadFileData(fileData) {
      this.fileData = fileData
      this.nowPlayListName = fileData.FileName
      this.nowPlayListFolder = fileData.FilePath
    },
    // 讀檔 並設置Nove DS XML 將產生的單一物件改成陣列
    SetNovoDS(fileData, xml) {
      const RawData = JSON.parse(JSON.stringify(xml))
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
            state.Event.forEach(event => {
              if (event.Action && !Array.isArray(event.Action)) {
                event.Action = [event.Action]
              } else if (!event.Action) {
                event.Action = []
              }

              event.Action.forEach(action => {
                if (action.Data && !Array.isArray(action.Data)) {
                  action.Data = [action.Data]
                } else if (!action.Data) {
                  action.Data = []
                }
              })
            })
          } else if (state.Event) {
            state.Event.forEach(event => {
              if (event.Action && !Array.isArray(event.Action)) {
                event.Action = [event.Action]
              } else if (!event.Action) {
                event.Action = []
              }

              event.Action.forEach(action => {
                if (action.Data && !Array.isArray(action.Data)) {
                  action.Data = [action.Data]
                } else if (!action.Data) {
                  action.Data = []
                }
              })
            })
          } else {
            state.Event = []
          }
        })
      })

      this.NovoDS = this.parseObject(RawData.NovoDS)
      console.log('this.NovoDS', this.NovoDS)

      if (fileData) {
        this.SetLoadFileData(fileData)
      }
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
    // Section
    ResetWidgetListData() {
      // console.log('ResetWidgetListData')
      const eventStore = useEventListStore()
      this.stateEventData = []
      // console.log('this.stateEventData', this.stateEventData)
      this.currentStateId = ''
      eventStore.SetCurrentEvent('')
    },
    SetRowCol(chooseLayout, data) {
      this.NovoDS.Pages.Page._Row = data.rowCount
      this.NovoDS.Pages.Page._Column = data.colCount
      this.NovoDS.Pages.Page._Layout = chooseLayout
    },
    // Section
    SetWidgetListData(data) {
      if (data) {
        this.NovoDS.Pages.Page.Section = data
      }
    },
    SetLoading(val) {
      this.loading = val
      // console.log('this.loading', this.loading)
    },
    SetWidget(Index, ContentType) {
      // console.log('Index', Index)
      // console.log('ContentType', ContentType)
      this.NovoDS.Pages.Page.Section[Index]._ContentType = ContentType
    },
    SetCurrentState(Index) {
      this.currentState = Index
    },
    SetCurrentStateId(ID) {
      this.currentStateId = ID
    },
    SetFlowState(Index, EventId, selectStateData) {
      console.log('selectStateData', selectStateData)
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
          _next_state_id: selectStateData._id
        }
      }
    },
    SetCurrentEventData(stateIndex, next_state_id, eventId) {
      // console.log('next_state_id', next_state_id)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[stateIndex].Event.filter(e => e._next_state_id === next_state_id)
      this.stateEventData = Data
      // console.log('stateEventData', Data)
    },
    SetEvent(EventData, _conId) {
      const layoutStore = useLayoutStore()
      const eventStore = useEventListStore()
      const eventOpionData = eventStore.GetEventTypeOptions
      const currentSection = layoutStore.currentSection
      const selectOptionDataIndex = eventOpionData.findIndex(eventOption => eventOption._uuid === _conId)
      const eventArr = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event
      // console.log('selectOptionDataIndex', selectOptionDataIndex)
      if (selectOptionDataIndex === undefined) {
        return
      }

      for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i]._id === EventData._id) {
          for (const [key, value] of Object.entries(eventOpionData[selectOptionDataIndex])) { // iterate over key-value pairs in eventOpionData
            if (!['disable', '_conId', '_uuid', '_isEnabled', '_name', '_id'].includes(key)) { // check if key is not excluded
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
      if (EventIndex === undefined || selectOptionDataIndex === undefined || actionArr === undefined || actionArr.length === 0) {
        return
      }

      for (let i = 0; i < actionArr.length; i++) {
        if (actionArr[i]._id === actionData._id) {
          for (const [key, value] of Object.entries(actionOptions[selectOptionDataIndex])) { // iterate over key-value pairs in eventOpionData
            if (!['disable', '_conId', '_uuid', '_isEnabled', '_name', '_id'].includes(key)) { // check if key is not excluded
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
      const content = this.NovoDS.Pages.Page.Section[currentSection].Content

      if (!content.State) {
        content.State = []
      }
      const stateArray = content.State

      // 取得 _id 的最大值，若無則設為 0
      const maxId = stateArray.reduce((max, state) => Math.max(max, state._id), 0)

      // 新增 State 物件
      const newState = {
        _id: maxId + 1,
        _uuid: uid(),
        _name: 'State' + ' ' + (maxId + 1)
      }

      stateArray.push(newState)
    },
    AddStateEvent(Index) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      if (!this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index]) {
        console.log(`Error: State ${Index} doesn't exist`)
        return
      }

      if (!Array.isArray(this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event)) {
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event = []
      }

      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.push({
        _id: uid(),
        _type: '',
        _conId: '',
        _next_state_id: ''
      })
    },
    AddStateEventSame(currentState) {
      if (!Array.isArray(this.stateEventData) || this.stateEventData.length === 0) {
        console.error('Error: stateEventData is not defined or has no data')
        return
      }

      const { _next_state_id: id } = this.stateEventData[0]

      if (id === undefined) {
        console.error('Error: Missing required properties from stateEventData')
        return
      }

      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      if (!this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState]) {
        console.log(`Error: State ${currentState} doesn't exist`)
        return
      }

      const pushData = {
        _id: uid(),
        _type: '',
        _conId: '',
        _next_state_id: id,
        Action: []
      }

      this.stateEventData.push(pushData)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event.push(pushData)
    },
    AddAction(EventId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const currentState = this.currentState

      if (!this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState]) {
        console.log(`Error: State ${currentState} doesn't exist`)
        return
      }

      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event.findIndex(event => event._id === EventId)

      if (eventIndex !== -1) { // If the event with specified id was found
        if (!Array.isArray(this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event[eventIndex].Action)) {
          this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event[eventIndex].Action = []
        }

        this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentState].Event[eventIndex].Action.push({
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

      const newFileArray = fileDatas
        .filter((e) => !fileSrcs.includes(e._src))
        .map((e) => {
          if (e._type === 'video') {
            return {
              _src: e._src,
              _fileSize: e._fileSize
            }
          } else {
            return {
              _src: e._src,
              _type: e._type,
              _duration: e._duration,
              _fileSize: e._fileSize
            }
          }
        })

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
    DelSourceList(currentStateIndex, fileSrc, sourceFile) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection

      // Remove file from State File array
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File =
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[currentStateIndex].File.filter(e => e._src !== fileSrc)

      const existingFileInState = this.NovoDS.Pages.Page.Section.some(section =>
        section.Content?.State?.some(state =>
          state.File?.some(file => file._src === fileSrc)))

      if (!existingFileInState) {
        // Remove file from MediaItem array
        this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem =
          this.NovoDS.Pages.Page.Section[currentSection].Content.MediaItem.filter(e => e._src !== fileSrc)
        // Remove file from folder
        window.myAPI.deleteFile(this.nowPlayListFolder, sourceFile)
      }
    },
    CheckDelStateObj(ID) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State.filter(e => e._id !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State = Data
    },
    DelState(stateUUID, stateID) {
      console.log('stateUUID', stateUUID)
      console.log('stateID', stateID)
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      // 刪除 ID 對應的物件
      this.NovoDS.Pages.Page.Section[currentSection].Content.State = this.NovoDS.Pages.Page.Section[currentSection].Content.State.filter((state) => state._uuid !== stateUUID)

      // 過濾掉 Event 的 _next_state_id 與 ID 相同的物件
      this.NovoDS.Pages.Page.Section[currentSection].Content.State.forEach((state) => {
        if (state.Event && state.Event.length > 0) {
          const events = state.Event.filter((event) => event._next_state_id !== stateID)
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
    DelAllStateEvent(next_state_id, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.filter(e => e._next_state_id !== next_state_id)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event = Data
      this.ResetWidgetListData()
    },
    DelStateEvent(ID, Index, EventIndex) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const Data = this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.filter(e => e._id !== ID)
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event = Data
    },
    // 待修復刪除Event[0]link會失焦
    DelEvent(EventId) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      const eventIndex = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.findIndex(event => event._id === EventId)
      if (eventIndex !== -1) { // If the event with specified id was found
        this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event.splice(eventIndex, 1)
        const Data = this.stateEventData.filter(event => event._id !== EventId)
        this.stateEventData = Data
        if (!this.stateEventData.length) {
          console.log('Data', Data)
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

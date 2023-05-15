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
          _rowCount: '',
          _colCount: '',
          Section: [
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
    }
  },
  actions: {
    SetNovoDS(data) {
      const RawData = JSON.parse(JSON.stringify(data))

      if (!RawData.NovoDS) {
        return false
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
    SetRowCol(data) {
      this.NovoDS.Pages.Page._rowCount = data.rowCount
      this.NovoDS.Pages.Page._colCount = data.colCount
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
          _gpio_number: '',
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
        _title: ''
      })
      console.log('this.NovoDS.Pages.Page.Section[currentSection].Content', this.NovoDS.Pages.Page.Section[currentSection].Content)
    },
    AddStateEvent(Index) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index].Event.push({
        _id: uid(),
        _type: '',
        _gpio_number: '',
        _stateId: this.NovoDS.Pages.Page.Section[currentSection].Content.State[Index]._id,
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

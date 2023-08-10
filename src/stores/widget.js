import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
import { useEventListStore } from './event'
import { uid } from 'quasar'
import { DeviceScreenOrientationEnum } from 'src/js/constant'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    fileData: {
      LayoutType: 0,
      ModelType: '',
      Orientation: 0,
      Playlist: '',
      PlaylistPath: ''
    },
    checkVali: true,
    nowPlayListName: '',
    nowPlayListFolder: '',
    nowPlayListPath: '',
    NovoDS: {
      _Version: '1.1',
      _Description: '',
      _Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      _Playlist_Name: '',
      _Model_Type: '',
      _Interactive: true,
      Hardware: {
        GPIOSettings: {
          GPIO: [
            {
              _gpio_number: 1,
              _uuid: uid(),
              _name: 'GPIO1',
              _isEnabled: false,
              _canEdit: false,
              _role: 'keyevent',
              _key_action: 'up'
            },
            {
              _gpio_number: 2,
              _uuid: uid(),
              _name: 'GPIO2',
              _isEnabled: false,
              _canEdit: false,
              _role: 'keyevent',
              _key_action: 'down'
            },
            {
              _gpio_number: 3,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO3 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO3 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 4,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO4 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO4 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 5,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO5 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO5 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 6,
              _uuid: uid(),
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO6 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO6 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
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
              Command: []
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
              Command: []
            }
          ]
        },
        TcpIpSettings: {
          _local_port: 3000,
          _isEnabled: false,
          ReceivedCommands: {
            Command: []
          },
          TcpIp: []
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
          _Orientation: '', // 0 -> Landscape 1-> Portrait 2-> Landscape (flipped), 3-> Portrait(flipped)
          _FreeDesignerMode: false, // Grid -> false, Flexi -> true
          _AudioSource: '0',
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
                    _flowName: '',
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
        text: 'Output',
        value: 'output'
      },
      {
        text: 'Key event',
        value: 'keyevent'
      }
    ],
    gpioKeyeventOption: [
      {
        text: 'Low',
        value: 'down'
      },
      {
        text: 'High',
        value: 'up'
      }
    ],
    currentState: 0,
    currentStateId: '',
    currentWidget: {},
    sectionOptionData: [],
    stateEventData: [],
    loading: false,
    defaultNovoDS: {
      _Version: '1.1',
      _Description: '',
      _Layout_Type: '0', // 0 -> Grid, 1 -> Flexible
      _Playlist_Name: '',
      _Model_Type: '',
      _Interactive: true,
      Hardware: {
        GPIOSettings: {
          GPIO: [
            {
              _gpio_number: 1,
              _uuid: uid(),
              _name: 'GPIO1',
              _isEnabled: false,
              _canEdit: false,
              _role: 'keyevent',
              _key_action: 'up'
            },
            {
              _gpio_number: 2,
              _uuid: uid(),
              _name: 'GPIO2',
              _isEnabled: false,
              _canEdit: false,
              _role: 'keyevent',
              _key_action: 'down'
            },
            {
              _gpio_number: 3,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO3 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO3 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 4,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO4 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO4 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 5,
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO5 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO5 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
            },
            {
              _gpio_number: 6,
              _uuid: uid(),
              _isEnabled: false,
              _canEdit: false,
              _role: 'output',
              Output: [
                {
                  _name: 'GPIO6 Output 1',
                  _uuid: uid(),
                  _output_value: 1
                },
                {
                  _name: 'GPIO6 Output 0',
                  _uuid: uid(),
                  _output_value: 0
                }
              ]
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
              Command: []
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
              Command: []
            }
          ]
        },
        TcpIpSettings: {
          _local_port: 3000,
          _isEnabled: false,
          ReceivedCommands: {
            Command: []
          },
          TcpIp: []
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
          _Orientation: '', // 0 -> Landscape 1-> Portrait 2-> Landscape (flipped), 3-> Portrait(flipped)
          _FreeDesignerMode: false, // Grid -> false, Flexi -> true
          _AudioSource: '0',
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
                    _flowName: '',
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
    }
  }),
  getters: {
    GetIsLandscape() {
      return this.fileData.Orientation === DeviceScreenOrientationEnum.landscape ||
        this.fileData.Orientation === DeviceScreenOrientationEnum.landscape_flipped
    },
    GetIsPortrait() {
      return this.fileData.Orientation === DeviceScreenOrientationEnum.portrait ||
        this.fileData.Orientation === DeviceScreenOrientationEnum.portrait_flipped
    },
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
    GetCurrentNowPlayListPath() {
      return this.nowPlayListPath
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
    // 清除Flow已選的EventAction
    clearEventAction(Data) {
      console.log('Data', Data)
      if (Data.Output && Array.isArray(Data.Output)) {
        for (const output of Data.Output) {
          const UUID = output._uuid
          console.log('UUID', UUID)
          for (const section of this.NovoDS.Pages.Page.Section) {
            // 迭代 Content.State 陣列
            if (Array.isArray(section.Content.State)) {
              for (let i = 0; i < section.Content.State.length; i++) {
                const state = section.Content.State[i]
                // console.log('section.Content.State', section.Content.State)
                if (state.Event) {
                  // 迭代 Event 陣列
                  for (const event of state.Event) {
                    if (event._conId && event._conId === UUID) {
                      event._conId = ''
                      event._type = ''
                      if (event._gpio_number) {
                        delete event._gpio_number
                      }
                      if (event._rs232_id) {
                        delete event._rs232_id
                      }
                      if (event._command_id) {
                        delete event._command_id
                      }
                      if (event._timer_id) {
                        delete event._timer_id
                      }
                      if (event._key_action) {
                        delete event._key_action
                      }
                    }
                    if (event.Action) {
                      // 迭代 Action 陣列
                      for (const action of event.Action) {
                        if (action._conId && action._conId === UUID) {
                          action._conId = ''
                          action._type = ''
                          action._role = ''
                          if (event._gpio_number) {
                            delete event._gpio_number
                          }
                          if (event._rs232_id) {
                            delete event._rs232_id
                          }
                          if (event._command_id) {
                            delete event._command_id
                          }
                          if (event._timer_id) {
                            delete event._timer_id
                          }
                          if (event._tcpip_id) {
                            delete event._tcpip_id
                          }
                          if (event._key_action) {
                            delete event._key_action
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else if (Data.Command && Array.isArray(Data.Command)) {
        for (const command of Data.Command) {
          const UUID = command._uuid
          console.log('UUID', UUID)
          for (const section of this.NovoDS.Pages.Page.Section) {
            // 迭代 Content.State 陣列
            if (Array.isArray(section.Content.State)) {
              for (let i = 0; i < section.Content.State.length; i++) {
                const state = section.Content.State[i]
                // console.log('section.Content.State', section.Content.State)
                if (state.Event) {
                  // 迭代 Event 陣列
                  for (const event of state.Event) {
                    if (event._conId && event._conId === UUID) {
                      event._conId = ''
                      event._type = ''
                      if (event._gpio_number) {
                        delete event._gpio_number
                      }
                      if (event._rs232_id) {
                        delete event._rs232_id
                      }
                      if (event._command_id) {
                        delete event._command_id
                      }
                      if (event._timer_id) {
                        delete event._timer_id
                      }
                      if (event._key_action) {
                        delete event._key_action
                      }
                    }
                    if (event.Action) {
                      // 迭代 Action 陣列
                      for (const action of event.Action) {
                        if (action._conId && action._conId === UUID) {
                          action._conId = ''
                          action._type = ''
                          action._role = ''
                          if (event._gpio_number) {
                            delete event._gpio_number
                          }
                          if (event._rs232_id) {
                            delete event._rs232_id
                          }
                          if (event._command_id) {
                            delete event._command_id
                          }
                          if (event._timer_id) {
                            delete event._timer_id
                          }
                          if (event._tcpip_id) {
                            delete event._tcpip_id
                          }
                          if (event._key_action) {
                            delete event._key_action
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        const UUID = Data._uuid
        console.log('UUID', UUID)
        for (const section of this.NovoDS.Pages.Page.Section) {
          // 迭代 Content.State 陣列
          if (Array.isArray(section.Content.State)) {
            for (let i = 0; i < section.Content.State.length; i++) {
              const state = section.Content.State[i]
              // console.log('section.Content.State', section.Content.State)
              if (state.Event) {
                // 迭代 Event 陣列
                for (const event of state.Event) {
                  if (event._conId && event._conId === UUID) {
                    event._conId = ''
                    event._type = ''
                    if (event._gpio_number) {
                      delete event._gpio_number
                    }
                    if (event._rs232_id) {
                      delete event._rs232_id
                    }
                    if (event._command_id) {
                      delete event._command_id
                    }
                    if (event._timer_id) {
                      delete event._timer_id
                    }
                    if (event._key_action) {
                      delete event._key_action
                    }
                  }
                  if (event.Action) {
                    // 迭代 Action 陣列
                    for (const action of event.Action) {
                      if (action._conId && action._conId === UUID) {
                        action._conId = ''
                        action._type = ''
                        action._role = ''
                        if (event._gpio_number) {
                          delete event._gpio_number
                        }
                        if (event._rs232_id) {
                          delete event._rs232_id
                        }
                        if (event._command_id) {
                          delete event._command_id
                        }
                        if (event._timer_id) {
                          delete event._timer_id
                        }
                        if (event._tcpip_id) {
                          delete event._tcpip_id
                        }
                        if (event._key_action) {
                          delete event._key_action
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // 比對Configure EventsActions中是否有被選取的EventAction
    checkEvent(Data) {
      console.log('Data', Data)
      if (Array.isArray(Data.Output)) {
        for (const output of Data.Output) {
          const UUID = output._uuid

          for (const section of this.NovoDS.Pages.Page.Section) {
            // 迭代 Content.State 陣列
            if (Array.isArray(section.Content.State)) {
              for (let i = 0; i < section.Content.State.length; i++) {
                const state = section.Content.State[i]
                // console.log('section.Content.State', section.Content.State)
                if (state.Event) {
                  // 迭代 Event 陣列
                  for (const event of state.Event) {
                    if (event._conId && event._conId === UUID) {
                      return i + 1 // 如果相同，返回索引
                    }
                    if (event.Action) {
                      // 迭代 Action 陣列
                      for (const action of event.Action) {
                        if (action._conId && action._conId === UUID) {
                          return i + 1 // 如果相同，返回索引
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        return false // 如果沒有找到匹配的UUID，則返回 false
      } else if (Data.ReceivedCommands) {
        for (const command of Data.ReceivedCommands.Command) {
          const UUID = command._uuid

          for (const section of this.NovoDS.Pages.Page.Section) {
            // 迭代 Content.State 陣列
            if (Array.isArray(section.Content.State)) {
              for (let i = 0; i < section.Content.State.length; i++) {
                const state = section.Content.State[i]
                // console.log('section.Content.State', section.Content.State)
                if (state.Event) {
                  // 迭代 Event 陣列
                  for (const event of state.Event) {
                    if (event._conId && event._conId === UUID) {
                      return i + 1 // 如果相同，返回索引
                    }
                    if (event.Action) {
                      // 迭代 Action 陣列
                      for (const action of event.Action) {
                        if (action._conId && action._conId === UUID) {
                          return i + 1 // 如果相同，返回索引
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if (Array.isArray(Data.TcpIp)) {
          for (const tcpIp of Data.TcpIp) {
            if (Array.isArray(tcpIp.Command)) {
              for (const command of tcpIp.Command) {
                const UUID = command._uuid

                for (const section of this.NovoDS.Pages.Page.Section) {
                  // 迭代 Content.State 陣列
                  if (Array.isArray(section.Content.State)) {
                    for (let i = 0; i < section.Content.State.length; i++) {
                      const state = section.Content.State[i]
                      // console.log('section.Content.State', section.Content.State)
                      if (state.Event) {
                        // 迭代 Event 陣列
                        for (const event of state.Event) {
                          if (event._conId && event._conId === UUID) {
                            return i + 1 // 如果相同，返回索引
                          }
                          if (event.Action) {
                            // 迭代 Action 陣列
                            for (const action of event.Action) {
                              if (action._conId && action._conId === UUID) {
                                return i + 1 // 如果相同，返回索引
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        return false // 如果沒有找到匹配的UUID，則返回 false
      } else if (Array.isArray(Data.Command)) {
        for (const command of Data.Command) {
          const UUID = command._uuid

          for (const section of this.NovoDS.Pages.Page.Section) {
            // 迭代 Content.State 陣列
            if (Array.isArray(section.Content.State)) {
              for (let i = 0; i < section.Content.State.length; i++) {
                const state = section.Content.State[i]
                // console.log('section.Content.State', section.Content.State)
                if (state.Event) {
                  // 迭代 Event 陣列
                  for (const event of state.Event) {
                    if (event._conId && event._conId === UUID) {
                      return i + 1 // 如果相同，返回索引
                    }
                    if (event.Action) {
                      // 迭代 Action 陣列
                      for (const action of event.Action) {
                        if (action._conId && action._conId === UUID) {
                          return i + 1 // 如果相同，返回索引
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        return false // 如果沒有找到匹配的UUID，則返回 false
      } else {
        const UUID = Data._uuid
        for (const section of this.NovoDS.Pages.Page.Section) {
          // 遍歷 Content.State 陣列
          if (Array.isArray(section.Content.State)) {
            for (let i = 0; i < section.Content.State.length; i++) {
              const state = section.Content.State[i]
              console.log('section.Content.State', section.Content.State)
              if (state.Event) {
                // 遍歷 Event 陣列
                for (const event of state.Event) {
                  if (event._conId && event._conId === UUID) {
                    return i + 1 // 如果相同，返回索引
                  }
                  if (event.Action) {
                    // 遍歷 Action 陣列
                    for (const action of event.Action) {
                      if (action._conId && action._conId === UUID) {
                        return i + 1 // 如果相同，返回索引
                      }
                    }
                  }
                }
              }
            }
          }
        }

        return false // 如果沒有找到匹配的UUID，則返回 false
      }
    },
    ResetNewPlaylistName(Playlist_Name, newPlayListPath) {
      this.nowPlayListName = Playlist_Name
      this.nowPlayListPath = newPlayListPath
    },
    ResetNovoDS() {
      Object.assign(this.NovoDS, this.defaultNovoDS)
    },
    // 開新檔案
    async SetOpenNewFileData(SocketFileData) {
      try {
        console.log('SocketFileData', SocketFileData)
        this.fileData = SocketFileData
        // 建立 PlayList Temp
        if (SocketFileData.Command === 'OpenNew') {
          const NowPlayListFolder = await window.myAPI.setPlayListFolder()
          console.log('NowPlayListFolder', NowPlayListFolder)
          if (NowPlayListFolder.nowPlayListName.startsWith('@_Temp_Playlist_')) {
            const fileName = NowPlayListFolder.nowPlayListName.split('_')[2] + '_' + NowPlayListFolder.nowPlayListName.split('_')[3]
            this.SetPlaylistName(fileName)
          } else {
            this.SetPlaylistName(NowPlayListFolder.nowPlayListName)
          }
          this.nowPlayListName = NowPlayListFolder.nowPlayListName
          this.nowPlayListFolder = NowPlayListFolder.NovoFolder
          this.nowPlayListPath = NowPlayListFolder.NovoFolder + '/' + NowPlayListFolder.nowPlayListName
        }

        return 'new'
      } catch (error) {
        console.error(`Error in SetOpenNewFileData: ${error}`)
      }
    },
    // 開啟舊檔,設置Nove DS XML 將產生的單一物件改成陣列
    async SetNovoDS(SocketFileData, xml) {
      try {
        const RawData = JSON.parse(JSON.stringify(xml))
        if (!RawData.NovoDS) {
          return Promise.reject('Invalid XML data')
        }

        if (!RawData.NovoDS) {
          return false
        }
        if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.GPIOSettings && Array.isArray(RawData.NovoDS.Hardware.GPIOSettings.GPIO)) {
          RawData.NovoDS.Hardware.GPIOSettings.GPIO.forEach(GPIO => {
            if (GPIO.Output === undefined || GPIO.Output === null || GPIO.Output === '') { // add this condition
              // GPIO.Output = []
            } else if (!Array.isArray(GPIO.Output)) {
              GPIO.Output = [GPIO.Output]
            } else if (GPIO.Output.length === 1 && GPIO.Output[0] === '') {
              GPIO.Output = []
            }
          })
        }

        if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.Rs232Settings && Array.isArray(RawData.NovoDS.Hardware.Rs232Settings.Rs232)) {
          RawData.NovoDS.Hardware.Rs232Settings.Rs232.forEach(rs232 => {
            if (rs232.Command === undefined || rs232.Command === null || rs232.Command === '') { // add this condition
              rs232.Command = []
            } else if (!Array.isArray(rs232.Command)) {
              rs232.Command = [rs232.Command]
            } else if (rs232.Command.length === 1 && rs232.Command[0] === '') {
              rs232.Command = []
            }
          })
        }

        if (RawData.NovoDS.Hardware && RawData.NovoDS.Hardware.TcpIpSettings) {
          const tcpip = RawData.NovoDS.Hardware.TcpIpSettings

          if (tcpip.ReceivedCommands && tcpip.ReceivedCommands.Command === '') {
            tcpip.ReceivedCommands.Command = []
          } else if (tcpip.ReceivedCommands && tcpip.ReceivedCommands.Command && !Array.isArray(tcpip.ReceivedCommands.Command)) {
            tcpip.ReceivedCommands.Command = [tcpip.ReceivedCommands.Command]
          }
          if (tcpip.TcpIp === undefined || tcpip.TcpIp === null || tcpip.TcpIp === '') { // add this condition
            tcpip.TcpIp = []
          } else if (!Array.isArray(tcpip.TcpIp)) {
            tcpip.TcpIp = [tcpip.TcpIp]
          } else if (tcpip.TcpIp.length === 1 && tcpip.TcpIp[0] === '') {
            tcpip.TcpIp = []
          }
          if (Array.isArray(tcpip.TcpIp)) {
            tcpip.TcpIp.forEach(tcp => {
              if (!tcp.Command) {
                tcp.Command = []
              } else if (!Array.isArray(tcp.Command)) {
                tcp.Command = [tcp.Command]
              }
            })
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
              })
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

        if (SocketFileData.Command !== 'Reload') {
          this.SetLoadFileData(SocketFileData)
        } else {
          const ReloadFileData = {
            LayoutType: this.NovoDS._Layout_Type || 0,
            ModelType: this.NovoDS._Model_Type || 'DS310',
            Orientation: this.NovoDS.Pages.Page._Orientation || 0,
            Playlist: SocketFileData.Playlist,
            PlaylistPath: SocketFileData.PlaylistPath
          }
          this.SetLoadFileData(ReloadFileData)
        }

        // 使用 Promise.resolve() 返回解析後的數據
        return Promise.resolve(this.NovoDS)
      } catch (error) {
        // 使用 Promise.reject() 返回錯誤信息
        return Promise.reject(error)
      }
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
    // 處理檔案格式
    SetLoadFileData(ReloadFileData = null) {
      console.log('ReloadFileData', ReloadFileData)
      this.fileData = ReloadFileData
      this.NovoDS.Pages.Page._Orientation = ReloadFileData.Orientation || 0
      this.NovoDS.Pages.Page._FreeDesignerMode = 'false'
      this.nowPlayListName = ReloadFileData.Playlist
      this.nowPlayListFolder = ReloadFileData.PlaylistPath
      this.nowPlayListPath = ReloadFileData.PlaylistPath + '/' + ReloadFileData.Playlist
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
      this.NovoDS.Pages.Page._Column = data.columnCount
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
    SetPlaylistName(val) {
      console.log('this.NovoDS._Playlist_Name', val)
      this.NovoDS._Playlist_Name = val
    },
    SetCheckVali(val) {
      this.checkVali = val
    },
    SetAudioSource(val) {
      switch (val) {
        case 'Widget':
          this.NovoDS.Pages.Page._AudioSource = this.sectionOptionData[0]._ID ?? ''
          break
        case 'Mute':
          this.NovoDS.Pages.Page._AudioSource = 'mute'
          break
        case 'BackgroundMusic':
          this.NovoDS.Pages.Page._AudioSource = 'background_music'
          break
        default:
          return ''
      }
    },
    async SetStateFirstIndex() {
      try {
        if (this.NovoDS?.Pages?.Page?.Section) {
          for (const section of this.NovoDS.Pages.Page.Section) {
            const states = section.Content?.State || []
            if (states.length && states.some(state => state._id === 0)) {
              for (const state of states) {
                state._id++
                const events = state.Event || []
                for (const event of events) {
                  event._next_state_id++
                }
              }
              const originalStateId = states[0]._id
              states[0]._id = 0
              for (const state of states) {
                const events = state.Event || []
                for (const event of events) {
                  if (event._next_state_id === originalStateId) {
                    event._next_state_id = 0
                  }
                }
              }
            } else if (states.length) {
              const originalStateId = states[0]._id
              states[0]._id = 0
              for (const state of states) {
                const events = state.Event || []
                for (const event of events) {
                  if (event._next_state_id === originalStateId) {
                    event._next_state_id = 0
                  }
                }
              }
            }
          }
        }
        await this.ResetWidgetListData() // using await to wait for ResetWidgetListData() function to complete before the promise resolves
        return true
      } catch (error) {
        throw new Error(`An error occurred in SetStateFirstIndex: ${error.message}`)
      }
    },
    SetStateDefault(stateID) {
      return new Promise((resolve, reject) => {
        try {
          const layoutStore = useLayoutStore()
          const currentSection = layoutStore.currentSection
          const uuid = stateID

          const index = this.NovoDS.Pages.Page.Section[currentSection].Content.State.findIndex(
            item => item._uuid === uuid
          )

          if (index !== -1) {
            const [removed] = this.NovoDS.Pages.Page.Section[currentSection].Content.State.splice(index, 1)
            this.NovoDS.Pages.Page.Section[currentSection].Content.State.splice(0, 0, removed)
            resolve(true) // 如果成功移动元素，则返回true
          } else {
            reject(new Error()) // 如果找不到需要移动的元素，则返回错误信息
          }
        } catch (error) {
          reject(error) // 如果发生任何错误，则返回错误信息
        }
      }).catch(error => console.error(error))
    },
    SetStateMoved(evt) {
      return new Promise((resolve, reject) => {
        try {
          const layoutStore = useLayoutStore()
          const currentSection = layoutStore.currentSection
          const uuid = evt.moved.element._uuid

          const index = this.NovoDS.Pages.Page.Section[currentSection].Content.State.findIndex(
            item => item._uuid === uuid
          )

          if (index !== -1) {
            const [removed] = this.NovoDS.Pages.Page.Section[currentSection].Content.State.splice(index, 1)
            this.NovoDS.Pages.Page.Section[currentSection].Content.State.splice(evt.moved.newIndex, 0, removed)
            resolve(true) // 如果成功移动元素，则返回true
          } else {
            reject(new Error()) // 如果找不到需要移动的元素，则返回错误信息
          }
        } catch (error) {
          reject(error) // 如果发生任何错误，则返回错误信息
        }
      }).catch(error => console.error(error))
    },
    SetStateFlowName(stateIndex, val) {
      const layoutStore = useLayoutStore()
      const currentSection = layoutStore.currentSection
      this.NovoDS.Pages.Page.Section[currentSection].Content.State[stateIndex]._flowName = val
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
      if (selectOptionDataIndex === undefined) {
        return
      }

      for (let i = 0; i < eventArr.length; i++) {
        if (eventArr[i]._id === EventData._id) {
          // Clear all key-value pairs in eventArr[i] except for '_id', '_next_state_id', and '_conId'
          for (const [key] of Object.entries(eventArr[i])) {
            if (!['_id', '_next_state_id', '_conId', 'Action'].includes(key)) {
              delete eventArr[i][key]
            }
          }
          // Assign values from eventOpionData[selectOptionDataIndex] to eventArr[i]
          for (const [key, value] of Object.entries(eventOpionData[selectOptionDataIndex])) { // iterate over key-value pairs in eventOpionData
            if (!['disable', '_conId', '_uuid', '_isEnabled', '_name', '_id'].includes(key)) { // check if key is not excluded
              eventArr[i][key] = value // update corresponding value in eventArr
            }
          }
          break
        }
      }
    },
    SetAction(EventId, actionData, _conId) {
      // console.log('EventId', EventId)
      // console.log('actionData', actionData)
      // console.log('_conId', _conId)
      const layoutStore = useLayoutStore()
      const eventStore = useEventListStore()
      const actionOptions = eventStore.GetActionTypeOptions
      const currentSection = layoutStore.currentSection
      const eventsArray = this.NovoDS.Pages.Page.Section[currentSection].Content.State[this.currentState].Event
      const eventIndex = eventsArray.findIndex(event => event._id === EventId)
      if (eventIndex === undefined) {
        return
      }
      const actionArr = eventsArray[eventIndex].Action
      for (let i = 0; i < actionArr.length; i++) {
        if (actionArr[i]._id === actionData._id) {
          const selectedActionOption = actionOptions.find(actionOption => actionOption._uuid === _conId)
          // Clear all key-value pairs in actionArr[i] except for '_id' and '_conId'
          for (const [key] of Object.entries(actionArr[i])) {
            if (!['_id', '_conId'].includes(key)) {
              delete actionArr[i][key]
            }
          }
          // Assign values from selectedActionOption to actionArr[i]
          for (const [key, value] of Object.entries(selectedActionOption)) { // iterate over key-value pairs in eventOpionData
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
        _name: 'State' + ' ' + (maxId + 1),
        _flowName: ''
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
    AddBGSourceList(fileDatas) {
      console.log('fileDatas', fileDatas)
      this.NovoDS.Pages.Page._BackgroundImage = fileDatas._src
      this.NovoDS.Pages.Page._BackgroundImageSize = fileDatas._fileSize
    },
    DelBGSource() {
      window.myAPI.deleteFile(this.nowPlayListPath, this.NovoDS.Pages.Page._BackgroundImage)
      this.NovoDS.Pages.Page._BackgroundImage = ''
      this.NovoDS.Pages.Page._BackgroundImageSize = 0
    },
    AddAudioSourceList(fileDatas) {
      console.log('fileDatas', fileDatas)
      this.NovoDS.Pages.Page._AudioSource = 'background_music'
      this.NovoDS.Pages.Page._BackgroundMusic = fileDatas._src
      this.NovoDS.Pages.Page._BackgroundMusicSize = fileDatas._fileSize
    },
    DelAudioSource() {
      window.myAPI.deleteFile(this.nowPlayListPath, this.NovoDS.Pages.Page._BackgroundMusic)
      this.NovoDS.Pages.Page._AudioSource = ''
      this.NovoDS.Pages.Page._BackgroundMusic = ''
      this.NovoDS.Pages.Page._BackgroundMusicSize = 0
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
        window.myAPI.deleteFile(this.nowPlayListPath, sourceFile)
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

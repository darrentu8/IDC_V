import { defineStore } from 'pinia'
import { extend } from 'quasar'

export const useNovoDSStore = defineStore('NovoDs', {
  state: () => ({
    NovoDS: {
      $: {
        Description: '123',
        Playlist_UUID: '',
        Layout_Type: 0,
        Model_Type: 'DS310',
        Interactive: true
      },
      Hardware: [{
        GPIOSettings: [{
          GPIO: [{
            $: {
              gpio_number: 1,
              name: 'GPIO1',
              isEnabled: true,
              role: 'output'
            }
          },
          {
            $: {
              gpio_number: 2,
              name: 'GPIO2',
              isEnabled: true,
              role: 'keyevent'
            }
          },
          {
            $: {
              gpio_number: 3,
              name: 'GPIO3',
              isEnabled: false,
              role: 'keyevent'
            }
          },
          {
            $: {
              gpio_number: 4,
              name: 'GPIO4',
              isEnabled: false,
              role: 'keyevent'
            }
          },
          {
            $: {
              gpio_number: 5,
              name: 'GPIO5',
              isEnabled: false,
              role: 'keyevent'
            }
          },
          {
            $: {
              gpio_number: 6,
              name: 'GPIO6',
              isEnabled: true,
              role: 'keyevent'
            }
          }]
        }
        ],
        Rs232Settings: [{
          Rs232: [{
            $: {
              id: 1,
              dataBits: 8,
              flowControl: 'None',
              stopBits: 1,
              baudRate: 9600,
              parity: 'None',
              rs232_type: 'string',
              interface: 'on_board',
              isEnabled: false
            }
          },
          {
            $: {
              id: 2,
              dataBits: 8,
              flowControl: 'None',
              stopBits: 1,
              baudRate: 9600,
              parity: 'None',
              rs232_type: 'hex',
              interface: 'usb',
              isEnabled: true
            }
          }]
        }
        ],
        TcpIpSettings: [{
          $: {
            local_port: 1234,
            isEnabled: true
          },
          TcpIp: [{
            $: {
              id: 1,
              destination_ip: '192.168.1.1',
              destination_port: 1234,
              name: 'TCP Output1'
            }
          },
          {
            $: {
              id: 2,
              destination_ip: '192.168.1.1',
              destination_port: 5678,
              name: 'TCP Output2'
            }
          },
          {
            $: {
              id: 3,
              destination_ip: '192.168.1.2',
              destination_port: 1234,
              name: 'TCP Output3'
            }
          }]
        }]
      }],
      Pages: [{
        Page: [{
          $: {
            Description: '',
            AudioSource: '',
            BackgroundImageSize: 256,
            Column: 1,
            Row: 1,
            FreeDesignerMode: false,
            Script: '',
            BackgroundImage: '',
            ID: 'Page 1',
            BackgroundMusicSize: 256,
            BackgroundMusic: '',
            BgMusicApplyToAll: false,
            Layout: 'Landscape 1',
            BackgroundMusicUrl: '',
            SerialNumber: 'Page 1',
            Orientation: 0
          },
          Section: [{
            $: {
              SectionValid: 1,
              Script: '',
              ID: 'Media_0',
              isFixedRatio: false,
              Index: 0,
              Width: 1,
              is169: false,
              X: 0,
              Height: 1,
              Y: 0,
              Z: 0,
              ContentType: 'GPIO_Media'
            },
            Content: [{
              $: {
                Live_Update_type: 0,
                Live_Update_Show_Status: true,
                Live_Update_path: '',
                Live_Update_Access_Way: 0,
                Live_Update_userName: '',
                MuteVideo: true,
                duration: 10,
                Live_Update_ID: 'Page 1-1',
                scaleType: 'FIT_CENTER',
                isVideoFillArea: false,
                Detect_Picture_Orientation: false,
                Live_Update_port: 21,
                Live_Update_Frequency: 15,
                Live_Update_password: '',
                Live_Update_type_storage: 0,
                FloatIn_Direction: 0,
                showType: 'Default'
              },
              MediaItem: [{
                $: {
                  note: '',
                  duration: 10,
                  videoDuration: 0,
                  fileSize: 6904201,
                  src: 'a.png'
                }
              },
              {
                $: {
                  note: '',
                  duration: 10,
                  videoDuration: 0,
                  fileSize: 131012,
                  src: 'b.png'
                }
              },
              {
                $: {
                  note: '',
                  duration: 0,
                  videoDuration: 0,
                  fileSize: 13046104,
                  src: 'c.mp4'
                }
              },
              {
                $: {
                  note: '',
                  duration: 0,
                  videoDuration: 0,
                  fileSize: 930185,
                  src: 'd.mp4'
                }
              }],
              State: [{
                $: {
                  id: 0,
                  name: 'State1'
                },
                File: [{
                  $: {
                    duration: 5,
                    src: 'a.png'
                  }
                },
                {
                  $: {
                    duration: 5,
                    src: 'b.png'
                  }
                }],
                Event: [{
                  $: {
                    next_state_id: 1,
                    type: 'gpio',
                    gpio_number: 2,
                    key_action: 'down'
                  },
                  Action: [
                    {
                      $: {
                        type: 'gpio',
                        gpio_number: 1,
                        role: 'output',
                        output_value: 0
                      }
                    },
                    {
                      $: {
                        type: 'rs232',
                        rs232_id: 1,
                        role: 'output',
                        output_value: 'ABC'
                      }
                    }
                  ]
                },
                {
                  $: {
                    next_state_id: 1,
                    type: 'rs232',
                    rs232_id: 1,
                    input_value: 'open'
                  },
                  Action: [
                    {
                      $: {
                        type: 'gpio',
                        gpio_number: 1,
                        role: 'output',
                        output_value: 1
                      }
                    },
                    {
                      $: {
                        type: 'rs232',
                        rs232_id: 2,
                        role: 'output',
                        output_value: '7B AA'
                      }
                    },
                    {
                      $: {
                        type: 'tcp/ip',
                        tcpip_id: 1,
                        role: 'output',
                        output_value: 'Wake up'
                      }
                    }
                  ]
                },
                {
                  $: {
                    next_state_id: 0,
                    type: 'tcp/ip',
                    input_value: 'Sleep'
                  },
                  Action: [{
                    $: {
                      type: 'tcp/ip',
                      tcpip_id: 2,
                      role: 'output',
                      output_value: 'Eat'
                    }
                  },
                  {
                    $: {
                      type: 'tcp/ip',
                      tcpip_id: 3,
                      role: 'output',
                      output_value: 'Drink'
                    }
                  }]
                }]
              },
              {
                $: {
                  id: 1,
                  name: 'State2'
                },
                File: [{
                  $: {
                    src: 'c.mp4'
                  }
                },
                {
                  $: {
                    src: 'd.mp4'
                  }
                }],
                Event: [{
                  $: {
                    next_state_id: 0,
                    type: 'gpio',
                    gpio_number: 6,
                    key_action: 'up'
                  },
                  Action: [
                    {
                      $: {
                        type: 'gpio',
                        gpio_number: 1,
                        role: 'output',
                        output_value: 'high'
                      }
                    }
                  ]
                },
                {
                  $: {
                    next_state_id: 0,
                    type: 'playend'
                  },
                  Action: [
                    {
                      $: {
                        type: 'tcp/ip',
                        tcpip_id: 1,
                        role: 'output',
                        output_value: 'Wake up'
                      }
                    }
                  ]
                },
                {
                  $: {
                    next_state_id: 0,
                    type: 'timeout',
                    duration: 20
                  }
                }]
              }]
            }]
          }]
        }]
      }],
      Timeline: [
        {
          $: {
            Looping: true
          },
          Item: [
            {
              $: {
                Duration: 1800,
                Page: 'Page 1'
              }
            }
          ]
        }
      ]
    }
  }),
  getters: {

  },
  actions: {
    WriteToXml() {
      const NovoDSData = extend(true, {}, this.NovoDS)
      window.myAPI.storeToXML({ NovoDS: NovoDSData })
    }
  }
})

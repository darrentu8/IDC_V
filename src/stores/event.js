import { defineStore } from 'pinia'
import { useWidgetListStore } from 'src/stores/widget'
import { uid } from 'quasar'
export const useEventListStore = defineStore('eventList', {
  state: () => ({
    currentEvent: '',
    currentEventIndex: '',
    eventTypeOptions: {
      type: [
        {
          text: 'GPIO',
          value: 'gpio'
        },
        {
          text: 'RS232',
          value: 'rs232'
        },
        {
          text: 'TCP/IP',
          value: 'tcp/ip'
        },
        {
          text: 'Playback end',
          value: 'playend'
        },
        {
          text: 'Time out',
          value: 'timeout'
        }
      ],
      gpio: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        hardwareOptions: [
          {
            text: '1',
            value: '1'
          },
          {
            text: '2',
            value: '2'
          },
          {
            text: '3',
            value: '3'
          },
          {
            text: '4',
            value: '4'
          },
          {
            text: '5',
            value: '5'
          },
          {
            text: '6',
            value: '6'
          }
        ],
        subOptions: [
          {
            text: 'Up',
            value: 'up'
          },
          {
            text: 'Down',
            value: 'down'
          }
        ],
        model: ''
      },
      rs232: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: [
          {
            text: 'On Borad',
            value: '1'
          },
          {
            text: 'USB',
            value: '2'
          }
        ],
        model: ''
      },
      'tcp/ip': {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        model: ''
      },
      playend: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        model: ''
      },
      timeout: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        model: ''
      }
    },
    actionTypeOptions: {
      type: [
        {
          text: 'GPIO',
          value: 'gpio'
        },
        {
          text: 'RS232',
          value: 'rs232'
        },
        {
          text: 'TCP/IP',
          value: 'tcp/ip'
        },
        {
          text: 'Playback end',
          value: 'playend'
        },
        {
          text: 'Time out',
          value: 'timeout'
        }
      ],
      gpio: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        hardwareOptions: [
          {
            text: '1',
            value: '1'
          },
          {
            text: '2',
            value: '2'
          },
          {
            text: '3',
            value: '3'
          },
          {
            text: '4',
            value: '4'
          },
          {
            text: '5',
            value: '5'
          },
          {
            text: '6',
            value: '6'
          }
        ],
        subOptions: [
          {
            text: 'Up',
            value: 'up'
          },
          {
            text: 'Down',
            value: 'down'
          }
        ],
        model: ''
      },
      rs232: {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: [
          {
            text: 'On Borad',
            value: '1'
          },
          {
            text: 'USB',
            value: '2'
          }
        ],
        model: ''
      },
      'tcp/ip': {
        label: 'Type',
        options: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        subOptions: ['gpio', 'RS232', 'TCP/IP', 'playend', 'timeout'],
        model: ''
      }
    },
    extraEventOption: [
      {
        _name: 'Playback end',
        _type: 'playend'
      },
      {
        _name: 'Time out',
        _type: 'timeout'
      }
    ]
  }),
  getters: {
    GetCurrentEvent() {
      return this.currentEvent
    },
    GetCurrentEventIndex() {
      return this.currentEventIndex
    },
    GetEventTypeOptions() {
      const widgetStore = useWidgetListStore()

      const mapGPIO = widgetStore?.NovoDS?.Hardware?.GPIOSettings?.GPIO
        ?.filter(gpio => gpio && gpio._role !== 'output')
        ?.map(gpio => ({
          _uuid: uid(),
          _name: gpio._gpio_number + ' ' + gpio._name,
          _id: gpio._gpio_number,
          _isEnabled: gpio._isEnabled,
          _gpio_number: gpio._gpio_number,
          _type: 'gpio',
          ...(gpio._key_action && { _key_action: gpio._key_action }), // add key_action if it exists
          ...(gpio._output_value && { _output_value: gpio._output_value }) // add output_value if it exists
        })) || []

      const mapRs232 = widgetStore?.NovoDS?.Hardware?.Rs232Settings?.Rs232
        ?.filter(rs232 => rs232 && rs232.Command)
        ?.map(rs232 => rs232.Command?.map(commandData => ({
          _uuid: uid(),
          _name: `RS232-${rs232._interface} ${commandData._name}`,
          _rs232_id: rs232._id,
          _command_id: commandData._id,
          _isEnabled: rs232._isEnabled,
          _type: 'rs232'
        })))
        .flat() || []

      const receivedCommands = widgetStore?.NovoDS?.Hardware?.TcpIpSettings?.ReceivedCommands?.Command ?? []
      const mapTcpIp = [
        ...receivedCommands.map((tcpip) => ({
          _uuid: uid(),
          _name: tcpip._name,
          _tcpip_id: tcpip._id,
          _command_id: tcpip._id,
          _isEnabled: widgetStore?.NovoDS?.Hardware?.TcpIpSettings?._isEnabled,
          _type: 'tcp/ip'
        }))
      ]

      const mapTimer = widgetStore?.NovoDS?.Hardware?.TimerSettings?.Timer
        ?.filter(timer => timer)
        ?.map(timer => ({
          _uuid: uid(),
          _name: `Timer-${timer._name}`,
          _timer_id: timer._id,
          _isEnabled: true,
          _type: 'timer'
        })) ?? []

      const mapExtra = this.extraEventOption
        ?.filter(extra => extra)
        ?.map(extra => ({
          _uuid: uid(),
          _name: extra._name,
          _isEnabled: true,
          _type: extra._type
        })) ?? []

      const combinedOptions = [
        ...mapGPIO,
        ...mapRs232,
        ...mapTcpIp,
        ...mapTimer,
        ...mapExtra
      ]

      return combinedOptions
    },
    GetActionTypeOptions() {
      const widgetStore = useWidgetListStore()
      const mapGPIO = widgetStore?.NovoDS?.Hardware?.GPIOSettings?.GPIO
        ?.filter(gpio => gpio && gpio._role === 'output')
        ?.map(gpio => ({
          _uuid: uid(),
          _name: gpio._gpio_number + ' ' + gpio._name,
          _id: gpio._gpio_number,
          _role: 'output',
          _isEnabled: gpio._isEnabled,
          _gpio_number: gpio._gpio_number,
          _type: 'gpio'
        })) || []

      const mapRs232 = widgetStore?.NovoDS?.Hardware?.Rs232Settings?.Rs232
        ?.filter(rs232 => rs232 && rs232.Command)
        ?.map(rs232 => rs232.Command?.map(commandData => ({
          _uuid: uid(),
          _name: `RS232-${rs232._interface} ${commandData._name}`,
          _rs232_id: rs232._id,
          _role: 'output',
          _command_id: commandData._id,
          _isEnabled: rs232._isEnabled,
          _type: 'rs232'
        })))
        .flat() || []

      const sendCommands = widgetStore?.NovoDS?.Hardware?.TcpIpSettings?.TcpIp?.Command ?? []
      const mapTcpIp = [
        ...sendCommands.map((tcpip) => ({
          _uuid: uid(),
          _name: tcpip._name,
          _tcpip_id: tcpip._id,
          _role: 'output',
          _command_id: tcpip._id,
          _isEnabled: widgetStore?.NovoDS?.Hardware?.TcpIpSettings?._isEnabled,
          _type: 'tcp/ip'
        }))
      ]

      const mapTimer = widgetStore?.NovoDS?.Hardware?.TimerSettings?.Timer
        ?.filter(timer => timer)
        ?.map(timer => ({
          _uuid: uid(),
          _name: `Timer-${timer._name}`,
          _timer_id: timer._id,
          _isEnabled: true,
          _type: 'timer'
        })) || []

      const combinedOptions = [
        ...mapGPIO,
        ...mapRs232,
        ...mapTcpIp,
        ...mapTimer,
        ...(this.extraEventOption || [])
      ]

      return combinedOptions
    }
  },
  actions: {
    SetCurrentEvent(id) {
      console.log('id', id)
      this.currentEvent = id
    },
    SetCurrentEventIndex(Index) {
      this.currentEventIndex = Index
    },
    SetEventOptions(data) {
      this.eventOptions = data
    },
    SetActionOptions(data) {
      this.actionOptions = data
    }
  }
})

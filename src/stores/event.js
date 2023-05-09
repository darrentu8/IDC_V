import { defineStore } from 'pinia'
import { useLayoutStore } from './layout'
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
      const layoutStore = useLayoutStore()
      const mapGPIO = layoutStore?.NovoDS?.Hardware?.GPIOSettings?.GPIO?.map((gpio, index) => {
        if (!gpio || !gpio._isEnabled || gpio._role === 'keyevent') return null
        return {
          ...gpio,
          _uuid: uid(),
          _name: gpio._gpio_number + ' ' + gpio._name,
          _id: gpio._gpio_number,
          _gpio_number: gpio._gpio_number,
          _type: 'gpio'
        }
      }).filter(item => item !== null)

      const mapRs232 = layoutStore?.NovoDS?.Hardware?.Rs232Settings?.Rs232?.map((rs232, index) => {
        if (!rs232 || !rs232._isEnabled) return null
        return {
          ...rs232,
          _uuid: uid(),
          _name: 'RS232-' + rs232._interface,
          _rs232_id: rs232._id,
          _type: 'rs232'
        }
      }).filter(item => item !== null)

      const mapTcpIp = layoutStore?.NovoDS?.Hardware?.TcpIpSettings?.isEnabled ? layoutStore?.NovoDS?.Hardware?.TcpIpSettings?.TcpIp?.map((tcpip, index) => {
        if (!tcpip) return null
        return {
          ...tcpip,
          _uuid: uid(),
          _name: tcpip._id + ' ' + tcpip._name,
          _tcpip_id: tcpip._id,
          _type: 'tcp/ip'
        }
      }).filter(item => item !== null) : []

      const combinedOptions = [
        ...mapGPIO || [],
        ...mapRs232 || [],
        ...mapTcpIp || [],
        ...this.extraEventOption || []
      ]

      return combinedOptions
    },
    GetActionTypeOptions() {
      const layoutStore = useLayoutStore()
      const mapGPIO = layoutStore?.NovoDS?.Hardware?.GPIOSettings?.GPIO?.map((gpio, index) => {
        if (!gpio || !gpio._isEnabled || gpio._role === 'output') return null
        return {
          ...gpio,
          _uuid: uid(),
          _name: gpio._gpio_number + ' ' + gpio._name,
          _id: gpio._gpio_number,
          _gpio_number: gpio._gpio_number,
          _type: 'gpio'
        }
      }).filter(item => item !== null)

      const mapRs232 = layoutStore?.NovoDS?.Hardware?.Rs232Settings?.Rs232?.map((rs232, index) => {
        if (!rs232 || !rs232._isEnabled) return null
        return {
          ...rs232,
          _uuid: uid(),
          _name: 'RS232-' + rs232._interface,
          _rs232_id: rs232._id,
          _type: 'rs232'
        }
      }).filter(item => item !== null)

      const mapTcpIp = layoutStore?.NovoDS?.Hardware?.TcpIpSettings?.TcpIp?.map((tcpip, index) => {
        if (!tcpip) return null
        return {
          ...tcpip,
          _uuid: uid(),
          _name: tcpip._id + ' ' + tcpip._name,
          _tcpip_id: tcpip._id,
          _type: 'tcp/ip'
        }
      }).filter(item => item !== null)

      const combinedOptions = [
        ...mapGPIO || [],
        ...mapRs232 || [],
        ...mapTcpIp || []

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

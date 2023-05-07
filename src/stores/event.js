import { defineStore } from 'pinia'

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
    }
  }),
  getters: {
    GetCurrentEvent() {
      return this.currentEvent
    },
    GetCurrentEventIndex() {
      return this.currentEventIndex
    },
    GetEventTypeOptions() {
      return this.eventTypeOptions
    },
    GetActionTypeOptions() {
      return this.actionTypeOptions
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

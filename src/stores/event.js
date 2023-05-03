import { defineStore } from 'pinia'

export const useEventListStore = defineStore('eventList', {
  state: () => ({
    currentEvent: '',
    currentEventIndex: '',
    eventOptions: [
      {
        label: 'Via',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
      },
      {
        label: 'Action',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
      }
    ],
    actionOptions: [
      {
        label: 'Via',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
      },
      {
        label: 'Action',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
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
    GetEventOptions() {
      return this.eventOptions
    },
    GetActionOptions() {
      return this.actionOptions
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

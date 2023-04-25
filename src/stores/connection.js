import { defineStore } from 'pinia'

export const useConnectionListStore = defineStore('connectionList', {
  state: () => ({
    interactives: [
      {
        label: 'Event/Action',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
      },
      {
        label: 'Event/Action',
        options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
        model: ''
      }
    ],
    outputs: [
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
  getters: {},
  actions: {
    SetConnectionList(connectionList) {
      this.connectionList = connectionList
    }
  }
})

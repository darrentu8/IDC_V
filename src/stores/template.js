import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', {
  state: () => ({
    xs: 16,
    ys: 16,
    w: 618,
    h: 348,
    section: [],
    startDraw: null,
    currentRect: null,
    hoverColor: 'rgba(62,62,141, 0.6)' // "#55B3FF"
  }),
  getters: {},
  actions: {
    SetTemplate (template) {
      this.template = template
    }
  }
})

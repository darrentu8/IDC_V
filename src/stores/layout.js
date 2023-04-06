import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: {
      rowCount: 1,
      colCount: 2,
      layout: [{ selected: true, x: 0, y: 0, w: 1, h: 1, i: '1' }, { selected: false, x: 1, y: 0, w: 1, h: 1, i: '2' }]
    }
    // slect{
    // xs: 16,
    // ys: 16,
    // w: 618,
    // h: 348,
    // section: [],
    // startDraw: null,
    // currentRect: null,
    // hoverColor: 'rgba(62,62,141, 0.6)' // "#55B3FF"
  }),
  getters: {},
  actions: {
    SetLayout(layout) {
      this.layout = layout
    },
    SetSelect(layout, i) {
      layout.forEach(e => {
        e.active = false
      })
      this.layout[i].select = true
    }
  }
})

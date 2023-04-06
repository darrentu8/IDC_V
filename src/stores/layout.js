import { defineStore } from 'pinia'
import { useWidgetListStore } from './widget'
const widgetStore = useWidgetListStore()

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    layout: {
      rowCount: 1,
      colCount: 2,
      layout: [{ x: 0, y: 0, w: 1, h: 1, i: '1' }, { x: 1, y: 0, w: 1, h: 1, i: '2' }]
    },
    currentGridIndex: '1'
  }),
  getters: {
  },
  actions: {
    SetLayout(layout) {
      this.layout = layout
      this.SetWidgetList()
    },
    SetWidgetList() {
      const Data = this.layout.layout
      const arrayData = Data.map((e, i) => ({
        id: Data[i].i,
        title: Data[i].i,
        type: '',
        active: false
      }))
      widgetStore.setWidgetListData(arrayData)
    },
    SetCurrentGrid(i) {
      console.log('currentGridIndex', i)
      this.currentGridIndex = i
    }
  }
})

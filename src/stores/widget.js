import { defineStore } from 'pinia'
export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    widgetOption: [
      {
        label: 'text',
        value: 'text',
        icon: 'img:/icon/text.png'
      },
      {
        label: 'media',
        value: 'media',
        icon: 'img:/icon/media.png'
      },
      {
        label: 'twitter',
        value: 'twitter',
        icon: 'img:/icon/twitter.png'
      },
      {
        label: 'webpage',
        value: 'webpage',
        icon: 'img:/icon/webpage.png'
      }
    ],
    widgetListData: null,
    currentWidget: {}
  }),
  getters: {
    getWidgetListData() {
      return this.widgetListData
    }
  },
  actions: {
    setWidgetListData(data) {
      if (data) {
        this.widgetListData = data
      }
    }
  }
})

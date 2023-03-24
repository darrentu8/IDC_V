import { defineStore } from 'pinia'

export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    widgetList: [
      {
        title: 'Text-1',
        icon: 'img:/icon/text.png',
        active: true
      },
      {
        title: 'Media-1',
        icon: 'img:/icon/media.png',
        active: false
      },
      {
        title: 'Twitter-1',
        icon: 'img:/icon/twitter.png',
        active: false
      },
      {
        title: 'Webpage-1',
        icon: 'img:/icon/webpage.png',
        active: false
      }
  ],
  currentWidget: {}
}),
  getters: {},
  actions: {
    SetWidgetList (widgetList) {
      this.widgetList = widgetList
    }
  }
})

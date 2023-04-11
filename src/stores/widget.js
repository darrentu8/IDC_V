import { defineStore } from 'pinia'
export const useWidgetListStore = defineStore('widgetList', {
  state: () => ({
    widgetOption: [
      {
        label: 'TEXT',
        value: 'TEXT',
        icon: 'img:/icon/text.png'
      },
      {
        label: 'MEDIA',
        value: 'MEDIA',
        icon: 'img:/icon/media.png'
      },
      {
        label: 'TWITTER',
        value: 'TWITTER',
        icon: 'img:/icon/twitter.png'
      },
      {
        label: 'WEBPAGE',
        value: 'WEBPAGE',
        icon: 'img:/icon/webpage.png'
      }
    ],
    widgetListData: [
      {
        id: '1',
        ContentType: '',
        section: [],
        active: false
      },
      {
        id: '2',
        ContentType: '',
        section: [],
        active: false
      }
    ],
    currentListIndex: '1',
    currentWidget: {}
  }),
  getters: {
    GetWidgetListData() {
      return this.widgetListData
    }
  },
  actions: {
    SetWidgetListData(data) {
      if (data) {
        this.widgetListData = data
      }
    },
    SetCurrentListIndex(i) {
      this.currentListIndex = i
    },
    SetWidget(Index, ContentType) {
      this.widgetListData[Index].ContentType = ContentType
    }
  }
})

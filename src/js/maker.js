import { extend, uid } from 'quasar'
import {
  ContentTypeEnum, mediaContentTemplate, textContentTemplate,
  pageTemplate, playListTemplate, sectionTemplate, timelineItemTemplate, webpageContentTemplate,
  youtubeContentTemplate, twitterContentTemplate, clockContentTemplate, socialMediaContentTemplate,
  weatherContentTemplate
} from './constant'
import { getColorFile, isPortrait } from './helper'
import { usePlaylistStore } from 'src/stores/playlist'
import { useCommonStore } from 'src/stores/common'

const playlistStore = usePlaylistStore()
const commonStore = useCommonStore()

export const makeSection = (layoutItem) => {
  const section = extend(true, {}, sectionTemplate)

  section._X = layoutItem.x
  section._Y = layoutItem.y
  section._Width = layoutItem.w
  section._Height = layoutItem.h

  return section
}

export const makePage = (playlist, layoutInfo) => {
  const page = extend(true, {}, pageTemplate)

  page._ID = uid()
  page._Row = layoutInfo.rowCount
  page._Column = layoutInfo.columnCount
  page._Orientation = commonStore.deviceInfo.orientation

  if (!Array.isArray(playlist.NovoDS.Timeline.Item)) {
    playlist.NovoDS.Timeline.Item = [playlist.NovoDS.Timeline.Item]
  }
  const timelineItem = extend(true, {}, timelineItemTemplate)
  timelineItem._Page = page._ID
  playlist.NovoDS.Timeline.Item.push(timelineItem)

  layoutInfo.layout.forEach((layoutItem, index) => {
    const section = makeSection(layoutItem)
    section._Index = index + 1
    page.Section.push(section)
  })

  return page
}

export const makePlaylist = (layoutInfo) => {
  const playlist = extend(true, {}, playListTemplate)

  playlist.NovoDS.BottomPage._Orientation = commonStore.deviceInfo.orientation
  const isOriPortrait = isPortrait(+commonStore.deviceInfo.orientation)

  const whiteColorFile = getColorFile('#FFFFFFFF', true, isOriPortrait ? 2160 : 3840, isOriPortrait ? 3840 : 2160)
  playlist.NovoDS.BottomPage.Section.Content.MediaItem._src = whiteColorFile.name
  playlist.NovoDS.BottomPage.Section.Content.MediaItem._fileSize = whiteColorFile.size
  playlistStore.addFile(whiteColorFile)

  playlist.NovoDS.Pages.Page.push(makePage(playlist, layoutInfo))

  return playlist
}

export const setSectionContent = (contentType, section) => {
  if (contentType === ContentTypeEnum.Media) {
    setSectionContentMedia(section)
  } else if (contentType === ContentTypeEnum.Text) {
    setSectionContentText(section)
  } else if (contentType === ContentTypeEnum.Web_Page) {
    setSectionContentWebpage(section)
  } else if (contentType === ContentTypeEnum.Youtube) {
    setSectionContentYoutube(section)
  } else if (contentType === ContentTypeEnum.Twitter) {
    setSectionContentTwitter(section)
  } else if (contentType === ContentTypeEnum.Weather) {
    setSectionContentWeather(section)
  } else if (contentType === ContentTypeEnum.Clock) {
    setSectionContentClock(section)
  } else if (contentType === ContentTypeEnum.Social_Media) {
    setSectionContentSocialMedia(section)
  }
}

export const setSectionContentMedia = (section) => {
  section._ContentType = ContentTypeEnum.Media
  section.Content = extend(true, {}, mediaContentTemplate)
}

export const setSectionContentText = (section) => {
  section._ContentType = ContentTypeEnum.Text
  section.Content = extend(true, {}, textContentTemplate)
}

export const setSectionContentWebpage = (section) => {
  section._ContentType = ContentTypeEnum.Web_Page
  section.Content = extend(true, {}, webpageContentTemplate)
}

export const setSectionContentYoutube = (section) => {
  section._ContentType = ContentTypeEnum.Youtube
  section.Content = extend(true, {}, youtubeContentTemplate)
}

export const setSectionContentTwitter = (section) => {
  section._ContentType = 'Misc'
  section.Content = extend(true, {}, twitterContentTemplate)
}

export const setSectionContentWeather = (section) => {
  section._ContentType = 'Misc'
  section.Content = extend(true, {}, weatherContentTemplate)
}

export const setSectionContentClock = (section) => {
  section._ContentType = 'Misc'
  section.Content = extend(true, {}, clockContentTemplate)
}

export const setSectionContentSocialMedia = (section) => {
  section._ContentType = 'Misc 2'
  section.Content = extend(true, {}, socialMediaContentTemplate)
}

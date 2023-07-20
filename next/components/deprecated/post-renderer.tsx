import RichText from './RichText'
import ImageSlider from './comps/ImageSlider'
import Quote from './comps/Quote'
import Media from './comps/Media'
import VideoEmbed from './comps/VideoEmbed'

export function postRenderer(section: any, index: number) {
  switch (section.__component) {
    case 'shared.rich-text':
      return <RichText key={index} data={section} />
    case 'shared.slider':
      return <ImageSlider key={index} data={section} />
    case 'shared.quote':
      return <Quote key={index} data={section} />
    case 'shared.media':
      return <Media key={index} data={section} />
    case 'shared.video-embed':
      return <VideoEmbed key={index} data={section} />
    default:
      return null
  }
}

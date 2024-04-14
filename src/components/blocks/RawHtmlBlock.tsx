import BlockContainer from '@/components/BlockContainer'

interface RawHtml {
  id: string
  raw_html: string
}

interface RawHtmlBlockProps {
  data: RawHtml
}

export default function RawHtmlBlock({ data }: RawHtmlBlockProps) {
  return (
    <BlockContainer>
      <div dangerouslySetInnerHTML={{ __html: data.raw_html }}></div>
    </BlockContainer>
  )
}

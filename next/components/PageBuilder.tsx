import React from 'react'
import { Page } from '@/lib/schemas'
import RichTextBlock from '@/components/blocks/RichTextBlock'
import HeroBlock from '@/components/blocks/HeroBlock'
import GalleryBlock from '@/components/blocks/GalleryBlock'
import QuoteBlock from '@/components/blocks/QuoteBlock'
import LogoCloudBlock from '@/components/blocks/LogoCloudBlock'
import VideoBlock from '@/components/blocks/VideoBlock'
import TestimonialsBlock from '@/components/blocks/TestimonialsBlock'
import StepsBlock from '@/components/blocks/StepsBlock'
import FaqsBlock from '@/components/blocks/FaqsBlock'
import CtaBlock from '@/components/blocks/CtaBlock'
import RawHtmlBlock from '@/components/blocks/RawHtmlBlock'
import TeamBlock from '@/components/blocks/TeamBlock'
import ColumnsBlock from '@/components/blocks/ColumnsBlock'
import CardGroupBlock from '@/components/blocks/CardGroupBlock'
import FormBlock from './blocks/FormBlock'

function PageBuilder({ page }: { page: Page }) {
  return (
    <div className='mx-auto' id='content'>
      {page.blocks &&
        page.blocks.map((block) => {
          switch (block.collection) {
            case 'block_richtext':
              return <RichTextBlock data={block.item as any}></RichTextBlock>
            case 'block_hero':
              return <HeroBlock data={block.item as any}></HeroBlock>
            case 'block_gallery':
              return <GalleryBlock data={block.item as any}></GalleryBlock>
            case 'block_quote':
              return <QuoteBlock data={block.item as any}></QuoteBlock>
            case 'block_logocloud':
              return <LogoCloudBlock data={block.item as any}></LogoCloudBlock>
            case 'block_video':
              return <VideoBlock data={block.item as any}></VideoBlock>
            case 'block_testimonials':
              return (
                <TestimonialsBlock data={block.item as any}></TestimonialsBlock>
              )
            case 'block_steps':
              return <StepsBlock data={block.item as any}></StepsBlock>
            case 'block_faqs':
              return <FaqsBlock data={block.item as any}></FaqsBlock>
            case 'block_cta':
              return <CtaBlock data={block.item as any}></CtaBlock>
            case 'block_html':
              return <RawHtmlBlock data={block.item as any}></RawHtmlBlock>
            case 'block_team':
              return <TeamBlock data={block.item as any}></TeamBlock>
            case 'block_columns':
              return <ColumnsBlock data={block.item as any}></ColumnsBlock>
            case 'block_cardgroup':
              return <CardGroupBlock data={block.item as any}></CardGroupBlock>
            case 'block_form':
              return <FormBlock data={block.item as any}></FormBlock>
          }
        })}
    </div>
  )
}

export default PageBuilder

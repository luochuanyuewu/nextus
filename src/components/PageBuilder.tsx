import React from 'react'
import { Pages } from '@/data/directus-collections'
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
import ColumnsBlock from '@/components/blocks/ColumnsBlock'
import CardGroupBlock from '@/components/blocks/CardGroupBlock'
import FormBlock from '@/components/blocks/FormBlock'
import TeamBlock from '@/components/blocks/TeamBlockServer'
import FeaturesBlock from '@/components/blocks/FeaturesBlock'

function PageBuilder({ page }: { page: Pages }) {
  return (
    <div className='mx-auto' id='content'>
      {page.translations &&
        page.translations[0] &&
        page.translations[0].blocks.map((block) => {
          switch (block.collection) {
            case 'block_features':
              return (
                <FeaturesBlock key={block.id} data={block.item}></FeaturesBlock>
              )
            case 'block_richtext':
              return (
                <RichTextBlock key={block.id} data={block.item}></RichTextBlock>
              )
            case 'block_hero':
              return <HeroBlock key={block.id} data={block.item}></HeroBlock>
            case 'block_gallery':
              return (
                <GalleryBlock key={block.id} data={block.item}></GalleryBlock>
              )
            case 'block_quote':
              return <QuoteBlock key={block.id} data={block.item}></QuoteBlock>
            case 'block_logocloud':
              return (
                <LogoCloudBlock
                  key={block.id}
                  data={block.item}
                ></LogoCloudBlock>
              )
            case 'block_video':
              return <VideoBlock key={block.id} data={block.item}></VideoBlock>
            case 'block_testimonials':
              return (
                <TestimonialsBlock
                  key={block.id}
                  data={block.item}
                ></TestimonialsBlock>
              )
            case 'block_steps':
              return <StepsBlock key={block.id} data={block.item}></StepsBlock>
            case 'block_faqs':
              return <FaqsBlock key={block.id} data={block.item}></FaqsBlock>
            case 'block_cta':
              return <CtaBlock key={block.id} data={block.item}></CtaBlock>
            case 'block_html':
              return (
                <RawHtmlBlock key={block.id} data={block.item}></RawHtmlBlock>
              )
            case 'block_team':
              return <TeamBlock key={block.id} data={block.item}></TeamBlock>
            case 'block_columns':
              return (
                <ColumnsBlock key={block.id} data={block.item}></ColumnsBlock>
              )
            case 'block_cardgroup':
              return (
                <CardGroupBlock
                  key={block.id}
                  data={block.item}
                ></CardGroupBlock>
              )
            case 'block_form':
              return <FormBlock key={block.id} data={block.item}></FormBlock>
          }
        })}
    </div>
  )
}

export default PageBuilder

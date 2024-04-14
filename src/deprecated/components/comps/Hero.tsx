import { Link } from '@/lib/navigation'
import Image from 'next/image'
import HighlightedText from '@/components/navigation/HighlightedText'
import { getStrapiMedia } from '@/lib/utils/directus-helpers'
import { renderButtonStyle } from '@/lib/utils/render-button-style'

interface Button {
  id: string
  url: string
  text: string
  type: string
  newTab: boolean
}

interface Picture {
  data: {
    id: string
    attributes: {
      url: string
      name: string
      alternativeText: string
    }
  }
}

interface HeroProps {
  data: {
    id: string
    title: string
    description: string
    picture: Picture
    buttons: Button[]
  }
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url)

  return (
    <div className='hero min-h-fit bg-base-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <Image
          src={imgUrl as any}
          className='max-w-sm rounded-lg shadow-2xl'
          height={400}
          width={400}
          alt='HeroImage'
        />
        <div>
          <h1 className='text-5xl font-bold'>{data.title}</h1>
          <p className='py-6'>{data.description}</p>

          {data.buttons.map((button: Button, index: number) => (
            <Link
              key={index}
              href={button.url}
              target={button.newTab ? '_blank' : '_self'}
            >
              <button className={renderButtonStyle(button.type)}>
                {button.text}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section className='dark:bg-black dark:text-gray-100'>
      <div className='container mx-auto flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24'>
        <div className='flex flex-col justify-center rounded-lg p-6 text-center lg:max-w-md lg:text-left xl:max-w-lg'>
          <HighlightedText
            text={data.title}
            tag='h1'
            className='mb-8 text-5xl font-bold leading-none sm:text-6xl'
            color='dark:text-violet-400'
          />

          <HighlightedText
            text={data.description}
            tag='p'
            className='tmt-6 mb-8 text-lg sm:mb-12'
            color='dark:text-violet-400'
          />
          <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start'>
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? '_blank' : '_self'}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className='xl:h-112 2xl:h-128 mt-8 flex h-72 items-center justify-center p-6 sm:h-80 lg:mt-0 lg:h-96'>
          <Image
            src={imgUrl || ''}
            alt={
              data.picture.data.attributes.alternativeText || 'none provided'
            }
            className='xl:h-112 2xl:h-128 h-72 object-contain sm:h-80 lg:h-96 '
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  )
}

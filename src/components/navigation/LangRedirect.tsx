import Image from 'next/image'
import HighlightedText from '@/components/navigation/HighlightedText'
import { getTranslations } from '@/i18n/i18n'

export default async function LangRedirect({ lang }: { lang: string }) {
  const { t } = await getTranslations({ locale: lang })

  return (
    <section>
      <div className='container mx-auto flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24'>
        <div className='flex flex-col justify-center rounded-lg p-6 text-center lg:max-w-md lg:text-left xl:max-w-lg'>
          <HighlightedText
            text={t('global.lang_redirect.heading')}
            tag='h1'
            className='mb-8 text-5xl font-bold leading-none sm:text-4xl'
            color='dark:text-violet-400'
          />
          {t('global.lang_redirect.note')}
        </div>
        <div className='xl:h-112 2xl:h-128 mt-8 flex h-72 items-center justify-center p-6 sm:h-80 lg:mt-0 lg:h-96'>
          <Image
            src='https://images.pexels.com/photos/409701/pexels-photo-409701.jpeg'
            alt='city view'
            className='xl:h-112 2xl:h-128 h-72 object-contain sm:h-80 lg:h-96 '
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  )
}

import Hero from './comps/Hero'
import FeaturesBlock from '@/components/blocks/FeaturesBlock'
import Testimonials from './comps/Testimonials_deprecated'
import PricingBlock from '@/components/blocks/PricingBlock'
import Email from './comps/Email'

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero key={index} data={section} />
    case 'sections.features':
      return <FeaturesBlock key={index} data={section} />
    case 'sections.testimonials-group':
      return <Testimonials key={index} data={section} />
    case 'sections.pricing':
      return <PricingBlock key={index} data={section} />
    case 'sections.lead-form':
      return <Email key={index} data={section} />
    default:
      return null
  }
}

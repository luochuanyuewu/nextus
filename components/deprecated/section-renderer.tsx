import Hero from './comps/Hero'
import Features from './comps/Features'
import Testimonials from './comps/Testimonials_deprecated'
import Pricing from './comps/Pricing'
import Email from './comps/Email'

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero key={index} data={section} />
    case 'sections.features':
      return <Features key={index} data={section} />
    case 'sections.testimonials-group':
      return <Testimonials key={index} data={section} />
    case 'sections.pricing':
      return <Pricing key={index} data={section} />
    case 'sections.lead-form':
      return <Email key={index} data={section} />
    default:
      return null
  }
}

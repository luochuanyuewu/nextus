import { Link } from '@/lib/navigation'

interface FeaturesBlockProps {
  data: {
    title: string
    description: string
    features: Feature[]
  }
}

interface Feature {
  id: string
  title: string
  description: string
  show_link: boolean
  new_tab: boolean
  url: string
  text: string
}

function Feature({
  title,
  description,
  show_link,
  new_tab,
  url,
  text,
}: Feature) {
  return (
    <div className='flex flex-col items-center p-4'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        className='h-8 w-8'
      >
        <path
          fillRule='evenodd'
          d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
          clipRule='evenodd'
        ></path>
      </svg>
      <h3 className='my-3 text-3xl font-semibold'>{title}</h3>
      <div className='my-6 space-y-1 leading-tight'>
        <p>{description}</p>
      </div>
      {show_link && url && text && (
        <div>
          <Link href={url} target={new_tab ? '_blank' : '_self'} className=''>
            <button className='btn btn-accent btn-outline'>{text}</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default function FeaturesBlock({ data }: FeaturesBlockProps) {
  return (
    <section className='m:py-12lg:py-24'>
      <div className='container mx-auto space-y-2 py-4 text-center'>
        <h2 className='text-5xl font-bold'>{data.title}</h2>
        <p>{data.description}</p>
      </div>
      <div className='container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data.features.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  )
}

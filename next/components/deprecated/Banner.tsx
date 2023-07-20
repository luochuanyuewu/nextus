function colors(type: string) {
  switch (type) {
    case 'info':
      return 'bg-violet-400'
    case 'warning':
      return 'bg-yellow-500'
    case 'alert':
      return 'bg-pink-500'
    default:
      return 'bg-gray-900'
  }
}

interface BannerProps {
  data: {
    show: boolean
    heading: string
    text: string
    type: string
    link: {
      id: number
      url: string
      newTab: boolean
      text: string
    }
  } | null
}

export default function Banner({ data }: BannerProps) {
  if (!data) return null
  const { show, heading, text, type, link } = data

  if (!show) return null

  return (
    <div className='toast toast-start '>
      <div className='alert alert-warning'>
        <div>
          <a href={link.url} target={link.newTab ? '_blank' : '_self'}>
            <strong className='font-semibold'>{heading}</strong> {text}&nbsp;
            <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

interface QuoteProps {
  data: {
    title: string
    body: string
    author: string
  }
}

export default function Quote({ data }: QuoteProps) {
  const { title, body, author } = data

  return (
    <div className='mx-12 flex flex-col items-center py-44 lg:mx-0'>
      {title && <h2 className='my-4'>{title}</h2>}
      <div className='relative text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='currentColor'
          className='absolute -left-4 top-0 h-4 w-4 '
        >
          <path d='M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z'></path>
          <path d='M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z'></path>
        </svg>
        <p className='px-6 py-1 text-lg italic'>{body}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='currentColor'
          className='absolute -right-4 bottom-0 h-4 w-4 '
        >
          <path d='M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z'></path>
          <path d='M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z'></path>
        </svg>
      </div>
      <span className='my-2 h-1 w-12 rounded-lg'></span>
      {author ? <p>{author}</p> : 'unknown'}
    </div>
  )
}

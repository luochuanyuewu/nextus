'use client'
import RadialProgress from './RadialProgress'
import VIcon from './base/VIcon'
import useScroll from '@/lib/hooks/useScroll'

const ScrollToTopButton = () => {
  const { progress, scrollToTop } = useScroll()

  return (
    <div className='fixed bottom-4 left-4 z-10'>
      <div className='flex items-center'>
        <div className='relative'>
          <RadialProgress
            radius={25}
            progress={progress}
            stroke={5}
            className='text-accent/75'
          />
          {progress >= 0.95 && (
            <button
              onClick={scrollToTop}
              className='absolute inset-0 flex items-center justify-center'
            >
              <VIcon
                icon='heroicons:arrow-up-20-solid'
                className='h-4 w-4 text-accent/75 hover:text-gray-500'
              />
            </button>
          )}
        </div>
        {progress >= 0.95 && (
          <span className='rounded-br-lg rounded-tl-lg bg-gray-300 bg-opacity-50 p-1 font-mono text-gray-700 dark:bg-gray-700 dark:text-gray-200'>
            go top
          </span>
        )}
      </div>
    </div>
  )
}

export default ScrollToTopButton
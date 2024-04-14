// 'use client';
// import Error from '@/components/Error'; // Error components must be Client components

// export default function RootErrorBoundary() {
//     return <Error />;
// }

'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex min-h-screen flex-auto flex-col items-center justify-center'>
      <div className='alert alert-error shadow-lg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 shrink-0 stroke-current'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>

        <div>
          <h3 className='font-bold'>出错啦!</h3>
          <span>{JSON.stringify(error.message)}</span>
        </div>
        <button className='btn btn-sm' onClick={() => reset()}>
          重试
        </button>
      </div>
    </div>
  )
}

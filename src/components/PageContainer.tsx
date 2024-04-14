import React from 'react'

interface PageContainerProps {
  children?: React.ReactNode
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='mx-auto max-w-7xl px-6 py-8 md:py-24 lg:px-8 lg:py-12'>
      {children}
    </div>
  )
}

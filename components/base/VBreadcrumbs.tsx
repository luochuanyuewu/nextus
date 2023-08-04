import Link from 'next-intl/link'
import React from 'react'
import VIcon from './VIcon'

interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function VBreadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className='flex flex-wrap items-baseline space-x-2 pb-4 font-mono text-base dark:text-gray-200'>
      {items.map((item, itemIdx) => (
        <React.Fragment key={itemIdx}>
          {itemIdx !== items.length - 1 && item.href ? (
            <Link href={item.href} className='hover:text-accent'>
              {item.title}
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
          {itemIdx !== items.length - 1 && (
            <div className=''>
              <VIcon icon='heroicons:chevron-right' className='mb-1 h-5' />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

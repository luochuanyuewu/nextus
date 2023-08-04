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
    <div className='breadcrumbs text-sm'>
      <ul>
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            {itemIdx !== items.length - 1 && item.href ? (
              <Link href={item.href} className='hover:text-accent'>
                {item.title}
              </Link>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

'use client'
import { NavigationItems } from '@/lib/directus-collections'
import Link from 'next/link'
import VIcon from '../base/VIcon'
import { convertIconName } from '@/lib/utils/strings'

function getUrl(item: NavigationItems) {
  if (item.type === 'page' && typeof item.page !== 'string') {
    return `/${item.page?.slug}`
  } else {
    return item?.url ?? ''
  }
}

export default function NavigationItem({ item }: { item: NavigationItems }) {
  const handleClick = () => {
    const elem = document.activeElement
    if (elem) {
      // @ts-ignore
      elem?.blur()
    }
  }

  return (
    <>
      {!item.has_children && (
        <li>
          <Link
            href={getUrl(item)}
            target={item.open_in_new_tab ? '_blank' : '_self'}
          >
            {item.icon && <VIcon icon={convertIconName(item.icon)} />}
            {item.title}
          </Link>
        </li>
      )}
      {item.has_children && item.children && (
        <li tabIndex={0}>
          <details>
            <summary>{item.title}</summary>
            <ul className='z-10 p-2' onClick={handleClick}>
              {item.children.map((childItem, index) => (
                <li key={index}>
                  <Link href={getUrl(childItem)}>
                    {childItem.icon && (
                      <VIcon
                        icon={convertIconName(childItem.icon)}
                        className='h-10 w-10'
                      />
                    )}
                    <div className='whitespace-nowrap font-bold'>
                      {childItem.title}
                    </div>
                    {childItem.label && (
                      <p className='mt-1 text-sm leading-tight'>
                        {childItem.label}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      )}
    </>
  )
}

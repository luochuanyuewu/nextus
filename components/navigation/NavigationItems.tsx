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

function NavigationChildrenItems({ items }: { items: NavigationItems[] }) {
  return (
    <>
      {items.map((childItem, index) => (
        <li key={index}>
          <Link href={getUrl(childItem)}>
            {childItem.icon && (
              <VIcon
                icon={convertIconName(childItem.icon)}
                className='h-10 w-10'
              />
            )}
            <div className='whitespace-nowrap font-bold'>{childItem.title}</div>
            {childItem.label && (
              <p className='mt-1 text-sm leading-tight'>{childItem.label}</p>
            )}
          </Link>
        </li>
      ))}
    </>
  )
}

function NavigationItem({
  item,
  mobile,
}: {
  item: NavigationItems
  mobile?: boolean
}) {
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
        <li onClick={handleClick}>
          <Link
            href={getUrl(item)}
            target={item.open_in_new_tab ? '_blank' : '_self'}
          >
            {item.icon && <VIcon icon={convertIconName(item.icon)} />}
            {item.title}
          </Link>
        </li>
      )}
      {item.has_children && !mobile && item.children && (
        <li onClick={handleClick} tabIndex={0}>
          <details>
            <summary>{item.title}</summary>
            <ul className='z-10 p-2'>
              <NavigationChildrenItems
                items={item.children}
              ></NavigationChildrenItems>
            </ul>
          </details>
        </li>
      )}
      {item.has_children && mobile && item.children && (
        <li onClick={handleClick}>
          <a>{item.title}</a>
          <ul className='z-10 p-2'>
            <NavigationChildrenItems
              items={item.children}
            ></NavigationChildrenItems>
          </ul>
        </li>
      )}
    </>
  )
}

export default function NavigationItems({
  items,
  mobile,
  className,
  tabIndex,
}: {
  items: NavigationItems[]
  mobile?: boolean
  className?: string
  tabIndex?: number
}) {
  const handleClick = () => {
    const elem = document.activeElement
    if (elem) {
      // @ts-ignore
      elem?.blur()
    }
  }

  return (
    <>
      <ul tabIndex={tabIndex} className={className} onClick={handleClick}>
        {items.map((item, index) => (
          <NavigationItem
            mobile={mobile}
            key={index}
            item={item}
          ></NavigationItem>
        ))}
      </ul>
    </>
  )
}

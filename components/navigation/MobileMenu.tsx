'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LogoV2 from '../LogoV2'
import Link from 'next/link'
import VButton from '@/components/base/VButton'
import VIcon from '@/components/base/VIcon'
import { Navigation } from '@/lib/directus-collections'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface MobileMenuProps {
  navigation: Navigation
  tagline?: string
}

const MobileMenu = ({ navigation, tagline }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggle = () => {
    setIsOpen(!isOpen)
    setSubMenuOpen(false)
  }

  return (
    <div>
      {/* Menu */}
      <div className='fixed inset-0 z-50 flex h-full w-full flex-col '>
        <div className='relative w-full px-6 py-6'>
          <Link href='/'>
            <LogoV2 className='h-6 ' />
          </Link>
          <p className='mt-2 border-b  pb-4 font-mono '>{tagline}</p>
          {/* <DarkModeToggle className='absolute right-4 top-4 text-gray-500 hover:text-accent dark:text-gray-200' /> */}
        </div>
        <div className='flex h-full flex-col justify-center space-y-2 px-6'>
          {/* {navigation.items.map((item) => (
            <NavigationMobileMenuItem
              key={item.id}
              item={item}
              onClose={toggle}
            />
          ))} */}
          <div className='flex w-full flex-col px-4'>
            <VButton href='/contact-us' variant='primary'>
              Talk
            </VButton>
          </div>
        </div>
      </div>
      {/* Button */}
      <button
        onClick={toggle}
        className={`fixed bottom-4 right-4 z-50 p-4 text-white shadow-md transition duration-300 md:hidden ${
          isOpen || !isOpen ? 'bg-accent' : ''
        } rounded-bl-xl rounded-tr-xl hover:bg-opacity-75`}
      >
        <div>
          <span className='sr-only'>Close</span>
          <VIcon
            icon='heroicons:bars-3'
            className={`h-6 w-6 ${!isOpen ? '' : 'hidden'}`}
          />
          <VIcon
            icon='heroicons:x-mark'
            className={`h-6 w-6 ${isOpen ? '' : 'hidden'}`}
          />
        </div>
      </button>
    </div>
  )
}

export default MobileMenu

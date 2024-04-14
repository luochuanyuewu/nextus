import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import VIcon from '@/components/base/VIcon'

interface DropdownProps {
  buttonLabel?: string
  variant?: 'default' | 'primary' | 'outline' | 'danger'
  menuItems?: Array<{
    label: string
    action: () => void
  }>
}

export const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel = 'Actions',
  variant = 'primary',
  menuItems = [{ label: 'Action', action: () => {} }],
}) => {
  const handleMenuItemClick = (item: { action: () => void }) => {
    item.action()
  }

  return (
    <div className='relative'>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button className='v-button'>
          <span>{buttonLabel}</span>
          <VIcon
            icon='heroicons:chevron-down'
            className='text-primary-200 hover:text-primary-100 -mr-1 ml-2 h-5 w-5'
            aria-hidden='true'
          />
        </Menu.Button>

        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-in'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800'>
            <div className='px-1 py-1'>
              {menuItems.map((item, itemIdx) => (
                <Menu.Item key={itemIdx}>
                  {({ active }) => (
                    <button
                      type='button'
                      onClick={() => handleMenuItemClick(item)}
                      className={`${
                        active
                          ? 'bg-accent text-white dark:bg-accent'
                          : 'text-gray-900 dark:text-gray-100'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

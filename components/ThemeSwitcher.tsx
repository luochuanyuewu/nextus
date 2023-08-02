'use client'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

export function ThemeSwitcher() {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  const themes = [
    {
      name: '🌝  light',
      id: 'light',
    },
    {
      name: '🌚  dark',
      id: 'dark',
    },
    {
      name: '🧁  cupcake',
      id: 'cupcake',
    },
    {
      name: '🐝  bumblebee',
      id: 'bumblebee',
    },
    {
      name: '✳️  Emerald',
      id: 'emerald',
    },
    {
      name: '🏢  Corporate',
      id: 'corporate',
    },
    {
      name: '🌃  synthwave',
      id: 'synthwave',
    },
    {
      name: '👴  retro',
      id: 'retro',
    },
    {
      name: '🤖  cyberpunk',
      id: 'cyberpunk',
    },
    {
      name: '🌸  valentine',
      id: 'valentine',
    },
    {
      name: '🎃  halloween',
      id: 'halloween',
    },
    {
      name: '🌷  garden',
      id: 'garden',
    },
    {
      name: '🌲  forest',
      id: 'forest',
    },
    {
      name: '🐟  aqua',
      id: 'aqua',
    },
    {
      name: '👓  lofi',
      id: 'lofi',
    },
    {
      name: '🖍  pastel',
      id: 'pastel',
    },
    {
      name: '🧚‍♀️  fantasy',
      id: 'fantasy',
    },
    {
      name: '📝  Wireframe',
      id: 'wireframe',
    },
    {
      name: '🏴  black',
      id: 'black',
    },
    {
      name: '💎  luxury',
      id: 'luxury',
    },
    {
      name: '🧛‍♂️  dracula',
      id: 'dracula',
    },
    {
      name: '🖨  CMYK',
      id: 'cmyk',
    },
    {
      name: '🍁  Autumn',
      id: 'autumn',
    },
    {
      name: '💼  Business',
      id: 'business',
    },
    {
      name: '💊  Acid',
      id: 'acid',
    },
    {
      name: '🍋  Lemonade',
      id: 'lemonade',
    },
    {
      name: '🌙  Night',
      id: 'night',
    },
    {
      name: '☕️  Coffee',
      id: 'coffee',
    },
    {
      name: '❄️  Winter',
      id: 'winter',
    },
  ]

  const dropdownClasses = ''

  return (
    // <div className='hidden lg:block'>
    <div className=''>
      <div
        title='Change Theme'
        className={`dropdown dropdown-end ${dropdownClasses}`}
      >
        <div
          tabIndex={0}
          data-umami-event='nav-theme-switcher'
          className='btn btn-ghost gap-1 normal-case'
        >
          <span className='dark:text-white  md:inline'>主题</span>
          <svg
            width='12px'
            height='12px'
            className='ml-1 hidden h-3 w-3 fill-current opacity-60 dark:text-white sm:inline-block'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 2048 2048'
          >
            <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z' />
          </svg>
        </div>
        <div className='dropdown-content rounded-t-box rounded-b-box top-px z-10 mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl'>
          <div className='grid grid-cols-1 gap-3 p-3' tabIndex={0}>
            {themes.map((theme) => (
              <button
                key={theme.id}
                className='overflow-hidden rounded-lg text-left outline-base-content'
                data-set-theme={theme.id}
              >
                <div
                  data-theme={theme.id}
                  className='w-full cursor-pointer bg-base-100 font-sans text-base-content'
                >
                  <div className='grid grid-cols-5 grid-rows-3'>
                    <div className='col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3'>
                      <div className='flex-grow text-sm font-bold'>
                        {theme.id}
                      </div>
                      <div className='flex h-full flex-shrink-0 flex-wrap gap-1'>
                        <div className='w-2 rounded bg-primary' />
                        <div className='w-2 rounded bg-secondary' />
                        <div className='w-2 rounded bg-accent' />
                        <div className='w-2 rounded bg-neutral' />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

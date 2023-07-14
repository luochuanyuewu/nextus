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
      name: "🌝  light",
      id: "light",
    },
    {
      name: "🌚  dark",
      id: "dark",
    },
    {
      name: "🧁  cupcake",
      id: "cupcake",
    },
    {
      name: "🐝  bumblebee",
      id: "bumblebee",
    },
    {
      name: "✳️  Emerald",
      id: "emerald",
    },
    {
      name: "🏢  Corporate",
      id: "corporate",
    },
    {
      name: "🌃  synthwave",
      id: "synthwave",
    },
    {
      name: "👴  retro",
      id: "retro",
    },
    {
      name: "🤖  cyberpunk",
      id: "cyberpunk",
    },
    {
      name: "🌸  valentine",
      id: "valentine",
    },
    {
      name: "🎃  halloween",
      id: "halloween",
    },
    {
      name: "🌷  garden",
      id: "garden",
    },
    {
      name: "🌲  forest",
      id: "forest",
    },
    {
      name: "🐟  aqua",
      id: "aqua",
    },
    {
      name: "👓  lofi",
      id: "lofi",
    },
    {
      name: "🖍  pastel",
      id: "pastel",
    },
    {
      name: "🧚‍♀️  fantasy",
      id: "fantasy",
    },
    {
      name: "📝  Wireframe",
      id: "wireframe",
    },
    {
      name: "🏴  black",
      id: "black",
    },
    {
      name: "💎  luxury",
      id: "luxury",
    },
    {
      name: "🧛‍♂️  dracula",
      id: "dracula",
    },
    {
      name: "🖨  CMYK",
      id: "cmyk",
    },
    {
      name: "🍁  Autumn",
      id: "autumn",
    },
    {
      name: "💼  Business",
      id: "business",
    },
    {
      name: "💊  Acid",
      id: "acid",
    },
    {
      name: "🍋  Lemonade",
      id: "lemonade",
    },
    {
      name: "🌙  Night",
      id: "night",
    },
    {
      name: "☕️  Coffee",
      id: "coffee",
    },
    {
      name: "❄️  Winter",
      id: "winter",
    },
  ]

  const dropdownClasses = ''

  return (
    <div className='hidden lg:block'>
      <div title="Change Theme" className={`dropdown dropdown-end ${dropdownClasses}`}>
        <div tabIndex={0} data-umami-event="nav-theme-switcher" className='btn btn-ghost gap-1 normal-case'>
          <span className="hidden md:inline">主题</span>
          <svg width="12px" height="12px" className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" /></svg>
        </div>
        <div className='dropdown-content z-10 mt-16 bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl'>
          <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
            {themes.map((theme) =>
            (
              <button key={theme.id} className="outline-base-content overflow-hidden rounded-lg text-left" data-set-theme={theme.id}>
                <div data-theme={theme.id} className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                  <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-span-5 row-span-3 row-start-1 flex gap-2 py-3 px-4 items-center">
                      <div className="flex-grow text-sm font-bold">
                        {theme.id}
                      </div>
                      <div className="flex flex-shrink-0 flex-wrap gap-1 h-full">
                        <div className="bg-primary w-2 rounded" />
                        <div className="bg-secondary w-2 rounded" />
                        <div className="bg-accent w-2 rounded" />
                        <div className="bg-neutral w-2 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
            )}
          </div>
        </div>
      </div >
    </div>

  )

  return (
    <>
      <select data-umami-event="nav-theme-switcher" aria-label='选择主题' data-choose-theme className="select max-w-xs">
        <option disabled >主题</option>
        <option value="">Default</option>
        <option value="dark">Dark</option>
        <option value="cupcake">Cupcake</option>
        <option value="bumblebee">Bumblebee</option>
        <option value="emerald">Emerald</option>
        <option value="corporate">Corporate</option>
        <option value="night">Night</option>
      </select>
    </>

  )
}

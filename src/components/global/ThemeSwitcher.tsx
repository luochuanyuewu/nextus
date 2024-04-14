'use client'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import VIcon from '@/components/base/VIcon'
import { availableThemes, getThemesFromEnv } from '@/lib/utils/theme'

function filterThemes(
  predefinedThemes: typeof availableThemes
): typeof availableThemes {
  const envConfig = getThemesFromEnv()
  // 检查环境变量的配置
  if (typeof envConfig === 'boolean') {
    // 如果环境变量是布尔值，表示是否启用主题
    if (envConfig) {
      return predefinedThemes // 返回所有预定义主题
    } else {
      return [availableThemes[0], availableThemes[1]] // 返回空数组，表示不使用任何主题
    }
  } else if (Array.isArray(envConfig)) {
    // 如果环境变量是数组，表示主题配置
    return predefinedThemes.filter((theme) => envConfig.includes(theme.id))
  }

  return predefinedThemes // 默认情况下返回空数组
}

export function ThemeSwitcher({ title = 'theme' }: { title?: string }) {
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div title='Change Theme' className={`dropdown dropdown-end `}>
      <div
        tabIndex={0}
        data-umami-event='nav-theme-switcher'
        className='btn btn-ghost gap-1 normal-case'
      >
        <span className='hidden font-normal md:inline'>{title}</span>
        <VIcon className='h-6 w-6' icon='mdi:theme-light-dark'></VIcon>
      </div>
      <div className='dropdown-content top-px z-50 mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto rounded-b-box rounded-t-box bg-base-200 text-base-content shadow-2xl'>
        <div className='grid grid-cols-1 gap-3 p-3' tabIndex={0}>
          {filterThemes(availableThemes).map((theme) => (
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
  )
}

import React from 'react'
import VIcon from '@/components/base/VIcon'

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error'
  html?: string | TrustedHTML
  children?: React.ReactNode
}

const iconMap = {
  info: 'heroicons:information-circle-solid',
  success: 'heroicons:check-circle-solid',
  warning: 'heroicons:exclamation-triangle-solid',
  error: 'heroicons:x-circle-solid',
}

function Alert(props: AlertProps) {
  const { type = 'info' } = props

  const getClassNames = () => {
    let classNames = 'p-4  border-2 rounded-tr-xl rounded-bl-xl '
    if (type === 'warning') {
      classNames += 'border-amber-500 text-amber-800 dark:text-amber-200'
    } else if (type === 'error') {
      classNames += 'border-rose-500 text-rose-800 dark:text-rose-200'
    } else if (type === 'success') {
      classNames += 'border-green-500 text-green-800 dark:text-green-200'
    } else if (type === 'info') {
      classNames += 'border-blue-500 text-blue-800 dark:text-blue-200'
    }
    return classNames
  }

  const getIconClass = () => {
    let iconClass = 'w-6 h-6 '
    if (type === 'warning') {
      iconClass += 'text-amber-500'
    } else if (type === 'error') {
      iconClass += 'text-rose-500'
    } else if (type === 'success') {
      iconClass += 'text-green-500'
    } else if (type === 'info') {
      iconClass += 'text-blue-500'
    }
    return iconClass
  }

  return (
    <div className={getClassNames()}>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <VIcon
            icon={iconMap[type]}
            className={getIconClass()}
            aria-hidden='true'
          />
        </div>
        {props.html && (
          <div
            className='ml-3 font-mono'
            dangerouslySetInnerHTML={{
              __html: props.html,
            }}
          >
            {props.children}
          </div>
        )}
        {!props.html && <div className='ml-3 font-mono'>{props.children}</div>}
      </div>
    </div>
  )
}

export default Alert

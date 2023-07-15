'use client'
import { useState, useEffect } from 'react'

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(!isOpen)
  }

  const map = {
    home: MessengerHome,
    help: MessengerHelp,
    chat: MessengerMessages,
    articles: MessengerArticles,
  }

  useEffect(() => {
    // If widget is open, watch for ESC key to close it
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        toggle()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div>
      <Motionable
        name='chat'
        as='div'
        show={isOpen}
        v-motion
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.0,
        }}
        enter={{
          opacity: 1,
          scale: 1,
          y: 0,
          transformOrigin: 'bottom right',
        }}
        leave={{
          opacity: 0,
          scale: 0.0,
          y: 50,
          transformOrigin: 'bottom right',
        }}
        className='chat-widget fixed bottom-[84px] right-4 z-50 flex w-96 max-w-[350px] flex-col overflow-hidden rounded-bl-xl rounded-tr-xl border-2 border-accent bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'
      >
        <div id='wrapper' className='absolute inset-0 flex flex-col'>
          {map[page]}
          {showMenu && (
            <MessengerMenu className='block border-t px-4 py-4 dark:border-t-gray-700' />
          )}
        </div>
      </Motionable>
      {/* Button */}
      <button
        onClick={toggle}
        className='fixed bottom-4 right-4 z-50 hidden rounded-bl-xl rounded-tr-xl bg-accent p-3 text-white shadow-md transition duration-300 hover:bg-opacity-75 md:block'
      >
        <div>
          <span className='sr-only'>Close</span>
          <Icon
            name='heroicons:chat-bubble-left-ellipsis'
            v-if={!isOpen}
            className='h-8 w-8'
          />
          <Icon
            name='heroicons:chevron-down'
            v-if={isOpen}
            className='h-8 w-8'
          />
        </div>
      </button>
    </div>
  )
}

export default ChatWidget

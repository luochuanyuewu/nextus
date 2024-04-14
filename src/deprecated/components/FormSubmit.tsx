'use client'
import { useState } from 'react'
import { getStrapiURL } from '@/deprecated/lib/strapi-helpers'

export default function FormSubmit({
  placeholder,
  text,
}: {
  placeholder: string
  text: string
}) {
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  async function handleSubmit() {
    if (email === '') {
      setErrorMessage('Email cannot be blank.')
      return
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.')
      return
    }

    const res = await fetch(getStrapiURL() + '/api/lead-form-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    })

    if (!res.ok) {
      setErrorMessage('Email failed to submit.')
      return
    }
    setErrorMessage('')
    setSuccessMessage('Email successfully submitted!')
    setEmail('')
  }

  return (
    <div className='flex flex-shrink-0 flex-row items-center justify-center self-center shadow-md lg:justify-end'>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          {successMessage ? (
            <p className='rounded-lg bg-green-300 px-4 py-2 text-green-700'>
              {successMessage}
            </p>
          ) : (
            <>
              <input
                type='email'
                placeholder={errorMessage || placeholder}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={'w-3/5 rounded-l-lg p-3 text-gray-700 sm:w-2/3'}
              />
              <button
                type='button'
                className='w-2/5 rounded-r-lg p-3 font-semibold dark:bg-violet-400 dark:text-gray-900 sm:w-1/3'
                onClick={handleSubmit}
              >
                {text}
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <p className='my-2 rounded-lg bg-red-200 px-4 py-2 text-red-500'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  )
}

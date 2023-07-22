'use client'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormElement } from '@/lib/schemas'

export const DirectusInput = (props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) => {
  const { element, hookForm } = props
  const { register } = hookForm
  return (
    <input
      className='formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none mb-1 flex max-w-md items-center bg-white ring-1 ring-gray-200 transition duration-150 focus-within:scale-105 focus-within:shadow-md focus-within:shadow-accent/50 focus-within:ring-1 focus-within:ring-accent disabled:bg-gray-200 dark:bg-gray-800 dark:ring-gray-600 dark:focus-within:ring-accent [&>label:first-child]:focus-within:text-accent'
      {...element}
      {...register(element.name!, {
        required: element.required || false,
      })}
    />
  )
}

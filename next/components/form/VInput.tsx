'use client'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormElement } from '@/lib/directus-collections'

export const VInput = (props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) => {
  const { element, hookForm } = props
  const { register } = hookForm
  return (
    <input
      {...element}
      {...register(element.name!, {
        required: element.required || false,
      })}
    />
  )
}

'use client'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormElement } from '@/lib/schemas'

export const VTextArea = (props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) => {
  const { element, hookForm } = props
  const { register } = hookForm

  return (
    <textarea
      {...element}
      {...register(element.name!, {
        required: element.required || false,
      })}
    />
  )
}

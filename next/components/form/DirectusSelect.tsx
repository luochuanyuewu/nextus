'use client'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormElement } from '@/lib/schemas'

export const DirectusSelect = (props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) => {
  const { element, hookForm } = props
  const { register } = hookForm
  return (
    <select
      // required={element.required || false}
      {...element}
      {...register(element.name!, {
        required: element.required || false,
      })}
    >
      {element.placeholder && (
        <option value='' hidden selected disabled>
          {element.placeholder}
        </option>
      )}
      {element.choices?.map((res, key) => (
        <option value={res.value} key={`select-${element.name}-option-${key}`}>
          {res.label}
        </option>
      ))}
    </select>
  )
}

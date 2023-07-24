'use client'

import React, { useMemo } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormElement } from '@/lib/schemas'
import formTheme from '@/form.theme'

export default function DirectusFormBuilder(props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) {
  const { element, hookForm } = props

  const { register } = hookForm

  const validation = useMemo(() => {
    if (element.validation) {
      try {
        const temp = JSON.parse(element.validation)
        if (temp.pattern && temp.pattern.value) {
          temp.pattern.value = new RegExp(temp.pattern.value)
        }

        if (temp.pattern && typeof temp.pattern === 'string') {
          temp.pattern = new RegExp(temp.pattern)
        }

        return temp
      } catch (error) {
        console.log(
          'ivalid validation format, plz check:https://react-hook-form.com/docs/useform/register ,especially Options.'
        )
      }
    }

    return { required: element.required }
  }, [element.validation, element.required])

  switch (element.type) {
    case 'textarea':
      return (
        <textarea
          className={formTheme.textAreaClass}
          required={element.required}
          key={element.name}
          placeholder={element.placeholder}
          {...register(element.name!, validation)}
        />
      )
    case 'select':
      return (
        <select
          className={formTheme.selectClass}
          required={element.required}
          {...register(element.name!, validation)}
        >
          {element.placeholder && (
            <option value='' hidden selected disabled>
              {element.placeholder}
            </option>
          )}
          {element.choices?.map((res, key) => (
            <option
              value={res.value}
              key={`select-${element.name}-option-${key}`}
            >
              {res.label}
            </option>
          ))}
        </select>
      )
    case 'checkbox':
      return (
        <input
          className={formTheme.checkboxClass}
          type='checkbox'
          required={element.required}
          {...register(element.name!, validation)}
        />
      )
    default:
      return (
        <input
          type={element.type}
          className={formTheme.inputClass}
          required={element.required}
          {...register(element.name!, validation)}
        />
      )
  }
}

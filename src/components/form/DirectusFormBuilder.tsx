'use client'

import React, { useMemo } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormSchema } from '@/data/directus-schema'
import formTheme from '@/form.theme'

export default function DirectusFormBuilder(props: {
  element: FormSchema
  hookForm: UseFormReturn<FieldValues, any>
}) {
  const { element, hookForm } = props

  const { register } = hookForm

  const validation = useMemo(() => {
    if (element.validation) {
      try {
        if (element.validation.pattern && element.validation.pattern.value) {
          element.validation.pattern.value = new RegExp(
            element.validation.pattern.value
          )
        }

        if (
          element.validation.pattern &&
          typeof element.validation.pattern === 'string'
        ) {
          element.validation.pattern = new RegExp(element.validation.pattern)
        }

        return element.validation
      } catch (error) {
        console.log(
          'ivalid validation format, plz check:https://react-hook-form.com/docs/useform/register ,especially Options.'
        )
      }
    }

    return { required: false }
  }, [element.validation])

  switch (element.type) {
    case 'textarea':
      return (
        <textarea
          className={formTheme.textAreaClass}
          key={element.name}
          placeholder={element.placeholder}
          {...register(element.name!, validation)}
        />
      )
    case 'select':
      return (
        <select
          className={formTheme.selectClass}
          // placeholder={element.placeholder}
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
          placeholder={element.placeholder}
          {...register(element.name!, validation)}
        />
      )
    default:
      return (
        <input
          type={element.type}
          placeholder={element.placeholder}
          className={formTheme.inputClass}
          {...register(element.name!, validation)}
        />
      )
  }
}

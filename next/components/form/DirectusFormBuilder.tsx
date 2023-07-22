'use client'

import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { DirectusInput } from '@/components/form/DirectusInput'
import { DirectusTextarea } from '@/components/form/DirectusTextarea'
import { FormElement } from '@/lib/schemas'
import { DirectusSelect } from '@/components/form/DirectusSelect'

export default function DirectusFormBuilder(props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) {
  const { element, hookForm } = props

  switch (element.type) {
    case 'textarea':
      return <DirectusTextarea element={element} hookForm={hookForm} />
    case 'select':
      return <DirectusSelect element={element} hookForm={hookForm} />
    default:
      return <DirectusInput element={element} hookForm={hookForm} />
  }
}

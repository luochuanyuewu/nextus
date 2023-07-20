'use client'

import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { VInput } from '@/components/form/VInput'
import { VTextArea } from '@/components/form/VTextArea'
import { FormElement } from '@/lib/directus-collections'

export default function VFieldRender(props: {
  element: FormElement
  hookForm: UseFormReturn<FieldValues, any>
}) {
  const { element, hookForm } = props
  switch (element.type) {
    case 'input':
      return <VInput element={element} hookForm={hookForm} />
    case 'textarea':
      return <VTextArea element={element} hookForm={hookForm} />
    default:
      return <React.Fragment />
  }
}

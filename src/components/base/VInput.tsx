'use client'
import React from 'react'
import { VLabel } from '@/components/base/VLabel'

interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'number'
  name?: string
  label?: string
  placeholder?: string
  onUpdateModelValue?: (value: string) => void
}

export const Input: React.FC<InputProps> = ({
  modelValue = '',
  type = 'text',
  name = '',
  label = '',
  placeholder = '',
  onUpdateModelValue,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdateModelValue) {
      onUpdateModelValue(event.target.value)
    }
  }

  return (
    <div>
      {label && <VLabel name={name} label={label} />}
      <div>
        <input
          value={modelValue}
          inputMode={type === 'number' ? 'decimal' : 'text'}
          type={type}
          name={name}
          id={name}
          className={`input${type === 'number' ? ' text-right' : ''}`}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

'use client'

import { Forms } from '@/lib/directus-collections'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import VAlert from '@/components/base/VAlert'
import directusApi from '@/lib/utils/directus-api'
import { createItem } from '@directus/sdk'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import VFieldRender from '@/components/form/VFieldRender'
import VButton from '@/components/base/VButton'
import { FormElement } from '@/lib/schemas'

interface FormProps {
  form: Forms
  className?: string
}

function transformSchema(schema: Array<FormElement>) {
  return schema.map((item) => {
    const newItem = { ...item }
    // newItem.$formkit = newItem.type
    switch (newItem.width) {
      case '33':
        newItem.outerclass = 'md:col-span-2'
        break
      case '50':
        newItem.outerclass = 'md:col-span-3'
        break
      case '67':
        newItem.outerclass = 'md:col-span-4'
        break
      case '100':
        newItem.outerclass = 'md:col-span-6'
        break
      default:
        newItem.outerclass = 'md:col-span-6'
    }
    return newItem
  })
}

function VForm(props: FormProps) {
  const { form } = props

  const query = useSearchParams()
  const router = useRouter()

  const [formData, setFormData] = useState({ ...query })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const schema = transformSchema(form.schema)

  const hookForm = useForm()

  async function submitForm() {
    setLoading(true)
    try {
      await directusApi.request(
        createItem('inbox', {
          data: formData,
        })
      )
      setSuccess(true)
      if (form.on_success === 'redirect') {
        return router.push(props.form.redirect_url as string)
      }
    } catch (err) {
      setError(err as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={props.className}>
      <div className='mb-4'>
        {error && <VAlert type='error'>Oops! {error}</VAlert>}
        {form.on_success === 'message' && success && (
          <VAlert
            type='success'
            html={
              form.success_message ?? 'Success! Your form has been submitted.'
            }
          ></VAlert>
        )}
      </div>

      {!success && (
        <form
          className='grid grid-cols-12 gap-5'
          onSubmit={hookForm.handleSubmit(submitForm)}
        >
          <p className='col-span-12 text-center text-xl font-bold'>
            {props.form.id}
          </p>
          {schema.map((res) => (
            <div
              key={`fields-${res.name}`}
              className={twMerge(`col-span-12`, res.outerclass)}
            >
              <p className='mb-1'>{res.label}</p>
              <VFieldRender element={res} hookForm={hookForm} />
            </div>
          ))}
          <div className='col-span-12 mx-auto'>
            <VButton type='submit' loading={loading}>
              Submit
            </VButton>
          </div>
        </form>
      )}

      {/*{!success && (*/}
      {/*  <FormKit*/}
      {/*    type='form'*/}
      {/*    value={formData}*/}
      {/*    onSubmit={submitForm}*/}
      {/*    submitLabel={form.submit_label}*/}
      {/*  >*/}
      {/*    <div className='grid gap-6 md:grid-cols-6'>*/}
      {/*      <FormKitSchema schema={schema} />*/}
      {/*    </div>*/}
      {/*  </FormKit>*/}
      {/*)}*/}
    </div>
  )
}

export default VForm

'use client'

import { Forms } from '@/data/directus-collections'
import { useState } from 'react'
import VAlert from '@/components/base/VAlert'
import directusApi from '@/data/directus-api'
import { createItem } from '@directus/sdk'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import DirectusFormBuilder from '@/components/form/DirectusFormBuilder'
import { cn } from '@/lib/utils/tw'
import formTheme from '@/form.theme'
import { FormSchema } from '@/data/directus-schema'
import { useRouter } from '@/lib/navigation'

interface FormProps {
  form: Forms
  className?: string
}

function transformSchema(schema: Array<FormSchema>) {
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
    newItem.validation
    return newItem
  })
}

function VForm(props: FormProps) {
  const { form } = props

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const schema = transformSchema(form.schema)

  const hookForm = useForm<any>()

  async function submitForm(data: any) {
    setLoading(true)
    try {
      await directusApi.request(
        createItem('inbox', {
          data: { ...data },
          form: props.form.id,
        })
      )
      setSuccess(true)
      if (form.on_success === 'redirect' && form.redirect_url) {
        return router.push(form.redirect_url)
      }
      console.log('form redirect_url invali.')
    } catch (err) {
      setError(err as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={props.className}>
      <div className='mb-4'>
        {error && <VAlert type='error'>{error}</VAlert>}
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
          className={formTheme.formClass}
          onSubmit={hookForm.handleSubmit(submitForm)}
        >
          <div className='grid gap-6 md:grid-cols-6'>
            {schema.map((element) => (
              <div
                key={`fields-${element.name}`}
                className={cn(element.outerclass, 'w-full')}
              >
                <label className='label' htmlFor={element.name}>
                  <span className='label-text'>{element.label}</span>
                </label>
                <DirectusFormBuilder element={element} hookForm={hookForm} />
                <ErrorMessage
                  errors={hookForm.formState.errors}
                  name={element.name}
                  render={({ message }) => (
                    <VAlert type='error'>{message}</VAlert>
                  )}
                />
              </div>
            ))}
          </div>
          <div className='col-span-6 mx-auto'>
            <div className='form-control mt-6'>
              <button className='btn btn-primary'>
                {loading && <span className='loading loading-spinner'></span>}
                {!loading && props.form.submit_label}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default VForm

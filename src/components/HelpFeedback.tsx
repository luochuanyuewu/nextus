'use client'

import { useState } from 'react'
import { useCookie } from 'react-use'
import { HelpFeedback } from '@/data/directus-collections'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import VButton from '@/components/base/VButton'
import VIcon from '@/components/base/VIcon'
import { motion } from 'framer-motion'

export default function HelpFeedbackForm(props: any) {
  const [session, updatesession, deletesession] = useCookie('session')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  const [feedback, setFeedback] = useState<HelpFeedback>({
    id: '',
    rating: 0,
    comments: '',
  })

  const ratingOptions = [
    {
      label: 'Worst 😭',
      value: 1,
      message: 'Sorry about that. How do we fix it?',
    },
    {
      label: 'Not Helpful 😡',
      value: 2,
      message: 'How can we improve this article?',
    },
    {
      label: 'Helpful 😃',
      value: 3,
      message: 'Nice! 👍 Anything we can improve upon?',
    },
    {
      label: 'Amazing 🤩',
      value: 4,
      message: `Awesome! 🥳🎉🎊 Anything you'd like to add?`,
    },
  ]

  const getRatingOption = (rating?: number) => {
    return ratingOptions.find((option) => option.value === rating)
  }

  const handleSubmission = async (rating?: number) => {
    setLoading(true)
    if (rating) setFeedback({ ...feedback, rating })

    const body = {
      id: feedback.id,
      rating: feedback.rating,
      comments: feedback.comments,
      title: props.title,
      url: props.url,
      visitor_id: session,
    }

    try {
      const response: any = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      console.log(response.data.value)

      setFeedback({ ...feedback, id: response.data.value.id })

      // If the response has comments, we can assume they've completed the second step.
      if (response.data.value.comments) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=''>
      <motion.div
        initial={{ opacity: 0, y: -2000 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Ask For Rating */}
        {!feedback.rating && (
          <div className='step'>
            <TypographyHeadline
              content='How helpful was this article?'
              size='sm'
            />
            <div className='mt-4 space-x-4'>
              {ratingOptions.map((item) => (
                <VButton
                  key={item.value}
                  variant='default'
                  size='sm'
                  onClick={() => handleSubmission(item.value)}
                >
                  <span>{item.label}</span>
                </VButton>
              ))}
            </div>
          </div>
        )}

        {/* Ask For Comments */}
        {feedback.rating && !success && (
          <div className='space-y-4'>
            <p className='font-mono '>This article is:</p>
            <div className='space-x-4'>
              <span className='font-mono text-xl font-bold '>
                {getRatingOption(feedback.rating)?.label}
              </span>
              <VButton
                variant='outline'
                size='xs'
                onClick={() => setFeedback({ ...feedback, rating: 0 })}
              >
                <VIcon icon='heroicons:x-mark' className='h-5 w-5' />
              </VButton>
            </div>
            <TypographyHeadline
              content={getRatingOption(feedback.rating)?.message}
              size='sm'
            />
            <input
              type='textarea'
              value={feedback.comments as any}
              onChange={(value) =>
                setFeedback({ ...feedback, comments: value.target.value })
              }
              autoFocus
            />
            <VButton
              variant='primary'
              size='md'
              disabled={!feedback.comments}
              onClick={() => handleSubmission()}
            >
              Send Us Your Feedback
            </VButton>
          </div>
        )}

        {/* Success State */}
        {success && (
          <TypographyHeadline content='Thanks for your feedback!' size='sm' />
        )}
      </motion.div>
    </div>
  )
}

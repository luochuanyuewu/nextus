'use client'

import { useState } from 'react'
import { getStrapiURL } from '@/deprecated/lib/strapi-helpers'

interface CommentBody {
  author?: {
    id?: string
    name: string
    email: string
    avatar?: string
  }
  content: string
  threadOf?: number
}

interface CommentBoxProps {
  collectionNmae: string
  contentTypeName: string
  entityId: number
  placeholder?: string
  label?: string
  buttonText?: string
}

export default function CommentBox({
  collectionNmae,
  contentTypeName,
  entityId,
  placeholder = '发布评论...',
  label = 'Your comment',
  buttonText = 'Post comment',
}: CommentBoxProps) {
  const [email, setEmail] = useState('')
  const [nickName, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  async function handleSubmit() {
    if (email === '') {
      setErrorMessage('Email cannot be blank.')
      return
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.')
      return
    }

    if (nickName === '') {
      setErrorMessage('Nickname cannot be blank.')
    }

    const commentBody: CommentBody = {
      author: {
        id: 'guest',
        name: nickName,
        email: email,
      },
      content,
    }

    const res = await fetch(
      getStrapiURL() +
        `/api/comments/api::${collectionNmae}.${contentTypeName}:${entityId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(commentBody),
      }
    )

    if (!res.ok) {
      setErrorMessage('Failed to comment.')
      return
    }
    setErrorMessage('')
    setSuccessMessage('comment submitted!')
    setContent('')
    setEmail('')
    setNickname('')
  }

  return (
    <div className='bg-base-200'>
      <form className='form-control mb-2'>
        {/* 
                <label className="label">
                    <span className="label-text">{label}</span>
                </label> */}

        <textarea
          className='textarea textarea-bordered h-28 w-full'
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input
          type='email'
          placeholder={'your email'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='input input-bordered '
        />
        <input
          type='text'
          placeholder={'your name'}
          onChange={(e) => setNickname(e.target.value)}
          value={nickName}
          className='input input-bordered'
        />
      </form>
      <div className='card-actions'>
        <button
          type='submit'
          className='btn btn-outline btn-sm '
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </div>

      {errorMessage && (
        <p className='my-2 rounded-lg bg-red-200 px-4 py-2 text-red-500'>
          {errorMessage}
        </p>
      )}
    </div>
  )
}

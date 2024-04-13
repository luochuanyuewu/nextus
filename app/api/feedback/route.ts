import { createItem, updateItem } from '@directus/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { HelpFeedback } from '@/data/directus-collections'
import directusApi from '@/data/directus-api'

export async function POST(req: NextRequest, ctx: { params: any }) {
  try {
    const body: HelpFeedback = await req.json()
    const { id, title, url, rating, visitor_id, comments } = body

    let response

    if (id) {
      response = await directusApi.request(
        updateItem('help_feedback', id, {
          title,
          url,
          rating,
          visitor_id,
          comments,
        })
      )
    } else {
      response = await await directusApi.request(
        createItem('help_feedback', {
          title,
          url,
          rating,
          visitor_id,
          comments,
        })
      )
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return NextResponse.json(error)
  }
}

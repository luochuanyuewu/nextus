'use client'
import './TeamBlock.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useResizeObserver from '@/lib/hooks/useResizeObserver'
import { useIntersection } from 'react-use'
import directusApi from '@/data/directus-api'
import { readItems } from '@directus/sdk'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import TypographyProse from '@/components/typography/TypographyProse'
import TeamCard from '@/components/TeamCard'
import { BlockTeam, Team } from '@/data/directus-collections'

function splitArray(array: Team[], numParts: number): Team[][] {
  if (numParts <= 0) {
    throw new Error('The number of parts must be greater than 0.')
  }

  const length = array.length
  const chunkSize = Math.ceil(length / numParts)
  const result: Team[][] = []

  for (let i = 0; i < length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }

  return result
}

function animationDelay() {
  let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
  return possibleAnimationDelays[
    Math.floor(Math.random() * possibleAnimationDelays.length)
  ]
}

export default function TeamBlockClient({
  data,
  teams,
}: {
  data: BlockTeam
  teams: Team[]
}) {
  const [teamMembers, setTeamMembers] = useState<Team[]>([])

  const [duration, setDuration] = useState<string>('3000 ms')

  const targetRef = useRef<HTMLDivElement>(null)

  const onResize = useCallback((target: HTMLDivElement) => {
    setDuration(`${target.offsetHeight * 15}ms`)
  }, [])

  const leftColRef = useResizeObserver(onResize)

  const teamToDisplay = useMemo(() => {
    if (teamMembers.length === 0)
      return {
        left: [],
        right: [],
      }
    // Split the array into two arrays
    const teamMembersSplit = splitArray(teamMembers, 2)

    return {
      // Return the two arrays as an object
      // Duplicate each array so that we can animate the last item to the first position
      left: [...teamMembersSplit[0], ...teamMembersSplit[0]],
      right: [...teamMembersSplit[1], ...teamMembersSplit[1]],
    }
  }, [teamMembers])

  const intersection = useIntersection(targetRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.25,
  })

  const isVisible = intersection ? intersection.isIntersecting : false

  useEffect(() => {
    setTeamMembers(teams)
  }, [teams])

  return (
    <section>
      <BlockContainer>
        <div className='mx-auto flex flex-col-reverse py-24 lg:flex-row'>
          <div className='mt-8 flex flex-col pr-4 lg:w-2/5'>
            {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
            {data.headline && (
              <TypographyHeadline content={data.headline} size='lg' />
            )}
            {data.content && (
              <TypographyProse
                content={data.content}
                className='mt-4 font-mono'
              />
            )}
          </div>
          <div
            className='relative grid h-[49rem] max-h-[60vh] grid-cols-1 items-start gap-8 overflow-hidden border-b-4 border-t-4 border-b-base-300 border-t-accent px-4 md:grid-cols-2'
            ref={targetRef}
          >
            <div className='absolute top-0 z-10 h-16 w-full bg-gradient-to-b from-base-300 to-transparent ' />
            <div className='absolute bottom-0 z-10 h-16 w-full bg-gradient-to-t from-base-300 to-transparent ' />
            <div
              className={`${
                isVisible ? 'animate-marquee' : ''
              }  -mt-10 max-w-[320px] space-y-10 py-4`}
              style={{ '--marquee-duration': duration } as any}
              ref={leftColRef}
            >
              {teamToDisplay.left.map((person, index: number) => (
                <TeamCard key={index} person={person} />
              ))}
            </div>
            <div
              className={`${
                isVisible ? 'animate-marquee' : ''
              }  max-w-[320px] space-y-10 py-4`}
              style={{ '--marquee-duration': duration } as any}
            >
              {teamToDisplay.right.map((person, index: number) => (
                <TeamCard
                  key={index}
                  style={{ animationDelay: animationDelay() }}
                  person={person}
                />
              ))}
            </div>
          </div>
        </div>
      </BlockContainer>
    </section>
  )
}

import { Posts } from '@/data/directus-collections'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import PostCard from '@/components/PostCard'

export interface CardGroup {
  id: string
  title: string
  headline: string
  content: string
  posts: Array<{
    posts_id: Posts
  }>
}

interface CardGroupBlockProps {
  data: CardGroup
}

function CardGroupBlock({ data }: CardGroupBlockProps) {
  return (
    <BlockContainer>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className='mt-4 grid gap-8 md:grid-cols-3'>
        {data.posts.map((item, itemIdx) => (
          <PostCard key={itemIdx} post={item.posts_id} />
        ))}
      </div>
    </BlockContainer>
  )
}

export default CardGroupBlock

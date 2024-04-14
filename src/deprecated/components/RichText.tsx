import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RichTextProps {
  data: {
    body: string
  }
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  // return (
  //   <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
  //     <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
  //   </section>
  // );
  // return (
  //   <section className="rich-text py-6 dark:bg-black dark:text-gray-50 " dangerouslySetInnerHTML={{ __html: data.body }}>
  //   </section>
  // );
  return (
    <article
      className='prose max-w-none'
      dangerouslySetInnerHTML={{ __html: data.body }}
    ></article>
  )
}

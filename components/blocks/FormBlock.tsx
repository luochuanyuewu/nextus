import VForm from '@/components/base/VForm'
import { Forms } from '@/data/directus-collections'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'

interface FormBlockProps {
  title?: string
  headline?: string
  form: Forms
}

const FormBlock = ({ data }: { data: FormBlockProps }) => {
  return (
    <BlockContainer>
      <div className='card mx-auto mt-4 max-w-2xl bg-base-200'>
        <div className='card-body'>
          {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
          {data.headline && <TypographyHeadline content={data.headline} />}
          <VForm form={data.form} className='mt-4' />
        </div>
      </div>
    </BlockContainer>
  )
}

export default FormBlock

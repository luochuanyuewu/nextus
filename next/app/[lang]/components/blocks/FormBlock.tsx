import VForm from '@/app/[lang]/components/base/VForm'
import { Form } from '@/types/schemas'
import BlockContainer from '@/app/[lang]/components/blocks/BlockContainer'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'

interface FormBlockProps {
  title?: string
  headline?: string
  form: Form
}

const FormBlock = ({ data }: { data: FormBlockProps }) => {
  return (
    <BlockContainer>
      <div className='mx-auto mt-4 max-w-2xl rounded-bl-3xl rounded-tr-3xl bg-gray-100 p-8 dark:bg-gray-800'>
        {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
        {data.headline && <TypographyHeadline content={data.headline} />}
        <VForm form={data.form} className='mt-4' />
      </div>
    </BlockContainer>
  )
}

export default FormBlock

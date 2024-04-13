import FormSubmit from '../FormSubmit'

interface EmailProps {
  id: string
  __component: string
  title: string
  description: string
  emailPlaceholder: string
  submitButton: {
    text: string
  }
}

export default function Email({ data }: { data: EmailProps }) {
  return (
    <section className='py-6 dark:bg-black dark:text-gray-50'>
      <div className='container mx-auto flex flex-col justify-center space-y-8 p-4 md:p-10 lg:flex-row lg:justify-between lg:space-x-12 lg:space-y-0'>
        <div className='flex flex-col space-y-4 text-center lg:text-left'>
          <h1 className='text-5xl font-bold leading-none'>{data.title}</h1>
          <p className='text-lg'>{data.description}</p>
        </div>
        <FormSubmit
          placeholder={data.emailPlaceholder}
          text={data.submitButton.text}
        />
      </div>
    </section>
  )
}

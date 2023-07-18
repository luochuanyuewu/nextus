interface FormSchemaProps {
  schema: Array<{
    name: string
    type: string
    label: string
    placeholder: string
    help: string
    validation: string
    width: string | number
  }>
}

export default function FormSchema({ schema }: FormSchemaProps) {
  return (
    <div>
      {schema.map((item) => {
        if (item.type === 'text')
          return <input name={item.name} placeholder={item.placeholder}></input>
        if (item.type === 'textarea')
          return (
            <textarea
              name={item.name}
              placeholder={item.placeholder}
            ></textarea>
          )
      })}
    </div>
  )
}

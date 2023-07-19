// 'use client'
//
// import { FieldValues, UseFormReturn } from 'react-hook-form'
// import { FormElement } from '@/types/schemas'
//
// export const DirectusSelect = (props: {
//   element: FormElement
//   hookForm: UseFormReturn<FieldValues, any>
// }) => {
//   const { element, hookForm } = props
//   const { register } = hookForm
//   return (
//     <select
//       // required={element.required || false}
//       {...element}
//       {...register(element.name!, {
//         required: element.required || false,
//       })}
//     >
//       {element.placeholder && (
//         <option value='' hidden selected disabled>
//           {element.placeholder}
//         </option>
//       )}
//       {(element.choices as { label: string; value: any }[])?.map((res, key) => (
//         <option value={res.value} key={`select-${element.key}-option-${key}`}>
//           {res.label}
//         </option>
//       ))}
//     </select>
//   )
// }

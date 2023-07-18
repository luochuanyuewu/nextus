// import { useState } from 'react'
// import { useDark } from 'your-use-dark-library'
// import Transition from 'your-transition-component'
// import Icon from 'your-icon-component'
//
// const DarkModeToggle = () => {
//   const { isDark, toggleDark } = useDark()
//   const [showIcon, setShowIcon] = useState(false)
//
//   const handleToggle = () => {
//     toggleDark()
//     setShowIcon(true)
//     setTimeout(() => {
//       setShowIcon(false)
//     }, 200)
//   }
//
//   return (
//     <button className='p-1' onClick={handleToggle}>
//       <Transition
//         enterActiveClass='transition duration-100 ease-out'
//         enterFromClass='opacity-0'
//         enterToClass='opacity-100'
//         leaveActiveClass='transition duration-75 ease-in'
//         leaveFromClass='opacity-100'
//         leaveToClass='opacity-0'
//         mode='out-in'
//       >
//         {showIcon ? (
//           isDark ? (
//             <Icon name='heroicons:moon' className='h-8 w-8' />
//           ) : (
//             <Icon name='heroicons:sun' className='h-8 w-8' />
//           )
//         ) : null}
//       </Transition>
//     </button>
//   )
// }
//
// export default DarkModeToggle;

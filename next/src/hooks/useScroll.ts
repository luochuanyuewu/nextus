import { useState, useEffect } from 'react'
import { useThrottleFn } from 'react-use' // react-use  sucks.

export default function useScroll() {
  const [progress, setProgress] = useState(0)

  //   const updateProgress = useThrottle(() => {
  //     const bodyHeight =
  //       document.body.clientHeight - document.documentElement.clientHeight
  //     const scrollPosition = typeof window !== 'undefined' ? window.scrollY : 0

  //     setProgress(scrollPosition / bodyHeight)
  //   }, 100)

  const updateProgress = () => {
    const bodyHeight =
      document.body.clientHeight - document.documentElement.clientHeight
    const scrollPosition = typeof window !== 'undefined' ? window.scrollY : 0

    setProgress(scrollPosition / bodyHeight)
  }

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateProgress)
      return () => {
        window.removeEventListener('scroll', updateProgress)
      }
    }
  }, [])

  return { progress, scrollToTop }
}

'use client'
import './RadialProgress.css'
import { useState, useEffect } from 'react'

const RadialProgress = ({
  radius = 50,
  progress = 0,
  stroke = 10,
  className = '',
}) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const [strokeDashoffset, setStrokeDashoffset] = useState(0)

  useEffect(() => {
    const updatedStrokeDashoffset =
      circumference - ((progress * 100) / 100) * circumference
    setStrokeDashoffset(updatedStrokeDashoffset)
  }, [circumference, progress])

  return (
    <svg height={radius * 2} width={radius * 2} className={className}>
      <circle
        stroke='currentColor'
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeWidth={stroke}
        fill='transparent'
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default RadialProgress

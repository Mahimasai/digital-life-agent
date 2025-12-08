"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

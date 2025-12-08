"use client"

import { useEffect, useState } from "react"

interface OrbitingObject {
  id: number
  size: number
  orbitRadius: number
  speed: number
  color: string
  startAngle: number
}

export function OrbitVisualization() {
  const [objects, setObjects] = useState<OrbitingObject[]>([])
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const orbitingObjects: OrbitingObject[] = [
      { id: 1, size: 12, orbitRadius: 60, speed: 1, color: "#00ffff", startAngle: 0 },
      { id: 2, size: 8, orbitRadius: 90, speed: 0.7, color: "#ff00ff", startAngle: 120 },
      { id: 3, size: 10, orbitRadius: 120, speed: 0.5, color: "#ffa500", startAngle: 240 },
      { id: 4, size: 6, orbitRadius: 150, speed: 0.3, color: "#9333ea", startAngle: 60 },
    ]
    setObjects(orbitingObjects)

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {/* Central star */}
      <div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500"
        style={{
          boxShadow: "0 0 40px #ffa500, 0 0 80px #ff6600, 0 0 120px #ff3300",
        }}
      />

      {/* Orbit rings */}
      {[60, 90, 120, 150].map((radius) => (
        <div
          key={radius}
          className="absolute rounded-full border border-foreground/10"
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
        />
      ))}

      {/* Orbiting objects */}
      {objects.map((obj) => {
        const angle = ((rotation * obj.speed + obj.startAngle) * Math.PI) / 180
        const x = Math.cos(angle) * obj.orbitRadius
        const y = Math.sin(angle) * obj.orbitRadius

        return (
          <div
            key={obj.id}
            className="absolute rounded-full transition-all duration-75"
            style={{
              width: obj.size,
              height: obj.size,
              backgroundColor: obj.color,
              transform: `translate(${x}px, ${y}px)`,
              boxShadow: `0 0 ${obj.size}px ${obj.color}, 0 0 ${obj.size * 2}px ${obj.color}`,
            }}
          />
        )
      })}
    </div>
  )
}

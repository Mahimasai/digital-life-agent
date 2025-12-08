"use client"

interface FloatingPlanetProps {
  size: number
  color: string
  glowColor: string
  delay?: number
  duration?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  hasRing?: boolean
}

export function FloatingPlanet({
  size,
  color,
  glowColor,
  delay = 0,
  duration = 6,
  top,
  left,
  right,
  bottom,
  hasRing = false,
}: FloatingPlanetProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="relative">
        {/* Planet body */}
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 30% 30%, ${color}, ${glowColor} 60%, transparent)`,
            boxShadow: `0 0 ${size / 2}px ${glowColor}, inset -${size / 4}px -${size / 4}px ${size / 2}px rgba(0,0,0,0.5)`,
          }}
        />
        {/* Planet ring */}
        {hasRing && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 opacity-60"
            style={{
              width: size * 1.6,
              height: size * 0.4,
              borderColor: glowColor,
              transform: "translate(-50%, -50%) rotateX(75deg)",
            }}
          />
        )}
      </div>
    </div>
  )
}

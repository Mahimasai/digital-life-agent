import { Badge } from "@/components/ui/badge"

const missions = [
  { id: 1, name: "Mars Colony Alpha", status: "active", progress: 78 },
  { id: 2, name: "Europa Research", status: "pending", progress: 45 },
  { id: 3, name: "Titan Survey", status: "active", progress: 92 },
  { id: 4, name: "Asteroid Mining", status: "complete", progress: 100 },
  { id: 5, name: "Deep Space Probe", status: "active", progress: 23 },
]

const statusColors = {
  active: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50",
  pending: "bg-neon-orange/20 text-neon-orange border-neon-orange/50",
  complete: "bg-neon-purple/20 text-neon-purple border-neon-purple/50",
}

export function MissionList() {
  return (
    <div className="space-y-4">
      {missions.map((mission) => (
        <div
          key={mission.id}
          className="flex items-center justify-between p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h4 className="font-medium">{mission.name}</h4>
              <Badge variant="outline" className={statusColors[mission.status as keyof typeof statusColors]}>
                {mission.status}
              </Badge>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${mission.progress}%`,
                  background: "linear-gradient(90deg, #00ffff, #ff00ff)",
                  boxShadow: "0 0 10px #00ffff",
                }}
              />
            </div>
          </div>
          <span className="ml-4 text-2xl font-bold text-primary">{mission.progress}%</span>
        </div>
      ))}
    </div>
  )
}

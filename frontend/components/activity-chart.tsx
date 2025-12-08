"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", value: 4000, missions: 2400 },
  { name: "Tue", value: 3000, missions: 1398 },
  { name: "Wed", value: 2000, missions: 9800 },
  { name: "Thu", value: 2780, missions: 3908 },
  { name: "Fri", value: 1890, missions: 4800 },
  { name: "Sat", value: 2390, missions: 3800 },
  { name: "Sun", value: 3490, missions: 4300 },
]

export function ActivityChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff00ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(10, 10, 30, 0.9)",
              border: "1px solid rgba(147, 51, 234, 0.5)",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00ffff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          <Area
            type="monotone"
            dataKey="missions"
            stroke="#ff00ff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMissions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import type React from "react"

import { Card } from "@/components/ui/card"

interface StatItem {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: "blue" | "green" | "purple" | "amber"
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  purple: "text-purple-600 bg-purple-50",
  amber: "text-amber-600 bg-amber-50",
}

export function ProfileStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-6 text-center">
          {stat.icon && (
            <div
              className={`w-10 h-10 rounded-full ${colorClasses[stat.color || "blue"]} flex items-center justify-center mx-auto mb-3`}
            >
              {stat.icon}
            </div>
          )}
          <div className={`text-2xl font-bold ${colorClasses[stat.color || "blue"].split(" ")[0]}`}>{stat.value}</div>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </Card>
      ))}
    </div>
  )
}

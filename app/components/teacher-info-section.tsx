"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TeacherInfoSectionProps {
  label: string
  icon?: React.ReactNode
  data?: any
  onEdit?: () => void
}

export function TeacherInfoSection({ label, icon, data, onEdit }: TeacherInfoSectionProps) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-blue-600">{icon}</div>}
            <h3 className="font-semibold text-gray-900">{label}</h3>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            Add
          </Button>
        </div>
        <p className="text-gray-500 text-sm mt-4">No {label.toLowerCase()} added yet</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h3 className="font-semibold text-gray-900">{label}</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </div>

      {typeof data === "string" ? (
        <p className="text-gray-700">{data}</p>
      ) : typeof data === "number" ? (
        <p className="text-gray-700">{data}</p>
      ) : Array.isArray(data) ? (
        <div className="flex flex-wrap gap-2">
          {data.map((item, idx) => (
            <Badge key={idx} variant="secondary">
              {typeof item === "string" ? item : JSON.stringify(item)}
            </Badge>
          ))}
        </div>
      ) : typeof data === "object" ? (
        <div className="space-y-2 text-sm">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
              <span className="text-gray-900 font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  )
}

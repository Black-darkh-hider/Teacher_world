"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"

interface InfoCardProps {
  title: string
  icon?: React.ReactNode
  onEdit?: () => void
  isEmpty?: boolean
  children: React.ReactNode
}

export function InfoCard({ title, icon, onEdit, isEmpty, children }: InfoCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-600">{icon}</div>}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit2 size={16} />
          </Button>
        )}
      </div>

      {isEmpty ? <p className="text-gray-500 text-sm">No {title.toLowerCase()} added yet</p> : children}
    </Card>
  )
}

"use client"

import { AlertCircle } from "lucide-react"
import { Alert } from "@/components/ui/alert"

interface AlertErrorProps {
  message?: string
  onDismiss?: () => void
}

export default function AlertError({ message, onDismiss }: AlertErrorProps) {
  if (!message) return null

  return (
    <Alert className="bg-red-50 border border-red-200 mb-4">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <div className="ml-3">
        <p className="text-red-700 text-sm font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-auto text-red-600 hover:text-red-700">
          ×
        </button>
      )}
    </Alert>
  )
}

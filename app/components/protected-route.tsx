"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { LoadingSpinner } from "./loading-spinner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "teacher" | "institution" | "admin"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && requiredRole && user?.role !== requiredRole) {
      router.push("/dashboard")
    }
  }, [user, isLoading, requiredRole, router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <p className="text-gray-600 mb-4">You need to be logged in to view this page.</p>
          <Link href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <p className="text-red-600 font-semibold mb-2">Access Denied</p>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <Link href="/dashboard">
            <Button className="w-full">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return children
}

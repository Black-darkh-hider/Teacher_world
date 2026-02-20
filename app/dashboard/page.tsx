"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { LoadingSpinner } from "@/app/components/loading-spinner"

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/login")
    } else if (user.role === "teacher") {
      router.push("/teacher/dashboard")
    } else if (user.role === "institution") {
      router.push("/institution/dashboard")
    } else {
      router.push("/")
    }
  }, [user, isLoading, router])

  return <LoadingSpinner />
}

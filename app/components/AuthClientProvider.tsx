"use client"

import React from "react"
import { AuthProvider } from "@/app/lib/auth-context"

export default function AuthClientProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

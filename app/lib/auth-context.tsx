"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiClient } from "./api-client"

export interface User {
  id: string
  email: string
  name: string
  role: "teacher" | "institution" | "admin"
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: "teacher" | "institution"
  institutionName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Restore user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await apiClient.post("/auth/login", { email, password })

      if (response.error) {
        throw new Error(response.error)
      }

      const { accessToken, refreshToken, user: userData } = response.data as any

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    setUser(null)
  }

  const register = async (data: RegisterData) => {
    setError(null)
    setIsLoading(true)

    try {
      // Step 1: Send registration request
      const endpoint = data.role === "teacher" ? "/auth/register-teacher" : "/auth/register-institution"

      const response = await apiClient.post(endpoint, {
        email: data.email,
        password: data.password,
        name: data.name,
        institutionName: data.institutionName,
      })

      if (response.error) {
        throw new Error(response.error)
      }

      // Return response for OTP verification step
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, register }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

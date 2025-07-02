"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate checking for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation (in real app, this would be server-side)
    if (email && password.length >= 6) {
      const userData = {
        id: "1",
        email,
        name: email.split("@")[0],
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation
    if (email && password.length >= 6 && name) {
      const userData = {
        id: Date.now().toString(),
        email,
        name,
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AdminContextType {
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("adminLoggedIn")
    if (saved === "true") {
      setIsLoggedIn(true)
    }
    setMounted(true)
  }, [])

  const login = (password: string) => {
    // Mock admin password
    if (password === "admin123") {
      setIsLoggedIn(true)
      localStorage.setItem("adminLoggedIn", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("adminLoggedIn")
  }

  if (!mounted) return <>{children}</>

  return <AdminContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}

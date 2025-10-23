"use client"

import type React from "react"

import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Lock } from "lucide-react"

export default function AdminLoginPage() {
  const { isLoggedIn, login } = useAdmin()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  if (isLoggedIn) {
    router.push("/admin")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      router.push("/admin")
    } else {
      setError("Invalid password")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Enter your password to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            <p className="text-muted-foreground text-xs mt-2">Demo password: admin123</p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

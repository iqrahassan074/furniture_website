"use client"

import Link from "next/link"
import { useAdmin } from "@/lib/admin-context"
import { LogOut } from "lucide-react"

export function AdminHeader() {
  const { logout } = useAdmin()

  return (
    <header className="bg-primary text-primary-foreground border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl">Admin Panel</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/admin" className="hover:opacity-80 transition">
              Dashboard
            </Link>
            <Link href="/admin/products" className="hover:opacity-80 transition">
              Products
            </Link>
            <Link href="/admin/orders" className="hover:opacity-80 transition">
              Orders
            </Link>
          </nav>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

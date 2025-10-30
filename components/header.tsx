"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { ShoppingCart, Menu, X, Heart } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">Furnivio</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative p-2 hover:bg-muted rounded-lg transition">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link
              href="/"
              className="px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 hover:bg-muted rounded-lg transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

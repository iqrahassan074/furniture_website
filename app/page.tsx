"use client"

import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Elevate Your Living Space
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Discover our curated collection of premium furniture designed for modern living. Each piece combines
                elegance, comfort, and functionality.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative h-96 md:h-full rounded-lg overflow-hidden bg-muted">
              <img src="/modern-furniture-showroom.png" alt="Hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Handpicked pieces for your perfect home</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Chairs", icon: "🪑" },
              { name: "Tables", icon: "📦" },
              { name: "Sofas", icon: "🛋️" },
              { name: "Storage", icon: "🗄️" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.name.toLowerCase()}`}
                className="group p-8 rounded-lg border border-border hover:border-primary hover:bg-muted transition text-center"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <p className="text-sm opacity-90">Premium furniture for modern living.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <Link href="/shop" className="hover:opacity-100">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=chairs" className="hover:opacity-100">
                    Chairs
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=sofas" className="hover:opacity-100">
                    Sofas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <Link href="/contact" className="hover:opacity-100">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:opacity-100">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
            <p>&copy; 2025 Furnish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

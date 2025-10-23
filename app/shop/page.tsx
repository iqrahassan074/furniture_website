"use client"

import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/data"
import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { ChevronDown, Search } from "lucide-react"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "all"
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => categoryParam === "all" || p.category === categoryParam)

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return result
  }, [categoryParam, searchQuery])

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop Our Collection</h1>
          <p className="text-muted-foreground text-lg">Discover premium furniture pieces for every room</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categories */}
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2 mb-8">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`/shop?category=${cat}`}
                    className={`block px-4 py-2 rounded-lg transition ${
                      categoryParam === cat ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </a>
                ))}
              </div>

              {/* Sort */}
              <h3 className="font-bold text-lg mb-4">Sort By</h3>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background appearance-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

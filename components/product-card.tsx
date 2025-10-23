"use client"

import type React from "react"

import Link from "next/link"
import type { Product } from "@/lib/data"
import { Star, Heart } from "lucide-react"
import { useWishlist } from "@/lib/wishlist-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addItem } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition"
          >
            <Heart
              className="w-5 h-5"
              fill={inWishlist ? "currentColor" : "none"}
              color={inWishlist ? "#ef4444" : "currentColor"}
            />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        <p className="text-xl font-bold text-primary">${product.price}</p>
      </div>
    </Link>
  )
}

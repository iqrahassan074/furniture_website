"use client"

import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About Furnish</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            Welcome to Furnish, your destination for premium furniture that combines elegance, comfort, and
            functionality. Since our founding, we've been committed to bringing exceptional design and quality
            craftsmanship to homes around the world.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Our Mission</h2>
          <p>
            We believe that everyone deserves to live in a beautiful, comfortable space. Our mission is to make premium
            furniture accessible by offering carefully curated pieces that elevate your living environment without
            compromising on quality or style.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Our Values</h2>
          <ul className="space-y-3">
            <li>
              • <strong>Quality:</strong> We source only the finest materials and work with skilled craftspeople
            </li>
            <li>
              • <strong>Design:</strong> Every piece is thoughtfully designed for both aesthetics and functionality
            </li>
            <li>
              • <strong>Sustainability:</strong> We're committed to environmentally responsible practices
            </li>
            <li>
              • <strong>Customer Service:</strong> Your satisfaction is our top priority
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8">Why Choose Us?</h2>
          <ul className="space-y-3">
            <li>• Curated collection of premium furniture pieces</li>
            <li>• Expert design consultation available</li>
            <li>• Free shipping on orders over $500</li>
            <li>• 30-day return policy</li>
            <li>• 2-year warranty on all products</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

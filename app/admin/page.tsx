"use client"

import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { products } from "@/lib/data"
import { BarChart3, Package, ShoppingCart, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const { isLoggedIn } = useAdmin()
  const router = useRouter()

  if (!isLoggedIn) {
    router.push("/admin/login")
    return null
  }

  const totalProducts = products.length
  const inStockProducts = products.filter((p) => p.inStock).length
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0)
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "In Stock",
      value: inStockProducts,
      icon: ShoppingCart,
      color: "bg-green-500/10 text-green-600",
    },
    {
      label: "Total Inventory Value",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: BarChart3,
      color: "bg-orange-500/10 text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="p-6 border border-border rounded-lg bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Products */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-muted-foreground capitalize">{product.category}</td>
                    <td className="py-4 px-4 font-semibold text-primary">${product.price}</td>
                    <td className="py-4 px-4">{product.rating}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.inStock ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

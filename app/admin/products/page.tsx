"use client"

import type React from "react"

import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { products } from "@/lib/data"
import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"

export default function AdminProductsPage() {
  const { isLoggedIn } = useAdmin()
  const router = useRouter()
  const [productList, setProductList] = useState(products)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "chairs",
    price: "",
    description: "",
  })

  if (!isLoggedIn) {
    router.push("/admin/login")
    return null
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setProductList(
        productList.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                description: formData.description,
              }
            : p,
        ),
      )
      setEditingId(null)
    } else {
      const newProduct = {
        id: String(productList.length + 1),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        image: "/placeholder.svg",
        description: formData.description,
        rating: 4.5,
        reviews: 0,
        inStock: true,
      }
      setProductList([...productList, newProduct])
    }
    setFormData({ name: "", category: "chairs", price: "", description: "" })
    setShowForm(false)
  }

  const handleEdit = (product: (typeof productList)[0]) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your furniture inventory</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({ name: "", category: "chairs", price: "", description: "" })
            }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="chairs">Chairs</option>
                  <option value="tables">Tables</option>
                  <option value="sofas">Sofas</option>
                  <option value="storage">Storage</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="Price"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Description"
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ name: "", category: "chairs", price: "", description: "" })
                  }}
                  className="flex-1 border border-border px-6 py-3 rounded-lg hover:bg-muted transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-6 font-semibold">Product</th>
                  <th className="text-left py-4 px-6 font-semibold">Category</th>
                  <th className="text-left py-4 px-6 font-semibold">Price</th>
                  <th className="text-left py-4 px-6 font-semibold">Reviews</th>
                  <th className="text-left py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-6 font-medium">{product.name}</td>
                    <td className="py-4 px-6 text-muted-foreground capitalize">{product.category}</td>
                    <td className="py-4 px-6 font-semibold text-primary">${product.price}</td>
                    <td className="py-4 px-6">{product.reviews}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-blue-500/10 text-blue-600 rounded-lg transition"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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

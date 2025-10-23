"use client"

import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { AdminHeader } from "@/components/admin-header"
import { CheckCircle, Clock, Truck } from "lucide-react"

interface Order {
  id: string
  customer: string
  total: number
  status: "pending" | "processing" | "shipped"
  date: string
  items: number
}

export default function AdminOrdersPage() {
  const { isLoggedIn } = useAdmin()
  const router = useRouter()

  if (!isLoggedIn) {
    router.push("/admin/login")
    return null
  }

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Doe",
      total: 2499.99,
      status: "shipped",
      date: "2025-10-20",
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      total: 1299.99,
      status: "processing",
      date: "2025-10-21",
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      total: 3799.98,
      status: "pending",
      date: "2025-10-22",
      items: 3,
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      total: 899.99,
      status: "shipped",
      date: "2025-10-19",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "Tom Brown",
      total: 1599.98,
      status: "processing",
      date: "2025-10-21",
      items: 2,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-green-600" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-500/10 text-yellow-600",
      processing: "bg-blue-500/10 text-blue-600",
      shipped: "bg-green-500/10 text-green-600",
    }
    return badges[status as keyof typeof badges] || ""
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold mt-2">{totalOrders}</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold mt-2 text-primary">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-4 px-6 font-semibold">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold">Items</th>
                  <th className="text-left py-4 px-6 font-semibold">Total</th>
                  <th className="text-left py-4 px-6 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-4 px-6 font-semibold text-primary">{order.id}</td>
                    <td className="py-4 px-6">{order.customer}</td>
                    <td className="py-4 px-6">{order.items}</td>
                    <td className="py-4 px-6 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
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

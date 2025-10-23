import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css";
import { CartProvider } from "@/lib/cart-context"
import { AdminProvider } from "@/lib/admin-context"
import { WishlistProvider } from "@/lib/wishlist-context"

// ✅ Replace Geist with Inter (fully supported)
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Furniture E-Commerce",
  description: "Created with Next.js and Tailwind",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}

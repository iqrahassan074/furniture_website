// Mock furniture products data
export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Lounge Chair",
    category: "chairs",
    price: 599,
    image: "/modern-minimalist-lounge-chair.jpg",
    description: "Sleek and comfortable lounge chair with premium upholstery",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "Walnut Dining Table",
    category: "tables",
    price: 1299,
    image: "/walnut-wood-dining-table.jpg",
    description: "Elegant dining table crafted from solid walnut wood",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Scandinavian Sofa",
    category: "sofas",
    price: 1899,
    image: "/scandinavian-design-sofa.jpg",
    description: "Contemporary sofa with clean lines and premium comfort",
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: "4",
    name: "Industrial Bookshelf",
    category: "storage",
    price: 799,
    image: "/industrial-metal-bookshelf.jpg",
    description: "Sturdy bookshelf combining metal and wood elements",
    rating: 4.6,
    reviews: 67,
    inStock: true,
  },
  {
    id: "5",
    name: "Marble Coffee Table",
    category: "tables",
    price: 899,
    image: "/marble-top-coffee-table.jpg",
    description: "Luxurious coffee table with marble top and metal base",
    rating: 4.8,
    reviews: 98,
    inStock: true,
  },
  {
    id: "6",
    name: "Leather Accent Chair",
    category: "chairs",
    price: 749,
    image: "/leather-accent-chair.jpg",
    description: "Premium leather chair perfect for any modern space",
    rating: 4.7,
    reviews: 112,
    inStock: true,
  },
  {
    id: "7",
    name: "Modular Storage Unit",
    category: "storage",
    price: 1199,
    image: "/modular-storage-shelving.jpg",
    description: "Customizable storage solution for any room",
    rating: 4.5,
    reviews: 78,
    inStock: true,
  },
  {
    id: "8",
    name: "Velvet Sectional",
    category: "sofas",
    price: 2299,
    image: "/velvet-sectional-sofa.jpg",
    description: "Luxurious velvet sectional with deep seating",
    rating: 4.9,
    reviews: 203,
    inStock: false,
  },
]

export const categories = ["all", "chairs", "tables", "sofas", "storage"]

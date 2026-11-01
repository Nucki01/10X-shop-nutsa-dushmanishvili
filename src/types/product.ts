// src/types/product.ts
// TypeScript types for products and customer reviews (CORE Step 3 & FULL P3.4).

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  brand?: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
  reviews?: Review[]
}

// Type for the API response when fetching a list of products (GET /products)
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

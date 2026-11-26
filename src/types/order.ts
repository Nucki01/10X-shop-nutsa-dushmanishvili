import type { CartItem } from './cart'

// src/types/order.ts
// TypeScript types for Checkout shipping info, per-user Order history, and AsyncState (CORE + FULL T2).

export interface ShippingInfo {
  fullName: string
  email: string
  address: string
  city: string
}

// Union type for order status (PRD T2: union type)
export type OrderStatus = 'processing' | 'completed'

// Utility type Pick<T, K> to select item fields stored inside an Order (PRD T2 FULL: Utility Types)
export type OrderItem = Pick<
  CartItem,
  | 'productId'
  | 'title'
  | 'thumbnail'
  | 'price'
  | 'discountPercentage'
  | 'quantity'
>

// Order model saved in localStorage under `shop_orders` and linked to `username` (PRD A1.5 & P6 FULL)
export interface Order {
  id: string
  username: string
  createdAt: string
  shipping: ShippingInfo
  items: OrderItem[]
  subtotal: number
  discountAmount: number
  promoCode: string | null
  total: number
  status: OrderStatus
}

// Generic discriminated union for async data states (PRD T2 FULL)
export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: T }

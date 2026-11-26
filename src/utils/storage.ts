import type { CartItem } from '../types/cart'
import type { Order } from '../types/order'
import type { RegisteredUser } from '../types/user'

// StorageService OOP Class (PRD Section T3 FULL)
// Wraps localStorage get, set, and remove operations with generics <T> and try/catch safety.
export class StorageService {
  static get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage quota or private mode errors
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore storage errors
    }
  }
}

// Type Guard for validating CartItem objects loaded from localStorage (PRD Section T2 FULL)
export function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.productId === 'number' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  )
}

// ---------------------------------------------------------------------------
// Registered Users Storage (`shop_users`)
// ---------------------------------------------------------------------------
const USERS_STORAGE_KEY = 'shop_users'

// Default pre-seeded demo account so PRD test credentials (`emilys` / `emilyspass`) work immediately
const DEFAULT_DEMO_USERS: RegisteredUser[] = [
  {
    username: 'emilys',
    fullName: 'Emily Smith',
    email: 'emily@example.com',
    password: 'emilyspass',
    createdAt: '2026-10-24',
  },
]

export function loadRegisteredUsers(): RegisteredUser[] {
  const saved = StorageService.get<RegisteredUser[]>(USERS_STORAGE_KEY, [])
  if (!Array.isArray(saved) || saved.length === 0) {
    StorageService.set<RegisteredUser[]>(USERS_STORAGE_KEY, DEFAULT_DEMO_USERS)
    return DEFAULT_DEMO_USERS
  }
  return saved
}

export function findRegisteredUser(username: string): RegisteredUser | undefined {
  const normalized = username.trim().toLowerCase()
  return loadRegisteredUsers().find(
    (u) => u.username.toLowerCase() === normalized
  )
}

export function saveRegisteredUser(newUser: RegisteredUser): RegisteredUser[] {
  const existing = loadRegisteredUsers()
  const updated = [...existing, newUser]
  StorageService.set<RegisteredUser[]>(USERS_STORAGE_KEY, updated)
  return updated
}

// ---------------------------------------------------------------------------
// Per-User Cart Storage (`shop_cart_user_<username>` vs `shop_cart_guest`)
// ---------------------------------------------------------------------------
export function getUserCartKey(username: string): string {
  return `shop_cart_user_${username.trim().toLowerCase()}`
}

export function loadUserCart(username: string): CartItem[] {
  const raw = StorageService.get<unknown[]>(getUserCartKey(username), [])
  return Array.isArray(raw) ? raw.filter(isValidCartItem) : []
}

export function saveUserCart(username: string, items: CartItem[]): void {
  StorageService.set<CartItem[]>(getUserCartKey(username), items)
}

// ---------------------------------------------------------------------------
// Per-User Orders Storage (`shop_orders`)
// ---------------------------------------------------------------------------
const ORDERS_STORAGE_KEY = 'shop_orders'

export function loadOrders(username?: string): Order[] {
  const allOrders = StorageService.get<Order[]>(ORDERS_STORAGE_KEY, [])
  if (!Array.isArray(allOrders)) return []
  if (!username) return allOrders
  const normalized = username.trim().toLowerCase()
  return allOrders.filter(
    (order) => (order.username || '').toLowerCase() === normalized
  )
}

export function saveOrder(newOrder: Order): Order[] {
  const allOrders = StorageService.get<Order[]>(ORDERS_STORAGE_KEY, [])
  const updated = [newOrder, ...(Array.isArray(allOrders) ? allOrders : [])]
  StorageService.set<Order[]>(ORDERS_STORAGE_KEY, updated)
  return updated
}

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'
import { discountedPrice } from '../utils/format'
import {
  isValidCartItem,
  loadUserCart,
  saveUserCart,
  StorageService,
} from '../utils/storage'
import { useAuth } from './AuthContext'

// What CartContext shares with the rest of the app (CORE Step 12 + FULL Promo Code + Per-User Cart Persistence)
interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  promoCode: string | null
  discountAmount: number
  finalPrice: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  applyPromoCode: (code: string) => boolean
  removePromoCode: () => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Merge guest items into a user's saved cart when a guest logs in to complete checkout
function mergeCartLists(savedItems: CartItem[], guestItems: CartItem[]): CartItem[] {
  if (guestItems.length === 0) return savedItems
  const merged = [...savedItems]

  for (const guestItem of guestItems) {
    const existingIndex = merged.findIndex(
      (item) => item.productId === guestItem.productId
    )
    if (existingIndex >= 0) {
      const existing = merged[existingIndex]
      merged[existingIndex] = {
        ...existing,
        quantity: Math.min(existing.quantity + guestItem.quantity, existing.stock),
      }
    } else {
      merged.push(guestItem)
    }
  }
  return merged
}

// Load initial cart based on whether a user is logged in on startup
function loadInitialCart(username: string, isLoggedIn: boolean): CartItem[] {
  if (isLoggedIn && username) {
    return loadUserCart(username)
  }
  const guestSaved = StorageService.get<unknown[]>('shop_cart_guest', [])
  return Array.isArray(guestSaved) ? guestSaved.filter(isValidCartItem) : []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const activeUsername = user.isLoggedIn ? user.username : ''

  const [items, setItems] = useState<CartItem[]>(() =>
    loadInitialCart(user.username, user.isLoggedIn)
  )
  const [promoCode, setPromoCode] = useState<string | null>(null)

  // Track previous logged-in username to detect login / logout transitions
  const prevUsernameRef = useRef<string>(activeUsername)

  useEffect(() => {
    const prevUsername = prevUsernameRef.current
    if (prevUsername === activeUsername) return

    prevUsernameRef.current = activeUsername

    async function syncCartOnAuthChange() {
      await Promise.resolve()
      if (activeUsername) {
        // User just logged in: load their saved personal cart and merge any items added while browsing as guest
        const savedUserItems = loadUserCart(activeUsername)
        const guestItems =
          prevUsername === ''
            ? StorageService.get<unknown[]>('shop_cart_guest', []).filter(
                isValidCartItem
              )
            : []
        const merged = mergeCartLists(savedUserItems, guestItems)

        // Clear guest cart so items are never left visible when logging out
        StorageService.remove('shop_cart_guest')
        saveUserCart(activeUsername, merged)
        StorageService.set<CartItem[]>('shop_cart', merged)
        setItems(merged)
      } else {
        // User just logged out: keep their personal cart saved in `shop_cart_user_<username>`,
        // and reset the visible guest cart to empty so their items are NOT visible as guest.
        StorageService.remove('shop_cart_guest')
        StorageService.set<CartItem[]>('shop_cart', [])
        setItems([])
        setPromoCode(null)
      }
    }

    void syncCartOnAuthChange()
  }, [activeUsername])

  // Persist cart items whenever `items` changes
  useEffect(() => {
    // Skip overwriting if an auth transition is currently pending
    if (prevUsernameRef.current !== activeUsername) return

    if (activeUsername) {
      saveUserCart(activeUsername, items)
      StorageService.set<CartItem[]>('shop_cart', items)
    } else {
      StorageService.set<CartItem[]>('shop_cart_guest', items)
      StorageService.set<CartItem[]>('shop_cart', items)
    }
  }, [items, activeUsername])

  // 1. Add a product to the cart (using immutable state updates)
  function addItem(product: Product, quantity = 1) {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item
        )
      }

      const newItem: CartItem = {
        productId: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        quantity: Math.min(quantity, product.stock),
      }
      return [...prevItems, newItem]
    })
  }

  // 2. Remove a product from the cart using .filter()
  function removeItem(productId: number) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    )
  }

  // 3. Change the quantity of a product (between 1 and stock) using .map()
  function updateQuantity(productId: number, quantity: number) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.productId !== productId) return item
        const safeQty = Math.max(1, Math.min(quantity, item.stock))
        return { ...item, quantity: safeQty }
      })
    )
  }

  // 4. Apply promo code "10X10" (case-insensitive) for a 10% discount [FULL]
  function applyPromoCode(code: string): boolean {
    if (code.trim().toUpperCase() === '10X10') {
      setPromoCode('10X10')
      return true
    }
    return false
  }

  // 5. Remove applied promo code
  function removePromoCode() {
    setPromoCode(null)
  }

  // 6. Empty the entire cart (used on Cart page and after Checkout)
  function clearCart() {
    setItems([])
    setPromoCode(null)
  }

  // Calculate total number of items (for Header badge), subtotal, discount, and final price
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  )
  const discountAmount = promoCode === '10X10' ? totalPrice * 0.1 : 0
  const finalPrice = totalPrice - discountAmount

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        promoCode,
        discountAmount,
        finalPrice,
        addItem,
        removeItem,
        updateQuantity,
        applyPromoCode,
        removePromoCode,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Helper hook to use CartContext inside any component
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}

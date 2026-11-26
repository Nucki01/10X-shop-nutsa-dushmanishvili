import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { ProtectedRoute } from './ProtectedRoute'

// Route-level code splitting with React.lazy (PRD Section O1 FULL)
const CatalogPage = lazy(() =>
  import('../pages/CatalogPage').then((m) => ({ default: m.CatalogPage }))
)
const ProductPage = lazy(() =>
  import('../pages/ProductPage').then((m) => ({ default: m.ProductPage }))
)
const CartPage = lazy(() =>
  import('../pages/CartPage').then((m) => ({ default: m.CartPage }))
)
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((m) => ({ default: m.LoginPage }))
)
const RegisterPage = lazy(() =>
  import('../pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
)
const CheckoutPage = lazy(() =>
  import('../pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
)
const OrdersPage = lazy(() =>
  import('../pages/OrdersPage').then((m) => ({ default: m.OrdersPage }))
)
const ProfilePage = lazy(() =>
  import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
)
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

// Application Route Map (PRD Section A1.2, P0.1, P0.2, P6, P7 & O1)
// - Public routes: /, /login, /register, /products/:id, /cart, *
// - Protected routes: /checkout, /orders, /profile (wrapped in <ProtectedRoute>)
export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="bg-white border border-stone-200 p-10 text-center my-8 max-w-xl mx-auto">
          <p className="text-stone-600 text-sm">Loading page...</p>
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

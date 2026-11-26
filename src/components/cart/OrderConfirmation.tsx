import { Link } from 'react-router-dom'
import type { ShippingInfo } from '../../types/order'
import { formatPrice } from '../../utils/format'

// Props passed from CheckoutPage after a valid order is submitted
interface OrderConfirmationProps {
  orderId?: string
  shipping: ShippingInfo
  total: number
}

// OrderConfirmation Component (PRD Step 15 & Section P5.3)
// Styled with Velvety @theme tokens (font-serif, bg-velvety-mist, bg-velvety-green).
export function OrderConfirmation({
  orderId,
  shipping,
  total,
}: OrderConfirmationProps) {
  return (
    <section className="max-w-lg mx-auto my-8 bg-white border border-stone-200 p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-velvety-mist text-velvety-green rounded-full flex items-center justify-center mx-auto text-xl font-bold">
        ✓
      </div>

      <h1 className="font-serif text-3xl text-velvety-ink">
        Thank you! Your order has been placed.
      </h1>

      <p className="text-sm text-stone-600">
        Confirmation for <strong>{shipping.fullName}</strong> ({shipping.email})
      </p>

      <div className="bg-velvety-cream border border-stone-200 p-4 text-sm text-left space-y-2">
        {orderId && (
          <div className="flex justify-between">
            <span className="text-stone-500">Order ID:</span>
            <span className="font-semibold text-velvety-ink">#{orderId}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-stone-500">Delivery address:</span>
          <span className="font-medium text-velvety-ink">
            {shipping.address}, {shipping.city}
          </span>
        </div>
        <div className="flex justify-between border-t border-stone-200 pt-2">
          <span className="font-bold text-velvety-ink">Order Total:</span>
          <span className="font-serif font-bold text-velvety-green">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/orders"
          className="inline-block border border-stone-300 hover:bg-velvety-mist text-velvety-ink text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
        >
          View orders
        </Link>
        <Link
          to="/"
          className="inline-block bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  )
}

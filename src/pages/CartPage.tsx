import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { discountedPrice, formatPrice } from '../utils/format'

// P4 — Shopping Cart Page (/cart) [CORE Step 13 + FULL Promo Code 10X10]
// Styled with Velvety @theme tokens (font-serif, bg-velvety-mist, bg-velvety-green).
export function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    promoCode,
    discountAmount,
    finalPrice,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
    clearCart,
  } = useCart()
  const navigate = useNavigate()

  // Local state for the promo code input box and validation message
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  function handleApplyPromo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const isValid = applyPromoCode(promoInput)
    if (isValid) {
      setPromoError('')
      setPromoInput('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  // 1. Empty Cart State (PRD P4.1)
  if (items.length === 0) {
    return (
      <section className="space-y-4">
        <h1 className="font-serif text-3xl text-velvety-ink">Shopping Cart</h1>
        <div className="bg-white border border-stone-200 p-10 text-center space-y-4">
          <p className="text-stone-600">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
          >
            Browse products
          </Link>
        </div>
      </section>
    )
  }

  // 2. Filled Cart State: Items list on the left, Order summary on the right
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <h1 className="font-serif text-3xl text-velvety-ink">
          Shopping Cart ({totalItems})
        </h1>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Clear the cart? This cannot be undone.')) {
              clearCart()
            }
          }}
          className="text-xs uppercase tracking-wider text-red-700 hover:underline cursor-pointer"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: List of Cart Items (takes 2 columns on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const unitPrice = discountedPrice(
              item.price,
              item.discountPercentage
            )
            const lineTotal = unitPrice * item.quantity

            return (
              <div
                key={item.productId}
                className="bg-white border border-stone-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Product Thumbnail & Title */}
                <div className="flex items-center gap-4">
                  <div className="bg-velvety-mist/60 p-1.5 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover bg-white"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/products/${item.productId}`}
                      className="font-serif text-lg text-velvety-ink hover:text-velvety-sage"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-stone-500 mt-1">
                      Unit price: {formatPrice(unitPrice)}
                    </p>
                  </div>
                </div>

                {/* Quantity Stepper (- / +), Line Total, and Remove Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center border border-stone-300 bg-velvety-cream">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1.5 text-sm font-bold disabled:opacity-40 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1.5 text-sm font-bold disabled:opacity-40 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-serif font-bold text-velvety-green w-20 text-right">
                    {formatPrice(lineTotal)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-xs uppercase tracking-wider text-red-700 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Side: Order Summary Box */}
        <div className="bg-white border border-stone-200 p-6 h-fit space-y-4">
          <h2 className="font-serif text-xl text-velvety-ink">Order Summary</h2>

          {/* Promo Code Form (PRD P4.4 — code "10X10" gives 10% off) */}
          {!promoCode ? (
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <label
                htmlFor="promo-code"
                className="block text-xs uppercase tracking-wider text-stone-500"
              >
                Promo code (try 10X10)
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-code"
                  type="text"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value)
                    if (promoError) setPromoError('')
                  }}
                  placeholder="Enter code"
                  className="flex-1 border border-stone-300 bg-velvety-cream/50 px-3 py-2 text-sm focus:outline-2 focus:outline-velvety-green"
                />
                <button
                  type="submit"
                  className="bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-4 py-2 cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-xs text-red-600">{promoError}</p>
              )}
            </form>
          ) : (
            <div className="flex items-center justify-between bg-velvety-mist/70 border border-stone-200 px-3 py-2 text-xs">
              <span className="font-medium text-velvety-green">
                Code <strong>{promoCode}</strong> applied (−10%)
              </span>
              <button
                type="button"
                onClick={removePromoCode}
                className="uppercase tracking-wider text-red-700 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          <div className="space-y-2 text-sm border-b border-stone-200 pb-4">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            {promoCode && (
              <div className="flex justify-between text-velvety-green font-medium">
                <span>Discount ({promoCode} −10%)</span>
                <span>−{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-velvety-ink">
            <span>Total</span>
            <span className="font-serif text-xl text-velvety-green">
              {formatPrice(finalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium py-3 cursor-pointer transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </section>
  )
}

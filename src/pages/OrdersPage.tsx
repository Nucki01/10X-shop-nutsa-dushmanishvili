import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { discountedPrice, formatDate, formatPrice } from '../utils/format'
import { loadOrders } from '../utils/storage'

// P6 — Orders History Page (/orders) [PRD FULL Requirement P6]
// Protected route showing past orders saved in localStorage (`shop_orders`) for the logged-in user.
export function OrdersPage() {
  const { user } = useAuth()
  const orders = loadOrders(user.username)

  return (
    <section className="space-y-6">
      <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-velvety-sage">
            Account History · {user.fullName || user.username}
          </p>
          <h1 className="font-serif text-3xl text-velvety-ink">My Orders</h1>
        </div>
        <Link
          to="/profile"
          className="text-xs uppercase tracking-wider font-medium text-velvety-green hover:text-velvety-sage underline"
        >
          ← Back to profile
        </Link>
      </div>

      {/* Empty Orders State (exact PRD P6 texts: "You have no orders yet." + "Start shopping") */}
      {orders.length === 0 ? (
        <div className="bg-white border border-stone-200 p-10 text-center space-y-4">
          <p className="text-stone-600">You have no orders yet.</p>
          <Link
            to="/"
            className="inline-block bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="bg-white border border-stone-200 p-6 space-y-4"
            >
              {/* Order Header: Order ID, Date, Status Badge & Total */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-xl text-velvety-ink">
                      Order #{order.id}
                    </h2>
                    <span className="bg-velvety-mist text-velvety-green text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Placed on {formatDate(order.createdAt)} · Ship to{' '}
                    <span className="text-velvety-ink font-medium">
                      {order.shipping.fullName}
                    </span>{' '}
                    ({order.shipping.address}, {order.shipping.city})
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    Order Total
                  </p>
                  <p className="font-serif text-2xl font-bold text-velvety-green">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Ordered Items List */}
              <ul className="divide-y divide-stone-200">
                {order.items.map((item) => {
                  const unitPrice = discountedPrice(
                    item.price,
                    item.discountPercentage
                  )
                  return (
                    <li
                      key={item.productId}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          loading="lazy"
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover border border-stone-200 bg-velvety-mist/40"
                        />
                        <div>
                          <Link
                            to={`/products/${item.productId}`}
                            className="font-serif text-base text-velvety-ink hover:text-velvety-sage transition-colors"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-stone-500">
                            Qty: {item.quantity} × {formatPrice(unitPrice)}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-velvety-ink">
                        {formatPrice(unitPrice * item.quantity)}
                      </span>
                    </li>
                  )
                })}
              </ul>

              {/* Optional Promo Code Discount Breakdown */}
              {order.promoCode && order.discountAmount > 0 && (
                <div className="border-t border-stone-200 pt-3 flex justify-between text-xs text-velvety-green font-medium">
                  <span>Promo Code Applied ({order.promoCode} −10%)</span>
                  <span>−{formatPrice(order.discountAmount)}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

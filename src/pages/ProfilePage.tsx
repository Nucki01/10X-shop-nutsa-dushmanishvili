import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { discountedPrice, formatDate, formatPrice } from '../utils/format'
import { loadOrders } from '../utils/storage'

// P7 — User Profile Page (/profile) [PRD FULL Requirement P7]
// Protected route showing logged-in user details, order summary stats, connected Order History, and Log out button.
export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const orders = loadOrders(user.username)

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const displayName = user.fullName || user.username
  const avatarInitial = (displayName || 'U').charAt(0).toUpperCase()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <section className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-velvety-sage">
            Account Overview
          </p>
          <h1 className="font-serif text-3xl text-velvety-ink">My Profile</h1>
        </div>
        <Link
          to="/"
          className="text-xs uppercase tracking-wider font-medium text-velvety-green hover:text-velvety-sage underline"
        >
          ← Back to catalog
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-velvety-green text-white font-serif text-2xl flex items-center justify-center">
              {avatarInitial}
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-2xl text-velvety-ink">
                {displayName}
              </h2>
              <p className="text-xs text-stone-500">
                Username: <strong>@{user.username}</strong>
                {user.email ? ` · ${user.email}` : ''}
                {user.createdAt
                  ? ` · Member since ${formatDate(user.createdAt)}`
                  : ''}
              </p>
              <p className="text-xs uppercase tracking-wider text-velvety-sage">
                100% Vegan &amp; Cruelty-Free Club Member
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="border border-stone-300 hover:bg-stone-100 text-velvety-ink text-xs uppercase tracking-wider font-medium px-5 py-2.5 cursor-pointer transition-colors"
          >
            Log out
          </button>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-velvety-cream border border-stone-200 p-4 space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Total Orders Placed
            </p>
            <p className="font-serif text-2xl font-bold text-velvety-ink">
              {orders.length}
            </p>
          </div>

          <div className="bg-velvety-cream border border-stone-200 p-4 space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Total Amount Spent
            </p>
            <p className="font-serif text-2xl font-bold text-velvety-green">
              {formatPrice(totalSpent)}
            </p>
          </div>
        </div>
      </div>

      {/* Connected Order History Section inside Profile */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-velvety-ink">
            Order History ({orders.length})
          </h2>
          <Link
            to="/orders"
            className="text-xs uppercase tracking-wider font-medium text-velvety-green underline"
          >
            Open full orders page →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-stone-200 p-8 text-center space-y-3">
            <p className="text-stone-600 text-sm">You have no orders yet.</p>
            <Link
              to="/"
              className="inline-block bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="bg-white border border-stone-200 p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-lg text-velvety-ink">
                        Order #{order.id}
                      </h3>
                      <span className="bg-velvety-mist text-velvety-green text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      {formatDate(order.createdAt)} · Shipped to{' '}
                      {order.shipping.address}, {order.shipping.city}
                    </p>
                  </div>
                  <p className="font-serif text-xl font-bold text-velvety-green">
                    {formatPrice(order.total)}
                  </p>
                </div>

                <ul className="divide-y divide-stone-200">
                  {order.items.map((item) => {
                    const unitPrice = discountedPrice(
                      item.price,
                      item.discountPercentage
                    )
                    return (
                      <li
                        key={item.productId}
                        className="py-2.5 flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            loading="lazy"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover border border-stone-200"
                          />
                          <div>
                            <Link
                              to={`/products/${item.productId}`}
                              className="font-serif text-velvety-ink hover:text-velvety-sage"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-stone-500">
                              Qty: {item.quantity} × {formatPrice(unitPrice)}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-velvety-ink">
                          {formatPrice(unitPrice * item.quantity)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

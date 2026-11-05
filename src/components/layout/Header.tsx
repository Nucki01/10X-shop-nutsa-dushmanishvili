import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

// Shared Header Component (PRD P0.3 — 10X Shop logo, Catalog, Cart + badge hidden at 0, Theme toggle, Log in/Log out)
export function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-velvety-green dark:bg-stone-900 text-white border-b border-white/10 transition-colors">
      <Container className="py-5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo in Velvety serif style with lining-nums so "10" matches "X" height */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif lining-nums text-2xl tracking-widest uppercase">
            10X Shop
          </span>
          <span className="text-[10px] tracking-widest uppercase text-velvety-mist/80 dark:text-stone-300">
            Beauty &amp; Personal Care
          </span>
        </Link>

        {/* Minimalist Uppercase Navigation Links + Theme Toggle */}
        <nav className="flex flex-wrap items-center gap-5 text-xs tracking-wider uppercase font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-white underline underline-offset-4 font-semibold'
                : 'text-white/80 hover:text-white transition-colors'
            }
          >
            Catalog
          </NavLink>

          {/* Cart link with live item count badge (hidden when totalItems === 0 per PRD P0.3) */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-1.5 ${
                isActive
                  ? 'text-white underline underline-offset-4 font-semibold'
                  : 'text-white/80 hover:text-white transition-colors'
              }`
            }
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-stone-100 text-stone-900 text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Dark / Light Mode Toggle Button (PRD Tailwind CSS FULL) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark or light theme"
            className="border border-white/30 hover:bg-white/10 text-white px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>

          {/* Show Username + Log out if logged in, otherwise show Log in */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-white/90 normal-case">
                Hi, {user.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-stone-100 text-stone-900 hover:bg-stone-200 px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-stone-100 text-stone-900 hover:bg-stone-200 px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Log in
            </NavLink>
          )}
        </nav>
      </Container>
    </header>
  )
}

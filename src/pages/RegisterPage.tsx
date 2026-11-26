import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface RegisterErrors {
  fullName?: string
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

// Registration Page (/register) — Controlled form with 5 validated fields saved to localStorage (`shop_users`)
export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Controlled Form State
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Validation Error State
  const [errors, setErrors] = useState<RegisterErrors>({})

  const state = location.state as { from?: string } | null
  const redirectPath = state?.from || '/profile'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nextErrors: RegisterErrors = {}

    if (fullName.trim().length < 3) {
      nextErrors.fullName = 'Full name must be at least 3 characters'
    }

    if (!username.trim()) {
      nextErrors.username = 'Username is required'
    } else if (username.trim().length < 3) {
      nextErrors.username = 'Username must be at least 3 characters'
    }

    const trimmedEmail = email.trim()
    if (
      !trimmedEmail ||
      !trimmedEmail.includes('@') ||
      !trimmedEmail.includes('.')
    ) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Password is required'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password'
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    // Attempt to save new user in localStorage (`shop_users`) and sign in
    const result = register({
      fullName,
      username,
      email,
      password,
    })

    if (!result.success) {
      setErrors({ username: result.error })
      return
    }

    setErrors({})
    navigate(redirectPath)
  }

  return (
    <section className="max-w-md mx-auto my-6 space-y-4">
      <Link
        to="/"
        className="inline-block text-xs uppercase tracking-wider font-medium text-velvety-sage hover:text-velvety-green"
      >
        ← Back to catalog
      </Link>

      <div className="bg-white border border-stone-200 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-velvety-sage mb-1">
          Create Account
        </p>
        <h1 className="font-serif text-3xl text-velvety-ink mb-2">Register</h1>
        <p className="text-xs text-stone-600 mb-6">
          Create your personal account to save your cart and track your order
          history.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Full Name */}
          <div>
            <label
              htmlFor="reg-fullName"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Full name
            </label>
            <input
              id="reg-fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* 2. Username */}
          <div>
            <label
              htmlFor="reg-username"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username (min 3 characters)"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {errors.username && (
              <p className="text-xs text-red-600 mt-1">{errors.username}</p>
            )}
          </div>

          {/* 3. Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* 4. Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* 5. Confirm Password */}
          <div>
            <label
              htmlFor="reg-confirmPassword"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Confirm password
            </label>
            <input
              id="reg-confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium py-3 cursor-pointer transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-stone-600 text-center mt-6 pt-4 border-t border-stone-200">
          Already have an account?{' '}
          <Link
            to="/login"
            state={state}
            className="text-velvety-green font-semibold underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}

import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// P1 — Login Page (/login) [CORE Step 5 + Registered Account Verification]
// Styled with Velvety @theme tokens (font-serif, bg-velvety-green).
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Input values stored in React state (Controlled Form)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Error messages stored in React state
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authError, setAuthError] = useState('')

  // Check if ProtectedRoute sent the user here from "/checkout", "/orders", or "/profile"
  const state = location.state as { from?: string } | null
  const redirectPath = state?.from || '/'

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // 1. Stop the browser from reloading the page
    e.preventDefault()

    // 2. Reset old errors before checking again
    let hasError = false
    setUsernameError('')
    setPasswordError('')
    setAuthError('')

    // 3. Validate Username (PRD P1.2: required)
    if (!username.trim()) {
      setUsernameError('Username is required')
      hasError = true
    }

    // 4. Validate Password (PRD P1.2: required, min 6 characters)
    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      hasError = true
    }

    // If any field has an error, stop here
    if (hasError) {
      return
    }

    // 5. Verify credentials against registered users in localStorage (`shop_users`)
    const result = login(username, password)
    if (!result.success) {
      setAuthError(result.error || 'Invalid login credentials.')
      return
    }

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
          Welcome Back
        </p>
        <h1 className="font-serif text-3xl text-velvety-ink mb-2">Log In</h1>
        <p className="text-xs text-stone-600 mb-6">
          Sign in with your registered account (or demo account{' '}
          <strong>emilys</strong> / <strong>emilyspass</strong>).
        </p>

        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 mb-4">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {usernameError && (
              <p className="text-xs text-red-600 mt-1">{usernameError}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-velvety-green"
            />
            {passwordError && (
              <p className="text-xs text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium py-3 cursor-pointer transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-stone-600 text-center mt-6 pt-4 border-t border-stone-200">
          Don&apos;t have an account yet?{' '}
          <Link
            to="/register"
            state={state}
            className="text-velvety-green font-semibold underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  )
}

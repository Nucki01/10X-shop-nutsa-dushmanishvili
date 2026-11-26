import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser, RegisteredUser } from '../types/user'
import {
  findRegisteredUser,
  saveRegisteredUser,
  StorageService,
} from '../utils/storage'

const USER_STORAGE_KEY = 'shop_user'

export interface AuthActionResult {
  success: boolean
  error?: string
}

export interface RegisterInput {
  fullName: string
  username: string
  email: string
  password: string
}

// What AuthContext shares with other components
interface AuthContextType {
  user: AuthUser
  login: (username: string, password?: string) => AuthActionResult
  register: (input: RegisterInput) => AuthActionResult
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Load saved user session from localStorage (`shop_user`) on initial startup
function loadInitialUser(): AuthUser {
  const saved = StorageService.get<AuthUser>(USER_STORAGE_KEY, {
    username: '',
    isLoggedIn: false,
  })
  if (saved.isLoggedIn && saved.username) {
    const registered = findRegisteredUser(saved.username)
    if (registered) {
      return {
        username: registered.username,
        fullName: registered.fullName,
        email: registered.email,
        createdAt: registered.createdAt,
        isLoggedIn: true,
      }
    }
  }
  return saved
}

// AuthProvider manages registration, login, and logout with localStorage persistence
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(loadInitialUser)

  useEffect(() => {
    StorageService.set<AuthUser>(USER_STORAGE_KEY, user)
  }, [user])

  // Log in against registered users in localStorage (`shop_users`)
  function login(username: string, password?: string): AuthActionResult {
    const trimmedUsername = username.trim()
    const registered = findRegisteredUser(trimmedUsername)

    if (!registered) {
      return {
        success: false,
        error: 'Account not found. Please register an account first.',
      }
    }

    if (password !== undefined && registered.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.',
      }
    }

    setUser({
      username: registered.username,
      fullName: registered.fullName,
      email: registered.email,
      createdAt: registered.createdAt,
      isLoggedIn: true,
    })

    return { success: true }
  }

  // Register a new user in localStorage (`shop_users`) and sign them in immediately
  function register(input: RegisterInput): AuthActionResult {
    const trimmedUsername = input.username.trim()
    const existing = findRegisteredUser(trimmedUsername)

    if (existing) {
      return {
        success: false,
        error: 'This username is already taken. Please choose another.',
      }
    }

    const newUser: RegisteredUser = {
      username: trimmedUsername,
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      password: input.password,
      createdAt: new Date().toISOString().split('T')[0],
    }

    saveRegisteredUser(newUser)

    setUser({
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      isLoggedIn: true,
    })

    return { success: true }
  }

  // Log out: reset back to guest state
  function logout() {
    setUser({
      username: '',
      isLoggedIn: false,
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Helper hook so any component can easily read `user`, `login`, `register`, and `logout`
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}

// src/types/user.ts
// TypeScript types for registered users, active auth session, login, and registration forms.

export interface RegisteredUser {
  username: string
  fullName: string
  email: string
  password: string
  createdAt: string
}

export interface AuthUser {
  username: string
  fullName?: string
  email?: string
  createdAt?: string
  isLoggedIn: boolean
}

export interface LoginFormValues {
  username: string
  password: string
}

export interface RegisterFormValues {
  fullName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

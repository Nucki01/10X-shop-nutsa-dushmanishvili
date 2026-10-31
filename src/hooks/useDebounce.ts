import { useEffect, useState } from 'react'

// Custom Generic Hook: useDebounce<T> (PRD FULL Requirement P2.4 & T3)
// Delays updating the returned value until the user stops typing for `delay` ms (e.g. 400ms).
// Note for Defense:
// 1. `<T>` is a TypeScript Generic, so this hook works for strings, numbers, or any type.
// 2. `return () => clearTimeout(timer)` is the useEffect cleanup function — if the user types
//    another letter before 400ms finishes, it cancels the previous timer.
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function: cancel the timer if `value` changes before `delay` ends
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

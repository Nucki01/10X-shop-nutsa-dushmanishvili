// src/utils/format.ts
// Price, discount, and date formatting helpers (PRD Section P2.3 & T3).

// Calculate discounted price rounded to 2 decimal places: price * (1 - pct / 100)
export function discountedPrice(price: number, pct: number): number {
  if (pct < 1) return price
  return Math.round(price * (1 - pct / 100) * 100) / 100
}

// Format a numeric amount into a price string (e.g. "€2.45")
export function formatPrice(amount: number): string {
  return `€${amount.toFixed(2)}`
}

// Format an ISO date string into a readable local date
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString()
}

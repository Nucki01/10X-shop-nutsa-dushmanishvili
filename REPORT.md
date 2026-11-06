# Project Report (REPORT.md)

**Student:** Nutsa Dushmanishvili  
**Project:** 10X Shop  
**Repository:** [https://github.com/Nucki01/10X-shop-nutsa-dushmanishvili]
**youtube demo video link:** [https://www.youtube.com/watch?v=j1jrfNu8lKU]  no audio
---

## What I Planned vs. What I Built

I started by building all the **CORE** requirements first so the main store flow worked from start to finish. After that, I added the **Velvety** design and several **FULL** features.

| Module | What Was Done | Level | Status |
| :--- | :--- | :---: | :---: |
| **React** | Functional components, `props`, `props.children` (`Container`), `.map()` with `key` | CORE | ✅ Done |
| **React** | React Router pages (`/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`) inside one `Layout` | CORE | ✅ Done |
| **React** | `AuthContext` (`login` / `logout`), controlled `/login` form, and `ProtectedRoute` for `/checkout` | CORE | ✅ Done |
| **React** | `CartContext` with immutable `.map()` / `.filter()` updates and `localStorage` (`shop_cart`) | CORE | ✅ Done |
| **React** | Controlled `/checkout` form (`Full name`, `Email`, `Address`, `City`) and Order Confirmation | CORE | ✅ Done |
| **React** | Search with `useDebounce`, Category filter, 5-option Sort, Reviews, Related Products, Promo code `10X10` | FULL | ✅ Done |
| **TypeScript** | `"strict": true`, `0` errors in `npm run typecheck`, zero `any`, all types in `src/types/` | CORE | ✅ Done |
| **Tailwind CSS** | Tailwind CSS v4 (`@import "tailwindcss"`), responsive grid (`375px` to desktop), `hover:` / `focus:` / `disabled:` | CORE | ✅ Done |
| **Tailwind CSS** | Custom `@theme` colors & fonts + Light / Dark Mode toggle (`ThemeContext`) | FULL | ✅ Done |
| **Optimization** | No horizontal scroll on `375px`, `loading="lazy"`, `ErrorBoundary`, `DEBUG-LOG.md`, `COMPATIBILITY.md` | CORE | ✅ Done |
| **Process** | `PLAN.md`, `README.md`, `REPORT.md`, `vercel.json`, and step-by-step Git commits | CORE | ✅ Done |

**What I decided not to include and why:**  
I skipped the optional `/orders` and `/profile` pages and extra OOP classes (`StorageService`, `Cart` class) because i decided to give that time to improving of whats already done and to maintain simple writing style that would not be so complicated for me.

---

## Project Numbers & Checks

- **TypeScript (`npm run typecheck`):** `0 errors`
- **Linter (`npm run lint`):** `0 warnings, 0 errors`
- **Production Build (`npm run build`):** Passed with `0 errors`

---

## Error Boundary Fallback Demo

Tested by throwing a test error inside a component — `ErrorBoundary.tsx` catches the crash and displays the fallback card instead of a blank screen:

![ErrorBoundary fallback screenshot](<Screenshot 2026-11-06 172504.png>)

---

## How I Used AI

- I used **Gemini (in Antigravity)** as a tutor to help me break the project into small steps, understand how React Context (`AuthContext`, `CartContext`, `ThemeContext`) and `useEffect` work, and check my TypeScript types.


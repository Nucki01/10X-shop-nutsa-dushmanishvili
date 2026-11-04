# Project Report (REPORT.md)

**Student:** Nutsa Dushmanishvili  
**Project:** 10X Shop — Vegan & Cruelty-Free Beauty Edition  
**Repository:** [https://github.com/Nucki01/10X_shop_nutsaDushmanishvili](https://github.com/Nucki01/10X_shop_nutsaDushmanishvili)

---

## 1. Planned vs. Delivered Checklist (By Module)

| Module | Requirement | Level | Status | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **React** | Functional components, `props`, `props.children` (`Container`), `.map()` with stable `key` | CORE | ✅ Done | Used across `CatalogPage`, `ProductGrid`, `ProductCard`, `CartPage`. |
| **React** | React Router SPA routes (`/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`) + scroll-to-top | CORE | ✅ Done | Configured in `AppRoutes.tsx` and `Layout.tsx`. |
| **React** | `AuthContext` (`login`/`logout`), controlled `/login` form, and `ProtectedRoute` for `/checkout` | CORE | ✅ Done | Guests visiting `/checkout` redirect to `/login` and return after signing in. |
| **React** | `CartContext` with immutable updates (`addItem`, `removeItem`, `updateQuantity`, `clearCart`) + `localStorage` | CORE | ✅ Done | Synchronized with Header badge (hidden when `0`) and `/cart` page. |
| **React** | Controlled Checkout form (`Full name`, `Email`, `Address`, `City`) & Order Confirmation | CORE | ✅ Done | Displays `"Thank you! Your order has been placed."` and empties cart. |
| **React** | Debounced search (`useDebounce`), category filter, 5-option sorting, Reviews, Related Products, Promo `10X10` | FULL | ✅ Done | Implemented in `CatalogToolbar.tsx`, `ProductReviews.tsx`, `RelatedProducts.tsx`, `CartPage.tsx`. |
| **TypeScript** | `"strict": true`, zero `any`, `npm run typecheck` = 0 errors, domain models in `src/types/` | CORE | ✅ Done | Verified via `tsc --noEmit -p tsconfig.app.json` and `oxlint`. |
| **Tailwind CSS** | Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss"`), Flex/Grid, responsive (`375px` to desktop), `hover:`/`focus:`/`disabled:` | CORE | ✅ Done | Mobile-first responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). |
| **Tailwind CSS** | Custom `@theme` tokens (Velvety palette) + Dark/Light Mode (`@custom-variant dark`, `ThemeContext`) | FULL | ✅ Done | Defined in `src/index.css` and `src/context/ThemeContext.tsx`. |
| **Optimization** | Responsive layout with 0 horizontal scroll at `375px`, `ErrorBoundary`, `DEBUG-LOG.md` (3 real bugs), `COMPATIBILITY.md` | CORE | ✅ Done | Documented in `DEBUG-LOG.md` and `COMPATIBILITY.md`. |
| **Process** | `PLAN.md`, `README.md` (EN), `REPORT.md`, `vercel.json` SPA config, meaningful Git commit history | CORE | ✅ Done | All documentation files included in repository root. |

**What was intentionally left out and why:**  
Following the **CORE First** principle, optional complex OOP wrappers (`StorageService<T>`, `Cart` class) and extra `/orders` or `/profile` pages were skipped to keep the React + TypeScript architecture simple, readable, and 100% bug-free for defense.

---

## 2. Build & Bundle Metrics

- **TypeScript Check (`npm run typecheck`):** `0 errors`
- **Linter Check (`npm run lint`):** `0 warnings, 0 errors`
- **Production Build (`npm run build`):**
  - Main JS bundle: `~89 kB gzip` (well below the 250 kB gzip target in PRD Section O1)
  - CSS bundle: `~4.6 kB gzip`

---

## 3. Three Key Challenges & Solutions

1. **Protecting `/checkout` while preserving user flow:**
   - *Challenge:* When a guest clicks *"Proceed to checkout"* from the cart, they should be asked to log in first and then automatically sent back to `/checkout` instead of losing their place.
   - *Solution:* Used React Router's `<Navigate to="/login" state={{ from: location.pathname }} replace />` inside `ProtectedRoute.tsx` and read `location.state?.from` inside `LoginPage.tsx`.
2. **Preventing product image cropping across mobile, tablet, and desktop breakpoints:**
   - *Challenge:* Fixed height classes (`h-52`) caused product card images to stretch wide and crop bottle tops on single-column mobile screens.
   - *Solution:* Switched to `aspect-square` (`1:1` ratio) on catalog thumbnails and `object-contain` on the Product Detail page so proportions remain identical across all screen sizes.
3. **Combining DummyJSON API requirements with a cohesive Velvety Vegan aesthetic:**
   - *Challenge:* Requirement `A1.6` mandates fetching product and review data from DummyJSON endpoints (`GET /products` and `GET /products/:id`), while the store design follows the Velvety vegan beauty UI kit.
   - *Solution:* Built `src/utils/api.ts` to perform live `fetch` requests to DummyJSON with `loading` and `error` handling, merging DummyJSON's live response and reviews with our curated vegan beauty visuals.

---

## 4. What I Would Do Differently Next Time

- I would use `aspect-square` and `object-contain` for product images from the very first commit instead of fixed pixel heights (`h-52`), which would have avoided responsive cropping adjustments later.
- I would connect URL query parameters (`useSearchParams`) from the start when adding search and sorting.

---

## 5. Summary of AI Usage

- Used **Gemini in Antigravity** as a step-by-step tutor and pair-programming assistant to plan the 3-week schedule, understand React hooks (`useState`, `useEffect`, `useContext`, custom `useDebounce`), and verify strict TypeScript types.
- Used AI to help configure Tailwind CSS v4 `@theme` design tokens and class-based Dark/Light mode (`@custom-variant dark`).
- Rejected overly complex generic OOP abstractions (`ApiClient`, `StorageService` classes) early on so that every file remains clean, easy to test, and easy to explain during the project defense.

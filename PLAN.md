# 10X Shop — Project Plan

**Author:** Nutsa Dushmanishvili  
**Repository:** `10X_shop_nutsaDushmanishvili`  
**Design Reference:** Velvety — Beauty & Wellness Website UI Kit (Figma)  

---

## 1. Project Goal & Module Scope (CORE First Strategy)

The goal is to build **10X Shop**, a responsive Single Page Application (SPA) online store using **React 19, TypeScript (strict), Tailwind CSS v4, and React Router**, powered by the **DummyJSON API**.

We followed a **CORE FIRST** methodology: all mandatory CORE requirements across all 5 evaluation modules were completed first before adding Figma visual polish (`@theme`), dark/light mode, debounced search, sorting, reviews, related products, and the `10X10` promo code.

### Module 1: React
- ✅ **CORE Scope — DONE:** Functional components, `props` & `children`, `useState`/`useEffect`, `.map()` with stable `key`, React Router (`/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`), `AuthContext`, `CartContext` (immutable updates), controlled Login & Checkout forms.
- ✅ **FULL Enhancements — DONE:** Search with `useDebounce`, Category filter, 5-option Sorting, Customer Reviews (`ProductReviews`), Related Products (`RelatedProducts`), and Promo Code `10X10`.

### Module 2: TypeScript
- ✅ **CORE Scope — DONE:** `"strict": true`, zero `any`, `npm run typecheck` = 0 errors, typed domain models (`Product`, `ProductsResponse`, `Review`, `CartItem`, `AuthUser`, `ShippingInfo`), typed component props & API functions (`src/utils/api.ts`).

### Module 3: Tailwind CSS
- ✅ **CORE Scope — DONE:** Tailwind CSS v4 via `@tailwindcss/vite`, `@import "tailwindcss"`, utility-first layout (Flex/Grid), mobile-first responsive design (`375px` to desktop), `hover:`, `focus:`, `disabled:` states.
- ✅ **FULL / BONUS Enhancements — DONE:** Custom Velvety design tokens via `@theme` and class-based Dark/Light Mode (`@custom-variant dark` + `ThemeContext`).

### Module 4: Optimization
- ✅ **CORE Scope — DONE:** Responsive layout without horizontal scroll on `375px`, `ErrorBoundary` class component, `DEBUG-LOG.md` (3 real bugs), `COMPATIBILITY.md`, lazy image attributes (`loading="lazy"`, `width`, `height`, `aspect-square`).

### Module 5: Practical Process
- ✅ **CORE Scope — DONE:** `PLAN.md` committed before feature work, meaningful Git commits, `README.md` (EN), `REPORT.md`, and `vercel.json` SPA rewrite configuration.

---

## 2. Work Breakdown Structure (WBS)

| Epic | Description | Level | Status |
| :--- | :--- | :---: | :---: |
| **Epic 1: Setup & Plan** | Scaffold Vite + React 19 + TS (strict), Tailwind v4, React Router, `PLAN.md` | CORE | ✅ Done |
| **Epic 2: Architecture & Layout** | Domain types (`src/types/`), `Layout`, `Header`, `Footer`, `Container`, `AppRoutes` | CORE | ✅ Done |
| **Epic 3: Auth & Login (P1)** | `AuthContext`, controlled `/login` form with validation, `ProtectedRoute` | CORE | ✅ Done |
| **Epic 4: Catalog (P2)** | DummyJSON API fetch (`src/utils/api.ts`), `ProductGrid`, `ProductCard`, `discountedPrice()` | CORE | ✅ Done |
| **Epic 5: Product Details (P3)** | `/products/:id` route, stock badges, quantity stepper, Add to Cart, 404 guard | CORE | ✅ Done |
| **Epic 6: Cart Page (P4)** | `CartContext` + `localStorage`, `/cart` item list, stepper, remove, confirm clear cart | CORE | ✅ Done |
| **Epic 7: Checkout (P5)** | Controlled `/checkout` form (`fullName`, `email`, `address`, `city`), validation, confirmation | CORE | ✅ Done |
| **Epic 8: Quality & Debugging** | `ErrorBoundary`, `DEBUG-LOG.md`, `COMPATIBILITY.md`, `vercel.json` | CORE | ✅ Done |
| **Epic 9: Velvety Figma Theme & Dark Mode** | `@theme` tokens, `HeroBanner`, `ThemeContext` Light/Dark mode toggle | FULL | ✅ Done |
| **Epic 10: Extended Catalog & Cart Features** | Debounced search (`useDebounce`), 5-option Sort, Reviews, Related Products, Promo `10X10` | FULL | ✅ Done |

---

## 3. Risks & Mitigation Plan

1. **Risk 1: DummyJSON API downtime or slow network response.**
   - *Mitigation:* Implemented explicit `loading` and `error` UI states with a `"Try again"` retry button in `CatalogPage.tsx` and `ProductPage.tsx`.
2. **Risk 2: Corrupted or invalid JSON data in `localStorage` (`shop_cart`, `shop_reviews`, `shop_theme`).**
   - *Mitigation:* Wrapped all `localStorage` reads/writes in `try/catch` blocks with safe default fallbacks and wrapped the app in `ErrorBoundary`.
3. **Risk 3: Broken direct URL refresh (`/products/5`) after deploying to Vercel.**
   - *Mitigation:* Added `vercel.json` with SPA rewrite rule (`"/(.*)" -> "/index.html"`).

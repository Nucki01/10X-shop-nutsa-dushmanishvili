# 10X Shop — Project Plan

**Student:** Nutsa Dushmanishvili  
**Repository:** `10X-shop-nutsa-dushmanishvili`  
**Design Inspiration:** Velvety — Beauty & Wellness Website UI Kit (Figma)

---

## 1. My Goal


I decided to follow the **CORE First** rule from our instructions: first make sure all required pages (Catalog, Product Details, Cart, Login, Checkout, and 404) work without bugs, and only after that add extra features like search, sorting, reviews, promo code, and dark mode.

### What I Planned for Each Module:
- **React:** Build reusable components, pass data with `props` and `children`, manage state with `useState` and `useEffect`, use `AuthContext` for login and `CartContext` for the shopping cart, and create controlled forms for Login and Checkout.
- **TypeScript:** Keep `"strict": true` enabled, write clear interfaces in `src/types/` for products, cart items, users, and orders, and make sure `npm run typecheck` has `0` errors and no `any`.
- **Tailwind CSS:** Use Tailwind CSS v4 (`@import "tailwindcss"`), make all pages responsive from mobile (`375px`) to desktop, add custom colors with `@theme`, and add a Light / Dark mode button.
- **Optimization & Debugging:** Use `loading="lazy"` on product images, add an `ErrorBoundary` so the app never shows a blank screen on crash, and record the bugs I fixed in `DEBUG-LOG.md`.
- **Process:** Write `PLAN.md`, `README.md`, `REPORT.md`, commit my work step by step on GitHub, and deploy the site on Vercel.

---

## 2. 3-Week Work Plan (Tasks & Schedule)

### Week 1 (Oct 17 – Oct 23): Project Setup, Routing, Login & Catalog
- **Task 1 — Project Setup (CORE):** Create Vite + React + TypeScript project, install Tailwind CSS v4 and React Router, and write `PLAN.md`.
  - *Definition of Done:* `npm run typecheck` and `npm run build` pass with 0 errors.
- **Task 2 — Types & Layout (CORE):** Create TypeScript interfaces in `src/types/` and build `Layout`, `Header`, `Footer`, `Container`, and `NotFoundPage`.
  - *Definition of Done:* Navigation between pages works without reloading the browser.
- **Task 3 — Login & Protected Route (CORE):** Create `AuthContext`, build the `/login` page with Username and Password validation, and protect `/checkout` with `ProtectedRoute`.
  - *Definition of Done:* Guests trying to open `/checkout` are sent to `/login` first and redirected back after logging in.
- **Task 4 — Catalog Page (CORE):** Fetch products from DummyJSON API (`GET /products`) using `useEffect`, handle loading and error states, and display cards with `ProductGrid` and `ProductCard`.
  - *Definition of Done:* 12 vegan & cruelty-free beauty products appear on the home page.

### Week 2 (Oct 24 – Oct 30): Product Details, Cart & Checkout
- **Task 5 — Product Details Page (CORE):** Build `/products/:id` using `useParams()`, show product photo, description, Euro price, stock status (`In stock` / `Only N left!` / `Out of stock`), and quantity buttons (`-` / `+`).
  - *Definition of Done:* Clicking a product opens its detail page; wrong IDs show the 404 page.
- **Task 6 — Cart Context & Cart Page (CORE):** Create `CartContext` with `addItem`, `removeItem`, `updateQuantity`, and `clearCart` saved in `localStorage` (`shop_cart`), and build `/cart`.
  - *Definition of Done:* Adding or removing items updates the Header badge and cart total immediately.
- **Task 7 — Checkout & Order Confirmation (CORE):** Build the `/checkout` controlled form (`Full name`, `Email`, `Address`, `City`) with validation and show the `"Thank you! Your order has been placed."` screen on submit.
  - *Definition of Done:* Submitting valid shipping info shows the confirmation screen and empties the cart.

### Week 3 (Oct 31 – Nov 6): Styling, Extra Features, Testing & Deploy
- **Task 8 — Velvety Theme & Dark Mode (FULL):** Add Velvety colors and fonts in `@theme` (`src/index.css`), build `HeroBanner`, and add `ThemeContext` for Light / Dark mode.
  - *Definition of Done:* All pages match the Velvety style and switch cleanly between Light and Dark mode.
- **Task 9 — Extra Catalog, Product & Cart Features (FULL):** Add debounced search (`useDebounce`), category filter buttons, 5 sorting options, customer reviews (`ProductReviews`), related products (`RelatedProducts`), and promo code `10X10`.
  - *Definition of Done:* Search, sort, reviews, and the `10X10` 10% discount work smoothly.
- **Task 10 — Quality Check, Docs & Deploy (CORE):** Add `ErrorBoundary`, write `DEBUG-LOG.md`, `COMPATIBILITY.md`, `README.md`, and `REPORT.md`, and deploy to Vercel.
  - *Definition of Done:* All checks pass (`0` errors) and live link works when refreshing `/products/5`.

---


   


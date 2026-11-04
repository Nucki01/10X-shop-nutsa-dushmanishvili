# 10X Shop — Vegan & Cruelty-Free Beauty Edition

**Author:** Nutsa Dushmanishvili  
**Repository:** [https://github.com/Nucki01/10X_shop_nutsaDushmanishvili](https://github.com/Nucki01/10X_shop_nutsaDushmanishvili)  
**Live Demo:** *(Add your Vercel link here after deploying)*

---

## About

**10X Shop** is a responsive Single Page Application (SPA) online store built with **React 19, TypeScript (strict mode), Tailwind CSS v4, and React Router**, powered by the **DummyJSON API**. Inspired by the **Velvety — Beauty & Wellness Website UI Kit (Figma)**, it features a 100% Vegan & Cruelty-Free beauty catalog across *Skincare*, *Hair Care*, and *Body & Personal Care* with debounced search, category filtering, 5-option sorting, customer reviews, promo code discounts, dark/light theme support, and a validated checkout flow.

---

## Features

### CORE Features
- **Catalog (`/`):** Fetches products from the DummyJSON API (`GET /products?limit=12`) inside `useEffect` with `loading`, `error` (`Try again`), and `empty` states, mapped to 12 aesthetic vegan beauty items in mixed category rows.
- **Product Details (`/products/:id`):** Dynamic route using `useParams()` and `GET /products/:id` displaying product photo, brand, category, discounted Euro price (`discountedPrice()`), stock badge (`In stock` / `Only N left!` / `Out of stock`), quantity stepper (`− / +`), and *Add to cart*. Invalid IDs safely render the 404 Not Found page.
- **Shopping Cart (`/cart` & `CartContext`):** Shared cart state using immutable array updates (`.map()`, `.filter()`), persisted in `localStorage` (`shop_cart`), with live Header badge (hidden when `0`), quantity controls, item removal, confirmed *Clear cart*, and Euro order summary.
- **Simulated Login (`/login` & `AuthContext`):** Controlled login form (`useState` + `onSubmit` + `preventDefault`) with exact required inline validation (`Username is required`, `Password is required`, `Password must be at least 6 characters`).
- **Protected Checkout (`/checkout` & `ProtectedRoute`):** Redirects guests to `/login` and returns them to `/checkout` after login. Validates `Full name`, `Email`, `Address`, and `City`, displays *"Thank you! Your order has been placed."* with the order total, and clears the cart.
- **Error Handling & 404 (`*`):** Custom `NotFoundPage` (`Page not found`) and class-based `ErrorBoundary` fallback component (`Something went wrong.` + `Reload`).

### FULL / Extended Features Implemented
- **Search, Category Filter & Sorting (`CatalogToolbar.tsx` & `useDebounce.ts`):** Debounced search (`400ms`), category filter tabs, and 5-option sorting (`Default`, `Price: Low to High`, `Price: High to Low`, `Rating: High to Low`, `Name: A–Z`).
- **Product Reviews & Related Products (`ProductReviews.tsx` & `RelatedProducts.tsx`):** Displays DummyJSON API reviews + user-submitted reviews saved in `localStorage` (`shop_reviews`) with validation, plus related products from the same category.
- **Promo Code `10X10` (`CartContext.tsx` & `CartPage.tsx`):** Case-insensitive promo code `10X10` applies a 10% discount (`Discount (10X10 −10%)`) and shows `Invalid promo code` for invalid codes.
- **Custom `@theme` Tokens & Dark/Light Mode (`src/index.css` & `ThemeContext.tsx`):** Uses Tailwind CSS v4 `@theme` design tokens and `@custom-variant dark` with a persistent header theme toggle (`shop_theme`).

---

## Tech Stack

- **Framework:** React 19 (Functional Components & Hooks)
- **Build Tool:** Vite 8
- **Language:** TypeScript (`"strict": true`, zero `any`)
- **Routing:** React Router v7 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `useParams`, `useNavigate`, `useLocation`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss"`, `@theme`, `@custom-variant dark`)
- **Linting:** Oxlint (`react/rules-of-hooks`, `typescript/no-explicit-any`)

---

## Architecture & Folder Structure

```text
src/
  components/
    cart/          OrderConfirmation.tsx
    layout/        Header.tsx, Footer.tsx, Layout.tsx
    product/       HeroBanner.tsx, CatalogToolbar.tsx, ProductCard.tsx, ProductGrid.tsx, ProductReviews.tsx, RelatedProducts.tsx
    ui/            Container.tsx, ErrorBoundary.tsx
  context/         AuthContext.tsx, CartContext.tsx, ThemeContext.tsx
  data/            products.ts (12 vegan & cruelty-free beauty products & categories)
  hooks/           useDebounce.ts
  pages/           CatalogPage.tsx, ProductPage.tsx, CartPage.tsx, LoginPage.tsx, CheckoutPage.tsx, NotFoundPage.tsx
  routes/          AppRoutes.tsx, ProtectedRoute.tsx
  types/           product.ts, cart.ts, user.ts, order.ts
  utils/           api.ts, format.ts, checkoutValidation.ts
```

**Data Flow:**  
User actions (clicks, inputs, form submissions) trigger event handlers that call `useState` setters or React Context methods (`AuthContext`, `CartContext`, `ThemeContext`). State is updated immutably, causing React to re-render the affected components automatically. Product data is fetched asynchronously inside `useEffect` via `src/utils/api.ts` from DummyJSON endpoints (`GET /products` and `GET /products/:id`).

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nucki01/10X_shop_nutsaDushmanishvili.git
   cd 10X_shop_nutsaDushmanishvili
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## Available Scripts

- `npm run dev` — Starts the local Vite development server.
- `npm run typecheck` — Runs strict TypeScript type checking (`tsc --noEmit -p tsconfig.app.json`) with 0 errors.
- `npm run lint` — Runs `oxlint` to check React and TypeScript rules.
- `npm run build` — Compiles TypeScript and builds the production bundle into `dist/`.
- `npm run preview` — Previews the production build locally.

---

## Test Account & Promo Code

- **Username:** `emilys` (or any non-empty username)
- **Password:** `emilyspass` (or any password with at least 6 characters)
- **Promo Code:** `10X10` (gives 10% off in Cart)

---

## Limitations & Scope Notes

- Authentication (`/login`) is a local React Context simulation as required by the PRD; no external auth server or JWT token is used.
- Checkout (`/checkout`) validates shipping details and simulates order placement locally without processing real payment card data.

---

## Credits

- Built by **Nutsa Dushmanishvili** for the **10X Front-end Diploma Project (2026)**.
- UI inspiration: **Velvety — Beauty & Wellness Website UI Kit (Figma)**.

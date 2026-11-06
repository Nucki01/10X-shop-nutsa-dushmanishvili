# 10X Shop

**Author:** Nutsa Dushmanishvili  
**Repository:** [https://github.com/Nucki01/10X-shop-nutsa-dushmanishvili](https://github.com/Nucki01/10X-shop-nutsa-dushmanishvili)  
**Live Demo:** [https://10-x-shop-nutsa-dushmanishvili.vercel.app/](https://10-x-shop-nutsa-dushmanishvili.vercel.app/)

---

## About

**10X Shop** is a Single Page Application (SPA) online beauty store built with **React, TypeScript, Tailwind CSS v4, and React Router**. It loads product data from the **DummyJSON API** and presents a 100% Vegan & Cruelty-Free beauty catalog inspired by the **Velvety — Beauty & Wellness UI Kit**. Users can browse and filter products, search, sort, read or write reviews, add items to a persistent cart, apply a promo code, switch between Light and Dark mode, and complete a simulated checkout.

---

## Features

### CORE Features
- **Catalog (`/`):** Loads 36 products from DummyJSON (`GET /products?limit=36`) inside `useEffect` with `loading`, `error` (`Try again`), and `empty` states.
- **Product Details (`/products/:id`):** Uses `useParams()` and `GET /products/:id` to show the product image, description, discounted Euro price, stock status (`In stock` / `Only N left!` / `Out of stock`), and a quantity selector (`− / +`). Unknown IDs show the 404 page.
- **Shopping Cart (`/cart` & `CartContext`):** Stores cart items in React Context and `localStorage` (`shop_cart`) using immutable `.map()` and `.filter()` updates. Shows a live item count badge in the Header.
- **Login (`/login` & `AuthContext`):** Controlled login form with validation (`Username is required`, `Password must be at least 6 characters`).
- **Protected Checkout (`/checkout` & `ProtectedRoute`):** Sends guests to `/login` first and redirects them back to `/checkout` after signing in. Validates `Full name`, `Email`, `Address`, and `City`, shows the `"Thank you! Your order has been placed."` message, and clears the cart.
- **404 & Error Boundary (`*`):** Custom `NotFoundPage` for unknown URLs and an `ErrorBoundary` component to catch unexpected crashes.

### Extra (FULL) Features
- **Search, Category Filter, Sort & Pagination:** Search bar with `useDebounce` (`400ms`), category buttons (*All*, *Skincare*, *Hair Care*, *Body & Personal Care*), 5 sorting options, and 12-per-page pagination (`‹ Prev 1 2 3 Next ›`).
- **Reviews & Related Products:** Customer reviews on the Product Details page (saved in `localStorage` under `shop_reviews`) and related products from the same category.
- **Promo Code (`10X10`):** Entering `10X10` in the cart gives a 10% discount; wrong codes show `"Invalid promo code"`.
- **Dark & Light Mode:** Theme toggle button in the Header using Tailwind v4 `@theme` and `ThemeContext` (saved in `localStorage` under `shop_theme`).

---

## Tech Stack

- **React 19** (Functional Components, `useState`, `useEffect`, `useContext`)
- **TypeScript** (`"strict": true`, zero `any`)
- **React Router v7** (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `Link`, `NavLink`, `useParams`, `useNavigate`, `useLocation`)
- **Tailwind CSS v4** (`@tailwindcss/vite`, `@import "tailwindcss"`, `@theme`, `@custom-variant dark`)
- **Vite 8** & **Oxlint**

---

## Folder Structure & Data Flow

```text
src/
  components/
    cart/          OrderConfirmation.tsx
    layout/        Header.tsx, Footer.tsx, Layout.tsx
    product/       HeroBanner.tsx, CatalogToolbar.tsx, ProductCard.tsx, ProductGrid.tsx, Pagination.tsx, ProductReviews.tsx, RelatedProducts.tsx
    ui/            Container.tsx, ErrorBoundary.tsx
  context/         AuthContext.tsx, CartContext.tsx, ThemeContext.tsx
  data/            products.ts
  hooks/           useDebounce.ts
  pages/           CatalogPage.tsx, ProductPage.tsx, CartPage.tsx, LoginPage.tsx, CheckoutPage.tsx, NotFoundPage.tsx
  routes/          AppRoutes.tsx, ProtectedRoute.tsx
  types/           product.ts, cart.ts, user.ts, order.ts
  utils/           api.ts, format.ts, checkoutValidation.ts
```

**How Data Flows in the App:**  
1. When a page opens, `useEffect` calls helper functions in `src/utils/api.ts` to fetch data from DummyJSON and saves it with `useState`.
2. Shared data (logged-in user, cart items, and dark/light theme) lives in `AuthContext`, `CartContext`, and `ThemeContext` so any component can use it without passing props through many levels.
3. When the user clicks a button or submits a form, an event handler updates state immutably, and React automatically updates the screen.

---

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Nucki01/10X-shop-nutsa-dushmanishvili.git
   cd 10X-shop-nutsa-dushmanishvili
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

---

## Scripts

- `npm run dev` — Start local development server
- `npm run typecheck` — Check TypeScript types (`0` errors)
- `npm run lint` — Run linter (`0` warnings/errors)
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## Test Login & Promo Code

- **Username:** `emilys` (or any username)
- **Password:** `emilyspass` (or any password with 6+ characters)
- **Promo Code in Cart:** `10X10` (10% discount)

---

## Limitations

- Login and Checkout are front-end simulations using React state and Context (no real payment processing or backend auth server is used, per project requirements).

---

## Credits

- Created by **Nutsa Dushmanishvili** for the **10X Front-end Diploma Project (2026)**.
- Design template inspiration: **Velvety — Beauty & Wellness Website UI Kit (Figma)**.

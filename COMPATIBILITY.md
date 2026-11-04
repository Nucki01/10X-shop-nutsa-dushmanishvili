# Cross-Browser & Responsive Compatibility Report (COMPATIBILITY.md)

**Student:** Nutsa Dushmanishvili  
**Project:** 10X Shop — Vegan & Cruelty-Free Beauty Edition  

---

## 1. Page × Browser × Device Matrix (PRD Section O3)

Tested across **Desktop (`1280px+`)**, **Tablet (`768px`)**, and **Mobile (`375px`)** viewports in **Google Chrome**, **Mozilla Firefox**, and **Microsoft Edge**.

| Page / Route | Chrome (Desktop & 375px Mobile) | Firefox (Desktop & 375px Mobile) | Edge (Desktop & 375px Mobile) | Notes / Fixes Applied |
| :--- | :---: | :---: | :---: | :--- |
| **`/` (Catalog)** | ✓ | ✓ | ✓ | 1 col (`375px`), 2 cols (`sm:`), 4 cols (`lg:`). Fixed image cropping across breakpoints by using `aspect-square` on product cards and `aspect-[4/3]` on hero image. |
| **`/products/:id` (Product Details)** | ✓ | ✓ | ✓ | 2-column split on desktop (`md:grid-cols-2`), 1 column on mobile. Used `object-contain` inside `max-h-80` frame so tall bottles are never cropped. |
| **`/cart` (Shopping Cart)** | ✓ | ✓ | ✓ | Cart items stack cleanly on `375px`; Order Summary & Promo Code (`10X10`) sit below item list on mobile and in a right sidebar on desktop (`lg:grid-cols-3`). |
| **`/login` (Login)** | ✓ | ✓ | ✓ | Centered `max-w-md` card with visible `focus:` outlines and inline validation messages. |
| **`/checkout` (Checkout)** | ✓ | ✓ | ✓ | Protected route; 4-field controlled form stacks above Order Summary on `375px` with zero horizontal scroll. |
| **`*` (404 Not Found)** | ✓ | ✓ | ✓ | Displays `"Page not found"`, `"The page you are looking for does not exist."`, and `"Go to catalog"`. |

---

## 2. Accessibility & Responsive Checks (PRD Section O3)

- **Zero Horizontal Scroll at `375px`:** Verified across all routes (`document.documentElement.scrollWidth <= window.innerWidth`).
- **Semantic HTML Structure:** Uses `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.
- **Form Labels & Focus States:** Every input/select/textarea has a matching `<label htmlFor="...">` and visible `focus:outline-2` state.
- **Images & CLS Prevention:** Product thumbnails include `alt`, `loading="lazy"`, `width={300}`, `height={300}`, and `aspect-square`.

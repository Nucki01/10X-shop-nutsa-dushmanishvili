# Debug Log (DEBUG-LOG.md)

Real bugs I found and fixed while building **10X Shop**.

---

## Bug #1: Broken Product Photo (404) & Wrong Image in Catalog

- **Symptom:** One serum card showed a broken image icon, and one shower gel card showed a photo of people instead of a bottle.
- **How to Reproduce:** Open `http://localhost:5173` and scroll through the product grid.
- **Tool Used:** Browser DevTools **Network** tab (`Img` filter) — showed `404 Not Found` on the serum image URL.
- **Root Cause:** One Unsplash link was deleted (`404`) and another link had the wrong photo ID.
- **Fix:** Checked all 12 image URLs in `src/data/products.ts` and replaced the broken ones with working vegan bottle photos (`864d952`).
- **What I Learned:** Always check external image links in the Network tab and include `alt` text on every `<img>`.

---

## Bug #2: Product Photos Stretching & Cropping on Mobile and Detail Page

- **Symptom:** When shrinking the window to mobile/tablet size or opening `/products/:id`, tall product bottles got stretched wide and their caps/bottoms were cut off.
- **How to Reproduce:** Resize the browser window from desktop down to `375px` mobile view or click any tall product bottle.
- **Tool Used:** Chrome DevTools **Device Toolbar** (Responsive / `375px` view) and **Elements** inspector.
- **Root Cause:** Using a fixed height (`h-52`) with `object-cover` made the image box wide and flat on single-column mobile screens, which zoomed in and cropped the bottle.
- **Fix:** Changed catalog card images in `ProductCard.tsx` to `aspect-square` (`1:1` ratio) and used `object-contain` inside `max-h-80` on `ProductPage.tsx`.
- **What I Learned:** Using `aspect-square` keeps the exact same square shape on every screen size so photos never change crop when resizing.

---

## Bug #3: Cart Badge, Login Button & Promo Apply Button Disappearing in Dark Mode

- **Symptom:** When switching to Dark Mode, the Cart item number badge and `Log in` button disappeared into the dark header, the `Apply` promo button turned white-on-white, and `★ 4.7` stars were too dark.
- **How to Reproduce:** Click the `☾ Dark` button in the header and check the header buttons, star ratings, and `/cart` promo button.
- **Tool Used:** Chrome DevTools **Elements → Styles** panel (inspecting `.dark` CSS rules).
- **Root Cause:** In `src/index.css`, `html.dark .bg-white` turned the white header buttons dark while their text stayed dark, and `bg-velvety-ink` turned light cream in Dark Mode with white text on top.
- **Fix:** Used `bg-stone-100 text-stone-900` on the header badge and `Log in` button in `Header.tsx`, changed the `Apply` button in `CartPage.tsx` to `bg-velvety-green text-white`, and brightened `.text-velvety-sage` in `src/index.css`.
- **What I Learned:** When adding Dark Mode, always test buttons and badges on both themes to make sure background and text colors keep strong contrast.

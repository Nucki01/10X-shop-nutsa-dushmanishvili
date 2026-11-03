import type { Product } from '../types/product'

// The 3 main product categories in our vegan & cruelty-free dm shop
export const CATEGORIES = [
  'All',
  'Skincare',
  'Hair Care',
  'Body & Personal Care',
] as const

// 12 realistic 100% Vegan & Cruelty-Free dm (drogerie-markt) products
// Ordered in a mixed sequence so each row in the "All" catalog view shows a variety of categories.
export const DM_PRODUCTS: Product[] = [
  // Row 1: Skincare -> Hair Care -> Body Care -> Skincare
  {
    id: 1,
    title: 'Balea Med Ultra Sensitive Vegan Wash Gel',
    brand: 'Balea',
    category: 'Skincare',
    price: 2.95,
    discountPercentage: 0,
    rating: 4.8,
    stock: 25,
    description:
      '100% vegan and cruelty-free facial cleansing gel with panthenol, gentle on sensitive and easily irritated skin.',
    thumbnail:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 5,
    title: 'Balea Natural Beauty Vegan Almond & Argan Shampoo',
    brand: 'Balea',
    category: 'Hair Care',
    price: 1.95,
    discountPercentage: 0,
    rating: 4.7,
    stock: 30,
    description:
      '100% vegan and cruelty-free silicone-free shampoo with organic almond oil and plant-based argan oil for dry hair.',
    thumbnail:
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 9,
    title: 'alverde Vegan Organic Mint & Lemon Shower Gel',
    brand: 'alverde',
    category: 'Body & Personal Care',
    price: 1.45,
    discountPercentage: 0,
    rating: 4.8,
    stock: 40,
    description:
      '100% vegan and cruelty-free plant-based shower gel with organic mint leaf and fresh lemon peel extract.',
    thumbnail:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 3,
    title: 'Balea Niacinamide 10% Vegan Refining Serum',
    brand: 'Balea',
    category: 'Skincare',
    price: 4.95,
    discountPercentage: 0,
    rating: 4.9,
    stock: 12,
    description:
      '100% vegan, cruelty-free facial serum with 10% niacinamide and 1% zinc to smooth skin texture and strengthen the barrier.',
    thumbnail:
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // Row 2: Body Care -> Hair Care -> Skincare -> Body Care
  {
    id: 10,
    title: 'Balea Med Vegan Rich Body Lotion 15% Urea',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 2.65,
    discountPercentage: 0,
    rating: 4.9,
    stock: 20,
    description:
      'Cruelty-free vegan soothing body lotion with 15% synthetic urea, shea butter, and vitamin E for very dry skin.',
    thumbnail:
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 6,
    title: 'Balea Natural Beauty Hibiscus & Coconut Hair Milk',
    brand: 'Balea',
    category: 'Hair Care',
    price: 2.75,
    discountPercentage: 0,
    rating: 4.8,
    stock: 14,
    description:
      'Vegan, cruelty-free leave-in hair milk with organic hibiscus extract and plant-based coconut milk for soft curls.',
    thumbnail:
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 2,
    title: 'Balea Aqua Vegan Moisturizing Day Cream',
    brand: 'Balea',
    category: 'Skincare',
    price: 2.45,
    discountPercentage: 10,
    rating: 4.7,
    stock: 18,
    description:
      'Cruelty-free vegan hydro day cream with thermal water and plant-based hyaluronic acid for 24-hour hydration.',
    thumbnail:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 11,
    title: 'Balea Sensitive Vegan Deodorant Roll-On 0% Aluminum',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 1.15,
    discountPercentage: 0,
    rating: 4.6,
    stock: 28,
    description:
      '100% vegan and cruelty-free 24-hour deodorant roll-on with organic aloe vera and 0% aluminum or alcohol.',
    thumbnail:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // Row 3: Hair Care -> Skincare -> Body Care -> Hair Care
  {
    id: 7,
    title: 'Isana Vegan Seidenglanz Lotus Conditioner',
    brand: 'Isana',
    category: 'Hair Care',
    price: 1.45,
    discountPercentage: 0,
    rating: 4.5,
    stock: 22,
    description:
      '100% vegan and cruelty-free smoothing conditioner with magnolia and lotus flower extract for natural shine.',
    thumbnail:
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 4,
    title: 'alverde NATURKOSMETIK Organic Wild Rose Face Cream',
    brand: 'alverde',
    category: 'Skincare',
    price: 3.45,
    discountPercentage: 5,
    rating: 4.6,
    stock: 15,
    description:
      'Certified vegan and cruelty-free organic face cream with wild rose oil and botanical shea butter for dry skin.',
    thumbnail:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 12,
    title: 'Balea Vegan Olive Oil & Shea Butter Hand Cream',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 1.35,
    discountPercentage: 0,
    rating: 4.7,
    stock: 35,
    description:
      'Cruelty-free vegan daily hand cream with cold-pressed olive oil and botanical shea butter for soft, smooth hands.',
    thumbnail:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 8,
    title: 'alverde Vegan Repair Hair Mask Avocado & Shea',
    brand: 'alverde',
    category: 'Hair Care',
    price: 3.25,
    discountPercentage: 10,
    rating: 4.9,
    stock: 9,
    description:
      'Certified vegan, cruelty-free organic hair mask with cold-pressed avocado oil and shea butter to repair split ends.',
    thumbnail:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    ],
  },
]

import type { Product } from '../types/product'

// The 3 main product categories in our vegan & cruelty-free beauty shop
export const CATEGORIES = [
  'All',
  'Skincare',
  'Hair Care',
  'Body & Personal Care',
] as const

// 36 realistic 100% Vegan & Cruelty-Free beauty products (12 per page across 3 pages)
// Ordered in a mixed sequence so every row in the "All" catalog view shows a variety of categories.
export const DM_PRODUCTS: Product[] = [
  // ================= PAGE 1 (Items 1–12) =================
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

  // ================= PAGE 2 (Items 13–24) =================
  {
    id: 13,
    title: 'alverde Vegan Vitamin C Glow Boost Serum',
    brand: 'alverde',
    category: 'Skincare',
    price: 4.45,
    discountPercentage: 0,
    rating: 4.8,
    stock: 16,
    description:
      '100% vegan brightening serum with organic sea buckthorn and botanical vitamin C for radiant, even-toned skin.',
    thumbnail:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 14,
    title: 'Balea Vegan Rosemary & Mint Scalp Tonic',
    brand: 'Balea',
    category: 'Hair Care',
    price: 2.85,
    discountPercentage: 5,
    rating: 4.7,
    stock: 19,
    description:
      'Cruelty-free refreshing scalp serum with organic rosemary water and peppermint oil to support healthy hair roots.',
    thumbnail:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 15,
    title: 'alverde Vegan Lavender & Oat Calming Bath Oil',
    brand: 'alverde',
    category: 'Body & Personal Care',
    price: 3.75,
    discountPercentage: 0,
    rating: 4.9,
    stock: 11,
    description:
      '100% vegan soothing bath oil with organic French lavender and oat milk extract for deep evening relaxation.',
    thumbnail:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 16,
    title: 'Balea Med Vegan Barrier Repair Ceramide Cream',
    brand: 'Balea',
    category: 'Skincare',
    price: 3.95,
    discountPercentage: 10,
    rating: 4.9,
    stock: 14,
    description:
      'Fragrance-free, 100% vegan barrier cream with plant-derived ceramides and squalane for dry, sensitive skin.',
    thumbnail:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 17,
    title: 'Balea Vegan Sea Salt & Matcha Body Scrub',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 3.15,
    discountPercentage: 0,
    rating: 4.6,
    stock: 21,
    description:
      'Cruelty-free exfoliating body scrub with fine Atlantic sea salt, green tea matcha, and organic jojoba oil.',
    thumbnail:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 18,
    title: 'alverde Vegan Nettle & Lemon Clarifying Shampoo',
    brand: 'alverde',
    category: 'Hair Care',
    price: 2.25,
    discountPercentage: 0,
    rating: 4.6,
    stock: 26,
    description:
      'Certified vegan herbal shampoo with organic nettle leaf and lemon balm for fresh, lightweight volume.',
    thumbnail:
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 19,
    title: 'Balea Vegan Chamomile & Aloe Soothing Toner',
    brand: 'Balea',
    category: 'Skincare',
    price: 2.15,
    discountPercentage: 0,
    rating: 4.7,
    stock: 24,
    description:
      'Alcohol-free vegan facial toner with chamomile flower extract and aloe vera to calm and hydrate after cleansing.',
    thumbnail:
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 20,
    title: 'alverde Vegan Calendula & Shea Lip Balm',
    brand: 'alverde',
    category: 'Body & Personal Care',
    price: 1.25,
    discountPercentage: 0,
    rating: 4.8,
    stock: 45,
    description:
      '100% vegan and cruelty-free lip care made with organic calendula blossom, berry wax, and shea butter.',
    thumbnail:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 21,
    title: 'Balea Professional Vegan Keratin Heat Protection Spray',
    brand: 'Balea',
    category: 'Hair Care',
    price: 2.95,
    discountPercentage: 0,
    rating: 4.7,
    stock: 17,
    description:
      'Plant-based phytokeratin heat protection mist that shields hair up to 220°C without animal ingredients.',
    thumbnail:
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 22,
    title: 'alverde Vegan Green Tea & Cucumber Eye Gel',
    brand: 'alverde',
    category: 'Skincare',
    price: 3.65,
    discountPercentage: 5,
    rating: 4.8,
    stock: 13,
    description:
      'Cooling vegan eye contour gel with organic green tea and cucumber water to reduce morning puffiness.',
    thumbnail:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 23,
    title: 'Balea Vegan Coconut & Vanilla Whipped Body Butter',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 3.45,
    discountPercentage: 0,
    rating: 4.9,
    stock: 15,
    description:
      'Rich, 100% vegan whipped body butter with cold-pressed coconut oil and warm Madagascar vanilla extract.',
    thumbnail:
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 24,
    title: 'Isana Vegan Argan & Macadamia Hair Oil Elixir',
    brand: 'Isana',
    category: 'Hair Care',
    price: 3.85,
    discountPercentage: 10,
    rating: 4.8,
    stock: 10,
    description:
      'Lightweight, cruelty-free hair oil blend with Moroccan argan and macadamia nut oil to tame frizz and add shine.',
    thumbnail:
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=800&q=80',
    ],
  },

  // ================= PAGE 3 (Items 25–36) =================
  {
    id: 25,
    title: 'Balea Vegan Hyaluronic & Rosewater Facial Mist',
    brand: 'Balea',
    category: 'Skincare',
    price: 2.55,
    discountPercentage: 0,
    rating: 4.7,
    stock: 22,
    description:
      'Refreshing vegan facial mist with Damascus rosewater and plant-based hyaluronic acid for instant mid-day hydration.',
    thumbnail:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 26,
    title: 'alverde Vegan Bamboo & Rice Volume Conditioner',
    brand: 'alverde',
    category: 'Hair Care',
    price: 2.35,
    discountPercentage: 0,
    rating: 4.6,
    stock: 18,
    description:
      '100% vegan weightless conditioner with organic bamboo shoot and rice protein for fine, flat hair.',
    thumbnail:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 27,
    title: 'Balea Vegan Tea Tree & Mint Refreshing Foot Cream',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 1.85,
    discountPercentage: 0,
    rating: 4.7,
    stock: 27,
    description:
      'Cruelty-free cooling foot cream with Australian tea tree oil, menthol, and plant-based glycerin.',
    thumbnail:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 28,
    title: 'alverde Vegan Bakuchiol & Olive Overnight Night Cream',
    brand: 'alverde',
    category: 'Skincare',
    price: 4.85,
    discountPercentage: 10,
    rating: 4.9,
    stock: 8,
    description:
      'Gentle plant-based retinol alternative night cream with vegan bakuchiol and organic olive squalane.',
    thumbnail:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 29,
    title: 'alverde Vegan Pomegranate & Almond Body Oil',
    brand: 'alverde',
    category: 'Body & Personal Care',
    price: 4.25,
    discountPercentage: 5,
    rating: 4.8,
    stock: 13,
    description:
      'Certified vegan nourishing body oil with cold-pressed pomegranate seed oil and sweet almond oil.',
    thumbnail:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 30,
    title: 'Balea Vegan Oat Milk Sensitive Dry Shampoo',
    brand: 'Balea',
    category: 'Hair Care',
    price: 2.45,
    discountPercentage: 0,
    rating: 4.5,
    stock: 23,
    description:
      '100% vegan gentle dry shampoo with soothing oat milk powder that refreshes roots without white residue.',
    thumbnail:
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 31,
    title: 'Balea Vegan Salicylic Acid 2% BHA Gentle Exfoliant',
    brand: 'Balea',
    category: 'Skincare',
    price: 4.65,
    discountPercentage: 0,
    rating: 4.8,
    stock: 15,
    description:
      'Cruelty-free leave-on BHA liquid exfoliant with 2% salicylic acid and green tea extract to unclog pores.',
    thumbnail:
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 32,
    title: 'Balea Med Vegan pH 5.5 Sensitive Hand Wash',
    brand: 'Balea',
    category: 'Body & Personal Care',
    price: 1.55,
    discountPercentage: 0,
    rating: 4.8,
    stock: 32,
    description:
      'Soap-free, 100% vegan liquid hand wash with skin-neutral pH 5.5 and provitamin B5 for frequent handwashing.',
    thumbnail:
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 33,
    title: 'alverde Vegan Hemp & Chamomile Scalp Soothing Mask',
    brand: 'alverde',
    category: 'Hair Care',
    price: 3.15,
    discountPercentage: 0,
    rating: 4.7,
    stock: 14,
    description:
      'Certified vegan hair and scalp mask with organic hemp seed oil and chamomile to relieve dryness.',
    thumbnail:
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 34,
    title: 'Balea Vegan Mineral Sun Fluid SPF 50+',
    brand: 'Balea',
    category: 'Skincare',
    price: 5.45,
    discountPercentage: 10,
    rating: 4.9,
    stock: 20,
    description:
      'Reef-safe, 100% vegan daily facial sunscreen SPF 50+ with lightweight non-greasy finish and vitamin E.',
    thumbnail:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 35,
    title: 'alverde Vegan Orange Blossom & Sage Deodorant Spray',
    brand: 'alverde',
    category: 'Body & Personal Care',
    price: 2.65,
    discountPercentage: 0,
    rating: 4.6,
    stock: 19,
    description:
      '100% vegan botanical deodorant spray with organic sage leaf extract and uplifting orange blossom water.',
    thumbnail:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 36,
    title: 'Balea Natural Beauty Vegan Chia & Raspberry Curl Cream',
    brand: 'Balea',
    category: 'Hair Care',
    price: 2.95,
    discountPercentage: 5,
    rating: 4.8,
    stock: 16,
    description:
      'Cruelty-free vegan curl defining cream with chia seed extract and raspberry seed oil for bouncy, frizz-free curls.',
    thumbnail:
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    ],
  },
]

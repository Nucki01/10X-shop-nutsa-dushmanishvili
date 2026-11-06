import { CATEGORIES, DM_PRODUCTS } from '../data/products'
import type { Product, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com'

// Category buttons for our Velvety Vegan & Cruelty-Free catalog
export const BEAUTY_CATEGORIES = CATEGORIES.map((cat) => ({
  slug: cat,
  label: cat,
}))

// Merge DummyJSON API response fields (such as live API reviews) with our
// aesthetic Velvety 100% Vegan & Cruelty-Free product visuals and descriptions.
function mergeWithAestheticProduct(
  apiProduct: Product,
  aestheticProduct: Product
): Product {
  return {
    ...apiProduct,
    ...aestheticProduct,
    reviews: apiProduct.reviews || aestheticProduct.reviews,
  }
}

// Fetch products from DummyJSON API (Requirement A1.6) and map them to our
// 36 aesthetic Vegan & Cruelty-Free products in mixed category row order.
export async function fetchCatalogProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products?limit=36`)
  if (!response.ok) {
    throw new Error('Failed to load products from DummyJSON API')
  }
  const data = (await response.json()) as ProductsResponse

  return DM_PRODUCTS.map((aestheticItem) => {
    const matchingApiItem = data.products.find(
      (item) => item.id === aestheticItem.id
    )
    return matchingApiItem
      ? mergeWithAestheticProduct(matchingApiItem, aestheticItem)
      : aestheticItem
  })
}

// Fetch a single product by ID from DummyJSON (GET /products/:id)
// and merge with our aesthetic Vegan & Cruelty-Free catalog item.
export async function fetchProductById(id: number): Promise<Product | null> {
  const aestheticItem = DM_PRODUCTS.find((item) => item.id === id)
  if (!aestheticItem) {
    return null
  }

  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error('Failed to load product details')
  }
  const apiProduct = (await response.json()) as Product
  return mergeWithAestheticProduct(apiProduct, aestheticItem)
}

// Fetch related products in the same category via DummyJSON API
export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const allProducts = await fetchCatalogProducts()
  return allProducts.filter((item) => item.category === category)
}

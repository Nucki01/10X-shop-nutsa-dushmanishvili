import { useEffect, useState } from 'react'
import { HeroBanner } from '../components/product/HeroBanner'
import {
  CatalogToolbar,
  type SortOption,
} from '../components/product/CatalogToolbar'
import { ProductGrid } from '../components/product/ProductGrid'
import { useDebounce } from '../hooks/useDebounce'
import type { Product } from '../types/product'
import { BEAUTY_CATEGORIES, fetchCatalogProducts } from '../utils/api'

// P2 — Catalog Page (/) [CORE + FULL Search, Category Filter & Sorting with DummyJSON API]
export function CatalogPage() {
  // 1. API Data, Loading & Error State (PRD Requirement A1.6 & P2.1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 2. Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortChange] = useState<SortOption>('')

  // 3. Debounce the search query by 400ms (PRD P2.4)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // 4. Load beauty, skin-care, and fragrance products from DummyJSON API
  async function loadProducts() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCatalogProducts()
      setProducts(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong loading products.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // 5. Filter products by Category and Debounced Search text
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    const query = debouncedSearch.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  // 6. Sort a copy of the filtered products array (PRD P2.6)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating-desc') return b.rating - a.rating
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title)
    return 0
  })

  // Reset all filters when clicking "Clear filters" (PRD P2.3)
  function handleClearFilters() {
    setSelectedCategory('All')
    setSearchQuery('')
    setSortChange('')
  }

  return (
    <section className="space-y-8">
      {/* Top Velvety Hero Banner */}
      <HeroBanner />

      {/* Centered Editorial Section Heading */}
      <div
        id="catalog-products"
        className="text-center max-w-xl mx-auto space-y-2 pt-2"
      >
        <p className="text-xs uppercase tracking-widest text-velvety-sage">
          Our featured products
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-velvety-ink">
          Facial, hair and body care, natural and gentle
        </h2>
      </div>

      {/* Category Filter Buttons (from DummyJSON Beauty & Wellness categories) */}
      <div className="flex flex-wrap justify-center gap-2">
        {BEAUTY_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.slug
          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                isActive
                  ? 'bg-velvety-green text-white'
                  : 'bg-white border border-stone-200 text-velvety-ink hover:bg-velvety-mist'
              }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Search & Sort Toolbar */}
      <CatalogToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortChange}
        resultCount={sortedProducts.length}
      />

      {/* Loading State, Error State, Empty State, or Product Grid */}
      {loading ? (
        <div className="bg-white border border-stone-200 p-10 text-center">
          <p className="text-stone-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="bg-white border border-stone-200 p-10 text-center space-y-4">
          <p className="text-red-600">{error}</p>
          <button
            type="button"
            onClick={loadProducts}
            className="bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-2.5 cursor-pointer transition-colors"
          >
            Try again
          </button>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="bg-white border border-stone-200 p-10 text-center space-y-3">
          <p className="text-stone-600">No products found.</p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs uppercase tracking-wider font-semibold text-velvety-green underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </section>
  )
}

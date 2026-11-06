import { useEffect, useState } from 'react'
import { HeroBanner } from '../components/product/HeroBanner'
import {
  CatalogToolbar,
  type SortOption,
} from '../components/product/CatalogToolbar'
import { Pagination } from '../components/product/Pagination'
import { ProductGrid } from '../components/product/ProductGrid'
import { useDebounce } from '../hooks/useDebounce'
import type { Product } from '../types/product'
import { BEAUTY_CATEGORIES, fetchCatalogProducts } from '../utils/api'

const ITEMS_PER_PAGE = 12

// P2 — Catalog Page (/) [CORE + FULL Search, Category Filter, Sorting & 12-per-page Pagination]
export function CatalogPage() {
  // 1. API Data, Loading & Error State (PRD Requirement A1.6 & P2.1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 2. Filter, Sort & Page State
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortChange] = useState<SortOption>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 3. Debounce the search query by 400ms (PRD P2.4)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // 4. Load 36 vegan beauty products from DummyJSON API
  async function loadProducts() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCatalogProducts()
      setProducts(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong loading products.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Reset back to Page 1 whenever category, search, or sort changes (PRD P2.8)
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, debouncedSearch, sortBy])

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

  // 7. Paginate: show 12 products per page (PRD P2.7)
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset all filters when clicking "Clear filters" (PRD P2.3)
  function handleClearFilters() {
    setSelectedCategory('All')
    setSearchQuery('')
    setSortChange('')
    setCurrentPage(1)
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

      {/* Category Filter Buttons */}
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

      {/* Loading State, Error State, Empty State, or Paginated Product Grid */}
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
        <div className="space-y-6">
          <ProductGrid products={paginatedProducts} />

          {/* Bottom Pagination Bar + Showing X–Y of Z text (PRD P2.1 & P2.7) */}
          <div className="space-y-2 text-center">
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
            <p className="text-xs text-stone-500">
              Showing {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, sortedProducts.length)} of{' '}
              {sortedProducts.length} products
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

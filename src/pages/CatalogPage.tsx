import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
const VALID_SORTS: SortOption[] = [
  '',
  'price-asc',
  'price-desc',
  'rating-desc',
  'title-asc',
]

// P2 — Catalog Page (/) [CORE + FULL Search, Category Filter, Sorting, Pagination & URL Search Params]
export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 1. API Data, Loading & Error State (PRD Requirement A1.6 & P2.1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 2. Initialize Filter, Sort & Page State from URL Search Params (PRD P2.8 FULL)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get('category') || 'All'
  )
  const [searchQuery, setSearchQuery] = useState<string>(
    () => searchParams.get('q') || ''
  )
  const [sortBy, setSortChange] = useState<SortOption>(() => {
    const rawSort = (searchParams.get('sort') || '') as SortOption
    return VALID_SORTS.includes(rawSort) ? rawSort : ''
  })
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const rawPage = Number(searchParams.get('page'))
    return !Number.isNaN(rawPage) && rawPage >= 1 ? rawPage : 1
  })

  // 3. Debounce the search query by 400ms (PRD P2.4)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // 4. Load 36 vegan beauty products from DummyJSON API
  async function loadProducts() {
    try {
      const data = await fetchCatalogProducts()
      setProducts(data)
      setError(null)
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

  function handleRetry() {
    setLoading(true)
    setError(null)
    void loadProducts()
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  // Sync URL query parameters whenever category, debounced search, sort, or page changes (PRD P2.8 FULL)
  useEffect(() => {
    const nextParams = new URLSearchParams()
    if (selectedCategory !== 'All') {
      nextParams.set('category', selectedCategory)
    }
    if (debouncedSearch.trim() !== '') {
      nextParams.set('q', debouncedSearch.trim())
    }
    if (sortBy !== '') {
      nextParams.set('sort', sortBy)
    }
    if (currentPage > 1) {
      nextParams.set('page', String(currentPage))
    }
    setSearchParams(nextParams, { replace: true })
  }, [
    selectedCategory,
    debouncedSearch,
    sortBy,
    currentPage,
    setSearchParams,
  ])

  function handleCategorySelect(categorySlug: string) {
    setSelectedCategory(categorySlug)
    setCurrentPage(1)
  }

  function handleSearchInput(value: string) {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  function handleSortSelect(value: SortOption) {
    setSortChange(value)
    setCurrentPage(1)
  }

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
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage)
    setTimeout(() => {
      const catalogSection = document.getElementById('catalog-products')
      if (catalogSection) {
        const top =
          catalogSection.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 0)
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
        className="text-center max-w-xl mx-auto space-y-2 pt-2 scroll-mt-24"
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
              onClick={() => handleCategorySelect(category.slug)}
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
        onSearchChange={handleSearchInput}
        sortBy={sortBy}
        onSortChange={handleSortSelect}
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
            onClick={handleRetry}
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
              page={safePage}
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

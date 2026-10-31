import { useState } from 'react'
import { CATEGORIES, DM_PRODUCTS } from '../data/products'
import { HeroBanner } from '../components/product/HeroBanner'
import {
  CatalogToolbar,
  type SortOption,
} from '../components/product/CatalogToolbar'
import { ProductGrid } from '../components/product/ProductGrid'
import { useDebounce } from '../hooks/useDebounce'

// P2 — Catalog Page (/) [CORE + FULL Search, Category Filter & Sorting]
export function CatalogPage() {
  // 1. Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortChange] = useState<SortOption>('')

  // 2. Debounce the search query by 400ms (PRD P2.4)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // 3. Filter products by Category and Debounced Search text
  const filteredProducts = DM_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    const query = debouncedSearch.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  // 4. Sort a copy of the filtered products array (PRD P2.6)
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

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                isActive
                  ? 'bg-velvety-green text-white'
                  : 'bg-white border border-stone-200 text-velvety-ink hover:bg-velvety-mist'
              }`}
            >
              {category}
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

      {/* Empty State or Product Grid (PRD P2.3) */}
      {sortedProducts.length === 0 ? (
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

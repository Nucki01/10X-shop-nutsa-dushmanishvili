// Props for CatalogToolbar (PRD Section P2.1, P2.4, P2.6)
export type SortOption =
  | ''
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'title-asc'

interface CatalogToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  resultCount: number
}

// CatalogToolbar Component
// Renders the Search input, Sort dropdown (5 required PRD options), and product count.
export function CatalogToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
}: CatalogToolbarProps) {
  return (
    <div className="bg-white border border-stone-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* ① Search Input */}
      <div className="flex-1 max-w-md">
        <label htmlFor="catalog-search" className="sr-only">
          Search products
        </label>
        <input
          id="catalog-search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search vegan products (e.g. serum, shampoo, cream)..."
          className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2 text-sm focus:outline-2 focus:outline-velvety-green"
        />
      </div>

      {/* ③ Sort Dropdown & Result Count (PRD Section P2.6) */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4">
        <span className="text-xs uppercase tracking-wider text-stone-500">
          Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </span>

        <div className="flex items-center gap-2">
          <label
            htmlFor="catalog-sort"
            className="text-xs uppercase tracking-wider text-stone-600"
          >
            Sort by:
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-stone-300 bg-velvety-cream/50 px-3 py-2 text-sm focus:outline-2 focus:outline-velvety-green cursor-pointer"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating-desc">Rating: high to low</option>
            <option value="title-asc">Name A→Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}

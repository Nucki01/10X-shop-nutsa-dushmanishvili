// Props for Pagination component (PRD Section P2.7)
interface PaginationProps {
  page: number
  totalPages: number
  onChange: (newPage: number) => void
}

// Simple Pagination Component (renders ‹ 1 2 3 › at the bottom of the Catalog page)
export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  // Create an array of page numbers: [1, 2, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      {/* Previous Page Button (‹) */}
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3.5 py-2 text-xs uppercase tracking-wider font-medium border border-stone-200 bg-white text-velvety-ink hover:bg-velvety-mist disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        ‹ Prev
      </button>

      {/* Page Number Buttons */}
      {pages.map((pageNumber) => {
        const isActive = pageNumber === page
        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onChange(pageNumber)}
            className={`w-9 h-9 text-xs font-semibold cursor-pointer transition-colors ${
              isActive
                ? 'bg-velvety-green text-white'
                : 'bg-white border border-stone-200 text-velvety-ink hover:bg-velvety-mist'
            }`}
          >
            {pageNumber}
          </button>
        )
      })}

      {/* Next Page Button (›) */}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3.5 py-2 text-xs uppercase tracking-wider font-medium border border-stone-200 bg-white text-velvety-ink hover:bg-velvety-mist disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
      >
        Next ›
      </button>
    </div>
  )
}

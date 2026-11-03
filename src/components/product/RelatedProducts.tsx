import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { fetchProductsByCategory } from '../../utils/api'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  currentProduct: Product
}

// RelatedProducts Component (PRD FULL Requirement P3.5)
// Fetches other products from the same DummyJSON category and renders them using ProductGrid.
export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    async function loadRelated() {
      try {
        const data = await fetchProductsByCategory(currentProduct.category)
        const filtered = data
          .filter((item) => item.id !== currentProduct.id)
          .slice(0, 4)
        setRelated(filtered)
      } catch {
        setRelated([])
      }
    }

    loadRelated()
  }, [currentProduct.id, currentProduct.category])

  if (related.length === 0) {
    return null
  }

  return (
    <div className="space-y-4 pt-4">
      <h2 className="font-serif text-2xl text-velvety-ink">
        Related Products in {currentProduct.category}
      </h2>
      <ProductGrid products={related} />
    </div>
  )
}

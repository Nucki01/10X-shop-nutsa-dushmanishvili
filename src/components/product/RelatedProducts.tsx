import { DM_PRODUCTS } from '../../data/products'
import type { Product } from '../../types/product'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  currentProduct: Product
}

// RelatedProducts Component (PRD FULL Requirement P3.5)
// Finds other products from the same category and renders them using the same ProductGrid/ProductCard.
export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const related = DM_PRODUCTS.filter(
    (item) =>
      item.category === currentProduct.category &&
      item.id !== currentProduct.id
  ).slice(0, 4)

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

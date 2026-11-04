import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { useCart } from '../../context/CartContext'
import { discountedPrice, formatPrice } from '../../utils/format'

// Props for ProductCard
interface ProductCardProps {
  product: Product
}

// Reusable ProductCard Component (PRD P2.3 — shows thumbnail, brand, category, rating, discounted price, stock, Add to cart)
export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.discountPercentage >= 1
  const finalUnitPrice = discountedPrice(
    product.price,
    product.discountPercentage
  )

  return (
    <div className="bg-white border border-stone-200/80 p-4 flex flex-col justify-between transition-shadow hover:shadow-md">
      {/* Clicking the image or title opens the Product Details page (/products/:id) */}
      <Link to={`/products/${product.id}`} className="block space-y-3">
        {/* Soft sage-mist image frame — aspect-square keeps identical proportions on mobile, tablet & desktop */}
        <div className="relative bg-velvety-mist/60 p-3">
          {hasDiscount && (
            <span className="absolute top-5 left-5 bg-velvety-green text-white text-[11px] font-semibold px-2 py-0.5">
              −{Math.round(product.discountPercentage)}%
            </span>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            width={300}
            height={300}
            className="w-full aspect-square object-cover bg-white"
          />
        </div>

        <div className="space-y-1 pt-1">
          {/* Brand, Category & Star Rating */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-500">
            <span>
              {product.brand ? `${product.brand} · ` : ''}
              {product.category}
            </span>
            <span className="text-velvety-sage font-semibold">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Serif Product Title */}
          <h2 className="font-serif text-lg text-velvety-ink hover:text-velvety-sage transition-colors line-clamp-1">
            {product.title}
          </h2>

          {/* Short Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Price in Euros (€) with optional discount and Add to cart button */}
      <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg font-bold text-velvety-green">
            {formatPrice(finalUnitPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product, 1)}
          disabled={product.stock === 0}
          className="bg-velvety-green hover:bg-velvety-sage disabled:bg-stone-300 text-white text-xs uppercase tracking-wider font-medium px-3.5 py-2 cursor-pointer transition-colors"
        >
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}

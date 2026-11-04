import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductReviews } from '../components/product/ProductReviews'
import { RelatedProducts } from '../components/product/RelatedProducts'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'
import { fetchProductById } from '../utils/api'
import { discountedPrice, formatPrice } from '../utils/format'
import { NotFoundPage } from './NotFoundPage'

// P3 — Product Details Page (/products/:id) [CORE + FULL Reviews & Related Products via DummyJSON API]
export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()

  // API state for single product
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState<boolean>(false)

  // Local state for selected quantity and a confirmation message when added
  const [quantity, setQuantity] = useState(1)
  const [addedMessage, setAddedMessage] = useState(false)

  // Fetch product by ID from DummyJSON whenever URL `:id` changes (PRD Section P3.2)
  useEffect(() => {
    setQuantity(1)
    setAddedMessage(false)
    window.scrollTo(0, 0)

    const numericId = Number(id)
    if (!id || Number.isNaN(numericId) || numericId <= 0) {
      setNotFound(true)
      setLoading(false)
      return
    }

    async function loadProduct() {
      setLoading(true)
      setError(null)
      setNotFound(false)
      try {
        const data = await fetchProductById(numericId)
        if (!data) {
          setNotFound(true)
        } else {
          setProduct(data)
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load product details.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="bg-white border border-stone-200 p-10 text-center">
        <p className="text-stone-600">Loading product details...</p>
      </div>
    )
  }

  if (notFound) {
    return <NotFoundPage />
  }

  if (error || !product) {
    return (
      <div className="bg-white border border-stone-200 p-10 text-center space-y-4">
        <p className="text-red-600">{error || 'Product not found.'}</p>
        <Link
          to="/"
          className="inline-block bg-velvety-green text-white text-xs uppercase tracking-wider font-medium px-6 py-2.5"
        >
          Back to catalog
        </Link>
      </div>
    )
  }

  // Determine stock badge text and color (PRD Section P3.3)
  let stockText = 'In stock'
  let stockColor = 'text-velvety-green bg-velvety-mist'
  if (product.stock === 0) {
    stockText = 'Out of stock'
    stockColor = 'text-red-700 bg-red-50'
  } else if (product.stock <= 5) {
    stockText = `Only ${product.stock} left!`
    stockColor = 'text-amber-700 bg-amber-50'
  }

  function handleAddToCart() {
    if (!product) return
    addItem(product, quantity)
    setAddedMessage(true)
  }

  return (
    <section className="space-y-8">
      <Link
        to="/"
        className="inline-block text-xs uppercase tracking-wider font-medium text-velvety-sage hover:text-velvety-green"
      >
        ← Back to catalog
      </Link>

      {/* Main Product Details Card */}
      <div className="bg-white border border-stone-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Product Image inside soft sage-mist frame */}
        <div className="bg-velvety-mist/60 p-6 flex items-center justify-center">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="w-full max-w-xs sm:max-w-sm max-h-80 object-contain bg-white p-2"
          />
        </div>

        {/* Right Column: Product Information & Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500">
            <span>
              {product.brand ? `${product.brand} · ` : ''}
              {product.category}
            </span>
            <span className="text-velvety-sage font-semibold">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>

          <h1 className="font-serif text-3xl text-velvety-ink">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-serif text-2xl font-bold text-velvety-green">
              {formatPrice(
                discountedPrice(product.price, product.discountPercentage)
              )}
            </span>
            {product.discountPercentage >= 1 && (
              <>
                <span className="text-sm text-stone-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="bg-velvety-green text-white text-xs font-semibold px-2 py-0.5">
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
            <span className={`text-xs font-medium px-2.5 py-1 ${stockColor}`}>
              {stockText}
            </span>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Stepper (- / +) and Add to Cart Button */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-stone-300 bg-velvety-cream">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || product.stock === 0}
                className="px-3.5 py-2 text-sm font-bold disabled:opacity-40 cursor-pointer"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock || product.stock === 0}
                className="px-3.5 py-2 text-sm font-bold disabled:opacity-40 cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-velvety-green hover:bg-velvety-sage disabled:bg-stone-300 text-white text-xs uppercase tracking-wider font-medium px-6 py-3 cursor-pointer transition-colors"
            >
              Add to cart
            </button>
          </div>

          {addedMessage && (
            <p className="text-sm text-velvety-green font-medium">
              Added to cart!{' '}
              <Link to="/cart" className="underline font-semibold">
                View Cart
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Customer Reviews Section (combines DummyJSON API reviews + user localStorage reviews) */}
      <ProductReviews
        key={product.id}
        productId={product.id}
        apiReviews={product.reviews}
      />

      {/* Related Products Section (fetched from DummyJSON by category) */}
      <RelatedProducts currentProduct={product} />
    </section>
  )
}

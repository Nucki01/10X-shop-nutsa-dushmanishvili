import { useState, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { Review } from '../../types/product'

interface ProductReviewsProps {
  productId: number
  apiReviews?: Review[]
}

// Helper to load saved reviews for a specific productId from localStorage (shop_reviews)
function loadProductReviews(
  productId: number,
  apiReviews: Review[] = []
): Review[] {
  const formattedApiReviews = apiReviews.map((rev) => ({
    ...rev,
    date: rev.date ? rev.date.split('T')[0] : '2026-10-15',
  }))

  try {
    const raw = localStorage.getItem('shop_reviews')
    if (!raw) return formattedApiReviews
    const allReviews = JSON.parse(raw) as Record<number, Review[]>
    const saved = allReviews[productId] || []
    return [...saved, ...formattedApiReviews]
  } catch {
    return formattedApiReviews
  }
}

// ProductReviews Component (PRD FULL Requirement P3.4)
// Displays customer reviews (from DummyJSON + localStorage) and a controlled form to add a new review.
export function ProductReviews({
  productId,
  apiReviews = [],
}: ProductReviewsProps) {
  const { user } = useAuth()

  const [reviews, setReviews] = useState<Review[]>(() =>
    loadProductReviews(productId, apiReviews)
  )
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState<string>('')
  const [ratingError, setRatingError] = useState<string>('')
  const [commentError, setCommentError] = useState<string>('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRatingError('')
    setCommentError('')

    // Validate Rating & Comment (exact PRD P3.4 error messages)
    let hasError = false
    if (rating < 1 || rating > 5) {
      setRatingError('Please select a rating')
      hasError = true
    }
    if (comment.trim().length < 10) {
      setCommentError('Comment must be at least 10 characters')
      hasError = true
    }
    if (hasError) return

    const newReview: Review = {
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      reviewerName: user.isLoggedIn ? user.username : 'Guest',
    }

    // Save to localStorage under shop_reviews[productId]
    try {
      const raw = localStorage.getItem('shop_reviews')
      const allReviews = raw ? (JSON.parse(raw) as Record<number, Review[]>) : {}
      const existing = allReviews[productId] || []
      allReviews[productId] = [newReview, ...existing]
      localStorage.setItem('shop_reviews', JSON.stringify(allReviews))
    } catch {
      // Ignore storage errors
    }

    setReviews((prev) => [newReview, ...prev])
    setComment('')
    setRating(5)
  }

  return (
    <div className="bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
      <h2 className="font-serif text-2xl text-velvety-ink">
        Customer Reviews ({reviews.length})
      </h2>

      {/* List of Reviews */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={`${review.reviewerName}-${index}`}
            className="border-b border-stone-200 pb-4 space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-velvety-ink">
                {review.reviewerName}
              </span>
              <span>{review.date}</span>
            </div>
            <p className="text-velvety-sage text-xs font-semibold">
              {'★'.repeat(review.rating)}
            </p>
            <p className="text-sm text-stone-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Controlled Form to Add a Review */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <h3 className="font-serif text-lg text-velvety-ink">Write a review</h3>

        <div>
          <label
            htmlFor="review-rating"
            className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1"
          >
            Rating
          </label>
          <select
            id="review-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-stone-300 bg-velvety-cream/50 px-3 py-2 text-sm"
          >
            <option value={5}>5 Stars — Excellent</option>
            <option value={4}>4 Stars — Very Good</option>
            <option value={3}>3 Stars — Good</option>
            <option value={2}>2 Stars — Fair</option>
            <option value={1}>1 Star — Poor</option>
          </select>
          {ratingError && (
            <p className="text-xs text-red-600 mt-1">{ratingError}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="review-comment"
            className="block text-xs uppercase tracking-wider font-medium text-velvety-ink mb-1"
          >
            Comment
          </label>
          <textarea
            id="review-comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product (at least 10 characters)..."
            className="w-full border border-stone-300 bg-velvety-cream/50 px-3.5 py-2 text-sm focus:outline-2 focus:outline-velvety-green"
          />
          {commentError && (
            <p className="text-xs text-red-600 mt-1">{commentError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-5 py-2.5 cursor-pointer transition-colors"
        >
          Submit review
        </button>
      </form>
    </div>
  )
}

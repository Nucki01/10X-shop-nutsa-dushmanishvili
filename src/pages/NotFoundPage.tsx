import { Link } from 'react-router-dom'

// 404 Not Found Page (PRD Requirement P0.1)
// Exact required texts from PRD:
// - Heading: "Page not found"
// - Message: "The page you are looking for does not exist."
// - Link: "Go to catalog" -> "/"
export function NotFoundPage() {
  return (
    <section className="bg-white border border-stone-200 p-10 text-center max-w-lg mx-auto my-8 space-y-3">
      <p className="text-xs font-medium text-velvety-sage uppercase tracking-widest">
        404 Error
      </p>
      <h1 className="font-serif text-3xl text-velvety-ink">Page not found</h1>
      <p className="text-sm text-stone-600 pb-3">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-velvety-green hover:bg-velvety-sage text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition-colors"
      >
        Go to catalog
      </Link>
    </section>
  )
}

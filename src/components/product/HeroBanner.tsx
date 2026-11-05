// HeroBanner Component (inspired by Velvety Beauty & Wellness UI Kit)
// Displays a botanical sage-green hero section and 3 vegan/cruelty-free wellness highlights.
export function HeroBanner() {
  return (
    <div className="rounded-xs overflow-hidden border border-stone-200 bg-white mb-10">
      {/* Top Banner: Sage green split layout */}
      <div className="bg-velvety-sage dark:bg-stone-900 text-white p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-white/80">
            100% Vegan &amp; Cruelty-Free · Beauty &amp; Wellness Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl leading-tight">
            Let nature take care of your body and soul
          </h1>
          <p className="text-sm text-white/90 max-w-md leading-relaxed">
            Discover gentle skincare, clean beauty, and botanical fragrances
            crafted for healthy, radiant skin.
          </p>
          <div className="pt-2">
            <a
              href="#catalog-products"
              className="inline-block bg-stone-100 text-stone-900 hover:bg-stone-200 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Shop now →
            </a>
          </div>
        </div>

        {/* Featured Botanical Skincare Visual (aspect-[4/3] keeps constant proportions across all screen sizes) */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"
            alt="Natural vegan skincare bottles and botanicals"
            className="w-full max-w-md aspect-[4/3] object-cover object-center rounded-xs border border-white/20"
          />
        </div>
      </div>

      {/* Bottom Highlights Strip (3 simple vegan & cruelty-free pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 bg-velvety-mist/40 p-6 text-left">
        <div className="p-3 space-y-1">
          <h2 className="font-serif text-lg text-velvety-ink">
            100% Cruelty-Free &amp; Vegan
          </h2>
          <p className="text-xs text-stone-600">
            All products in our store are 100% vegan, plant-based, and never tested on animals.
          </p>
        </div>

        <div className="p-3 space-y-1">
          <h2 className="font-serif text-lg text-velvety-ink">Fits Your Skin</h2>
          <p className="text-xs text-stone-600">
            Balanced hydration with plant-derived hyaluronic acid, niacinamide, and organic oils.
          </p>
        </div>

        <div className="p-3 space-y-1">
          <h2 className="font-serif text-lg text-velvety-ink">Easy Daily Care</h2>
          <p className="text-xs text-stone-600">
            Thoughtfully organized into vegan Skincare, Hair Care, and Body Care.
          </p>
        </div>
      </div>
    </div>
  )
}

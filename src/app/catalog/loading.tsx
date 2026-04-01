export default function LoadingCatalogPage() {
  return (
    <div className="bg-white min-h-screen pb-32">
      <section className="bg-dark pt-28 pb-16 px-4 text-center border-b border-primary/20">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-4">
          Our Hair Collection
        </h1>
        <p className="text-white/80 font-sans text-lg md:text-xl max-w-2xl mx-auto">
          Premium quality hair in every texture and length. Find your perfect
          match.
        </p>
      </section>

      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-primary/20 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="h-10 w-full max-w-xl rounded-full bg-primary/10 animate-pulse" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={`catalog-skeleton-${idx}`}
              className="w-full bg-primary/10 animate-pulse rounded-xl aspect-[4/5] min-h-[400px]"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

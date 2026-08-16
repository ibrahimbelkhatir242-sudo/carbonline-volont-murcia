import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="spec-label mb-4">Error 404</p>
      <h1 className="font-display font-800 uppercase text-5xl md:text-7xl text-bone mb-6">
        Off The Map
      </h1>
      <p className="text-muted max-w-md mb-8">
        This page doesn't exist — but your steering wheel does. Head back to the collection.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center justify-center bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-8 py-4 text-sm uppercase"
      >
        Back To Shop
      </Link>
    </main>
  );
}

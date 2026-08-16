const trustPoints = [
  { title: "Secure Payment", body: "Encrypted checkout, ready for Stripe integration." },
  { title: "Tracked Shipping", body: "Made to order and shipped with full tracking across the EU." },
  { title: "Direct Support", body: "Talk to the team building your wheel, not a call center." },
  { title: "Precision Materials", body: "Aerospace-grade carbon fiber, hand-finished grips." },
  { title: "OEM Fitment", body: "Matched to factory mounting points — no modification required." },
  { title: "Warranty Included", body: "Structural warranty on every wheel, details at checkout." },
];

export default function TrustSection() {
  return (
    <section className="container-x py-24 md:py-32 border-t border-steel/60">
      <div className="max-w-xl mb-14">
        <p className="spec-label mb-3">REF. 05 / ASSURANCE</p>
        <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
          Built To Trust
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {trustPoints.map((p) => (
          <div key={p.title} className="border-l border-signal/60 pl-5">
            <h3 className="font-display font-700 uppercase text-lg text-bone mb-1">{p.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Placeholder review system — connect to a real reviews provider before launch */}
      <div className="spec-frame border border-steel/60 bg-panel p-8 md:p-10">
        <p className="spec-label mb-3">Customer Reviews</p>
        <h3 className="font-display font-700 uppercase text-2xl text-bone mb-3">
          Reviews Launching With Our First Deliveries
        </h3>
        <p className="text-sm text-muted max-w-lg leading-relaxed">
          We don't publish placeholder ratings. Once real customers have their wheels installed,
          verified reviews will appear here automatically.
        </p>
      </div>
    </section>
  );
}

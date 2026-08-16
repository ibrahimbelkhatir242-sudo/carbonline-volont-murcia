import { Feather, Layers, Zap, Gauge } from "lucide-react";

const features = [
  {
    ref: "01",
    title: "Carbon Fiber",
    body: "Lightweight. Strong. Built for performance.",
    icon: Feather,
  },
  {
    ref: "02",
    title: "Premium Materials",
    body: "Carbon fiber, Alcantara and premium leather.",
    icon: Layers,
  },
  {
    ref: "03",
    title: "Precision Fit",
    body: "Designed for a precise and clean installation.",
    icon: Zap,
  },
  {
    ref: "04",
    title: "Sport Design",
    body: "Built to transform the interior and driving experience.",
    icon: Gauge,
  },
];

export default function WhySection() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="max-w-xl mb-14">
        <p className="spec-label mb-3">Spec Sheet</p>
        <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
          Why Our Steering Wheels
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-steel/60">
        {features.map((f) => (
          <div key={f.ref} className="bg-void p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <f.icon size={28} strokeWidth={1.4} className="text-signal" />
              <span className="spec-label">REF.{f.ref}</span>
            </div>
            <div>
              <h3 className="font-display font-700 uppercase text-xl text-bone mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



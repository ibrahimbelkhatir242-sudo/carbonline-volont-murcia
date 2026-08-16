import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Carbonline builds direct-fit carbon fiber steering wheels for German and European performance cars.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative h-[46vh] min-h-[340px] overflow-hidden">
        <Image
          src="/images/carbon-fiber.webp"
          alt="Macro view of carbon fiber weave"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-void/70" />
        <div className="relative h-full container-x flex flex-col justify-end pb-12">
          <p className="spec-label mb-2">REF. 07 / COMPANY</p>
          <h1 className="font-display font-800 uppercase text-5xl md:text-7xl text-bone">About</h1>
        </div>
      </section>

      <section className="container-x py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display font-700 uppercase text-3xl text-bone mb-5 red-underline pb-2">
            Built Around The Hub, Not Around A Trend
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Carbonline started with a simple frustration: most aftermarket carbon steering wheels
            are shaped to look right in a photo, not to sit right in your hands at speed. We build
            the other way around — starting from the factory hub, airbag pattern, and control
            layout of each specific platform, then building the carbon shell and grip around it.
          </p>
          <p className="text-muted leading-relaxed">
            Every wheel is made to order for Audi, BMW, Mercedes-Benz, and Porsche performance
            models, using aerospace-grade carbon fiber and hand-finished Alcantara or leather.
            Nothing ships until it's matched to your exact generation.
          </p>
        </div>
        <div>
          <h2 className="font-display font-700 uppercase text-3xl text-bone mb-5 red-underline pb-2">
            What We Believe
          </h2>
          <ul className="space-y-4">
            <li className="border-l border-signal/60 pl-4">
              <p className="text-bone font-medium">Fitment first.</p>
              <p className="text-sm text-muted mt-1">
                A carbon wheel that doesn't sit right isn't a performance part.
              </p>
            </li>
            <li className="border-l border-signal/60 pl-4">
              <p className="text-bone font-medium">No fake urgency.</p>
              <p className="text-sm text-muted mt-1">
                Every wheel is made to order — we won't invent stock countdowns to rush you.
              </p>
            </li>
            <li className="border-l border-signal/60 pl-4">
              <p className="text-bone font-medium">Materials you can verify.</p>
              <p className="text-sm text-muted mt-1">
                Real carbon layup, real Alcantara, documented on every product page.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

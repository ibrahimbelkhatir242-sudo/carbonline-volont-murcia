import Image from "next/image";

const installs = [
  { brand: "Audi", image: "/images/audi-interior.webp" },
  { brand: "BMW", image: "/images/bmw-interior.webp" },
  { brand: "Mercedes-Benz", image: "/images/mercedes-interior.webp" },
  { brand: "Porsche", image: "/images/porsche-interior.webp" },
];

export default function InstalledSection() {
  return (
    <section className="py-24 md:py-32 bg-panel">
      <div className="container-x mb-12">
        <p className="spec-label mb-3">REF. 04 / IN THE CAR</p>
        <h2 className="font-display font-700 uppercase text-4xl md:text-5xl text-bone red-underline pb-2">
          See It In Your Car
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {installs.map((i) => (
          <div key={i.brand} className="group relative aspect-[3/4] overflow-hidden">
            <Image
              src={i.image}
              alt={`Carbon fiber steering wheel installed in a ${i.brand}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />
            <span className="absolute bottom-5 left-5 font-display font-700 uppercase text-lg text-bone">
              {i.brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

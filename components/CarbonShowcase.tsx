"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CarbonShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[120vh] bg-void">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: imgX }} className="absolute inset-0 scale-110">
          <Image
            src="/images/carbon-fiber.webp"
            alt="Macro close-up of woven carbon fiber weave catching light"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-void/55" />

        <div className="relative h-full container-x flex flex-col justify-center">
          <p className="spec-label mb-4">REF. 02 / MATERIAL</p>
          <h2 className="font-display font-800 uppercase text-[13vw] sm:text-6xl md:text-7xl leading-[0.9] text-bone max-w-3xl">
            Carbon Fiber.
            <br />
            Built Different.
          </h2>
          <motion.div style={{ width: lineWidth }} className="h-px bg-signal mt-8 max-w-md" />
          <p className="mt-6 max-w-md text-muted leading-relaxed">
            Every wheel starts as raw 2x2 twill, hand-laid and cured under pressure until it holds
            its shape at a fraction of the weight of the wheel it replaces. What's left is a
            surface that doesn't just look fast — it's engineered to survive being driven fast.
          </p>
        </div>
      </div>
    </section>
  );
}

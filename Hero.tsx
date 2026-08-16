"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const wheelScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const reflectX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const reflectY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-void">
      {/* Background: dark interior, red rim light */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-wheel.webp"
          alt="Carbon fiber steering wheel inside a performance car interior, dramatic red lighting"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60" />
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.55, 0.15]) }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] rounded-full bg-signal/30 blur-[120px] animate-glowPulse"
        />
      </div>

      <div
        className="relative h-full container-x flex flex-col justify-center"
        onPointerMove={handlePointerMove}
      >
        <motion.div style={{ opacity: textOpacity, y: textY }} className="max-w-3xl">
          <p className="spec-label mb-5">REF. 001 / CARBONLINE PERFORMANCE SERIES</p>
          <h1 className="font-display font-800 uppercase leading-[0.88] text-[13vw] sm:text-[9vw] lg:text-[5.6vw] text-bone text-glow">
            Control Your Drive.
            <br />
            Define Your Style.
          </h1>
          <p className="mt-6 max-w-md text-muted text-base md:text-lg leading-relaxed">
            Premium carbon fiber steering wheels engineered for performance.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-8 py-4 text-sm uppercase"
            >
              Shop Steering Wheels
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center justify-center border border-steel-light hover:border-bone transition-colors text-bone font-medium tracking-wide px-8 py-4 text-sm uppercase"
            >
              Build Your Wheel
            </Link>
          </div>
        </motion.div>

        {/* Parallax reflection accent, echoes carbon weave catching light */}
        <motion.div
          style={{
            x: reflectX,
            y: reflectY,
            rotate: wheelRotate,
            scale: wheelScale,
          }}
          className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[720px] aspect-square rounded-full border border-steel-light/30"
          aria-hidden
        >
          <div className="absolute inset-6 rounded-full border border-signal/20" />
          <div className="absolute inset-16 rounded-full border border-steel-light/20" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="spec-label">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}

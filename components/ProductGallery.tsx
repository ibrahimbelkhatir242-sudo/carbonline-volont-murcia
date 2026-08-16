"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * Simulated 360° viewer.
 * Drop a real image sequence into /images/360/{slug}/frame-001.webp ... frame-036.webp
 * and swap `frames` below for the real array — the drag/rotate logic stays the same.
 */
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"gallery" | "360">("gallery");
  const [frame, setFrame] = useState(0);
  const dragRef = useRef<{ startX: number; startFrame: number } | null>(null);

  const frames = images; // placeholder: cycles through available shots to simulate rotation

  function onPointerDown(e: React.PointerEvent) {
    dragRef.current = { startX: e.clientX, startFrame: frame };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const step = Math.round(dx / 40);
    const next = ((dragRef.current.startFrame + step) % frames.length + frames.length) % frames.length;
    setFrame(next);
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="spec-label">Product Gallery</span>
        <div className="flex gap-1 border border-steel-light">
          <button
            onClick={() => setMode("gallery")}
            className={`px-3 py-1.5 text-xs uppercase tracking-wide ${
              mode === "gallery" ? "bg-signal text-bone" : "text-muted"
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setMode("360")}
            className={`px-3 py-1.5 text-xs uppercase tracking-wide ${
              mode === "360" ? "bg-signal text-bone" : "text-muted"
            }`}
          >
            360°
          </button>
        </div>
      </div>

      {mode === "gallery" ? (
        <>
          <div className="spec-frame relative aspect-square bg-panel border border-steel/60 overflow-hidden">
            <Image src={images[active]} alt={name} fill className="object-cover" priority />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <button
                key={img + idx}
                onClick={() => setActive(idx)}
                className={`relative aspect-square border overflow-hidden ${
                  active === idx ? "border-signal" : "border-steel/60"
                }`}
              >
                <Image src={img} alt={`${name} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          className="spec-frame relative aspect-square bg-panel border border-steel/60 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <Image src={frames[frame]} alt={`${name} 360 view`} fill className="object-cover pointer-events-none" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 spec-label bg-void/70 px-3 py-1.5">
            Drag to rotate — inspect carbon, stitching &amp; paddles
          </div>
        </div>
      )}
    </div>
  );
}

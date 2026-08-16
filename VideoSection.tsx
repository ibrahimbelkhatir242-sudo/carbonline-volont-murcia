"use client";

import { useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }

  return (
    <section className="relative w-full h-[70vh] bg-panel overflow-hidden">
      {/*
        Replace poster/src with real footage:
        /videos/carbonline-reel.mp4 — close-ups of carbon, Alcantara, stitching,
        paddle shifters, wheel in-car, driver hands on wheel.
      */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/carbon-fiber.webp"
      >
        <source src="/videos/carbonline-reel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/40" />

      <div className="relative h-full container-x flex flex-col justify-end pb-14">
        <p className="spec-label mb-2">REF. 03 / IN MOTION</p>
        <h2 className="font-display font-700 uppercase text-3xl md:text-5xl text-bone max-w-lg">
          Engineered. Not Assembled.
        </h2>
        <button
          onClick={toggleSound}
          className="mt-6 w-fit inline-flex items-center gap-2 border border-steel-light hover:border-bone text-bone text-xs uppercase tracking-widest2 px-5 py-3 transition-colors"
        >
          {muted ? "Unmute" : "Mute"}
          <SoundIcon muted={muted} />
        </button>
      </div>
    </section>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 9v6h4l5 5V4L8 9H4z" />
      {!muted && <path d="M17 8a5 5 0 010 8" />}
      {muted && <path d="M18 9l4 4M22 9l-4 4" />}
    </svg>
  );
}

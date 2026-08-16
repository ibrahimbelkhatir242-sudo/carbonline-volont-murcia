import { Metadata } from "next";
import CustomBuilder from "@/components/CustomBuilder";

export const metadata: Metadata = {
  title: "Custom Steering Wheel Configurator",
  description:
    "Build your own carbon fiber steering wheel — choose your vehicle, carbon finish, grip material, stitching, and paddles.",
};

export default function CustomPage() {
  return (
    <main className="container-x py-16 md:py-24">
      <div className="max-w-2xl mb-14">
        <p className="spec-label mb-3">Custom</p>
        <h1 className="font-display font-800 uppercase text-4xl md:text-6xl text-bone">
          Build Your Wheel
        </h1>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Start with your vehicle, then choose the carbon finish, grip, stitching, and hardware.
          Your price updates as you build.
        </p>
      </div>
      <CustomBuilder />
    </main>
  );
}

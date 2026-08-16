"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your email/CRM endpoint — form is intentionally unopinionated about backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg spec-frame border border-steel/60 bg-panel p-8">
        <p className="spec-label mb-3">Message Sent</p>
        <h2 className="font-display font-700 uppercase text-2xl text-bone mb-2">
          We'll Be In Touch
        </h2>
        <p className="text-sm text-muted">
          Our team typically responds within one business day with fitment confirmation or next
          steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      <Field label="Name" name="name" type="text" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Vehicle (Brand, Model, Year)" name="vehicle" type="text" placeholder="e.g. BMW M3 G80, 2022" />

      <label className="block">
        <span className="spec-label block mb-2">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full bg-panel border border-steel-light text-bone text-sm px-4 py-3 placeholder:text-muted"
          placeholder="Tell us about your steering wheel, questions, or order details."
        />
      </label>

      <label className="block">
        <span className="spec-label block mb-2">Photo of Current Steering Wheel (Optional)</span>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer border border-steel-light hover:border-bone text-bone text-xs uppercase tracking-wide px-5 py-3 transition-colors">
            Choose File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
          <span className="text-xs text-muted truncate">{fileName ?? "No file selected"}</span>
        </div>
      </label>

      <button
        type="submit"
        className="w-full bg-signal hover:bg-signal-dim transition-colors text-bone font-medium tracking-wide px-6 py-4 text-sm uppercase"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="spec-label block mb-2">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-panel border border-steel-light text-bone text-sm px-4 py-3 placeholder:text-muted"
      />
    </label>
  );
}

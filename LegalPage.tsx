export default function LegalPage({
  title,
  refCode,
  children,
}: {
  title: string;
  refCode: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container-x py-16 md:py-24 max-w-2xl">
      <p className="spec-label mb-3">REF. {refCode} / LEGAL</p>
      <h1 className="font-display font-800 uppercase text-4xl md:text-5xl text-bone mb-8">
        {title}
      </h1>
      <div className="space-y-5 text-sm text-muted leading-relaxed">{children}</div>
    </main>
  );
}
